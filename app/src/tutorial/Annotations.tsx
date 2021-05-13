import React from 'react';
import noteButton from '../../../resources/annotations_tutorial_images/NoteButton.gif';
import annotation from '../../../resources/annotations_tutorial_images/Annotation.gif';

const Annotations: React.FC<{
  classes: any;
  setPage: Function;
}> = ({ classes, setPage }) => {
  return (
    <div className={classes.wrapper}>
      <h1 className={classes.title}>Annotations</h1>
      <hr />
      <p className={classes.text}>
        Write any notes you want for each element or component on the canvas by clicking the Notes button.<br/><br/>
        <div className={classes.imgWrapper}>
          <img className={classes.img} src={noteButton}/>
        </div>
        <br/>
        Once clicked, the annotation window will appear where you are able to write text in. To close the annotation window,
        simply click anywhere outside the window and the notes will be saved. <br></br>
        Any notes written will persist throughout the project, even when swapping between Root level components.<br/><br/>
        <div className={classes.imgWrapper}>
          <img className={classes.img} src={annotation}/>
        </div>      
      </p>
      <hr />
    </div>
  );
};

export default Annotations;
