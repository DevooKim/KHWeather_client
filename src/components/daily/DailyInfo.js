import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import { Box, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import WeatherIcons from "../weathers/WeatherIcons";
import WeatherCondition from "../weathers/WeatherCondition";
import getDate from "../../utils/getDate";
import { WiStrongWind, WiThermometer } from "react-icons/wi";
import { IconContext } from "react-icons";

const useStyles = makeStyles((theme) => ({
  dayInfo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: "1rem",
    marginRight: "1rem",
    fontSize: "1.1rem",
  },
  day: {
    flex: 0.15,
    alignSelf: "center",
    fontWeight: 600,
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4),
  },
  iconBox: {
    flex: 0.3,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  state: {
    width: "3rem",
    marginLeft: "1.5rem",
  },
  windBox: {
    width: "7rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  wind: {
    color: theme.colors.daily.wind,
  },
  tempBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "7rem",
    marginRight: "1rem",
  },
  temps: {
    display: "flex",
    width: "4rem",
    justifyContent: "flex-end",
  },
  temp: {
    width: "1.5rem",
    marginLeft: "1rem",
  },
  max: {
    color: theme.colors.daily.max,
  },
  min: {
    color: theme.colors.daily.min,
  },
  icon: {
    color: theme.colors.daily.icon,
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  sectionMobile: {
    display: "block",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
}));

const Accordion = withStyles((theme) => ({
  root: {
    backgroundColor: "inherit",
    border: "1px solid rgba(0, 0, 0, 0.125)",

    boxShadow: 3,
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(4),
      marginRight: theme.spacing(4),
    },
  },
  expanded: {},
}))(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56,
    },
  },
  content: {
    "&$expanded": {
      margin: "12px 0",
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4),
  },
}))(MuiAccordionDetails);

export default function DailyInfo({ days }) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion
        square
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Container className={classes.dayInfo}>
            <div className={classes.sectionDesktop}>
              <Box className={classes.day}>{getDate(days.dt, "DAY")}</Box>
            </div>
            <div
              className={classes.sectionMobile}
              style={{ marginLeft: "1.5rem" }}
            >
              <Box className={classes.day}>{getDate(days.dt, "MOBILE")}</Box>
            </div>
            <Box className={classes.iconBox}>
              <div className={classes.icon}>
                <WeatherIcons
                  weatherIcon={days.weather[0].icon}
                  classes={"dailyIcon"}
                />
              </div>
              <div className={classes.sectionDesktop}>
                <Box className={classes.state}>
                  <p>
                    <WeatherCondition
                      className={classes.state}
                      condition={days.weather[0]}
                    />
                  </p>
                </Box>
              </div>
            </Box>
            <Box className={classes.windBox}>
              <div className={classes.sectionDesktop}>
                <div className={classes.icon}>
                  <WiStrongWind className={"dailyIcon"} />
                </div>
              </div>

              <div className={classes.sectionDesktop}>
                <Box className={classes.wind}>{days.wind_speed}m/s</Box>
              </div>

              <div className={classes.sectionMobile}>
                <Box style={{ marginLeft: "1.5rem" }}>{days.wind_speed}m/s</Box>
              </div>
            </Box>
            <Box className={classes.tempBox}>
              <div className={classes.sectionDesktop}>
                <div className={classes.icon}>
                  <WiThermometer className={"dailyIcon"} />
                </div>
              </div>
              <Box className={classes.temps}>
                <p className={`${classes.temp} ${classes.max}`}>
                  {days.temp.max}
                </p>
                <p className={`${classes.temp} ${classes.min}`}>
                  {days.temp.min}
                </p>
              </Box>
            </Box>
          </Container>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>상세정보 제공 예정</Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
