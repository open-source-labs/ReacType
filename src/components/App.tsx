import React, { Component } from 'react';
import '../public/styles/style.css';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
import AppContainer from '../containers/AppContainer.tsx';

interface Adam {
  goodguy: boolean;
  haswine: boolean;
}

class App extends Component {
  render() {
    const adamInstance: Adam = {
      goodguy: true,
      haswine: false,
    };
    console.log(adamInstance);
    return (
      <MuiThemeProvider theme={theme}>
        <div className="app">
          <div>
            <header style={{ height: '40px', width: '100%' }}>ReacType</header>
            <AppContainer />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
