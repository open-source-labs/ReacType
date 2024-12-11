import React from 'react';

const CONTEXT_MENU_WIDTH = 100;
const CONTEXT_MENU_HEIGHT = 200;

function ContextMenu(props) {
  let xOff = props.mouseXState + 2;
  if (props.mouseXState > window.innerWidth - CONTEXT_MENU_WIDTH) {
    xOff -= CONTEXT_MENU_WIDTH; // move it "flip" it back
    xOff -= 4;
  }

  let yOff = props.mouseYState + 2;
  if (props.mouseYState > window.innerHeight - CONTEXT_MENU_HEIGHT) {
    yOff -= CONTEXT_MENU_HEIGHT; // bump "flip" it up
    yOff -= 4; // move it back 4px cause we moved it forward 2px;
  }

  return (
    // mouseX and mouseY are not use state,
    // so if they change, this will not change unless it rerenders.

    <h1
      style={{
        backgroundColor: props.targetColor,
        zIndex: '988',
        margin: '0px',
        padding: '0px',
        position: 'absolute',
        left: `${xOff}px`,
        top: `${yOff}px`,
        width: `${CONTEXT_MENU_WIDTH}px`,
        height: `${CONTEXT_MENU_HEIGHT}px`
      }}
      ref={props.PanRef}
    >
      <button style={{ padding: '0px', margin: '0px', width: '100%' }}>
        d1
      </button>
      <button style={{ padding: '0px', margin: '0px', width: '100%' }}>
        d1
      </button>
      <button style={{ padding: '0px', margin: '0px', width: '100%' }}>
        d1
      </button>
      <button style={{ padding: '0px', margin: '0px', width: '100%' }}>
        d1
      </button>
      <button style={{ padding: '0px', margin: '0px', width: '100%' }}>
        d1
      </button>
    </h1>
  );
}
export default ContextMenu;
