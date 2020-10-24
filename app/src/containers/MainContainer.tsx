import React, { Component } from 'react';
import BottomPanel from '../components/bottom/BottomPanel';
import CanvasContainer from '../components/main/CanvasContainer';

import { Resizable } from "re-resizable";

class MainContainer extends Component {
  render() {
    return (
      <div className="main-container">
        <div className="main">
          <CanvasContainer />
        </div>
        {/* <Resizable minHeight={'25%'} enable={{ top: true }}> */}
          <BottomPanel />
        {/* </Resizable> */}
    </div>
    );
  }
}

export default MainContainer;
