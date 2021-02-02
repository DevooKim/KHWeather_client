import React, { useState } from "react";
import styled from "styled-components";
import useAsync from "../../hooks/useAsync";
import DailyInfo from "./DailyInfo";
import getForecasts from "../../utils/getForecasts";
import "../../theme/Daily.css";
import { Box, Container, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  daily: {
    marginTop: theme.spacing(10),
    paddingBottom: theme.spacing(3),
  },
  dailyTitle: {
    textAlign: "center",
    fontSize: "2rem",
    fontWeight: 800,
    padding: 5,
    marginBottom: theme.spacing(3),
  },
}));

function Daily({ geo, theme }) {
  const classes = useStyles();
  // const [geo, setGeo] = useState({ lat: 36.354687, lon: 127.420997 });
  const [state, refetch] = useAsync(() => getForecasts(geo), [geo]);
  const { loading, data, error } = state;

  if (loading) return null;
  if (error) return null;
  if (!data) return null;

  const { daily } = data;

  return (
    <Paper className={classes.daily} elevation={3}>
      {/* <div className="daily__title">주간 날씨</div> */}
      <DailyTitle className={classes.dailyTitle}>주간 날씨</DailyTitle>
      {daily.map((day) => (
        <DailyInfo days={day} key={day.dt} />
      ))}
    </Paper>
  );
}

const DailyTitle = styled.div`
  background-color: ${(props) => props.theme.dailyColor.title};
`;

export default Daily;
