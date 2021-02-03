import {
  teal,
  blue,
  amber,
  lightBlue,
  red,
  blueGrey,
  grey,
  lightGreen,
} from "@material-ui/core/colors";

export const themeLight = {
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "*::-webkit-scrollbar-thumb": {
          backgroundColor: "rgba(0,0,0,.2)",
          borderRadius: 8,
        },
      },
    },
  },
  palette: {
    type: "light",
    background: {
      // default: lightBlue[50],
      default: "#FAFAFA",
    },
  },
  colors: {
    global: {
      loading: blueGrey[900],
    },
    header: { bg: blue[400] },
    info: { bg: "#CCE3D7" },
    daily: {
      title: amber[200],
      wind: lightBlue[500],
      max: red[500],
      min: blue[500],
      border: "0px",
      icon: "inherit",
      accordianBg: "rgba(255, 255, 255, 0.8)",
    },
    chart: { bg: "#F5F7FA" },
    footer: { bg: teal[50] },
  },
};

export const themeDark = {
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "*::-webkit-scrollbar-thumb": {
          backgroundColor: "rgba(255,255,255,.5)",
          borderRadius: 8,
        },
      },
    },
  },
  palette: {
    type: "dark",
    background: {
      default: grey[800],
    },
  },
  colors: {
    global: {
      loading: lightGreen["A400"],
    },
    header: { bg: "#2e73ab" },
    info: { bg: "#8e9e96" },
    daily: {
      // title: teal[800],
      title: "#b29c5b",
      wind: lightBlue[100],
      max: red[800],
      min: blue[900],
      icon: grey[200],
      accordianBg: "rgba(255, 255, 255, 0.3)",
    },
    chart: { bg: "#abacaf" },
    footer: { bg: "#9ca9a8" },
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
