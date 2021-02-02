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
    header: { bg: teal[100] },
    daily: {
      title: amber[200],
      wind: lightBlue[500],
      max: red[500],
      min: blue[500],
      border: "0px",
      icon: "inherit",
    },
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
    header: { bg: blueGrey[700] },
    daily: {
      title: teal[800],
      wind: lightBlue[500],
      max: red[800],
      min: blue[500],
      border: `2px solid ${grey[50]}`,
      icon: grey[200],
    },
  },
};
