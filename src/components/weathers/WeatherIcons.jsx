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

function WeatherIcons({ weatherIcon, fontSize, sx }) {
  switch (weatherIcon) {
    case "01d":
      return <WiDaySunny  fontSize={fontSize} sx={{...sx}} />;
    case "01n":
      return <WiNightClear fontSize={fontSize} sx={{...sx}} />;
    case "02d":
      return <WiDayCloudy fontSize={fontSize} sx={{...sx}} />;
    case "02n":
      return <WiNightAltCloudy fontSize={fontSize} sx={{...sx}} />;
    case "03d":
      return <WiDayCloudy fontSize={fontSize} sx={{...sx}} />;
    case "03n":
      return <WiNightCloudy fontSize={fontSize} sx={{...sx}} />;
    case "04d":
      return <WiCloudy fontSize={fontSize} sx={{...sx}} />;
    case "04n":
      return <WiCloudy fontSize={fontSize} sx={{...sx}} />;
    case "09d":
      return <WiDayShowers fontSize={fontSize} sx={{...sx}} />;
    case "09n":
      return <WiNightAltShowers fontSize={fontSize} sx={{...sx}} />;
    case "10d":
      return <WiDayRain fontSize={fontSize} sx={{...sx}} />;
    case "10n":
      return <WiNightShowers fontSize={fontSize} sx={{...sx}} />;
    case "11d":
      return <WiThunderstorm fontSize={fontSize} sx={{...sx}} />;
    case "11n":
      return <WiThunderstorm fontSize={fontSize} sx={{...sx}} />;
    case "13d":
      return <WiSnow fontSize={fontSize} sx={{...sx}} />;
    case "13n":
      return <WiSnow fontSize={fontSize} sx={{...sx}} />;
    case "50d":
      return <WiFog fontSize={fontSize} sx={{...sx}} />;
    case "50n":
      return <WiFog fontSize={fontSize} sx={{...sx}} />;
    default:
      return <WiNa fontSize={fontSize} sx={{...sx}} />;
  }
}

export default WeatherIcons;
