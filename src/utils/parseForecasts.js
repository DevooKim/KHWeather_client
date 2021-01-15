const parseForecasts = (days) => {
  const key = `${getDate(days[0].dt, "MONTH") + 1}월 ${getDate(
    days[0].dt,
    "DATE"
  )}일`;
  const dt = [];
  const temp = [];

  days.forEach((day) => {
    dt.push([key, `${getDate(day.dt, "HOURS")}시`]);
    temp.push(day.temp);
  });

  return { key, dt, temp };
};

const getDate = (day, action) => {
  const date = new Date(day);
  switch (action) {
    case "MONTH":
      return date.getMonth();
    case "DATE":
      return date.getDate();
    case "HOURS":
      return date.getHours();
    default:
      throw new Error`Unhandled ${action}`();
  }
};

export default parseForecasts;
