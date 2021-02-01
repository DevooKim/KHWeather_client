import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import Header from "./components/header/Header";
import Daily from "./components/daily/Daily";
import Forecast from "./components/forecast/Forecast";
import Footer from "./components/footer/Footer";
import Address from "./components/forecast/Address";
import { AddressSearch, Coord2RegionCode } from "./utils/geoCoder";
import "./theme/App.css";
import { light, dark } from "./Theme.js";
import { useTheme } from "./hooks/useTheme";

function App() {
  const [themeMode, toggleTheme] = useTheme();
  const theme = themeMode === "light" ? light : dark;

  const [input, setInput] = useState("");
  const [region, setRegion] = useState("대전광역시 서구 둔산동");
  const [geo, setGeo] = useState({ lat: 36.354687, lon: 127.420997 });
  const [overlay, setOverlay] = useState(false);
  const [address, setAddress] = useState([{ address_name: "" }]);

  const onChange = async (e) => {
    try {
      setInput(e.target.value);
      if (e.target.value) {
        const getGeoArr = await AddressSearch(e.target.value);
        if (getGeoArr.length > 0) {
          setAddress([...getGeoArr]);
        } else {
          setAddress([{ address_name: "검색 결과가 없습니다" }]);
        }
        setOverlay(true);
      } else {
        setAddress([{ address_name: "" }]);
        setOverlay(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onClick = (value) => {
    return () => {
      const { address_name, coordinate } = value;
      console.log(value);
      if (coordinate.lat !== undefined && coordinate.lon !== undefined) {
        setInput("");
        setOverlay(false);
        setGeo({ ...coordinate });
        setRegion(address_name);
      }
    };
  };

  // const onSubmit = async () => {
  //   try {
  //     const getRegion = await Coord2RegionCode(geo);
  //     setRegion(getRegion);
  //     setInput("");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyled>
        <Header>
          <Button onClick={toggleTheme}>다크모드</Button>
        </Header>
        <ContentStyled>
          <div className="address">
            <p>{region}</p>
            <Address
              input={input}
              onChange={onChange}
              // onSubmit={onSubmit}
              onClick={onClick}
              overlay={overlay}
              address={address}
            />
          </div>
          <Forecast geo={geo} theme={theme} />
          <Daily geo={geo} theme={theme} />
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
