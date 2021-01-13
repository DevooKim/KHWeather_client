import React, { useState, useEffect } from "react";
import Graph from "./Graph";
import axios from "axios";

const initial = {
  daily: null,
  todays: null,
  tomorrows: null,
  yesterdays: null,
};

function parseData(days) {
  const date = new Date(days[0].dt);
  const key = `${date.getMonth() + 1}월 ${date.getDate()}일`;
  const data = {
    key,
    dt: [],
    temp: [],
  };
  // const dt = []
  // const temp = []

  days.forEach((day) => {
    data.dt.push(getDate(day.dt));
    data.temp.push(day.temp);
  });

  data.dt[0] = `${key} ${data.dt[0]}`;
  return data;
}

function getDate(day) {
  const date = new Date(day);
  return `${date.getHours()}시`;
}

function Forecast() {
  const [forecast, setForecast] = useState(null);
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
        setForecast(response.data);

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

  console.log("y: " + JSON.stringify(yesterdays));
  if (yesterdays && todays && tomorrows) {
    return (
      <>
        {/* <div>{JSON.stringify(forecast)}</div> */}
        <Graph yesterdays={yesterdays} todays={todays} tomorrows={tomorrows} />
      </>
    );
  }
  return <div></div>;
}

export default Forecast;
