import axios from 'axios';
import { useQuery } from 'react-query';

const hostUrl = import.meta.env.VITE_HOST_URL;

const fetchWeather = async (coords) => {
    const { data } = await axios.get(
        `${hostUrl}/weather?lat=${coords.latitude}&lon=${coords.longitude}`
    );
    return data;
};

const useFetchWeather = ({ name, coords }) =>
    useQuery(name, () => fetchWeather(coords), { enabled: !!name, retry: 0 });

export default useFetchWeather;
