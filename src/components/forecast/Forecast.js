import React, { useContext } from "react";
import Chart from "./Chart";
import ForecastInfo from "./ForecastInfo";
import { Data } from "../weathers/WeatherData";

function Forecast() {
  const data = useContext(Data);

  const { yesterdays, todays, tomorrows, current, lastUpdate } = data;
  return (
    <>
      <ForecastInfo forecasts={{ yesterdays, todays, current }} />
      <Chart forecasts={{ yesterdays, todays, tomorrows, lastUpdate }} />
    </>
  );
}

export default React.memo(Forecast);
