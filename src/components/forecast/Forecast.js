import React, { useState, useEffect, useReducer } from "react";
import Graph from "./Graph";
import axios from "axios";
import dotenv from "dotenv";
import useAsync from "../../hooks/useAsync";
import parseForecasts from "../../utils/parseForecasts";
import setStateText from "../../utils/setStateText";

dotenv.config();
const hostUrl = process.env.REACT_APP_HOST_URL;

async function getForecasts() {
  const response = await axios.get(
    // `${hostUrl}/weather/${geo.lat}/${geo.lon}`
    `${hostUrl}/weather/36.354687/127.420997`
  );

  const yesterdays = parseForecasts(response.data.yesterdays);
  const todays = parseForecasts(response.data.todays);
  const tomorrows = parseForecasts(response.data.tomorrows);
  const lastUpdateHour = new Date().getHours(); //서버에서 캐싱될 때 마다 시간 업데이트해서 전송
  return { yesterdays, todays, tomorrows, lastUpdate: lastUpdateHour };
}

function Forecast() {
  const [geo, setGeo] = useState({ lat: 36.354687, lon: 127.420997 });
  const [state, refetch] = useAsync(getForecasts, []);

  const { loading, data, error } = state;

  if (loading) return <h1 style={{ textAlign: "center" }}>로딩중...</h1>;
  if (error) return <h1 style={{ textAlign: "center" }}>에러 발생</h1>;
  if (!data) return null;

  const { yesterdays, todays, tomorrows, lastUpdate } = data;
  const stateText = setStateText(lastUpdate, yesterdays.temp, todays.temp);

  return (
    <>
      <h1 style={{ textAlign: "center" }}>{stateText}</h1>
      <Graph yesterdays={yesterdays} todays={todays} tomorrows={tomorrows} />
      <button onClick={refetch}>다시 불러오기</button>
    </>
  );
}

export default Forecast;
