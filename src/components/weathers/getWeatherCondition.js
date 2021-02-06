import weatherID from "./getWeatherID";

function weatherCondition({ condition, rain, snow }) {
  switch (condition.main) {
    case "Thunderstorm":
      return "뇌우";
    case "Drizzle":
      return "이슬비";
    case "Rain":
      if (rain) {
        return `${weatherID(condition.id)} ${rain}`;
      } else {
        return `${weatherID(condition.id)}`;
      }
    case "Snow":
      return "눈";
    case "Clear":
      return "맑음";
    case "Clouds":
      return "흐림";

    default:
      return `${weatherID(condition.id)}`;
  }
}

export default weatherCondition;
