import React, { useRef, useState } from "react";
import Chart from "./Chart";
import useAsync from "../../hooks/useAsync";

import getForecasts from "../../utils/getForecasts";
import getDate from "../../utils/getDate";
import StateText from "./StateText";
import { IconContext } from "react-icons";
import WeatherIcons from "../weathers/WeatherIcons";
import WeatherCondition from "../weathers/WeatherCondition";
import "../../theme/Forecast.css";

function Forecast({ geo, region }) {
  const [state, refetch] = useAsync(() => getForecasts(geo), [geo]);

  const { loading, data, error } = state;

  if (loading) return <h1 style={{ textAlign: "center" }}>로딩중...</h1>;
  if (error) return <h1 style={{ textAlign: "center" }}>에러 발생</h1>;
  if (!data) return null;

  const { yesterdays, todays, tomorrows, current, lastUpdate } = data;
  const currentHour = getDate(current.dt, "HOURS");
  const rain = current.rain ? current.rain["1h"] + "mm" : null;
  const snow = current.snow ? current.snow["1h"] + "mm" : null;
  return (
    <>
      <p>{region}</p>
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
          <WeatherCondition
            condition={current.weather[0]}
            rain={rain}
            snow={snow}
          />
          <p>체감온도 {current.feels_like}℃</p>
        </div>
      </div>
      {/* <button onClick={refetch}>다시 불러오기</button> */}

      <Chart
        yesterdays={yesterdays}
        todays={todays}
        tomorrows={tomorrows}
        lastUpdate={lastUpdate}
      />
    </>
  );
}

export default React.memo(Forecast);
