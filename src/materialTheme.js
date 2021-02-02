import { createMuiTheme } from "@material-ui/core/styles";

export const theme = createMuiTheme({
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
  palette: {
    test: {
      header: "gray",
    },
  },
});
