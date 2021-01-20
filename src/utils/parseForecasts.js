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
    data.rain.push(day.rain);
    data.snow.push(day.snow);
    data.weather.push({ ...day.weather[0], key: counter++ });
  });

  return data;
};

export default parseForecasts;
