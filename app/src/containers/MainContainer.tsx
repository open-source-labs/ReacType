import React, { useRef, useEffect } from 'react';
import BottomPanel from '../components/bottom/BottomPanel';
import CanvasContainer from '../components/main/CanvasContainer';
import DemoRender from '../components/main/DemoRender';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { toggleScreenshotTrigger } from '../redux/reducers/slice/appStateSlice';
import html2canvas from 'html2canvas';
import { Buffer } from 'buffer';
import { Amplify, Storage } from 'aws-amplify';
import awsconfig from '../../../src/aws-exports';

const MainContainer = (props): JSX.Element => {
  const dispatch = useDispatch();
  const screenshotTrigger = useSelector((store: RootState) => store.appState.screenshotTrigger); 
  const id: string = useSelector((store: RootState) => store.appState._id); 
  const { isDarkMode, style } = useSelector((store) => ({
    isDarkMode: store.darkMode.isDarkMode,
    style: store.styleSlice, 
  }));
  const containerRef: React.RefObject<HTMLDivElement> = useRef(null);

  // useEffect hook to detect and execute changes in screenshotTrigger, taking a screenshot of the canvas when a project is published on NavBar
  useEffect(() => { 
    const handleScreenshot = async (): Promise<Buffer | void> => {
      if (screenshotTrigger) {
        try {
          const canvas: HTMLCanvasElement = await html2canvas(containerRef.current);
          const screenshotURL: string = canvas.toDataURL('image/png');
          const imgBuffer: Buffer | void  = Buffer.from(screenshotURL.replace(/^data:image\/\w+;base64,/, ''), 'base64');
          dispatch(toggleScreenshotTrigger());
          return imgBuffer;
        } catch (error) {
          alert('Error capturing screenshot: ' + error);
        }
      }
    }
    handleScreenshot().then((imgBuffer: Buffer | void) => {
      if (imgBuffer) {
        uploadScreenshotS3(imgBuffer); 
      }
    });
  }, [screenshotTrigger]);

  const uploadScreenshotS3 = async (imgBuffer) => {
    Amplify.configure(awsconfig);

    async function checkStorageConnection() {
      try {
        // await Storage.list(''); // This is just a test operation
        // console.log('Connected to AWS S3 successfully.');
      } catch (error) {
        console.error('Error connecting to AWS S3:', error);
      }
    }

    // Call this function to check the connection
    checkStorageConnection();
    try {
      await Storage.put(id, imgBuffer, {
        contentType: 'image/png',
      });
    } catch (error) {
      alert('Error uploading screenshot: ' + error);
    }
  }

  return (
    <div className="main-container" style={style} ref={containerRef}>
      <div className="main" >
        <CanvasContainer isThemeLight={props.isThemeLight} />
        <DemoRender />
      </div>
      <div className="bottom-hide" >
        <BottomPanel isThemeLight={props.isThemeLight} />
      </div>
    </div>
  );
};
export default MainContainer;
