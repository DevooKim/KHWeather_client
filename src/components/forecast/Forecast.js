import React, { useEffect, useState } from "react";
import Chart from "./Chart";
import useAsync from "../../hooks/useAsync";
import getForecasts from "../../utils/getForecasts";
import ForecastInfo from "./ForecastInfo";
import CircularProgress from "@material-ui/core/CircularProgress";

function Forecast({ geo, theme }) {
  const [state, refetch] = useAsync(() => getForecasts(geo), [geo]);
  const [progress, setProgress] = useState(0);
  const { loading, data, error } = state;

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 10
      );
    }, 100);

    return () => {
      clearInterval(timer);
    };
  }, []);

  if (loading)
    return <CircularProgress variant="determinate" value={progress} />;
  if (error) {
    console.log(error);
    return <h1 style={{ textAlign: "center" }}>에러 발생</h1>;
  }
  if (!data) return null;

  const { yesterdays, todays, tomorrows, current, lastUpdate } = data;

  return (
    <>
      <ForecastInfo forecasts={{ yesterdays, todays, current }} />
      <Chart
        forecasts={{ yesterdays, todays, tomorrows, lastUpdate }}
        theme={theme}
      />
    </>
  );
}

export default React.memo(Forecast);
