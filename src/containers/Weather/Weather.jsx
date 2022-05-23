import { Box } from '@mui/system';
import React from 'react';
import TodayCard from '../../components/TodayCard/TodayCard';
import WeatherChart from '../../components/WeatherChart';
import WeatherDaily from '../../components/WeatherDaily/WeatherDaily';
import { useLocationValueContext } from '../../contexts/locationContext';
import useFetchWeather from '../../hooks/useFetchWeather';
import useNavigator from '../../hooks/useNavigator';

const Weather = () => {
    const location = useLocationValueContext();
    const { data, isError, isFetching, isLoading } = useFetchWeather(location);
    const { loading } = useNavigator();

    const { weather, lastUpdate } = data || {};

    return (
        <>
            {isFetching || loading ? (
                'loading...'
            ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <TodayCard current={weather.current} yesterdays={weather.yesterdays} />
                    <WeatherChart
                        lastUpdate={lastUpdate}
                        yesterdays={weather.yesterdays}
                        todays={weather.todays}
                        tomorrows={weather.tomorrows}
                    />
                    <WeatherDaily daily={weather.daily} />
                </Box>
            )}
        </>
    );
};

export default Weather;
