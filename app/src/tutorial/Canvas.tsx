import React from 'react';

//images
import canvas1 from '../../../resources/canvas_tutorial_images/canvas1.png';
import drag1 from '../../../resources/canvas_tutorial_images/drag1.png';

const Canvas: React.FC<{
  classes: any;
  setPage: Function;
}> = ({ classes, setPage }) => {
  return (
    <div className={classes.wrapper}>
      <h1 className={classes.title}>Canvas</h1>
      <hr />
      <p className={classes.text}>The canvas is located at the center of the page. </p>
      <div className={classes.imgWrapper}>
        <img className={classes.img} src={canvas1}/>
      </div>
      <hr/>
      <h1 className={classes.title}>Drag-n-Drop</h1>
      <p className={classes.text}>The drag-n-drop functionality is implemented for the canvas to be populated.<br/>
      This functionality can be located in the left container of the application for elements, and the right container for components.<br/>
      Select a given <span className={classes.notLink} onClick={() => setPage('HTML_Elements')} >HTML Element</span>, custom <span className={classes.notLink} onClick={() => setPage('HTML_Elements')} >HTML Element</span>, or <span className={classes.notLink} onClick={() => setPage('Reusable_Components')} >reusable component</span>, click and hold to drag on to a reusable components or page.
      </p>
      <div className={classes.imgWrapper}>
        <img src={drag1}/>
      </div>
      <hr/>
      <p className={classes.text}>Select a <span className={classes.notLink} onClick={() => setPage('Reusable_Components')} >reusable component</span>, click and hold to drag on to a page.<br/>
      Drag the selected item on to the center canvas.</p>
      <hr/>
      <h1 className={classes.title}>Keyboard Shortcuts</h1>
        <h2 className={classes.text}>Mac</h2>
          <ul className={classes.text}>
            <li>Undo: Command + z</li>
            <li>Redo: Command + Shift + z</li>
            <li>Save Project As: Command + s</li>
            <li>Save Project: Command + shift + s</li>
            <li>Delete HTML Tag on Canvas: Backspace</li>
            <li>Delete Project: Command + Backspace</li>
            <li>Open Project: Command + o</li>
          </ul>
        <h2 className={classes.text}>Windows</h2>
          <ul className={classes.text}>
            <li>Undo: Control + z</li>
            <li>Redo: Control + Shift + z</li>
            <li>Save Project As: Control + s</li>
            <li>Save Project: Control + shift + s</li>
            <li>Delete HTML Tag on Canvas: Backspace</li>
            <li>Delete Project: Control + Backspace</li>
            <li>Open Project: Control + o</li>
          </ul>
        <hr/>
    </div>
  );
};

export default Canvas;

