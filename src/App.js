import React, { useCallback, useState } from "react";
import Header from "./components/header/Header";
import Daily from "./components/daily/Daily";
import Forecast from "./components/forecast/Forecast";
import Footer from "./components/footer/Footer";
import { AddressSearch, Coord2RegionCode } from "./utils/geoCoder";
import "./theme/App.css";
import { useTheme } from "./hooks/useTheme";
import { Box, Container } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { borders } from "@material-ui/system";
import { makeStyles } from "@material-ui/core/styles";
import { theme } from "./materialTheme";
import { CssBaseline } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  address: {
    display: "flex",
    alignItems: "center",
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
  const [themeMode, toggleTheme] = useTheme();
  const [state, setState] = useState(initialState);
  const classes = useStyles();

  const onChange = useCallback(async (e) => {
    console.log(e.target);
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

  const [darkMode, setDarkMode] = useState(false);

  const dartTest = () => {
    setDarkMode((prev) => !prev);
  };

  // const theme = React.useMemo(
  //   () =>
  //     createMuiTheme({
  //       overrides: {
  //         MuiCssBaseline: {
  //           "@global": {
  //             html: {
  //               WebkitFontSmoothing: "auto",
  //             },
  //             p: {
  //               fontWeight: 700,
  //             },
  //           },
  //         },
  //       },
  //       palette: {
  //         type: darkMode ? "dark" : "light",
  //         test: {
  //           main: "pink",
  //         },
  //       },
  //     }),
  //   [darkMode]
  // );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header
        input={state.input}
        onChange={onChange}
        onClick={onClick}
        address={state.address}
      />
      <Container maxWidth={"md"}>
        <Box className={classes.address} borderBottom={1}>
          <p>{state.region}</p>
        </Box>
        <Forecast geo={state.geo} />
        <Daily geo={state.geo} />
      </Container>
      <button onClick={dartTest}>다크모드</button>
      <Footer></Footer>
    </ThemeProvider>
  );
}

export default App;
