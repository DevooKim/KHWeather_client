import WeatherID from "./WeatherID";

function WeatherCondition({ condition, rain, snow }) {
  switch (condition.main) {
    case "Thunderstorm":
      return "뇌우";
    case "Drizzle":
      return "이슬비";
    case "Rain":
      if (rain) {
        return `${WeatherID(condition.id)} ${rain}`;
      } else {
        return `${WeatherID(condition.id)}`;
      }
    case "Snow":
      return "눈";
    case "Clear":
      return "맑음";
    case "Clouds":
      return "흐림";

    default:
      return `${WeatherID(condition.id)}`;
  }
}

export default WeatherCondition;
