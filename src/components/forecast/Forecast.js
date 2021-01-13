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
  const [todays, setTodays] = useState({ key: "todays" });
  const [tomorrows, setTomorrows] = useState({ key: "tomorrows" });

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        //좌표 가져오는 기능

        const response = await axios.get(
          `http://localhost:8001/weather/${geo.lat}/${geo.lon}`
        );
        setForecast(response.data);

        const f = parseData(response.data.yesterdays);
        setYesterdays(f);
        // setTodays(parseData(forecast.todays));
        // setTomorrows(parseData(forecast.tomorrows));
      } catch (e) {
        setError(e);
      }
    };

    fetchForecast();
  }, []);

  console.log("y: " + JSON.stringify(yesterdays));
  if (yesterdays) {
    return (
      <>
        {/* <div>{JSON.stringify(forecast)}</div> */}
        {/* <Graph yesterdays={yesterdays} todays={todays} tomorrows={tomorrows} /> */}
        <Graph yesterdays={yesterdays} />
        <div>
          {/* {yesterdays.map((y) => (
            <div>{y.dt}</div>
          ))} */}
        </div>
      </>
    );
  }
  return <div></div>;
}

export default Forecast;
