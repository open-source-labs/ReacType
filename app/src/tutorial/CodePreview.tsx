import React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';

// import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const CodePreview: React.FC<RouteComponentProps> = () => {

  const body = document.querySelector('body');
  body.style.overflowY = 'auto';
  const useStyles = makeStyles({
    title: {
      color: '#14151f',
      fontSize: 54
    },
    text: {
      color: '#2e2f3e',
      fontSize: 24
    },
    wrapper: {
      margin: '30px 30px 30px 30px',
      width: 'auto'
    },
    img: {
      borderRadius: '3px',
      // alignSelf: 'center'
    },
    imgWrapper: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      // border: '1px solid black',
      width: 'auto'
    }
  });

  const classes = useStyles();

<<<<<<< HEAD
  return (
    <div className={classes.wrapper}>
      <h1 className={classes.title}>Code Preview</h1>
      <div className={classes.wrapper}>
        <p className={classes.text}>The code preview is located at the bottom center of the page on the first tab.</p>
        <p className={classes.text}>In the preview, the code will load functional components.</p>
        <p className={classes.text}>This preview will populate and generate in real-time as you use the drag-n-drop functionality with the canvas.</p>
        <p className={classes.text}>To learn more about the canvas, find the tutorial labeled "Canvas".</p>
      </div>
=======
const CodePreview: React.FC<{
  classes: any;
  setPage: Function;
}> = ({ classes, setPage }) => {
  return (
    <div>
      CodePreview
>>>>>>> 2a650b9c905f532c943c7a8fc17e18e4fdc68eb4
    </div>
  );
};

export default CodePreview;

