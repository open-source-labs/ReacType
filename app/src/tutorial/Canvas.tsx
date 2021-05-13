import React from 'react';
import canvas1 from '../../../resources/canvas_tutorial_images/canvas1.png';
import drag1 from '../../../resources/canvas_tutorial_images/drag1.gif';
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
      To use the drag and drop functionality, select the desired <span className={classes.notLink} onClick={() => setPage('HTML Elements')}>
      HTML element</span>, custom <span className={classes.notLink} onClick={() => setPage('HTML Elements')}>HTML element</span>, or 
      <span className={classes.notLink} onClick={() => setPage('Reusable Components')}> reusable component</span> then click and hold it 
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
      <hr/>
    </div>
  );
};

export default Canvas;
