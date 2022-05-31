import React from 'react';
import { IconButton } from '@mui/material';
import { Box } from '@mui/system';
import GitHubIcon from '@mui/icons-material/GitHub';

const Footer = () => (
    <Box
        sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            width: '100%',
            backgroundColor: 'lightblue',
            borderTop: '1px solid black'
        }}
    >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <p>DevooKim</p>
            <IconButton onClick={() => window.open('https://github.com/DevooKim/KHWeather_client')}>
                <GitHubIcon />
            </IconButton>
        </Box>
    </Box>
);

export default Footer;
