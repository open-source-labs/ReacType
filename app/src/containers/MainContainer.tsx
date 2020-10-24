import React, { Component } from 'react';
import BottomPanel from '../components/bottom/BottomPanel';
import CanvasContainer from '../components/main/CanvasContainer';

// Main container contains the canvas which renders the components/elements on screen
// and the bottom panel which displays the code for the component
class MainContainer extends Component {
  render() {
    return (
      <div className="main-container">
        <div className="main">
          <CanvasContainer />
        </div>

        <BottomPanel />
      </div>
    );
  }
}

export default MainContainer;
