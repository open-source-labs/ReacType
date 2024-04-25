import React, { useEffect, useRef, useState } from 'react';
import BottomTabs from './BottomTabs';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

const BottomPanel = (props): JSX.Element => {
  let y: number = 0;
  let h: number = 0;
  const node = useRef() as React.MutableRefObject<HTMLDivElement>;

  const [isDragging, setIsDragging] = useState(false);

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
    if (!props.bottomShow) return; // prevent drag calculation to occur when bottom menu is not showing

    const dy = y - e.clientY;
    const newHeight = h + dy;

  const styles = window.getComputedStyle(node.current);
  const minHeight = parseInt(styles.minHeight, 10);
  const maxHeight = window.innerHeight * 0.8; // Set a maximum height, e.g., 90% of window height

  node.current.style.height = `${Math.max(minHeight, Math.min(maxHeight, newHeight))}px`;
  };

  const mouseUpHandler = function () {
    // puts false in callback queue after OnDragStart sets to true (b/c react 17 doesn't have onDragEnd)
    setTimeout(() => setIsDragging(false), 0);
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);
    window.removeEventListener('message', handleIframeMessage);
  };

  useEffect(() => {
    if (props.bottomShow) {
      node.current.style.height = '50vh'; // Initial height when bottom panel is open
      node.current.style.minHeight = '20vh'; // Minimum height when bottom panel is open
    } else {
      node.current.style.height = '0.1'; // Initial height when bottom panel is closed
      node.current.style.minHeight = '0.1'; // Minimum height when bottom panel is closed
    }
  }, [props.bottomShow]);

  return (
    <>
      <div className="bottom-panel" id="resize" ref={node} >
        <div
          id="resize-drag"
          onMouseDown={mouseDownHandler}
          draggable
          onDragStart={() => setIsDragging(true)}
          onClick={() => !isDragging && props.setBottomShow(!props.bottomShow)}
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
