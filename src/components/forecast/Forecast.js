import React, { useState, useEffect } from "react";
import Graph from "./Graph";
import axios from "axios";

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

function Forecast() {
  // const [forecast, setForecast] = useState(null);
  const [geo, setGeo] = useState({ lat: 36.354687, lon: 127.420997 });
  const [error, setError] = useState(null);

  const [yesterdays, setYesterdays] = useState(null);
  const [todays, setTodays] = useState(null);
  const [tomorrows, setTomorrows] = useState(null);

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        //좌표 가져오는 기능

        const response = await axios.get(
          `http://localhost:8001/weather/${geo.lat}/${geo.lon}`
        );
        const parseYesterday = parseData(response.data.yesterdays);
        const parseToday = parseData(response.data.todays);
        const parseTomorrow = parseData(response.data.tomorrows);

        setYesterdays(parseYesterday);
        setTodays(parseToday);
        setTomorrows(parseTomorrow);
      } catch (e) {
        setError(e);
      }
    };

    fetchForecast();
  }, []);

  const currentHour = setHourIndex(new Date().getHours());

  if (yesterdays && todays && tomorrows) {
    const diffTemp = yesterdays.temp[currentHour] - todays.temp[currentHour];
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
      </>
    );
  }
  return <h1 style={{ textAlign: "center" }}>로딩중...</h1>;
}

export default Forecast;
