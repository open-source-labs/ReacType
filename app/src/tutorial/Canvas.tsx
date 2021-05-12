import React from 'react';

//images
import canvas1 from '../../../resources/canvas_tutorial_images/canvas1.png';
import drag1 from '../../../resources/canvas_tutorial_images/drag1.png';
import undoRedo from '../../../resources/canvas_tutorial_images/undoRedo.gif';

const Canvas: React.FC<{
  classes: any;
  setPage: Function;
}> = ({ classes, setPage }) => {
  return (
    <div className={classes.wrapper}>
      <h1 className={classes.title}>Canvas</h1>
      <hr />
      <p className={classes.text}>The canvas is located in the left center panel of the application and is where all 
      the HTML elements and components of the prototype application are displayed. </p>
      <div className={classes.imgWrapper}>
        <img className={classes.img} src={canvas1}/>
      </div>
      <hr/>
      <h1 className={classes.title}>Drag-n-Drop</h1>
      <p className={classes.text}>The drag and drop functionality is used to populate the canvas with HTML elements and 
      reusable components from the left panel.<br/><br/>
      To use the drag and drop functionality, select the desired <span className={classes.notLink} onClick={() => setPage('HTML_Elements')}>
      HTML Element</span>, custom <span className={classes.notLink} onClick={() => setPage('HTML_Elements')}>HTML Element</span>, or 
      <span className={classes.notLink} onClick={() => setPage('Reusable_Components')}> reusable component</span> then click and hold it 
      to drag it onto the canvas. <br/><br/>
      HTML elements and reusable components can be placed within each other on the canvas to nest them.<br/>
      </p>
      <div className={classes.imgWrapper}>
        <img src={drag1}/>
      </div>
      <hr/>
      <h1 className={classes.title}>Undo and Redo</h1>
      <p className={classes.text}> The undo functionality is implemented to revert the user's last action.  Redo will reperform the user's last undid action.
      </p>
      <div className={classes.imgWrapper}>
        <img src={undoRedo}/>
      </div>
      <h1 className={classes.title}>Keyboard Shortcuts</h1>
        <h2 className={classes.text}>Mac</h2>
          <ul className={classes.text}>
            <li>Export Project: Command + e</li>
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
            <li>Export Project: Control + e</li>
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
