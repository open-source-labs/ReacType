import React, { useState, useContext, useEffect } from 'react';
import BottomPanel from '../components/bottom/BottomPanel';
import CanvasContainer from '../components/main/CanvasContainer';
import { styleContext } from './AppContainer';
import DemoRender from '../components/main/DemoRender';

const MainContainer = () => {
  const { style } = useContext(styleContext);


  return (
    <div className="main-container" style={style} >
      <div className="main">
        <CanvasContainer />
        {/* Caret Component Render */}
        <DemoRender />
      </div>
      <BottomPanel />
    </div>
  );
};

export default MainContainer;
