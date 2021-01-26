import React from "react";
import StateText from "./StateText";
import { IconContext } from "react-icons";
import WeatherIcons from "../weathers/WeatherIcons";
import WeatherCondition from "../weathers/WeatherCondition";
import getDate from "../../utils/getDate";

function ForecastInfo({ yesterdays, todays, current }) {
  const currentHour = getDate(current.dt, "HOURS");
  const rain = current.rain ? current.rain["1h"] + "mm" : null;
  const snow = current.snow ? current.snow["1h"] + "mm" : null;
  return (
    <div>
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
    </div>
  );
}

export default ForecastInfo;
