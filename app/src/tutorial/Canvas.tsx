import React from 'react';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';

// import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

//images
import canvas1 from '../../../resources/canvas_tutorial_images/canvas1.png';
import drag1 from '../../../resources/canvas_tutorial_images/drag1.png';

const Canvas: React.FC<RouteComponentProps> = () => {

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

  return (
    <div className={classes.wrapper}>
      <h1 className={classes.title}>Canvas Tutorial</h1>

      <div className={classes.wrapper}>
          <h1 className={classes.title}>Canvas</h1>
          <p className={classes.text}>The canvas is located at the center of the page. </p>
          
          <div className={classes.imgWrapper}>
            <img className={classes.img} src={canvas1}/>
          </div>

          <h1 className={classes.title}>Drag-n-Drop</h1>
          <p className={classes.text}>The drag-n-drop functionality is implemented for the canvas to be populated.</p>
          <p className={classes.text}>This functionality can be located on the entire left container of the application.</p>
          <p className={classes.text}>Select a given HTML tag or a custom HTML tag, click and hold to drag on to a reusable components or page.</p>

          <div className={classes.imgWrapper}>
            <img className={classes.img} src={drag1}/>
          </div>

          <p className={classes.text}>Select a reusable component, click and hold to drag on to a page.</p>
          <p className={classes.text}>Drag the selected item on to the center canvas.</p>
      </div>
    </div>
  );
};

export default withRouter(Canvas);

