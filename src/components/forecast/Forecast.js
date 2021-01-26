import React, { useRef, useState } from "react";
import Chart from "./Chart";
import useAsync from "../../hooks/useAsync";
import getForecasts from "../../utils/getForecasts";
import ForecastInfo from "./ForecastInfo";

import "../../theme/Forecast.css";

function Forecast({ geo, region }) {
  const [state, refetch] = useAsync(() => getForecasts(geo), [geo]);

  const { loading, data, error } = state;
  if (loading) return <h1 style={{ textAlign: "center" }}>로딩중...</h1>;
  if (error) {
    console.log(error);
    return <h1 style={{ textAlign: "center" }}>에러 발생</h1>;
  }
  if (!data) return null;

  const { yesterdays, todays, tomorrows, current, lastUpdate } = data;

  return (
    <>
      <ForecastInfo yesterdays={yesterdays} todays={todays} current={current} />
      <Chart
        yesterdays={yesterdays}
        todays={todays}
        tomorrows={tomorrows}
        lastUpdate={lastUpdate}
      />
    </>
  );
}

export default React.memo(Forecast);
