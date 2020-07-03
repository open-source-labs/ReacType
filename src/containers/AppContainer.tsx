import React, { Component } from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import LeftContainer from './LeftContainer';
import MainContainer from './MainContainer';
import RightContainer from './RightContainer';
import theme from '../theme';

// ** Used with electron to render
const IPC = require('electron').ipcRenderer;

class AppContainer extends Component {
  constructor(props) {
    super(props);
  }

  render(): JSX.Element {
    // uses component childIds and parentIds arrays (numbers)s to build component-filled children and parents arrays
    return (
      <MuiThemeProvider theme={theme}>
        <div className="app-container">
          <LeftContainer />
          <MainContainer />
          <RightContainer />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default AppContainer;
