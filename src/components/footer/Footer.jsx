import React from 'react';
import { IconButton } from '@mui/material';
import { Box } from '@mui/system';
import GitHubIcon from '@mui/icons-material/GitHub';
import OpenWeatherLogo from './asset/OpenWeather.png'

const Footer = () => (
    <Box
        sx={{
            position: 'fixed',
            bottom: 0,

            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            width: '100%',
            height: '2rem',
            backgroundColor: 'lightblue'
        }}
    >
        <Box sx={{display: 'flex', alignItems: 'center'}}>
            <p>DevooKim</p>
            <IconButton
                onClick={() => window.open('https://github.com/DevooKim-project/KHWproject_front')}
            >
                <GitHubIcon />
            </IconButton>
        </Box>
        <Box sx={{display: 'flex', alignItems: 'center'}}>
            <p>날씨제공</p>
            <IconButton onClick={() => window.open('https://openweathermap.org/')}>
                <img
                    src={OpenWeatherLogo}
                    alt="openWeather"
                    loading="lazy"
                    style={{height: '3.5rem', marginLeft: '-1rem', marginRight: '-1rem'}}
                />
            </IconButton>
        </Box>
    </Box>
);

export default Footer;
