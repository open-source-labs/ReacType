import { createMuiTheme } from '@material-ui/core/styles';
// import teal from '@material-ui/core/colors/teal';
import indigo from '@material-ui/core/colors/indigo';
import { Palette } from '@material-ui/core/styles/createPalette';

interface palette {
  primary: object;
  secondary: any;
}

interface theme {
  palette: palette;
}

const theme: theme = createMuiTheme({
  palette: {
    primary: {
      light: '#00e676',
      main: '#33eb91',
      dark: '#14a37f',
      contrastText: '#fff',
    },
    secondary: indigo,
  },
});

export default theme;
