import React, { Component } from 'react';
import BottomPanel from '../components/bottom/BottomPanel';
import CanvasContainer from '../components/main/CanvasContainer';

const MainContainer = ({ style }) => {
  return (
    <div className="main-container" style={style}>
      <div className="main">
        <CanvasContainer />
      </div>
      <BottomPanel />
    </div>
  );
};

export default MainContainer;
