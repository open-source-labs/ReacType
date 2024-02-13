import React, { useEffect, useRef } from 'react';
import BottomTabs from './BottomTabs';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

const BottomPanel = (props): JSX.Element => {
  let y: number = 0;
  let h: number = 0;
  const node = useRef() as React.MutableRefObject<HTMLDivElement>;

  const mouseDownHandler = (e): void => {
    y = e.clientY;

    const styles = window.getComputedStyle(node.current);
    h = parseInt(styles.height, 10);

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
    window.addEventListener('message', handleIframeMessage); //listens for messages from the iframe when the mouse is over it
  };

  //Interpret the messages from the iframe
  const handleIframeMessage = (e) => {
    if (e.data === 'iframeMouseUp') {
      mouseUpHandler();
    } else if (e.data.type === 'iframeMouseMove') {
      mouseMoveHandler(e.data);
    }
  };

  const mouseMoveHandler = function (e: MouseEvent): void {
    const dy = y - e.clientY;

    const newVal = h + dy;
    const styles = window.getComputedStyle(node.current);
    const min = parseInt(styles.minHeight, 10);
    node.current.style.height = newVal > min ? `${h + dy}px` : `${min}px`;
  };

  const mouseUpHandler = function () {
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);
    window.removeEventListener('message', handleIframeMessage);
  };

  useEffect(() => {
    node.current.style.height = '50vh';
    node.current.style.minHeight = '50vh';
  }, []);

  return (
    <>
      <div className="bottom-panel" id="resize" ref={node}>
        <div
          id="resize-drag"
          onMouseDown={mouseDownHandler}
          onClick={() => props.setBottomShow(true)}
          tabIndex={0}
        >
          {props.bottomShow ? <ExpandMore /> : <ExpandLess />}
        </div>
        <BottomTabs
          setBottomShow={props.setBottomShow}
          isThemeLight={props.isThemeLight}
        />
      </div>
    </>
  );
};

export default BottomPanel;
