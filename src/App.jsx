import React, { createContext, useMemo, useState } from "react";
import Header from "./components/header/Header";
import Daily from "./components/daily/Daily";
import Forecast from "./components/forecast/Forecast";
import Footer from "./components/footer/Footer";
import WeatherData from "./components/weathers/WeatherData";

import Brightness7 from "@mui/icons-material/Brightness7";
import Brightness4 from "@mui/icons-material/Brightness4";
import { Box, Container, IconButton, CssBaseline } from "@mui/material";
import { themeLight, themeDark, chartLight, chartDark } from "./theme/theme.js";
import "./theme/App.css";

import { createTheme, ThemeProvider } from "@mui/material/styles";

export const ColorModeContext = createContext();
export const ChartTheme = createContext(chartLight);

const initialState = {
  region: "대전광역시 서구 둔산동",
  geo: { lat: 36.354687, lon: 127.420997 },
};

const getDesignTokens = (mode) => (mode === "light" ? themeLight : themeDark);
const getChartTheme = (mode) => (mode === "light" ? chartLight : chartDark);

function App() {
  const [mode, setMode] = useState("light");
  const [state, setState] = useState(initialState);

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  const chartTheme = useMemo(() => getChartTheme(mode), [mode]);

  const colorMode = useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
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
        <Header setState={handleState}>
          <IconButton onClick={() => colorMode.toggleColorMode()} color="inherit">
            {mode === "light" ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Header>

        <Container maxWidth={"md"}>
          <WeatherData geo={state.geo}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: { xs: "center", sm: "space-between" },
                mt: 1,
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
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
export default App;