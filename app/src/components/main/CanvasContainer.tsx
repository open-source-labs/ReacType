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
    height: '100%',
    backgroundColor: 'rgba(25, 25, 25)',
    border: '2px solid grey',
    borderBottom: 'none',
    overflow: 'auto'
  };

  const codePreviewStyle: React.CSSProperties = {
    position: 'fixed',
    width: 'max-content',
    height: 'max-content',
    bottom: '150px',
    right: '45vw',
    textAlign: 'center',
    color: '#ffffff',
    backgroundColor: '#151515',
    zIndex: 0,
    border: '2px solid #354e9c'
  } as const;

  const backToTop: React.CSSProperties = {
    position: 'fixed',
    width: 'max-content',
    height: 'max-content',
    bottom: '100px',
    right: '45vw',
    textAlign: 'center',
    color: '#ffffff',
    backgroundColor: '#151515',
    zIndex: 0,
    border: '2px solid #354e9c'
  } as const;

  //containerRef references the container that will ultimately have the scroll functionality
  const containerRef = useRef<HTMLDivElement>(null);

  //useEffect dependency is the length of the parent components. No changes in children will scroll to the bottom. Once elements surpass the view of the canvas, scroll to bottom, else, keep scroll bar to the top.
  useEffect(() => {
    const allElements = document.querySelector('.allElements');
    const container = containerRef.current;
    if (
      container &&
      allElements &&
      allElements.clientHeight > container.clientHeight &&
      state.components[0].children.length > 0
    ) {
      container.scrollTop = container.scrollHeight;
    } else if (container) {
      container.scrollTop = 0;
    }
  }, [state.components[0].children.length]);

  return (
    <div style={canvasContainerStyle} ref={containerRef}>
      {state.codePreview && <CodePreview theme={theme} setTheme={setTheme} />}
      {!state.codePreview && <Canvas /*isThemeLight={props.isThemeLight} */ />}

      <Button style={codePreviewStyle} onClick={onClickCodePreview}>
        Code Preview
      </Button>
      <Button
        style={backToTop}
        onClick={() => {
          containerRef.current.scrollTop = 0;
        }}
      >
        Back to Top
      </Button>
    </div>
  );
}

export default CanvasContainer;
