import React, { useMemo } from 'react';
import { Paper, Box, Typography } from '@mui/material';
import WeatherIcons from '../weathers/WeatherIcons';
import WeatherCondition from '../weathers/getWeatherCondition';
import WeatherID from '../weathers/getWeatherID';
import { WiDayCloudy } from 'react-icons/wi';

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

const setWeatherCondition = ({ condition, mountOfRain }) => {
    switch (condition.main) {
        case 'Thunderstorm':
            return '뇌우';
        case 'Drizzle':
            return '이슬비';
        case 'Rain':
            if (mountOfRain) {
                return `${WeatherID(condition.id)} ${mountOfRain}`;
            } else {
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

const PAST = 10;
const CURRENT = 20;
const FEELINGTEMP = 15;
const TodayCard = () => {
    const diffTempComment = useMemo(() => setDiffTempComment(PAST, CURRENT), []);
    const weatherConditionm = useMemo(() =>
        setWeatherCondition({ condition: { main: 'Rain', id: 500 }, mountOfRain: '2mm' })
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
                    justifyContent: 'center',
                }}
            >
                <WeatherIcons weatherIcon="01n" fontSize="7rem" />
                <Box sx={{ fontSize: '2rem' }}>{CURRENT}℃</Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
                <p>{weatherConditionm}</p>
                <p>체감온도: {FEELINGTEMP}℃</p>
            </Box>
        </Paper>
    );
};

export default TodayCard;
