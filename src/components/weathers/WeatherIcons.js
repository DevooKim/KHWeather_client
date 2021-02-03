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

function WeatherIcons({ weatherIcon, classes }) {
  switch (weatherIcon) {
    case "01d":
      return <WiDaySunny className={classes} />;
    case "01n":
      return <WiNightClear className={classes} />;
    case "02d":
      return <WiDayCloudy className={classes} />;
    case "02n":
      return <WiNightAltCloudy className={classes} />;
    case "03d":
      return <WiDayCloudy className={classes} />;
    case "03n":
      return <WiNightCloudy className={classes} />;
    case "04d":
      return <WiCloudy className={classes} />;
    case "04n":
      return <WiCloudy className={classes} />;
    case "09d":
      return <WiDayShowers className={classes} />;
    case "09n":
      return <WiNightAltShowers className={classes} />;
    case "10d":
      return <WiDayRain className={classes} />;
    case "10n":
      return <WiNightShowers className={classes} />;
    case "11d":
      return <WiThunderstorm className={classes} />;
    case "11n":
      return <WiThunderstorm className={classes} />;
    case "13d":
      return <WiSnow className={classes} />;
    case "13n":
      return <WiSnow className={classes} />;
    case "50d":
      return <WiFog className={classes} />;
    case "50n":
      return <WiFog className={classes} />;
    default:
      return <WiNa className={classes} />;
  }
}

export default WeatherIcons;
