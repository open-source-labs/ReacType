/* eslint-disable max-len */
import React, { useEffect, useRef, useState } from 'react';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import BottomTabs from './BottomTabs';

/**
 * A resizable bottom panel component that can be toggled and resized using mouse interactions.
 * The component includes a draggable area that listens for mouse down, move, and up events to adjust the height of the panel.
 * It also handles iframe messages to synchronize dragging events that occur over an iframe.
 *
 * @param {Object} props - Component props.
 * @param {boolean} props.bottomShow - A boolean indicating if the bottom panel is visible.
 * @param {Function} props.setBottomShow - Function to toggle the visibility of the bottom panel.
 * @param {boolean} props.isThemeLight - Theme flag used by the BottomTabs component to determine the styling.
 *
 * @returns {JSX.Element} A React element representing the bottom panel which includes a draggable divider that can toggle the panel's visibility and a tabs component.
 */
const BottomPanel = (props): JSX.Element => {
  let y = 0;
  let h = 0;
  const node = useRef() as React.MutableRefObject<HTMLDivElement>;

  const [isDragging, setIsDragging] = useState(false);

  const mouseDownHandler = (e): void => {
    y = e.clientY;

    const styles = window.getComputedStyle(node.current);
    h = parseInt(styles.height, 10);

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
    window.addEventListener('message', handleIframeMessage); // listens for messages from the iframe when the mouse is over it
  };

  // Interpret the messages from the iframe
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

    node.current.style.height = `${Math.max(
      minHeight,
      Math.min(maxHeight, newHeight),
    )}px`;
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
      <div className="bottom-panel" id="resize" ref={node}>
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
