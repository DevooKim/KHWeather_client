import {
  teal,
  blue,
  amber,
  lightBlue,
  red,
  blueGrey,
  grey,
  deepOrange,
} from "@material-ui/core/colors";

const commons = {
  overrides: {
    MuiCssBaseline: {
      "@global": {
        html: {
          WebkitFontSmoothing: "auto",
        },
        p: {
          fontWeight: 700,
        },
      },
    },
  },
};

export const themeLight = {
  ...commons,
  palette: {
    type: "light",
    background: {
      default: blue[50],
    },
  },
  colors: {
    global: {
      border: "0px",
    },
    header: { bg: teal[300] },
    daily: {
      title: amber[200],
      wind: lightBlue[500],
      max: red[500],
      min: blue[500],
      border: "0px",
      icon: "inherit",
      accordianBg: "rgba(255, 255, 255, 0.8)",
    },
    chart: { bg: grey[50] },
  },
};

export const themeDark = {
  ...commons,
  palette: {
    type: "dark",
    background: {
      default: grey[800],
    },
  },
  colors: {
    global: {
      border: `2px solid ${grey[50]}`,
    },
    header: { bg: teal[800] },
    daily: {
      title: teal[800],
      wind: lightBlue[100],
      max: red[800],
      min: blue[900],
      icon: grey[200],
      accordianBg: "rgba(255, 255, 255, 0.3)",
    },
    chart: { bg: blueGrey[700] },
  },
};

export const chartLight = {
  primaryColor: "#ffffff",
  secondaryColor: "#000000",
  line: {
    yesterday: "#36A2EB",
    today: "#00897B",
    precipitation: "#FFAB91",
  },
  now: "#9E1200",
};

export const chartDark = {
  primaryColor: "#000000",
  secondaryColor: "#ffffff",
  line: {
    yesterday: "#36A2EB",
    today: "#0FA891",
    precipitation: "#FFAB91",
  },
  now: "#9E1200",
};
