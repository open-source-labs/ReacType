import { createTheme, adaptV4Theme } from '@mui/material/styles';
// theme creator: https://bareynol.github.io/mui-theme-creator/

export const theme1 = createTheme(
  adaptV4Theme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#003366' // navy blue
      },
      secondary: {
        main: '#0099e6' // light blue
      },
      background: {
        paper: '#ffffff'
      }
    }
  })
);

export const theme2 = createTheme(
  adaptV4Theme({
    palette: {
      mode: 'light',
      primary: {
        main: '#003366'
      },
      secondary: {
        main: '#0099e6'
      },
      background: {
        paper: '#ffffff'
      }
    }
  })
);

export const SigninDark = createTheme(
  adaptV4Theme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#3f51b5'
      },
      secondary: {
        main: '#17a2b8'
      },
      background: {
        paper: '#ffffff'
      }
    }
  })
);

export const SigninLight = createTheme(
  adaptV4Theme({
    palette: {
      mode: 'light',
      primary: {
        main: '#3f51b5'
      },
      secondary: {
        main: '#17a2b8'
      },
      background: {
        paper: '#ffffff'
      }
    }
  })
);
