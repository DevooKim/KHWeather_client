import React from "react";
import stateText from "../../utils/stateText";
import WeatherIcons from "../weathers/WeatherIcons";
import weatherCondition from "../weathers/getWeatherCondition";
import { Box, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  chartHeader: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    marginTop: theme.spacing(2),
    background: theme.colors.info.bg,
    borderRadius: 8,
    marginBottom: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      marginTop: theme.spacing(4),
    },
  },
  currentState: {
    fontSize: "1.5rem",
    [theme.breakpoints.up("sm")]: {
      fontSize: "2.5rem",
    },
  },
  chartHeaderMiddle: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "2rem",
  },
  chartHeaderBottom: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1rem",
  },
}));

function ForecastInfo({ forecasts }) {
  const classes = useStyles();
  const { yesterdays, todays, current } = forecasts;
  const rain = current.rain ? current.rain["1h"] + "mm" : null;
  const snow = current.snow ? current.snow["1h"] + "mm" : null;
  return (
    <Paper className={classes.chartHeader} elevation={3}>
      <Box className={classes.currentState}>
        {stateText(current.dt.hours, {
          yesterdayTemps: yesterdays.temp,
          todayTemps: todays.temp,
        })}
      </Box>
      <Box className={classes.chartHeaderMiddle}>
        <WeatherIcons
          weatherIcon={current.weather[0].icon}
          classes="forecastIcon"
        />
        <Box>{current.temp}℃</Box>
      </Box>
      <Box className={classes.chartHeaderBottom}>
        <p>
          <weatherCondition
            condition={current.weather[0]}
            rain={rain}
            snow={snow}
          />
        </p>
        <p style={{ padding: "10px" }}>체감온도 {current.feels_like}℃</p>
      </Box>
    </Paper>
  );
}

export default ForecastInfo;
