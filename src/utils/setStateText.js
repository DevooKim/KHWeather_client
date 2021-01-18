const setStateText = (hour, yesterdayTemps, todayTemps) => {
  const hourIndex = setHourIndex(hour);
  const diffTemp = yesterdayTemps[hourIndex] - todayTemps[hourIndex];
  let stateText = "";

  if (diffTemp < 0) {
    stateText = `어제보다 ${Math.abs(diffTemp)}도 높습니다.`;
  } else if (diffTemp > 0) {
    stateText = `어제보다 ${Math.abs(diffTemp)}도 낮습니다.`;
  } else {
    stateText = `현재 기온은 어제와 동일합니다.`;
  }

  return stateText;
};

// export const getCurrentWeather = (hour, todays) => {
//   const hourIndex = setHourIndex(hour);
//   const current = {
//     dt: todays.dt[hourIndex],
//     temp: todays.temp[hourIndex],
//     feels_like: todays.feels_like[hourIndex],
//     humidity: todays.humidity[hourIndex],
//     clouds: todays.clouds[hourIndex],
//     visibility: todays.visibility[hourIndex],
//     rain: todays.rain[hourIndex],
//     snow: todays.snow[hourIndex],
//     weather: todays.weather[hourIndex],
//   };
//   return current;
// };

function setHourIndex(now) {
  return Math.ceil((now % 24) / 3) % 8;
}

export default setStateText;
