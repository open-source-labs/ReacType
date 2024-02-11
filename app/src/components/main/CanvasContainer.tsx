import React, { useState, useEffect, useRef } from 'react';
import Canvas from './Canvas';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import CodePreview from '../bottom/CodePreview';
import { toggleCodePreview } from '../../redux/reducers/slice/appStateSlice';
import { Button } from '@mui/material';

// The CanvasContainer sets the boundaries on the width/height of the canvas
function CanvasContainer(props): JSX.Element {
  const [theme, setTheme] = useState('solarized_light'); // theme for ACE editor, taken from BottomTabs
  const state = useSelector((store: RootState) => store.appState);
  const dispatch = useDispatch();

  // onClickCodePreview swaps the rendered component from the canvas to the code preview editor
  const onClickCodePreview = () => {
    dispatch(toggleCodePreview());
  };

  const canvasContainerStyle: React.CSSProperties = {
    width: '100%',
    backgroundColor: 'rgba(25, 25, 25)',
    border: '2px solid grey',
    borderBottom: 'none',
    overflow: 'auto'
  };

  const codePreviewStyle: React.CSSProperties = {
    position: 'fixed',
    width: 'max-content',
    height: 'max-content',
    bottom: '100px',
    right: '51vw',
    textAlign: 'center',
    color: '#ffffff',
    backgroundColor: '#151515',
    zIndex: 0,
    border: '2px solid #46C0A5'
  } as const;

  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [state.components]);

  return (
    <div style={canvasContainerStyle} ref={containerRef}>
      {state.codePreview && <CodePreview theme={theme} setTheme={setTheme} />}
      {!state.codePreview && <Canvas /*isThemeLight={props.isThemeLight} */ />}

      <Button style={codePreviewStyle} onClick={onClickCodePreview}>
        Code Preview
      </Button>
    </div>
  );
}

export default CanvasContainer;
