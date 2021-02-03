import React from "react";
import useAsync from "../../hooks/useAsync";
import DailyInfo from "./DailyInfo";
import getForecasts from "../../utils/getForecasts";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  daily: {
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(3),
    marginBottom: theme.spacing(10),
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

function Daily({ geo }) {
  const classes = useStyles();
  const [state, refetch] = useAsync(() => getForecasts(geo), [geo]);
  const { loading, data, error } = state;

  if (loading) return null;
  if (error) return null;
  if (!data) return null;

  const { daily } = data;

  return (
    <Paper className={classes.daily} elevation={5}>
      <div className={classes.dailyTitle}>주간 날씨</div>
      {daily.map((day) => (
        <DailyInfo days={day} key={day.dt} />
      ))}
    </Paper>
  );
}

export default Daily;
