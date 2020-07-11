import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import LeftContainer from './LeftContainer';
import MainContainer from './MainContainer';
import RightContainer from './RightContainer';
import theme from '../theme';

const AppContainer = () => {
  return (
    // Mui theme provider provides themed styling to all MUI components in app
    <MuiThemeProvider theme={theme}>
      <div className="app-container">
        <LeftContainer />
        <MainContainer />
        <RightContainer />
      </div>
    </MuiThemeProvider>
  );
};

export default AppContainer;
