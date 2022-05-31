import dayjs from 'dayjs';

import { useQuery } from 'react-query';
import { fetchCurrentWeather, fetchPastWeather } from '../apis/fetchWeather';
import { filterData, parseToCombineArray } from '../utils/weather';

const getPastWeather = async (date, coords) => {
    const today = date.unix();
    const yesterday = date.subtract(1, 'day').unix();
    const twoDayAgo = date.subtract(2, 'day').unix();

    const fetchUtilYesterDayWeather = async () => {
        let data = await fetchPastWeather({ ...coords, date: yesterday });
        if (date.hour() >= 9) {
            const twoDayAgoData = await fetchPastWeather({ ...coords, date: twoDayAgo });
            data = [...twoDayAgoData, ...data];
        }
        return data;
    };

    const [untilTodayPastWeather, untilYesterdayPastWeather] = await Promise.all([
        fetchPastWeather({ ...coords, date: today }),
        fetchUtilYesterDayWeather()
    ]);

    return { untilTodayPastWeather, untilYesterdayPastWeather };
};

const getCurrentWeather = async (coords) => fetchCurrentWeather(coords);

const fetchWeather = async (coords) => {
    const date = dayjs();
    const offset = 3 - (date.hour() % 3);

    const [pastWeather, currentWeather] = await Promise.all([
        getPastWeather(date, coords),
        getCurrentWeather(coords)
    ]);

    const { untilTodayPastWeather, untilYesterdayPastWeather } = pastWeather;
    const { current, hourly, daily } = currentWeather;

    const weathers = {
        untilYesterdayPastData: filterData(untilYesterdayPastWeather),
        untilTodayPastData: filterData(untilTodayPastWeather),
        hourlyData: filterData(hourly, offset),
        dailyData: filterData(daily, 0, 1),
        currentData: filterData([current])[0]
    };

    const paredWeather = parseToCombineArray(weathers);

    return { weather: paredWeather, lastUpdate: date };
};

const useFetchWeather = ({ name, coords }) =>
    useQuery(name, () => fetchWeather(coords), { enabled: !!name, retry: 0 });

export default useFetchWeather;
