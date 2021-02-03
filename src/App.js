import React, { useCallback, useMemo, useState } from "react";
import Header from "./components/header/Header";
import Daily from "./components/daily/Daily";
import Forecast from "./components/forecast/Forecast";
import Footer from "./components/footer/Footer";
import { AddressSearch, Coord2RegionCode } from "./utils/geoCoder";
import "./theme/App.css";
import { Box, Container, IconButton } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import { themeLight, themeDark, chartLight, chartDark } from "./materialTheme";
import { CssBaseline } from "@material-ui/core";
import { Brightness7, Brightness4 } from "@material-ui/icons";

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
  input: "",
  region: "대전광역시 서구 둔산동",
  geo: { lat: 36.354687, lon: 127.420997 },
  address: [{ address_name: "" }],
};

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [state, setState] = useState(initialState);
  const classes = useStyles();

  const onChange = useCallback(async (e) => {
    console.log(e.target);
    //setState => useAsync useReducer로 변경
    try {
      setState((prev) => ({
        ...prev,
        input: e.target.value,
      }));
      if (e.target.value) {
        const getGeoArr = await AddressSearch(e.target.value);
        if (getGeoArr.length > 0) {
          setState((prev) => ({
            ...prev,
            address: [...getGeoArr],
          }));
        } else {
          setState((prev) => ({
            ...prev,
            address: [{ address_name: "검색 결과가 없습니다." }],
          }));
        }
      } else {
        setState((prev) => ({
          ...prev,
          address: [{ address_name: "" }],
        }));
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  const onClick = useCallback((value) => {
    const { address_name, coordinate } = value;
    if (coordinate.lat !== undefined && coordinate.lon !== undefined) {
      setState((prev) => ({
        ...prev,
        input: "",
        geo: { ...coordinate },
        region: address_name,
      }));
    }
  }, []);

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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header
        input={state.input}
        onChange={onChange}
        onClick={onClick}
        address={state.address}
      >
        <IconButton onClick={() => changeDarkMode()} color="inherit">
          {darkMode ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Header>

      <Container maxWidth={"md"}>
        <Box className={classes.address} borderBottom={1}>
          <p>{state.region}</p>
        </Box>
        <ChartTheme.Provider value={chartTheme}>
          <Forecast geo={state.geo} />
        </ChartTheme.Provider>
        <Daily geo={state.geo} />
      </Container>

      <Footer></Footer>
    </ThemeProvider>
  );
}
export const ChartTheme = React.createContext(chartLight);
export default App;
