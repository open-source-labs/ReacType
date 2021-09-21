import { createTheme } from '@material-ui/core/styles';

export const theme1 = createTheme({
  
  
  palette: {
    primary: {
      main: '#003366', // light mode color
    },
    secondary: {
      main: '#0099E6',
    },
  },
});


export const theme2 = createTheme({
  palette: {
    secondary: {
      main: '#304D6D', // dark mode color
    },
  },
});

// export default theme;
