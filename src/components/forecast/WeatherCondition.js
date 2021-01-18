import React from "react";

function WeatherCondition({ condition }) {
  switch (condition) {
    case "Thunderstorm":
      return <p>뇌우</p>;
    case "Drizzle":
      return <p>이슬비</p>;
    case "Rain":
      return <p>비</p>;
    case "Snow":
      return <p>눈</p>;
    case "Clear":
      return <p>맑음</p>;
    case "Clouds":
      return <p>흐림</p>;
    default:
      return <p></p>;
  }
}

export default WeatherCondition;
