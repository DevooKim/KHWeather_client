import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import GitHubIcon from "@material-ui/icons/GitHub";

const useStyles = makeStyles((theme) => ({
  footer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: "fixed",
    bottom: 0,
    width: "100%",
    height: "2.2rem",
    background: fade(theme.colors.footer.bg, 0.8),
    paddingRight: theme.spacing(3),
    fontWeight: 700,
    [theme.breakpoints.up("sm")]: {
      justifyContent: "flex-end",
    },
  },
  info: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "0.8rem",
  },
  img: {
    height: "3.5rem",
    marginLeft: "-1rem",
    marginRight: "-1rem",
    [theme.breakpoints.up("sm")]: {},
  },
  desktopMode: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
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
        <div className={classes.info}>
          <p>개발자: DevooKim</p>
          <IconButton onClick={() => gitClick()}>
            <GitHubIcon />
          </IconButton>
        </div>
        <div className={classes.info}>
          <p className={classes.desktopMode}>날씨제공</p>
          <IconButton onClick={() => console.log("hi")}>
            <img
              className={classes.img}
              src="https://user-images.githubusercontent.com/42219589/106826161-b1a87900-66c9-11eb-861b-c15ea17afc33.png"
            />
          </IconButton>
        </div>
      </div>
    </>
  );
}

export default Footer;
