import React, { useEffect, useRef } from 'react';
import BottomTabs from './BottomTabs';

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
  };

  const mouseMoveHandler = function (e: MouseEvent): void {
    // How far the mouse has been moved
    const dy = y - e.clientY;

    // Adjust the dimension of element
    const newVal = h + dy;
    const styles = window.getComputedStyle(node.current);
    const min = parseInt(styles.minHeight, 10);
    node.current.style.height = newVal > min ? `${h + dy}px` : `${min}px`;
  };

  const mouseUpHandler = function () {
    // Remove the handlers of `mousemove` and `mouseup`
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);
  };

  useEffect(() => {
    node.current.style.height = '50vh';
    node.current.style.minHeight = '50vh';
  }, []);

  return (
    <>
    <div className="bottom-panel" id="resize" ref={node}>
      <div id="resize-drag" onMouseDown={mouseDownHandler} tabIndex={0}>
        ......
      </div>
      <BottomTabs setBottomShow = {props.setBottomShow} isThemeLight={props.isThemeLight} />
    </div></>
  );
};

export default BottomPanel;
