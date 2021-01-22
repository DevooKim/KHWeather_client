import React from "react";
import Header from "./components/header/Header";
import Daily from "./components/daily/Daily";
import Forecast from "./components/forecast/Forecast";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <>
      <Header />
      <div style={{ width: "50%", margin: "0 auto" }}>
        <Forecast></Forecast>
        <Daily />
      </div>
      <Footer></Footer>
    </>
  );
}

export default App;
