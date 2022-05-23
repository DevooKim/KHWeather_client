import React from 'react';
import { Paper, Stack } from '@mui/material';
import { Box, styled } from '@mui/system';
import { WiStrongWind, WiThermometer } from 'react-icons/wi';
import useMediaQuery from '@mui/material/useMediaQuery';

import WeatherCard from '../WeatherCard/WeatherCard';
import WeatherIcons from '../weathers/WeatherIcons';
import getWeatherCondition from '../../utils/getWeatherCondition';

const InfoBox = styled('div')({
    display: 'flex',
    flex: 1,
    justifyContent: 'flexStart',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    gap: '1rem'
});

const dateMap = {
    0: { short: '일', long: '일요일' },
    1: { short: '월', long: '월요일' },
    2: { short: '화', long: '화요일' },
    3: { short: '수', long: '수요일' },
    4: { short: '목', long: '목요일' },
    5: { short: '금', long: '금요일' },
    6: { short: '토', long: '토요일' }
};

const DailyHeader = () => (
    <Box
        sx={{
            textAlign: 'center',
            fontSize: '2rem',
            fontWeight: '800',
            p: 0.5,
            backgroundColor: 'pink',
            borderRadius: 2,
            borderBottom: 0
        }}
    >
        주간 날씨
    </Box>
);

const DayInfo = ({ day, compact }) => (
    <Paper
        elevation={5}
        sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            height: '4.5rem',
            px: compact ? 2.5 : 5,
            gap: compact ? 2.5 : 5
        }}
    >
        <InfoBox sx={{ textAlign: 'center', fontWeight: 700 }}>
            {compact ? dateMap[day.dt.weekday].short : dateMap[day.dt.weekday].long}
        </InfoBox>
        <InfoBox>
            <WeatherIcons weatherIcon={day.weather[0].icon} fontSize="40" />
            {!compact && getWeatherCondition({ condition: day.weather[0] })}
        </InfoBox>
        <InfoBox>
            {!compact && <WiStrongWind fontSize="40" />}
            {Math.round(day.wind_speed * 10) / 10}m/s
        </InfoBox>
        <InfoBox sx={{ width: '6.25rem', justifyContent: 'flex-start', gap: 1 }}>
            {!compact && (
                <Box sx={{ flexGrow: 1 }}>
                    <WiThermometer fontSize="40" sx={{ flexGrow: 1 }} />
                </Box>
            )}
            <Box sx={{ flexGrow: 1 }}>{day.temp.min}</Box>
            <Box sx={{ flexGrow: 1 }}>{day.temp.max}</Box>
        </InfoBox>
    </Paper>
);

const WeatherDaily = ({ daily }) => {
    const matches = useMediaQuery((theme) => theme.breakpoints.up('md'));

    return (
        <WeatherCard>
            <Box>
                <DailyHeader />
                <Stack
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="center"
                    spacing={1}
                    sx={{ p: matches ? 4 : 2 }}
                >
                    {daily.map((day) => (
                        <DayInfo key={day.dt.date} day={day} compact={!matches} />
                    ))}
                </Stack>
            </Box>
        </WeatherCard>
    );
};

export default WeatherDaily;
