import React, { useCallback, useRef, useState } from "react";
import {
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Box,
  Paper,
} from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";
import { Search } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 0,
    backgroundColor: theme.colors.header.bg,
  },
  darkMode: {
    color: theme.palette.common.white,
    [theme.breakpoints.up("sm")]: {
      flexGrow: 0.3,
      display: "flex",
      flexDirection: "row-reverse",
      alignItems: "center",
    },
  },
  title: {
    flexGrow: 0.5,
    textAlign: "center",
    [theme.breakpoints.up("sm")]: {
      display: "block",
      flexGrow: 0.4,
    },
  },
  search: {
    position: "relative",
    width: "80%",
    marginLeft: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.5),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.75),
    },
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
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    color: theme.palette.common.black,
    fontWeight: 600,
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
    alignItems: "center",
    justifyContent: "center",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  overlay: {
    position: "absolute",
    width: "100%",
    backgroundColor: "white",
    top: "100%",
    zIndex: 100,
  },
  overlayResult: {
    position: "relitive",
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    color: "black",
    // borderBottom: 1px solid black;
    fontWeight: "700",
  },
}));

export default function Header({
  input,
  onChange,
  onClick,
  address,
  children,
}) {
  const classes = useStyles();
  const [mobileSearch, setMobileSearch] = useState(false);
  const [overlay, setOverlay] = useState({ display: "none" });
  const inputRef = useRef();

  const searchHide = mobileSearch ? { display: "none" } : { display: "block" };
  const searchShow = mobileSearch ? { display: "block" } : { display: "none" };

  const handleMobileSearch = useCallback(() => {
    setMobileSearch(true);
  }, []);
  return (
    <>
      <Paper className={classes.root} elevation={3}>
        {/* <AppBar position="static"> */}
        <Toolbar>
          <div className={classes.darkMode}>{children}</div>
          <Typography className={classes.title} variant="h4" style={searchHide}>
            KHWeather
          </Typography>
          <div className={classes.sectionDesktop}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <Search />
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

              <div className={classes.overlay} style={overlay}>
                {address.map((v, index) => (
                  <Box
                    className={classes.overlayResult}
                    borderBottom={1}
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
                  </Box>
                ))}
              </div>
            </div>
          </div>

          <div className={classes.sectionMobile}>
            <IconButton
              color={"inherit"}
              onMouseUp={() => handleMobileSearch()}
              onClick={() => inputRef.current.focus()}
              style={searchHide}
            >
              <Search />
            </IconButton>
          </div>

          <div className={classes.search} style={searchShow}>
            <div className={classes.searchIcon}>
              <Search />
            </div>

            <InputBase
              placeholder="주소 입력"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
              onBlur={() => {
                setOverlay({ display: "none" });
                setMobileSearch(false);
              }}
              onFocus={() => setOverlay({})}
              onChange={(e) => {
                onChange(e);
              }}
              value={input}
              inputRef={inputRef}
            />

            <div className={classes.overlay} style={overlay}>
              {address.map((v, index) => (
                <Box
                  className={classes.overlayResult}
                  borderBottom={1}
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
                </Box>
              ))}
            </div>
          </div>
        </Toolbar>
        {/* </AppBar> */}
      </Paper>
    </>
  );
}
