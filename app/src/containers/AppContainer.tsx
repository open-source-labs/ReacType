import React, { useState } from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import LeftContainer from './LeftContainer';
import MainContainer from './MainContainer';
import RightContainer from './RightContainer';
import { theme1, theme2 } from '../public/styles/theme';
import { makeStyles } from '@material-ui/core/styles';
import { useStyles } from '../components/left/ComponentPanel';

const AppContainer = () => {
  const [theme, setTheme] = useState(theme1);
  const classes = useStyles();
  const [style, setStyle] = useState({});

  return (
    // Mui theme provider provides themed styling to all MUI components in app
    <MuiThemeProvider theme={theme}>
      <Button
        color="primary"
        className={classes.button}
        onClick={() => (!style.backgroundColor ? setStyle({}) : setStyle({}))}
      >
        Change to Light/Dark Mode
      </Button>
      <div className="app-container">
        <LeftContainer style={style} />
        <MainContainer />
        <RightContainer />
      </div>
    </MuiThemeProvider>
  );
};

export default AppContainer;
