import axios from 'axios';
import qs from 'qs';

const PAST_URL = import.meta.env.VITE_OPENWEATHER_TIMEMACHINE_URL;
const ONECALL_URL = import.meta.env.VITE_OPENWEATHER_ONECALL_URL;
const appid = import.meta.env.VITE_OPENWEATHER_APP_ID;

const fetchCurrentWeather = async ({ latitude, longitude }) => {
    const query = qs.stringify({
        lat: latitude,
        lon: longitude,
        exclude: 'minutely,alerts',
        appid
    });
    const { data } = await axios.get(`${ONECALL_URL}?${query}`);
    return data;
};

const fetchPastWeather = async ({ latitude, longitude, date }) => {
    const query = qs.stringify({ lat: latitude, lon: longitude, dt: date, appid });

    const { data } = await axios.get(`${PAST_URL}?${query}`);

    return data.hourly || [data.current];
};

export { fetchPastWeather, fetchCurrentWeather };
