import WeatherID from "./getWeatherID";

const getWeatherCondition = ({ condition, amountOfRain }) => {
    switch (condition.main) {
        case 'Thunderstorm':
            return '뇌우';
        case 'Drizzle':
            return '이슬비';
        case 'Rain': {
            if (amountOfRain) {
                return `${WeatherID(condition.id)} ${amountOfRain}`;
            }
            return `${WeatherID(condition.id)}`;
        }
        case 'Snow':
            return '눈';
        case 'Clear':
            return '맑음';
        case 'Clouds':
            return '흐림';

        default:
            return `${WeatherID(condition.id)}`;
    }
};

export default getWeatherCondition