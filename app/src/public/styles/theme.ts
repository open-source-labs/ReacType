import { createTheme } from '@material-ui/core/styles';
// theme creator: https://bareynol.github.io/mui-theme-creator/

export const theme1 = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#003366', // navy blue
    },
    secondary: {
      main: '#0099e6', // light blue
    },
    background: {
      paper: '#ffffff',
    },
  },
});

export const theme2 = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#003366',
    },
    secondary: {
      main: '#0099e6',
    },
    background: {
      paper: '#ffffff',
    },
  },
});

export const SigninDark = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#17a2b8',
    },
    background: {
      paper: '#ffffff',
    },
  },
});

export const SigninLight = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#17a2b8',
    },
    background: {
      paper: '#ffffff',
    },
  },
});
