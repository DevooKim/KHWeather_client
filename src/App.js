import React, { createContext, useCallback, useMemo, useState } from "react";
import Header from "./components/header/Header";
import Daily from "./components/daily/Daily";
import Forecast from "./components/forecast/Forecast";
import Footer from "./components/footer/Footer";
import WeatherData from "./components/weathers/WeatherData";

import { Box, Container, IconButton, CssBaseline } from "@material-ui/core";
import { Brightness7, Brightness4 } from "@material-ui/icons";
import {
  createMuiTheme,
  ThemeProvider,
  makeStyles,
} from "@material-ui/core/styles";
import { themeLight, themeDark, chartLight, chartDark } from "./materialTheme";
import "./theme/App.css";

const useStyles = makeStyles((theme) => ({
  address: {
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(1),
    justifyContent: "center",
    [theme.breakpoints.up("sm")]: {
      justifyContent: "space-between",
    },
  },
}));

const initialState = {
  region: "대전광역시 서구 둔산동",
  geo: { lat: 36.354687, lon: 127.420997 },
};

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [state, setState] = useState(initialState);
  const classes = useStyles();

  const theme = useMemo(
    () => createMuiTheme(darkMode ? themeDark : themeLight),
    [darkMode]
  );

  const chartTheme = useMemo(() => {
    return darkMode ? chartDark : chartLight;
  }, [darkMode]);

  const changeDarkMode = useCallback(() => {
    setDarkMode((prev) => !prev);
  }, []);

  const handleState = (value) => {
    return setState(value);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header setState={handleState}>
        <IconButton onClick={() => changeDarkMode} color="inherit">
          {darkMode ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Header>

      <Container maxWidth={"md"}>
        <WeatherData geo={state.geo}>
          <Box className={classes.address} borderBottom={1}>
            <p>{state.region}</p>
          </Box>
          <ChartTheme.Provider value={chartTheme}>
            <Forecast />
          </ChartTheme.Provider>
          <Daily />
        </WeatherData>
      </Container>

      <Footer />
    </ThemeProvider>
  );
}
export const ChartTheme = createContext(chartLight);
export default App;
