import React from "react";
import styled from "styled-components";
import "../../theme/Header.css";

function Header() {
  return (
    // <div className="Header">
    <HeaderStyled className="Header">
      <h1>KHWeather</h1>
      {/* </div> */}
    </HeaderStyled>
  );
}

const HeaderStyled = styled.div`
  background-color: ${(props) => props.theme.colors.header};
`;

export default Header;
