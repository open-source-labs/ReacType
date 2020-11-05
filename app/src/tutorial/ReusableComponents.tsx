import React from 'react';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';

// import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const ReusableComponents: React.FC<RouteComponentProps> = () => {

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
      <h1 className={classes.title}>Reusable Components Tutorial</h1>

      <div className={classes.wrapper}>
        <h1 className={classes.title}>Reusable Components</h1>
        <p className={classes.text}>To add a Reusable Component, use the top left input form to name a Component. Then select add to create a new Component.</p>
        <p className={classes.text}>The Components you create will populate the left container under the section called 'Reusable Components'.</p>
        <p className={classes.text}>After creating the desired Component, you can now use the components with the drag-n-drop functionality. 
          If you'd like to know about about the drag-n-drop functionality, please locate the tag Canvas Tutorial for more information on how it works.
        </p>
        <p className={classes.text}>You can place a reusable component inside Pages and populate the component itself with the HTML Elements.</p>
        
      </div>
    </div>
  );
};

export default withRouter(ReusableComponents);

