import React, { Component } from 'react';
import '../public/styles/style.css';
import { MuiThemeProvider } from '@material-ui/core/styles';
import AppContainer from '../containers/AppContainer';

class App extends Component {
  render() {
    return (
      <div className="app">
        <div>
          <header style={{ height: '40px', width: '100%' }}>ReacType</header>
          <AppContainer />
        </div>
      </div>
    );
  }
}

export default App;
