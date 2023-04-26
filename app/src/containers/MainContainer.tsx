import React from 'react';
import BottomPanel from '../components/bottom/BottomPanel';
import CanvasContainer from '../components/main/CanvasContainer';
import DemoRender from '../components/main/DemoRender';
import { useSelector } from 'react-redux';

const MainContainer = (props): JSX.Element => {
  const { isDarkMode, style } = useSelector((store) => ({
    isDarkMode: store.darkMode.isDarkMode,
    style: store.styleSlice
  }));

  return (
    <div className="main-container" style={style}>
      <div className="main">
        <CanvasContainer isThemeLight={props.isThemeLight} />
        <DemoRender />
      </div>
      <div className="bottom-hide">
        <BottomPanel isThemeLight={props.isThemeLight} />
      </div>
    </div>
  );
};
export default MainContainer;
