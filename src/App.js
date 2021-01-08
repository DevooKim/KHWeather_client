import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import Header from "./components/header/Header";

const GlobalStyle = createGlobalStyle`
  html {
    font-size: 10px;
  }
  body {
    width: 70%;
    min-width: 100rem;
    margin: 0 auto;
    overflow-x: hidden;
  }
  @media (max-width: 30em) {
    body{
      width: 100%;
      min-width: 0;
    }
  }
  `;

function App() {
  return (
    <>
      <GlobalStyle />
      <Header />
    </>
  );
}

export default App;
