import React, { useState } from "react";
import useAsync from "../../hooks/useAsync";
import DayInfo from "./DayInfo";
import getForecasts from "../../utils/getForecasts";
import "../../theme/Daily.css";

function Daily({ geo }) {
  // const [geo, setGeo] = useState({ lat: 36.354687, lon: 127.420997 });
  const [state, refetch] = useAsync(() => getForecasts(geo), [geo]);
  const { loading, data, error } = state;

  if (loading) return <h1 style={{ textAlign: "center" }}>로딩중...</h1>;
  if (error) return <h1 style={{ textAlign: "center" }}>에러 발생</h1>;
  if (!data) return null;

  const { daily } = data;

  return (
    <div className="daily">
      <div className="daily__title">주간 날씨</div>
      {daily.map((day) => (
        <DayInfo days={day} key={day.dt} />
      ))}
    </div>
  );
}

export default Daily;
