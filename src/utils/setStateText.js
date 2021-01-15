const setStateText = (hour, yesterdayTemps, todayTemps) => {
  const hourIndex = setHourIndex(hour);
  const diffTemp = yesterdayTemps[hourIndex] - todayTemps[hourIndex];
  let stateText = "";

  if (diffTemp < 0) {
    stateText = `현재 기온은 어제보다 ${Math.abs(diffTemp)}도 높습니다.`;
  } else if (diffTemp > 0) {
    stateText = `현재 기온은 어제보다 ${Math.abs(diffTemp)}도 낮습니다.`;
  } else {
    stateText = `현재 기온은 어제와 동일합니다.`;
  }

  return stateText;
};

function setHourIndex(now) {
  return Math.ceil((now % 24) / 3) % 8;
}

export default setStateText;
