/* eslint-disable max-len */
import React, { useState, useRef } from 'react';
import { Button } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import { useDispatch, useSelector } from 'react-redux';
import { DeveloperMode, ZoomIn, ZoomOut } from '@mui/icons-material';
import Canvas from './Canvas';
import { RootState } from '../../redux/store';
import CodePreview from '../bottom/CodePreview';
import {
  toggleCodePreview,
  resetAllState
} from '../../redux/reducers/slice/appStateSlice';
import createModal from '../right/createModal';
import { emitEvent } from '../../helperFunctions/socket';

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
    overflow: 'auto'
  };

  // containerRef references the container that will ultimately have the scroll functionality
  const containerRef = useRef<HTMLDivElement>(null);

  // const container = document.getElementById('canvasContainer');
  // const components = document.querySelector('.componentContainer');

  const [zoom, setZoom] = useState(1);

  const zoomIn = () => {
    setZoom(zoom + 0.1);
  };

  const zoomOut = () => {
    setZoom(Math.max(zoom - 0.1, 0.1));
  };

  const [modal, setModal] = React.useState(null);
  const roomCode = useSelector((store: RootState) => store.roomSlice.roomCode);
  const userName = useSelector((store: RootState) => store.roomSlice.userName);

  const closeModal = () => setModal('');
  const clearWorkspace = () => {
    // Reset state for project to initial state
    const resetState = () => {
      if (roomCode) emitEvent('clearCanvasAction', roomCode, userName);
      else dispatch(resetAllState());
    };
    // Set modal options
    const children = (
      <List className="export-preference" style={{ zIndex: '12' }}>
        <ListItem
          key={'clear'}
          button
          onClick={resetState}
          style={{
            backgroundColor: '#ef6c00',
            borderRadius: '50px',
            marginBottom: '2%',
            marginTop: '5%'
          }}
        >
          <ListItemText
            primary={'Yes, delete all project data'}
            style={{ textAlign: 'center' }}
            onClick={closeModal}
          />
        </ListItem>
      </List>
    );

    // Create modal
    setModal(
      createModal({
        closeModal,
        children,
        message: 'Are you sure you want to delete all data?',
        primBtnLabel: null,
        primBtnAction: null,
        secBtnAction: null,
        secBtnLabel: null,
        open: true
      })
    );
  };

  const buttonStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#ffffff',
    backgroundColor: '#2D313A',
    zIndex: 0,
    whiteSpace: 'nowrap',
    textTransform: 'none',
    padding: '10px',
    borderRadius: '0'
  } as const;

  const codePreviewStyle: React.CSSProperties = {
    borderRadius: '10px'
  } as const;

  const firstButtonStyle: React.CSSProperties = {
    borderRadius: '10px 0 0 10px'
  } as const;

  const lastButtonStyle: React.CSSProperties = {
    borderRadius: '0 10px 10px 0'
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
          padding: '20px 20px 5px 20px'
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
              style={{ ...buttonStyle, ...firstButtonStyle }}
              onClick={zoomIn}
            >
              <ZoomIn />
            </Button>
            <Button style={buttonStyle} onClick={zoomOut}>
              <ZoomOut />
            </Button>
            <Button
              style={{ ...buttonStyle, ...lastButtonStyle }}
              onClick={() => clearWorkspace()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="bi bi-trash3"
                viewBox="0 0 16 16"
              >
                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
              </svg>
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
      {modal}
    </div>
  );
}

export default CanvasContainer;
