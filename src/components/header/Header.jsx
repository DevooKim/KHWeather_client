import React, { useState, useCallback } from 'react';
import { Paper, Box, Typography } from '@mui/material';
import { IconButton } from '@material-ui/core';
import Brightness7 from '@mui/icons-material/Brightness7';
import Brightness4 from '@mui/icons-material/Brightness4';

import AddressInput from '../../containers/AddressInput';

const NewHeader = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const onClick = useCallback(() => setIsDarkMode((prev) => !prev), []);

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
            </Box>
            <AddressInput />
        </Paper>
    );
};

export default NewHeader;
