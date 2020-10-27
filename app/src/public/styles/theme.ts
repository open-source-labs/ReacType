import { createMuiTheme } from '@material-ui/core/styles';
// import purple from '@material-ui/core/colors/purple';
// import indigo from '@material-ui/core/colors/indigo';
// import orange from '@material-ui/core/colors/orange';

export const theme1 = createMuiTheme({
  // typography: {
  //   useNextVariants: true
  // },
  palette: {
    primary: {
      // light: '#00e676',
      main: '#01d46d' // less blinding green
      // dark: '#14a37f',
      // contrastText: '#fff'
    },
    secondary: {
      main: '#ff5722'
    }
  }
});

export const theme2 = createMuiTheme({
  // overrides: {
  //   MuiContainer: {}
  // }
});

// export default theme;
