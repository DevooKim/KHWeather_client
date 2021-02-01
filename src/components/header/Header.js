import React from "react";
import styled from "styled-components";
import "../../theme/Header.css";

function Header(props) {
  return (
    // <div className="Header">
    <HeaderStyled className="Header">
      <div className="Header__content">
        <p>KHWeather</p>
        {props.children}
      </div>
    </HeaderStyled>
  );
}

const HeaderStyled = styled.div`
  background-color: ${(props) => props.theme.colors.header};
`;

export default Header;
