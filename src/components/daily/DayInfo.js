import React from "react";
import WeatherIcons from "../forecast/WeatherIcons";
import { IconContext } from "react-icons";
import getDate from "../../utils/getDate";
import "./DayInfo.css";

function DayInfo({ days }) {
  const day = getDate(days.dt, "DAY");
  return (
    <div className="dayInfo__box">
      <div className="dayInfo">
        <p>{day}</p>
        <div className="icon__humidity">
          <IconContext.Provider value={{ size: "2.5rem", color: "black" }}>
            <WeatherIcons weatherIcon={days.weather[0].icon} />
          </IconContext.Provider>
          <p>{days.humidity}%</p>
        </div>
        <div className="wind">
          <p>{days.wind_speed}m/s</p>
        </div>
        <div className="temps">
          <p className="max">{days.temp.max}</p>
          <p className="min">{days.temp.min}</p>
        </div>
      </div>
    </div>
  );
}

export default DayInfo;
