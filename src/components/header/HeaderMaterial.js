import React, { useCallback, useRef, useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import styled from "styled-components";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "lightblue",
  },
  title: {
    // display: "block",
    flexGrow: 1,
    textAlign: "center",
    // [theme.breakpoints.up("sm")]: {
    // display: "block",
    // },
  },
  search: {
    position: "relative",
    flex: 1,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    width: "100%",
    // margin: "auto",
    marginRight: theme.spacing(3),
    [theme.breakpoints.up("sm")]: {
      position: "absolute",
      right: theme.spacing(4),
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "30ch",
      "&:focus": {
        width: "35ch",
      },
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  },
  sectionMobile: {
    position: "absolute",
    right: 0,
    marginRight: theme.spacing(2),
    display: "flex",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
}));

const OverlayStyled = styled.div`
  position: absolute;
  width: 100%;
  background-color: white;
  top: 100%;
`;

const OverlayResultStyled = styled.div`
  position: relitive;
  padding: 2px;
  padding-left: 5px;
  padding-right: 4px;
  color: black;
  border-bottom: 1px solid black;
  font-weight: 700;
  z-index: 100;
`;

export default function SearchAppBar({ input, onChange, onClick, address }) {
  const classes = useStyles();
  const inputRef = useRef();
  const [mobileSearch, setMobileSearch] = useState(false);
  const [overlayDisplay, setOverlay] = useState({ display: "none" });

  const searchHide = mobileSearch ? { display: "none" } : { display: "block" };
  const searchShow = mobileSearch ? { display: "block" } : { display: "none" };

  const handleMobileSearch = useCallback(() => {
    setMobileSearch(true);
    // inputRef.current.focus();
  }, []);

  return (
    <>
      <div className={classes.root}>
        {/* <AppBar position="static"> */}
        <Toolbar>
          <Typography className={classes.title} variant="h4" style={searchHide}>
            KHWeather
          </Typography>
          <div className={classes.sectionDesktop}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="주소 입력"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
                onBlur={() => setOverlay({ display: "none" })}
                onFocus={() => setOverlay({})}
                onChange={(e) => {
                  onChange(e);
                }}
                value={input}
                inputRef={inputRef}
              />

              <OverlayStyled style={overlayDisplay}>
                {address.map((v, index) => (
                  <OverlayResultStyled
                    key={index}
                    onMouseDown={() => {
                      onClick({
                        address_name: v.address_name,
                        coordinate: {
                          lat: v.y,
                          lon: v.x,
                        },
                      });
                    }}
                    value={v}
                  >
                    {v.address_name}
                  </OverlayResultStyled>
                ))}
              </OverlayStyled>
            </div>
          </div>

          {/* <div className={classes.sectionMobile}>
            <IconButton
              color={"inherit"}
              // onClick={() => setMobileSearch(true)}
              onClick={() => handleMobileSearch}
              style={searchHide}
            >
              <SearchIcon />
            </IconButton>
            <div className={classes.search} style={searchShow}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="주소 입력"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
                onBlur={() => setMobileSearch(false)}
                inputRef={() => inputRef}
                onChange={() => onChange}
                value={input}
              />
            </div>
          </div> */}
        </Toolbar>
        {/* </AppBar> */}
      </div>
    </>
  );
}
