import React from "react";
import styled from "styled-components";

const StyledHeader = styled.div`
  width: 100%;
  height: 5rem;
  background: black;
  color: white;
`;

function Header() {
  return <StyledHeader>Header</StyledHeader>;
}

export default Header;
