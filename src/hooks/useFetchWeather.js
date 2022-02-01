import axios from 'axios';
import { useQuery } from 'react-query';

// const hostUrl = import.meta.env.VITE_HOST_URL;
const hostUrl = 'http://localhost:8001'

const fetchWeather = async (coords) => {
    console.log('fetch')
    const { data } = await axios.get(`${hostUrl}/weather?lat=${coords.latitude}&lon=${coords.longitude}`);
    return data;
};

const useFetchWeather = ({ name, coords }) => useQuery(name, () => fetchWeather(coords), {enabled: !!(name), retry: 0});

export default useFetchWeather;
