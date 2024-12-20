/* eslint-disable max-len */
import React, { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import html2canvas from 'html2canvas';
import { Buffer } from 'buffer';
import { Amplify, Storage } from 'aws-amplify';
import BottomPanel from '../components/bottom/BottomPanel';
import CanvasContainer from '../components/main/CanvasContainer';
import DemoRender from '../components/main/DemoRender';
import ContextMenu from '../components/ContextMenu';

import { RootState } from '../redux/store';
import { toggleScreenshotTrigger } from '../redux/reducers/slice/appStateSlice';

import awsconfig from '../../../src/custom-aws-exports';

/**
 * `MainContainer` is a React functional component that serves as the primary layout container for a UI application.
 * It includes a canvas area managed by `CanvasContainer` and `DemoRender` components, and a bottom panel that
 * can be shown or hidden based on user interactions. This component also handles screenshot capturing of the
 * canvas area when triggered and uploads the screenshot to AWS S3.
 *
 * The component uses `useState` for local state management and `useRef` to reference DOM nodes. It integrates
 * with Redux for state management across the app, particularly for managing screenshot triggers and application styles.
 * It uses `html2canvas` for taking screenshots and AWS Amplify's Storage module to handle the upload to S3.
 *
 * @param {Object} props - Props passed to the component including `isThemeLight` to indicate the current theme.
 * @returns {JSX.Element} - Renders the main container including the canvas area, demo renderer, and a dynamically
 *                          visible bottom panel.
 *
 * The component listens for changes in the `screenshotTrigger` from the Redux store to initiate a screenshot,
 * converts it to a Buffer, and uploads it to an AWS S3 bucket. It also includes an internal hook `useOutsideClick`
 * to handle clicks outside the bottom panel to potentially close it. The layout style and transitions are managed
 * based on the state of the `bottomShow` flag.
 */
const MainContainer = (props): JSX.Element => {
  const [bottomShow, setBottomShow] = useState(false);
  const dispatch = useDispatch();
  const screenshotTrigger = useSelector(
    (store: RootState) => store.appState.screenshotTrigger
  );
  const id: string = useSelector((store: RootState) => store.appState._id);
  // const { style } = useSelector((store: RootState) => ({
  //   style: store.styleSlice
  // }));
  const style = useSelector((store: RootState) => store.styleSlice);
  const containerRef: React.RefObject<HTMLDivElement> = useRef(null);

  // refs and states for contextMenu
  let [contextMenuOpen, setContextMenuOpen] = useState(false);
  let [contextMenuColor, setContextMenuColor] = useState('orange');

  const ContextMenuRef = useRef(null);

  const MouseXRef = useRef(0);
  const MouseYRef = useRef(0);

  const [mouseXState, setMouseXState] = useState(0);
  const [mouseYState, setMouseYState] = useState(0);

  const [contextMenuSelectedElement, setContextMenuSelectedElement] =
    useState(null);
  //

  // useEffect hook to detect and execute changes in screenshotTrigger, taking a screenshot of the canvas when a project is published on NavBar
  useEffect(() => {
    const handleScreenshot = async (): Promise<Buffer | void> => {
      if (screenshotTrigger) {
        try {
          const canvas: HTMLCanvasElement = await html2canvas(
            containerRef.current
          );
          const screenshotURL: string = canvas.toDataURL('image/png');
          const imgBuffer: Buffer | void = Buffer.from(
            screenshotURL.replace(/^data:image\/\w+;base64,/, ''),
            'base64'
          );
          dispatch(toggleScreenshotTrigger());
          return imgBuffer;
        } catch (error) {
          alert('Error capturing screenshot: ' + error);
        }
      }
    };
    handleScreenshot().then((imgBuffer: Buffer | void) => {
      if (imgBuffer) {
        uploadScreenshotS3(imgBuffer);
      }
    });
  }, [screenshotTrigger]);

  // use effect for contextMenu listeners
  useEffect(() => {
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault(); // grab that event trigger, or maybe this writes to something, idk
      if (
        ContextMenuRef.current != null &&
        ContextMenuRef.current.contains(e.target)
      ) {
        return; // if it is not nul and we are clicking in it.
      }
      setContextMenuSelectedElement(e.target); // get it set it
      if (e.target.id === 'clickmeButton') {
        setContextMenuColor('purple');
      } else {
        setContextMenuColor('orange');
      }
      setMouseXState(MouseXRef.current);
      setMouseYState(MouseYRef.current); // now trigger a re-render
      setContextMenuOpen(true);
    });
    onmousemove = function (e) {
      MouseXRef.current = e.clientX; // this is a use ref, not use state, so we dont trigger a re-render.
      MouseYRef.current = e.clientY;
    };
  }, [contextMenuOpen]);

  // use effect for click events (to check if contextMenu is in need of closing.)
  // useEffect(() => {
  //   document.addEventListener('click', (e) => {

  //   });
  // }, [ContextMenuRef, contextMenuOpen]);

  const uploadScreenshotS3 = async (imgBuffer) => {
    Amplify.configure(awsconfig);

    async function checkStorageConnection() {
      try {
        // await Storage.list(''); // This is just a test operation
      } catch (error) {
        console.error('Error connecting to AWS S3:', error);
      }
    }

    // Call this function to check the connection
    checkStorageConnection();
    try {
      await Storage.put(id, imgBuffer, {
        contentType: 'image/png'
      });
    } catch (error) {
      alert('Error uploading screenshot: ' + error);
    }
  };

  //Logic to close the bottompanel when clicking outside of it
  const useOutsideClick = () => {
    const bottomPanelRef = useRef(null);

    useEffect(() => {
      const handleClick = (event) => {
        if (
          event.type === 'click' &&
          ContextMenuRef.current != null &&
          !ContextMenuRef.current.contains(event.srcElement) &&
          contextMenuOpen === true
        ) {
          setContextMenuOpen(false); // close on click-out
        }
        if (
          (event.type === 'click' &&
            bottomPanelRef.current &&
            !bottomPanelRef.current.contains(event.target) &&
            event.target.getAttribute('role') != 'menu' &&
            !event.target.classList.contains('MuiInput-input')) ||
          (event.type === 'message' && event.data === 'iframeClicked')
        ) {
          //menuButtonRef is to ensure that handleClose does not get invoked when the user clicks on the menu dropdown button
          handleClose();
        }
      };
      window.addEventListener('click', handleClick, true);
      window.addEventListener('message', handleClick); //to capture clicks in the iframe

      return () => {
        window.removeEventListener('click', handleClick, true);
        window.addEventListener('message', handleClick); //cleanup for memory purposes. ensures handleclick isn't called after the component is no longer rendered
      };
    }, [bottomPanelRef, contextMenuOpen]);

    return bottomPanelRef;
  };

  const ref = useOutsideClick();

  const handleClose = () => {
    setBottomShow(false);
  };

  const hideBottomPanelStyles = {
    maxHeight: '64px',
    boxSizing: 'border-box',
    transition: 'all 0.5s ease-in-out'
  };

  const showBottomPanelStyles = {
    maxHeight: '100%',
    transition: 'all 0.5s ease-in-out'
  };

  return (
    <div className="main-container" style={style} ref={containerRef}>
      {contextMenuOpen && (
        <ContextMenu
          selectedItem={contextMenuSelectedElement}
          targetColor={contextMenuColor}
          PanRef={ContextMenuRef}
          visible={contextMenuOpen}
          setContextMenuOpen={setContextMenuOpen}
          mouseXState={mouseXState}
          mouseYState={mouseYState}
        />
      )}
      <div className="main">
        <CanvasContainer isThemeLight={props.isThemeLight} />
        <DemoRender />
      </div>
      <div
        ref={ref}
        style={bottomShow ? showBottomPanelStyles : hideBottomPanelStyles}
      >
        <BottomPanel
          bottomShow={bottomShow}
          setBottomShow={setBottomShow}
          isThemeLight={props.isThemeLight}
        />
      </div>
    </div>
  );
};
export default MainContainer;
