import React, { createContext } from "react";
import useAsync from "../../hooks/useAsync";
import getForecasts from "../../utils/getForecasts";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  loading: {
    height: "100vh",
    textAlign: "center",
    marginTop: "30vh",
    background: theme.palette.background.default,
  },
  info: {
    borderRadius: 8,
  },
}));

function WeatherData({ geo, children }) {
  const classes = useStyles();
  const [state, refetch] = useAsync(() => getForecasts(geo), [geo]);
  const { loading, data, error } = state;

  if (loading)
    return (
      <div className={classes.loading}>
        <CircularProgress color="inherit" />
      </div>
    );
  if (error || !data) {
    return <h1 style={{ textAlign: "center" }}>에러 발생</h1>;
  }

  return <Data.Provider value={data}>{children}</Data.Provider>;
}

export const Data = createContext();

export default WeatherData;
