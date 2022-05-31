import React, { useState, useCallback, useEffect } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Paper, Box, Typography, CircularProgress, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import Brightness7 from '@mui/icons-material/Brightness7';
import Brightness4 from '@mui/icons-material/Brightness4';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/Cancel';

import AddressInput from '../../containers/AddressInput';
import useNavigator from '../../hooks/useNavigator';
import useToggle from '../../hooks/useToggle';

const Wrapper = styled(Paper)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.8rem 4rem',
    height: '4.25rem',

    [theme.breakpoints.down('md')]: {
        padding: '0.8rem 1.5rem',
        gap: '1rem'
    }
}));

const Title = ({ matches }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const toggleTheme = useCallback(() => setIsDarkMode((prev) => !prev), []);
    return (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
            {matches ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="h4">KHWeather</Typography>
                    <IconButton onClick={toggleTheme}>
                        {isDarkMode ? <Brightness4 /> : <Brightness7 />}
                    </IconButton>
                </Box>
            ) : (
                <>
                    <IconButton onClick={toggleTheme}>
                        {isDarkMode ? <Brightness4 /> : <Brightness7 />}
                    </IconButton>
                    <Typography variant="h4">KHWeather</Typography>
                </>
            )}
        </>
    );
};

const SearchBar = () => {
    const { loading, executeNavigator } = useNavigator({ isManual: true });
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',

                width: {
                    xs: '100%',
                    md: '20rem'
                }
            }}
        >
            {loading ? (
                <CircularProgress />
            ) : (
                <IconButton onClick={executeNavigator}>
                    <GpsFixedIcon />
                </IconButton>
            )}
            <AddressInput />
        </Box>
    );
};

const Header = () => {
    const matches = useMediaQuery((theme) => theme.breakpoints.up('md'));
    const [showSearchBar, toggleSearchBar, , setFalse] = useToggle(false);

    useEffect(() => {
        setFalse();
    }, [matches]);

    return (
        <Wrapper elevation={3}>
            {matches ? (
                <>
                    <Title matches={matches} />
                    <SearchBar />
                </>
            ) : (
                // eslint-disable-next-line react/jsx-no-useless-fragment
                <>
                    {showSearchBar ? (
                        <Box
                            sx={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <SearchBar />
                            <IconButton onClick={toggleSearchBar}>
                                <CancelIcon />
                            </IconButton>
                        </Box>
                    ) : (
                        <>
                            <Title matches={matches} />
                            <IconButton onClick={toggleSearchBar}>
                                <SearchIcon />
                            </IconButton>
                        </>
                    )}
                </>
            )}
        </Wrapper>
    );
};

export default Header;
