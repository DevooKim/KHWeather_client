import {
  WiCloudy,
  WiDayCloudy,
  WiDayRain,
  WiDayShowers,
  WiDaySunny,
  WiFog,
  WiNa,
  WiNightAltCloudy,
  WiNightAltShowers,
  WiNightClear,
  WiNightCloudy,
  WiNightShowers,
  WiSnow,
  WiThunderstorm,
} from "react-icons/wi";

import React from "react";

function WeatherIcons({ weatherIcon }) {
  switch (weatherIcon) {
    case "01d":
      return <WiDaySunny />;
    case "01n":
      return <WiNightClear />;
    case "02d":
      return <WiDayCloudy />;
    case "02n":
      return <WiNightAltCloudy />;
    case "03d":
      return <WiDayCloudy />;
    case "03n":
      return <WiNightCloudy />;
    case "04d":
      return <WiCloudy />;
    case "04n":
      return <WiCloudy />;
    case "09d":
      return <WiDayShowers />;
    case "09n":
      return <WiNightAltShowers />;
    case "10d":
      return <WiDayRain />;
    case "10n":
      return <WiNightShowers />;
    case "11d":
      return <WiThunderstorm />;
    case "11n":
      return <WiThunderstorm />;
    case "13d":
      return <WiSnow />;
    case "13n":
      return <WiSnow />;
    case "50d":
      return <WiFog />;
    case "50n":
      return <WiFog />;
    default:
      return <WiNa />;
  }
}

export default WeatherIcons;
