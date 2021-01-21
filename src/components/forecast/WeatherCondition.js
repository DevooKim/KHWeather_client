import React from "react";
import WeatherID from "./WeatherID";

function WeatherCondition({ condition, rain, snow }) {
  switch (condition.main) {
    case "Thunderstorm":
      return <p>뇌우</p>;
    case "Drizzle":
      return <p>이슬비</p>;
    case "Rain":
      return (
        <p>
          {WeatherID(condition.id)} {rain}mm
        </p>
      );
    case "Snow":
      return <p>눈</p>;
    case "Clear":
      return <p>맑음</p>;
    case "Clouds":
      return <p>흐림</p>;

    default:
      return <p>{WeatherID(condition.id)}</p>;
  }
}

export default WeatherCondition;
