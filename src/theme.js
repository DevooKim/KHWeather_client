import { createMuiTheme } from "@material-ui/core/styles";
import { green, purple, blue } from "@material-ui/core/colors/";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: blue[500],
    },
  },
});

export default theme;
