import React from "react";
import useAsync from "../../hooks/useAsync";
import DayInfo from "./DayInfo";
import getForecasts from "../../utils/getForecasts";

function Daily() {
  const [state, refetch] = useAsync(getForecasts, []);
  const { loading, data, error } = state;

  if (loading) return <h1 style={{ textAlign: "center" }}>로딩중...</h1>;
  if (error) return <h1 style={{ textAlign: "center" }}>에러 발생</h1>;
  if (!data) return null;

  const { daily } = data;

  return (
    <>
      <h3>Daily</h3>
      {daily.map((day) => (
        <DayInfo days={day} key={day.dt} />
      ))}
    </>
  );
}

export default Daily;
