import React from 'react';
import { Paper, Stack } from '@mui/material';
import { Box, styled } from '@mui/system';
import { WiStrongWind, WiThermometer } from 'react-icons/wi';

import WeatherCard from '../WeatherCard/WeatherCard';
import WeatherIcons from '../weathers/WeatherIcons';
import getWeatherCondition from '../../utils/getWeatherCondition';

const InfoBox = styled('div')({
    display: 'flex',
    justifyContent: 'center',
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

const Header = () => (
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

const DayInfo = ({ day }) => (
    <Paper
        elevation={5}
        sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            // border: '1px solid black',
            width: '100%',
            height: '4.5rem',
            px: 5,
            gap: 5
        }}
    >
        <InfoBox sx={{ textAlign: 'center', fontWeight: 700 }}>{dateMap[day.dt.weekday].long}</InfoBox>
        <InfoBox>
            <WeatherIcons weatherIcon={day.weather[0].icon} fontSize="40" />
            {getWeatherCondition({ condition: day.weather[0] })}
        </InfoBox>
        <InfoBox>
            <WiStrongWind fontSize="40" />
            {day.wind_speed}m/s
        </InfoBox>
        <InfoBox sx={{ width: '6.25rem', justifyContent: 'flex-start', gap: 1 }}>
            <Box sx={{ flexGrow: 1 }}>
                <WiThermometer fontSize="40" sx={{ flexGrow: 1 }} />
            </Box>
            <Box sx={{ flexGrow: 1 }}>{day.temp.min}</Box>
            <Box sx={{ flexGrow: 1 }}>{day.temp.max}</Box>
        </InfoBox>
    </Paper>
);

const WeatherDaily = ({ daily }) => (
    <WeatherCard>
        <Box>
            <Header />
            <Stack
                direction="column"
                justifyContent="flex-start"
                alignItems="center"
                spacing={1}
                sx={{ p: 4 }}
            >
                {daily.map((day) => (
                    <DayInfo key={day.dt.date} day={day} />
                ))}
            </Stack>
        </Box>
    </WeatherCard>
);

export default WeatherDaily;
