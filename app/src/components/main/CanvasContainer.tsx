import React, { useState, useEffect, useRef } from 'react';
import Canvas from './Canvas';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import CodePreview from '../bottom/CodePreview';
import { toggleCodePreview } from '../../redux/reducers/slice/appStateSlice';
import { Button } from '@mui/material';
import { ZoomIn, ZoomOut } from '@mui/icons-material';

interface CanvasContainerProps {
  zoom: number;
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
}

// The CanvasContainer sets the boundaries on the width/height of the canvas
function CanvasContainer(props: CanvasContainerProps): JSX.Element {
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
    borderBottom: 'none',
    overflow: 'auto'
  };

  const codePreviewStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#ffffff',
    backgroundColor: '#151515',
    zIndex: 0,
    border: '2px solid #0671e3',
    whiteSpace: 'nowrap',
    textTransform: 'none'
  } as const;

  const backToTop: React.CSSProperties = {
    textAlign: 'center',
    color: '#ffffff',
    backgroundColor: '#151515',
    zIndex: 0,
    border: '2px solid #0671e3',
    whiteSpace: 'nowrap',
    textTransform: 'none'
  } as const;

  //containerRef references the container that will ultimately have the scroll functionality
  const containerRef = useRef<HTMLDivElement>(null);

  const container = document.getElementById('canvasContainer');
  const components = document.querySelector('.componentContainer');

  const [zoom, setZoom] = useState(1);

  const zoomIn = () => {
    setZoom(zoom + 0.1);
  };

  const zoomOut = () => {
    setZoom(Math.max(zoom - 0.1, 0.1));
  };

  //useEffect dependency is the length of the parent components. No changes in children will scroll to the bottom. Once elements surpass the view of the canvas, scroll to bottom, else, keep scroll bar to the top.
  useEffect(() => {
    if (
      container &&
      components &&
      state.components[0].children.length > 0 &&
      components.scrollHeight == components.clientHeight
    ) {
      container.scrollTop = 0;
    } else if (container && components) {
      container.scrollTop = container.scrollHeight;
    }
  }, [state.components[0].children.length, zoom]);

  const buttonStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#ffffff',
    backgroundColor: '#151515',
    zIndex: 0,
    border: '2px solid #354e9c'
  };

  return (
    <div id="canvasContainer" style={canvasContainerStyle}>
      <div
        style={{
          position: 'sticky',
          top: 0,
          display: 'flex',
          justifyContent: 'space-around',
          zIndex: 999,
          margin: '10px 0px 10px 0px',
          padding: '20px'
        }}
      >
        <Button style={codePreviewStyle} onClick={onClickCodePreview}>
          Code Preview
        </Button>
        {!state.codePreview && (
          <div>
            <Button
              style={backToTop}
              onClick={() => {
                container.scrollTop = 0;
              }}
            >
              Scroll Top
            </Button>
            <Button
              style={backToTop}
              onClick={() => {
                container.scrollTop = container.clientHeight;
              }}
            >
              Scroll Bottom
            </Button>
          </div>
        )}
        <Button style={buttonStyle} onClick={zoomIn}>
          <ZoomIn />
        </Button>
        <Button style={buttonStyle} onClick={zoomOut}>
          <ZoomOut />
        </Button>
      </div>
      {state.codePreview ? (
        <CodePreview
          theme={theme}
          setTheme={setTheme}
          //zoom={zoom} // remove so that Code Preview would not zoom in and out
          containerRef={containerRef}
        />
      ) : (
        <Canvas zoom={zoom} ref={containerRef} />
      )}
    </div>
  );
}

export default CanvasContainer;
