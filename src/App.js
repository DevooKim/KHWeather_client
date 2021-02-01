import React, { useCallback, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import Header from "./components/header/HeaderMaterial";
import Daily from "./components/daily/Daily";
import Forecast from "./components/forecast/Forecast";
import Footer from "./components/footer/Footer";
// import Address from "./components/forecast/Address";
import { AddressSearch, Coord2RegionCode } from "./utils/geoCoder";
import "./theme/App.css";
import { light, dark } from "./Theme.js";
import { useTheme } from "./hooks/useTheme";

const initialState = {
  input: "",
  region: "대전광역시 서구 둔산동",
  geo: { lat: 36.354687, lon: 127.420997 },
  address: [{ address_name: "" }],
};
function App() {
  const [themeMode, toggleTheme] = useTheme();
  const theme = themeMode === "light" ? light : dark;
  const [state, setState] = useState(initialState);

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

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyled>
        <Header
          input={state.input}
          onChange={onChange}
          onClick={onClick}
          address={state.address}
        />
        <ContentStyled>
          <div className="address">
            <p>{state.region}</p>
          </div>
          <Forecast geo={state.geo} theme={theme} />
          <Daily geo={state.geo} theme={theme} />
        </ContentStyled>
        <Footer></Footer>
      </GlobalStyled>
    </ThemeProvider>
  );
}

const GlobalStyled = styled.div`
  background-color: ${(props) => props.theme.colors.bgColor};
  color: ${(props) => props.theme.colors.color};
`;

const ContentStyled = styled.div`
  width: 50%;
  margin: 0 auto;
`;

const Button = styled.button`
  border-radius: 0;
  font-size: 1rem;
`;

export default App;
