import React from 'react';
import TodayCard from '../../components/TodayCard/TodayCard';
import { useLocationValueContext } from '../../contexts/locationContext';
import useFetchWeather from '../../hooks/useFetchWeather';
import useNavigator from '../../hooks/useNavigator';

const Weather = () => {
    const location = useLocationValueContext();
    const { data, isError, isFetching, isLoading } = useFetchWeather(location);
    const { loading } = useNavigator();

    const {weather} = data || {}
    return <>{isFetching || loading ? 'loading...' : <TodayCard current={weather.current} yesterdays={weather.yesterdays}/>}</>;
};

export default Weather;
