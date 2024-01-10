import { createTheme, adaptV4Theme } from '@mui/material/styles';
// theme creator: https://bareynol.github.io/mui-theme-creator/

export const theme1 = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1e8370' // navy blue
    },
    secondary: {
      main: '#46C0A5' // light blue
    },
    background: {
      paper: '#d2f5eb'
    }
  }
});

export const theme2 = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1e8370'
    },
    secondary: {
      main: '#46C0A5'
    },
    background: {
      paper: '#d2f5eb'
    }
  }
});

export const SigninDark = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1b544b'
    },
    secondary: {
      main: '#17a2b8'
    },
    background: {
      paper: '#d2f5eb'
    }
  }
});

export const SigninLight = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1b544b'
    },
    secondary: {
      main: '#17a2b8'
    },
    background: {
      paper: '#d2f5eb'
    }
  }
});
