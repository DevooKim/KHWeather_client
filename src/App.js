import React, { useState } from "react";
import Header from "./components/header/Header";
import Daily from "./components/daily/Daily";
import Forecast from "./components/forecast/Forecast";
import Footer from "./components/footer/Footer";
import Address from "./components/forecast/Address";
import { AddressSearch, Coord2RegionCode } from "./utils/geoCoder";
import "./theme/App.css";

function App() {
  const [address, setAddress] = useState("");
  const [region, setRegion] = useState("대전광역시 서구 둔산동");
  const [geo, setGeo] = useState({ lat: 36.354687, lon: 127.420997 });
  const [overlay, setOverlay] = useState(false);
  const onChange = (e) => {
    setAddress(e.target.value);
    if (e.target.value) {
      setOverlay(true);
    } else {
      setOverlay(false);
    }
  };

  const onCoder = async () => {
    try {
      const getGeo = await AddressSearch(address, setGeo);
      const getRegion = await Coord2RegionCode(getGeo);
      setGeo({ ...getGeo });
      setRegion(getRegion);
      setAddress("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header />
      <div style={{ width: "50%", margin: "0 auto" }}>
        <div className="address">
          <p>{region}</p>
          <Address
            address={address}
            onChange={onChange}
            onCoder={onCoder}
            overlay={overlay}
          />
        </div>
        <Forecast geo={geo} region={region} />
        <Daily geo={geo} />
      </div>
      <Footer></Footer>
    </>
  );
}

export default App;
