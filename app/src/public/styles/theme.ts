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
      main: '#3ea3d6' // bright blue
    },
  },
});


export const theme2 = createMuiTheme({
  palette: {
    secondary: {
      main: '#304D6D' //dark mode color
    },
  },
});

// export default theme;
