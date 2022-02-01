import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Paper, Box } from '@mui/material';

import WeatherIcons from '../weathers/WeatherIcons';
import WeatherID from '../weathers/getWeatherID';
import getHourIndex from '../../utils/getHourIndex';

const setDiffTempComment = (past, current) => {
    const diff = past - current;
    if (diff < 0) {
        return `어제보다 ${Math.abs(diff)}도 높습니다.`;
    }
    if (diff > 0) {
        return `어제보다 ${Math.abs(diff)}도 낮습니다.`;
    }

    return `현재 기온은 어제와 동일합니다.`;
};

const setWeatherCondition = ({ condition, amountOfRain }) => {
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

const TodayCard = ({ current, yesterdays }) => {
    const hourIndex = useMemo(() => getHourIndex(new Date(current.dt.date).getHours()), []);
    const diffTempComment = useMemo(
        () => setDiffTempComment(yesterdays[hourIndex].temp, current.temp),
        []
    );
    const weatherCondition = useMemo(
        () =>
            setWeatherCondition({
                condition: current.weather[0],
                amountOfRain: current.rain && `${current.rain['1h']}mm`
            }),
        []
    );

    return (
        <Paper
            elevation={3}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                py: '0.5rem'
            }}
        >
            <Box sx={{ fontSize: '2.5rem' }}>{diffTempComment}</Box>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <WeatherIcons weatherIcon={current.weather[0].icon} fontSize="7rem" />
                <Box sx={{ fontSize: '2rem' }}>{current.temp}℃</Box>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '1rem'
                }}
            >
                <p>{weatherCondition}</p>
                <p>체감온도: {current.feels_like}℃</p>
            </Box>
        </Paper>
    );
};

TodayCard.propTypes = {
    current: PropTypes.shape({
        dt: PropTypes.shape({ date: PropTypes.string.isRequired }),
        temp: PropTypes.number.isRequired,
        weather: PropTypes.arrayOf(PropTypes.shape({main: PropTypes.string.isRequired, id: PropTypes.number.isRequired})),
        rain: PropTypes.oneOfType([PropTypes.oneOf([undefined]), PropTypes.array]),
        feels_like: PropTypes.number.isRequired
    }).isRequired,
    yesterdays: PropTypes.arrayOf(PropTypes.shape({temp: PropTypes.number.isRequired})).isRequired
};

export default TodayCard;
