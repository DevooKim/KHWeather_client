import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import GitHubIcon from "@material-ui/icons/GitHub";

const useStyles = makeStyles((theme) => ({
  footer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    position: "fixed",
    bottom: 0,
    width: "100%",
    height: "2.2rem",
    background: fade(theme.colors.footer.bg, 0.8),
    paddingRight: theme.spacing(3),
    fontWeight: 700,
  },
}));

function Footer() {
  const classes = useStyles();

  const gitClick = () => {
    window.open("https://github.com/DevooKim-project/KHWproject_front");
  };

  return (
    <>
      <div className={classes.footer}>
        <p>개발자: DevooKim</p>
        <IconButton onClick={() => gitClick()}>
          <GitHubIcon />
        </IconButton>
      </div>
    </>
  );
}

export default Footer;
