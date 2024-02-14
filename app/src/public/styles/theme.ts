import { createTheme, adaptV4Theme } from '@mui/material/styles';
// theme creator: https://bareynol.github.io/mui-theme-creator/

export const theme1 = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#354e9c' // navy blue
    },
    secondary: {
      main: '#354e9c' // light blue
    },
    background: {
      paper: '#354e9c'
    }
  }
});

export const theme2 = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#354e9c'
    },
    secondary: {
      main: '#354e9c'
    },
    background: {
      paper: '#354e9c'
    }
  }
});

export const SigninDark = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3c59ba'
    },
    secondary: {
      main: '#17a2b8'
    },
    background: {
      paper: '#354e9c'
    }
  }
});

export const SigninLight = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#3c59ba'
    },
    secondary: {
      main: '#17a2b8'
    },
    background: {
      paper: '#354e9c'
    }
  }
});
