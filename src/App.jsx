import React, { createContext, useMemo, useState } from 'react';
import Daily from './components/daily/Daily';
import Forecast from './components/forecast/Forecast';
import Footer from './components/footer/Footer';
import WeatherData from './components/weathers/WeatherData';

import { Box, Container, CssBaseline } from '@mui/material';
import { themeLight, themeDark, chartLight, chartDark } from './theme/theme.js';
import './theme/App.css';

import { createTheme, ThemeProvider } from '@mui/material/styles';

export const ColorModeContext = createContext();
export const ChartTheme = createContext(chartLight);

const initialState = {
    region: '대전광역시 서구 둔산동',
    geo: { lat: 36.354687, lon: 127.420997 }
};

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
    NavLink,
    useSearchParams
} from 'react-router-dom';
import Header from './components/Header';
import { GeoContext } from './contexts/geoContext';
const getDesignTokens = (mode) => (mode === 'light' ? themeLight : themeDark);
const getChartTheme = (mode) => (mode === 'light' ? chartLight : chartDark);

function App() {
    const [mode, setMode] = useState('light');
    const [state, setState] = useState(initialState);

    const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
    const chartTheme = useMemo(() => getChartTheme(mode), [mode]);

    const colorMode = useMemo(
        () => ({
            // The dark mode switch would invoke this method
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            }
        }),
        []
    );

    const handleState = (value) => {
        return setState(value);
    };

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <GeoContext>
                    <Header />
                    <Router>
                        <Routes>
                            <Route
                                path=""
                                element={
                                    <>
                                        <Container maxWidth={'md'}>
                                            <WeatherData geo={state.geo}>
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: {
                                                            xs: 'center',
                                                            sm: 'space-between'
                                                        },
                                                        mt: 1
                                                    }}
                                                >
                                                    {state.region}
                                                </Box>
                                                <ChartTheme.Provider value={chartTheme}>
                                                    <Forecast />
                                                </ChartTheme.Provider>
                                                <Daily />
                                            </WeatherData>
                                        </Container>

                                        <Footer />
                                    </>
                                }
                            />
                        </Routes>
                    </Router>
                </GeoContext>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}
export default App;
