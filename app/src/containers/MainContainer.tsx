import React, { useState, useContext, useEffect } from 'react';
import BottomPanel from '../components/bottom/BottomPanel';
import CanvasContainer from '../components/main/CanvasContainer';
import { styleContext } from './AppContainer';
import DemoRender from '../components/main/DemoRender';

const MainContainer = (props): JSX.Element => {
  const { style } = useContext(styleContext);

  return (
    <div className="main-container" style={style} >
      <div className="main">
        <CanvasContainer />
        <DemoRender />
      </div>
      <BottomPanel isThemeLight={props.isThemeLight}/>
    </div>
  );
};

export default MainContainer;
