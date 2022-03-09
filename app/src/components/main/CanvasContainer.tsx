import React from 'react';
import Canvas from './Canvas';

// The CanvasContainer sets the boundaries on the width/height of the canvas
function CanvasContainer(props): JSX.Element {
  const canvasContainerStyle = {
    width: '100%',
    backgroundColor: 'lightgrey',
    border: '2px Solid grey',
  };

  return (
    <div style={canvasContainerStyle}>
      
      <Canvas isThemeLight={props.isThemeLight}/>
    </div>
  );
}

export default CanvasContainer;
