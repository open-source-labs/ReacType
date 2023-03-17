import React, {  useContext } from 'react';
import BottomPanel from '../components/bottom/BottomPanel';
import CanvasContainer from '../components/main/CanvasContainer';
import { styleContext } from './AppContainer';
import DemoRender from '../components/main/DemoRender';
import { useSelector } from 'react-redux';

const MainContainer = (props): JSX.Element => {
  const { style } = useContext(styleContext);
  const isDarkMode = useSelector(store => store.darkMode.isDarkMode);

  return (
    <div className="main-container" style={style} >
      <div className="main">
        <CanvasContainer isThemeLight={props.isThemeLight}/>
        <DemoRender />
      </div>
      <div className='bottom-hide'>
        <BottomPanel isThemeLight={props.isThemeLight}/>
      </div>
    </div>
  );
};
export default MainContainer;
