import React from "react";
import styled from "styled-components";
import WeatherIcons from "../weathers/WeatherIcons";
import WeatherCondition from "../weathers/WeatherCondition";

import { IconContext } from "react-icons";
import getDate from "../../utils/getDate";
import "../../theme/DayInfo.css";
import { WiStrongWind, WiThermometer } from "react-icons/wi";

function DayInfo({ days, theme }) {
  const day = getDate(days.dt, "DAY");
  return (
    // <div className="dayInfo__box">
    <Box className="dayInfo__box">
      <div className="dayInfo">
        <div className="day">
          <p>{day}</p>
        </div>
        <div className="icon__box">
          <IconContext.Provider
            value={{ size: "2.5rem", color: theme.colors.icon }}
          >
            <WeatherIcons weatherIcon={days.weather[0].icon} />
          </IconContext.Provider>
          <WeatherCondition condition={days.weather[0]} />
        </div>
        <div className="wind__box">
          <IconContext.Provider
            value={{ size: "2.5rem", color: theme.colors.icon }}
          >
            <WiStrongWind />
          </IconContext.Provider>

          <Wind>{days.wind_speed}m/s</Wind>
        </div>
        <div className="temps__box">
          <IconContext.Provider
            value={{ size: "2.5rem", color: theme.colors.icon }}
          >
            <WiThermometer />
          </IconContext.Provider>
          <div className="temp">
            {/* <p className="max">{days.temp.max}</p> */}
            {/* <p className="min">{days.temp.min}</p> */}
            <Max className="max">{days.temp.max}</Max>
            <Min className="min">{days.temp.min}</Min>
          </div>
        </div>
      </div>
    </Box>
  );
}

const Box = styled.div`
  backgroud-color: ${(props) => props.theme.dailyColor.bgColor};
  border-bottom: 1px solid ${(props) => props.theme.dailyColor.border};
`;

const Wind = styled.p`
  color: ${(props) => props.theme.dailyColor.wind};
`;

const Max = styled.p`
  color: ${(props) => props.theme.dailyColor.max};
`;
const Min = styled.p`
  color: ${(props) => props.theme.dailyColor.min};
`;

export default DayInfo;
