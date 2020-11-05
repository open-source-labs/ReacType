import React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';

// import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const CodePreview: React.FC<{
  classes: any;
  setPage: Function;
}> = ({ classes, setPage }) => {
  return (
    <div className={classes.wrapper}>
      <h1 className={classes.title}>Code Preview</h1>
      <div className={classes.wrapper}>
        <p className={classes.text}>The code preview is located at the bottom center of the page on the first tab.</p>
        <p className={classes.text}>In the preview, the code will load functional components.</p>
        <p className={classes.text}>This preview will populate and generate in real-time as you use the drag-n-drop functionality with the canvas.</p>
        <p className={classes.text}>To learn more about the canvas, find the tutorial labeled "Canvas".</p>
      </div>
    </div>
  );
};

export default CodePreview;

