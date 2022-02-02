import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';

const WeatherCard = ({ children, sx }) => (
    <Paper
        elevation={3}
        sx={sx}
    >
        {children}
    </Paper>
);

WeatherCard.propTypes = {
    children: PropTypes.node.isRequired
};

export default WeatherCard;
