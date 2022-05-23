import React, { createContext, useMemo, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { Container, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Footer from './components/Footer';
import Header from './components/Header';
import { LocationContext } from './contexts/locationContext';
import Weather from './containers/Weather/Weather';
import { themeLight, themeDark, chartLight, chartDark } from './theme/theme.js';
import './theme/App.css';

export const ColorModeContext = createContext();
export const ChartTheme = createContext(chartLight);

const getDesignTokens = (mode) => (mode === 'light' ? themeLight : themeDark);

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false
        }
    }
});
function App() {
    const [mode, setMode] = useState('light');

    const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

    const colorMode = useMemo(
        () => ({
            // The dark mode switch would invoke this method
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            }
        }),
        []
    );

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <LocationContext>
                    <Header />
                    <Container maxWidth="lg" sx={{ pt: '2rem', pb: '3rem' }}>
                        <QueryClientProvider client={queryClient}>
                            <Weather />
                        </QueryClientProvider>
                    </Container>
                    <Footer />
                </LocationContext>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}
export default App;
