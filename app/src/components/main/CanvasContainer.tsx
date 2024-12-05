/* eslint-disable max-len */
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
  DeveloperMode,
  VerticalAlignBottom,
  VerticalAlignTop,
  ZoomIn,
  ZoomOut,
} from '@mui/icons-material';
import Canvas from './Canvas';
import { RootState } from '../../redux/store';
import CodePreview from '../bottom/CodePreview';
import { toggleCodePreview } from '../../redux/reducers/slice/appStateSlice';

interface CanvasContainerProps {
  zoom: number;
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
}

/**
 * `CanvasContainer` manages the interface for a flexible workspace in an application that includes both a canvas for graphical elements and a code preview editor.
 * It provides tools to zoom in and out of the canvas, toggle between the canvas view and the code editor, and scroll within the canvas.
 *
 * @param {Object} props - The component props.
 * @param {number} props.zoom - The current zoom level of the canvas.
 * @param {string} props.theme - The current theme of the code editor.
 * @param {React.Dispatch<React.SetStateAction<string>>} props.setTheme - A function to update the theme of the code editor.
 *
 * @returns {JSX.Element} A component that provides a canvas and code editor environment with controls for navigation and viewing adjustments.
 */
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
    background: '#070808',
    backgroundImage: 'radial-gradient(#1E2024 .71px, transparent 0)',
    backgroundSize: '8px 8px',
    backgroundPosition: '-19px -19px',
    borderBottom: 'none',
    overflow: 'auto',
  };

  // containerRef references the container that will ultimately have the scroll functionality
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

  // useEffect dependency is the length of the parent components. No changes in children will scroll to the bottom. Once elements surpass the view of the canvas, scroll to bottom, else, keep scroll bar to the top.
  useEffect(() => {
    if (
      container &&
      components &&
      state.components[0].children.length > 0 &&
      components.scrollHeight === components.clientHeight
    ) {
      container.scrollTop = 0;
    } else if (container && components) {
      container.scrollTop = container.scrollHeight;
    }
  }, [state.components[0].children.length, zoom]);

  const buttonStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#ffffff',
    backgroundColor: '#2D313A',
    zIndex: 0,
    whiteSpace: 'nowrap',
    textTransform: 'none',
    padding: '10px',
    borderRadius: '0',
  } as const;

  const codePreviewStyle: React.CSSProperties = {
    borderRadius: '10px',
  } as const;

  const upArrowStyle: React.CSSProperties = {
    borderRadius: '10px 0 0 10px',
  } as const;

  const zoomOutStyle: React.CSSProperties = {
    borderRadius: '0 10px 10px 0',
  } as const;

  return (
    <div id="canvasContainer" style={canvasContainerStyle}>
      <div
        style={{
          position: 'sticky',
          top: 0,
          display: 'flex',
          justifyContent: 'space-between',
          zIndex: 999,
          padding: '20px 20px 5px 20px',
        }}
      >
        <Button
          style={{ ...buttonStyle, ...codePreviewStyle }}
          onClick={onClickCodePreview}
        >
          <DeveloperMode />
        </Button>
        {!state.codePreview && (
          <div>
            <Button
              style={{ ...buttonStyle, ...upArrowStyle }}
              onClick={() => {
                container.scrollTop = 0;
              }}
            >
              <VerticalAlignTop />
            </Button>
            <Button
              style={buttonStyle}
              onClick={() => {
                container.scrollTop = container.clientHeight;
              }}
            >
              <VerticalAlignBottom />
            </Button>
            <Button style={buttonStyle} onClick={zoomIn}>
              <ZoomIn />
            </Button>
            <Button
              style={{ ...buttonStyle, ...zoomOutStyle }}
              onClick={zoomOut}
            >
              <ZoomOut />
            </Button>
          </div>
        )}
      </div>
      {state.codePreview ? (
        <CodePreview
          theme={theme}
          setTheme={setTheme}
          // zoom={zoom} // This is added if you want the Code Editor to zoom in/out
          containerRef={containerRef}
        />
      ) : (
        <Canvas zoom={zoom} ref={containerRef} />
      )}
    </div>
  );
}

export default CanvasContainer;
