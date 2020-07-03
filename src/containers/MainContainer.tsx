

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core/styles';
import BottomPanel from '../components/bottom/BottomPanel';
import theme from '../theme';
import CanvasContainer from '../components/main/CanvasContainer';


class MainContainer extends Component {
  render() {

    return (
      <MuiThemeProvider theme={theme}>
        <div className="main-container">
         
          <div
            className="main" //ref={main} **no function, commenting out**
          >
            <CanvasContainer />
          </div>
         
          <BottomPanel />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default MainContainer;
