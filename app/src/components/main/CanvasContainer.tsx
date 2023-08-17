import React, { useState } from 'react';
import Canvas from './Canvas';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import CodePreview from '../bottom/CodePreview';
import { toggleCodePreview } from '../../redux/reducers/slice/appStateSlice';

// The CanvasContainer sets the boundaries on the width/height of the canvas
function CanvasContainer(props): JSX.Element {
  const [theme, setTheme] = useState('solarized_light'); // theme for ACE editor, taken from BottomTabs
  const { state } = useSelector(
    (store: RootState) => ({
      state: store.appState,
    })
  );
  const dispatch = useDispatch();

  // onClickCodePreview swaps the rendered component from the canvas to the code preview editor
  const onClickCodePreview = () => {
    dispatch(toggleCodePreview());
    console.log(state.codePreview);
  }

  const canvasContainerStyle = {
    width: '100%',
    backgroundColor: 'lightgrey',
    border: '2px Solid grey',
    overflow: 'auto',
  };

  const codePreviewStyle = {
    position: 'absolute',
    width: 'max-content',
    minHeight: '5%',
    border: '1px solid #4a4a4a', 
    top: '1vw', 
    right: '51vw', 
    textAlign: 'center',
    zIndex: 1,
  } as const;

  return (
    <div style={canvasContainerStyle}>
      {state.codePreview && <CodePreview theme={theme} setTheme={setTheme}/>}
      {!state.codePreview && <Canvas isThemeLight={props.isThemeLight}/>}
      <div
        style={codePreviewStyle}
        onClick={onClickCodePreview}
      >
        Code Preview
      </div>
    </div>
  );
}

export default CanvasContainer;
