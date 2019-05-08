import { createMuiTheme } from '@material-ui/core/styles';
// import teal from '@material-ui/core/colors/teal';
import indigo from '@material-ui/core/colors/indigo';
import { Palette } from '@material-ui/core/styles/createPalette';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      light: '#00e676',
      // main: '#33eb91',
      main: '#01d46d', // less blinding green
      dark: '#14a37f',
      contrastText: '#fff',
    },
    secondary: indigo,
  },
});

export default theme;
