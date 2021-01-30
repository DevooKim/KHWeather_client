import React from "react";
import styled from "styled-components";
import "./footer.css";

function Footer() {
  return (
    <>
      <FooterStyled className="footer">FOOTER</FooterStyled>
    </>
  );
}

const FooterStyled = styled.div`
  background-color: ${(props) => props.theme.colors.footerColor};
`;

export default Footer;
