import React from 'react';
import Canvas from './Canvas';

// The CanvasContainer sets the boundaries on the width/height of the canvas
function CanvasContainer() {
  const canvasContainerStyle = {
    width: '100%',
    backgroundColor: 'lightgrey',
    border: '2px Solid grey',
  };

   function onChangeHandler(event) {
     console.log('working', event.target);
   }

  return (
    <div style={canvasContainerStyle}>
      <Canvas />
    </div>
  );
}

export default CanvasContainer;
