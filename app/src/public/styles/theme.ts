import { createTheme, adaptV4Theme } from '@mui/material/styles';
// theme creator: https://bareynol.github.io/mui-theme-creator/

export const theme1 = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#0671e3' // navy blue
    },
    secondary: {
      main: '#0671e3' // light blue
    },
    background: {
      paper: '#0671e3'
    }
  }
});

export const theme2 = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0671e3'
    },
    secondary: {
      main: '#0671e3'
    },
    background: {
      paper: '#0671e3'
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
      paper: '#2997ff'
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
      paper: '#0671e3'
    }
  }
});
