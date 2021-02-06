import parseForecasts from "./parseForecasts";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const hostUrl = process.env.REACT_APP_HOST_URL;

function getForecasts(geo) {
  return async (geo) => {
    const response = await axios.get(
      // `${hostUrl}/weather/${geo.lat}/${geo.lon}`
      // `${hostUrl}/weather/36.354687/127.420997`
      `http://127.0.0.1:8001/weather/${geo.lat}/${geo.lon}/parse`
    );

    const yesterdays = parseForecasts(response.data.yesterdays);
    const todays = parseForecasts(response.data.todays);
    const tomorrows = parseForecasts(response.data.tomorrows);
    const current = response.data.current[0];
    const daily = response.data.daily;
    const lastUpdateHour = response.data.lastUpdate;

    return {
      yesterdays,
      todays,
      tomorrows,
      current,
      daily,
      lastUpdate: lastUpdateHour,
    };
  };
}

export default getForecasts();
