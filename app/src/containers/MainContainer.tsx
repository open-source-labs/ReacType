import React, { useContext } from 'react';
import BottomPanel from '../components/bottom/BottomPanel';
import CanvasContainer from '../components/main/CanvasContainer';
import { styleContext } from './AppContainer';

const MainContainer = () => {
  const { style } = useContext(styleContext);
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
