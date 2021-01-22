import React from "react";
import useAsync from "../../hooks/useAsync";
import DayInfo from "./DayInfo";
import getForecasts from "../../utils/getForecasts";
import "./Daily.css";

function Daily() {
  const [state, refetch] = useAsync(getForecasts, []);
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
