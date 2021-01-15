import React, { useState, useEffect, useReducer } from "react";
import Graph from "./Graph";
import axios from "axios";
import dotenv from "dotenv";
import useAsync from "../hooks/useAsync";

dotenv.config();
const hostUrl = process.env.REACT_APP_HOST_URL;

function setHourIndex(now) {
  return Math.ceil((now % 24) / 3) % 8;
}

function parseData(days) {
  const date = new Date(days[0].dt);
  const key = `${date.getMonth() + 1}월 ${date.getDate()}일`;
  const data = {
    key,
    dt: [],
    temp: [],
  };

  days.forEach((day) => {
    data.dt.push([key, getDate(day.dt)]);
    data.temp.push(day.temp);
  });

  return data;
}

function getDate(day) {
  const date = new Date(day);
  return `${date.getHours()}시`;
}

async function getForecasts() {
  const response = await axios.get(
    // `${hostUrl}/weather/${geo.lat}/${geo.lon}`
    `${hostUrl}/weather/36.354687/127.420997`
  );

  const yesterdays = parseData(response.data.yesterdays);
  const todays = parseData(response.data.todays);
  const tomorrows = parseData(response.data.tomorrows);
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
  const hourIndex = setHourIndex(lastUpdate);

  const diffTemp = yesterdays.temp[hourIndex] - todays.temp[hourIndex];
  let diffText = "";

  if (diffTemp < 0) {
    diffText = `지금 기온은 어제보다 ${Math.abs(diffTemp)}도 높습니다.`;
  } else if (diffTemp > 0) {
    diffText = `지금 기온은 어제보다 ${Math.abs(diffTemp)}도 낮습니다.`;
  } else {
    diffText = `지금 기온은 어제와 동일합니다.`;
  }

  return (
    <>
      <h1 style={{ textAlign: "center" }}>{diffText}</h1>
      <Graph yesterdays={yesterdays} todays={todays} tomorrows={tomorrows} />
      <button onClick={refetch}>다시 불러오기</button>
    </>
  );
}

export default Forecast;
