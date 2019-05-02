import React, { Component } from 'react';
import '../public/styles/style.css';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './theme.ts';
import AppContainer from '../containers/AppContainer.tsx';

class App extends Component {
  render() {
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
