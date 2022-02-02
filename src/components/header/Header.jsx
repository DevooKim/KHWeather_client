import React, { useState, useCallback } from 'react';
import { Paper, Box, Typography, CircularProgress } from '@mui/material';
import { IconButton } from '@material-ui/core';
import Brightness7 from '@mui/icons-material/Brightness7';
import Brightness4 from '@mui/icons-material/Brightness4';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';

import AddressInput from '../../containers/AddressInput';
import useNavigator from '../../hooks/useNavigator';

let render = 0;
const NewHeader = () => {
    const { loading, executeNavigator } = useNavigator({ isManual: true });
    const [isDarkMode, setIsDarkMode] = useState(false);
    const onClick = useCallback(() => setIsDarkMode((prev) => !prev), []);
    render += 1;
    console.log('render');
    return (
        <Paper
            elevation={3}
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                px: '4rem',
                py: '0.25rem'
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="h4">KHWeather</Typography>
                <IconButton onClick={onClick}>
                    {isDarkMode ? <Brightness4 /> : <Brightness7 />}
                </IconButton>
                render: {render}
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {loading ? (
                    <CircularProgress />
                ) : (
                    <IconButton onClick={executeNavigator}>
                        <GpsFixedIcon />
                    </IconButton>
                )}
                <AddressInput />
            </Box>
        </Paper>
    );
};

export default NewHeader;
