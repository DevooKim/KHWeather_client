import React, { useState } from "react";
import styled from "styled-components";
import useAsync from "../../hooks/useAsync";
import DayInfo from "./DayInfo";
import getForecasts from "../../utils/getForecasts";
import "../../theme/Daily.css";

function Daily({ geo, theme }) {
  // const [geo, setGeo] = useState({ lat: 36.354687, lon: 127.420997 });
  const [state, refetch] = useAsync(() => getForecasts(geo), [geo]);
  const { loading, data, error } = state;

  if (loading) return null;
  if (error) return null;
  if (!data) return null;

  const { daily } = data;

  return (
    <div className="daily">
      {/* <div className="daily__title">주간 날씨</div> */}
      <DailyTitle className="daily__title">주간 날씨</DailyTitle>
      {daily.map((day) => (
        <DayInfo days={day} key={day.dt} theme={theme} />
      ))}
    </div>
  );
}

const DailyTitle = styled.div`
  background-color: ${(props) => props.theme.dailyColor.title};
`;

export default Daily;
