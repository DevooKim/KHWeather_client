import React, { useEffect, useState } from "react";
import Chart from "./Chart";
import useAsync from "../../hooks/useAsync";
import getForecasts from "../../utils/getForecasts";
import ForecastInfo from "./ForecastInfo";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  loading: {
    height: "100vh",
    textAlign: "center",
    marginTop: "30vh",
    color: theme.colors.global.loading,
  },
}));
function Forecast({ geo, theme }) {
  const classes = useStyles();
  const [state, refetch] = useAsync(() => getForecasts(geo), [geo]);
  const { loading, data, error } = state;

  if (loading)
    return (
      <div className={classes.loading}>
        <CircularProgress color="inherit" />
      </div>
    );
  if (error) {
    console.log(error);
    return <h1 style={{ textAlign: "center" }}>에러 발생</h1>;
  }
  if (!data) return null;

  const { yesterdays, todays, tomorrows, current, lastUpdate } = data;

  return (
    <>
      <Paper elevation={5}>
        <ForecastInfo forecasts={{ yesterdays, todays, current }} />
        <Box borderBottom={1}></Box>
        <Chart
          forecasts={{ yesterdays, todays, tomorrows, lastUpdate }}
          theme={theme}
        />
      </Paper>
    </>
  );
}

export default React.memo(Forecast);
