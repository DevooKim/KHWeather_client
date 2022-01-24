import React, { useContext } from "react";
import DailyInfo from "./DailyInfo";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Data } from "../weathers/WeatherData";

const useStyles = makeStyles((theme) => ({
  daily: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(10),
    paddingBottom: theme.spacing(3),
    borderRadius: 8,
    background: "rgba(245,245,245,0.125)",
  },
  dailyTitle: {
    textAlign: "center",
    fontSize: "2rem",
    fontWeight: 800,
    padding: 5,
    marginBottom: theme.spacing(3),
    background: theme.colors.daily.title,
    borderRadius: 8,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
}));

function Daily() {
  // const classes = useStyles();
  const classes = {};
  const data = useContext(Data);

  const { daily } = data;

  return (
    <Paper className={classes.daily} elevation={5}>
      <div className={classes.dailyTitle}>주간 날씨</div>
      {daily.map((day, index) => (
        <DailyInfo days={day} key={index} />
      ))}
    </Paper>
  );
}

export default Daily;
