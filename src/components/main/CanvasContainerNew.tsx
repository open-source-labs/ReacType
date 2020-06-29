import React from 'react';
import Canvas from './CanvasNew';

// The CanvasContainer sets the boundaries on the width/height of the canvas
function CanvasContainer() {
  const canvasContainerStyle = {
    width: '1000px',
    height: '100%',
    backgroundColor: 'lightgrey',
    border: '2px Solid grey',
    overflowY: 'auto'
  };

  return (
    <div style={canvasContainerStyle}>
      <Canvas />
    </div>
  );
}

export default CanvasContainer;
