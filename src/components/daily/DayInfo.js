import React from "react";
import WeatherIcons from "../forecast/WeatherIcons";

import { IconContext } from "react-icons";
import getDate from "../../utils/getDate";
import "./DayInfo.css";
import { WiStrongWind, WiThermometer } from "react-icons/wi";

function DayInfo({ days }) {
  const day = getDate(days.dt, "DAY");
  return (
    <div className="dayInfo__box">
      <div className="dayInfo">
        <div className="day">
          <p>{day}</p>
        </div>
        <div className="icon__rain">
          <IconContext.Provider value={{ size: "2.5rem", color: "black" }}>
            <WeatherIcons weatherIcon={days.weather[0].icon} />
          </IconContext.Provider>
          {/* {getPop(days.pop, days.humidity)} */}
        </div>
        <div className="wind">
          <IconContext.Provider value={{ size: "2.5rem", color: "black" }}>
            <WiStrongWind />
          </IconContext.Provider>

          <p>{days.wind_speed}m/s</p>
        </div>
        <div className="temps">
          <IconContext.Provider value={{ size: "2.5rem", color: "black" }}>
            <WiThermometer />
          </IconContext.Provider>
          <p className="max">{days.temp.max}</p>
          <p className="min">{days.temp.min}</p>
        </div>
      </div>
    </div>
  );
}

const getPop = (pop, rain) => {
  if (pop >= 0.1) {
    return <p>{`${pop * 100}%`}</p>;
  }
  return <p> </p>;
};

export default DayInfo;
