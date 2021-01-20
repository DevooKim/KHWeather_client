import React, { useState } from "react";
import Graph from "./Graph";
import useAsync from "../../hooks/useAsync";

import getForecasts from "../../utils/getForecasts";
import getDate from "../../utils/getDate";
import StateText from "./StateText";
import { IconContext } from "react-icons";
import WeatherIcons from "./WeatherIcons";
import WeatherCondition from "./WeatherCondition";
import "./Forecast.css";

function Forecast() {
  const [geo, setGeo] = useState({ lat: 36.354687, lon: 127.420997 });
  const [state, refetch] = useAsync(getForecasts, []);

  const { loading, data, error } = state;

  if (loading) return <h1 style={{ textAlign: "center" }}>로딩중...</h1>;
  if (error) return <h1 style={{ textAlign: "center" }}>에러 발생</h1>;
  if (!data) return null;

  const { yesterdays, todays, tomorrows, current, lastUpdate } = data;
  const currentHour = getDate(current.dt, "HOURS");
  return (
    <>
      <div className="chart__header">
        <StateText
          hour={currentHour}
          yesterdayTemps={yesterdays.temp}
          todayTemps={todays.temp}
        />
        <div className="chart__headerMiddle">
          <IconContext.Provider value={{ size: "7rem" }}>
            <WeatherIcons weatherIcon={current.weather[0].icon} />
          </IconContext.Provider>
          <p>{current.temp}℃</p>
        </div>
        <div className="chart__headerBottom">
          <WeatherCondition condition={current.weather[0].main} />
          <p>체감온도 {current.feels_like}℃</p>
        </div>
      </div>
      <Graph
        yesterdays={yesterdays}
        todays={todays}
        tomorrows={tomorrows}
        lastUpdate={lastUpdate}
      />
      <button onClick={refetch}>다시 불러오기</button>
    </>
  );
}

export default Forecast;
