import getDate from "./getDate";
const parseForecasts = (days) => {
  const key = `${getDate(days[0].dt, "MONTH") + 1}월 ${getDate(
    days[0].dt,
    "DATE"
  )}일`;

  const data = {
    key,
    dt: [],
    temp: [],
    feels_like: [],
    humidity: [],
    clouds: [],
    visibility: [],
    rain: [],
    snow: [],
    pop: [],
    weather: [],
  };

  let counter = 0;
  days.forEach((day) => {
    data.dt.push([key, `${getDate(day.dt, "HOURS")}시`]);
    data.temp.push(day.temp);
    data.feels_like.push(day.feels_like);
    data.humidity.push(day.humidity);
    data.clouds.push(day.clouds);
    data.visibility.push(day.visibility);
    if (day.rain !== undefined) {
      data.rain.push(day.rain["1h"]);
    } else {
      data.rain.push(null);
    }
    if (day.snow !== undefined) {
      data.snow.push(day.snow["1h"]);
    } else {
      data.snow.push(null);
    }
    data.pop.push(day.pop);
    data.weather.push({ ...day.weather[0], key: counter++ }); //리팩토링 하면서 파싱하도록 변환
  });

  return data;
};

export default parseForecasts;
