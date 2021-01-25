import React from "react";
import WeatherIcons from "../weathers/WeatherIcons";
import WeatherCondition from "../weathers/WeatherCondition";

import { IconContext } from "react-icons";
import getDate from "../../utils/getDate";
import "../../theme/DayInfo.css";
import { WiStrongWind, WiThermometer } from "react-icons/wi";

function DayInfo({ days }) {
  const day = getDate(days.dt, "DAY");
  return (
    <div className="dayInfo__box">
      <div className="dayInfo">
        <div className="day">
          <p>{day}</p>
        </div>
        <div className="icon__box">
          <IconContext.Provider value={{ size: "2.5rem", color: "black" }}>
            <WeatherIcons weatherIcon={days.weather[0].icon} />
          </IconContext.Provider>
          {/* {getPop(days.pop, days.humidity)} */}
          <WeatherCondition condition={days.weather[0]} />
        </div>
        <div className="wind__box">
          <IconContext.Provider value={{ size: "2.5rem", color: "black" }}>
            <WiStrongWind />
          </IconContext.Provider>

          <p>{days.wind_speed}m/s</p>
        </div>
        <div className="temps__box">
          <IconContext.Provider value={{ size: "2.5rem", color: "black" }}>
            <WiThermometer />
          </IconContext.Provider>
          <div className="temp">
            <p className="max">{days.temp.max}</p>
            <p className="min">{days.temp.min}</p>
          </div>
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
