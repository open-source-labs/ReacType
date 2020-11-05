import React from 'react';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import links2 from '../../../resources/route_links_tutorial_images/links2.png';
import links3 from '../../../resources/route_links_tutorial_images/links3.png';
import links4 from '../../../resources/route_links_tutorial_images/links4.png';
import links6 from '../../../resources/route_links_tutorial_images/links6.png';
import linksCanvas from '../../../resources/route_links_tutorial_images/links-canvas.png';
// import Grid from '@material-ui/core/Grid';

// import ComponentPanel from '../components/left/ComponentPanel';
// import HTMLPanel from '../components/left/HTMLPanel';

// Left-hand portion of the app, where component options are displayed

const ComponentTree: React.FC<RouteComponentProps> = () => {
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
    smallImg: {
      borderRadius: '3px',
      height: '300px',
      marginRight: '20px'
    },
    largeImg: {
      height: '700px'
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
      <h1 className={classes.title}>Next.js Route Links</h1>
      <h2>Route Links are only available for Next.js projects.</h2>
      <p className={classes.text}>Users are able to drag-and-drop 'Link' components onto the canvas which allow navigation to different pages.</p>
      <div className={classes.imgWrapper}>
        <img className={classes.largeImg} src={linksCanvas}></img>
      </div>
      <p className={classes.text}>Each page found in the 'Pages' section can be navigated to via a 'Link'. Clicking on the 'Route Link' dropdown will display all the created pages in your application.</p>
      <div className={classes.imgWrapper}>
        <img className={classes.smallImg} src={links2}></img>
        <img className={classes.smallImg} src={links3}></img>
      </div>
      <p className={classes.text}>The code generator will automatically <code>import Link from 'next/link'</code> and create your Link component in the bottom panel.</p>
      <div className={classes.imgWrapper}>
        <img className={classes.largeImg} src={links4}></img>
      </div>
      <p className={classes.text}>Clicking on a Link component on the canvas will navigate to the corresponding page.</p>
      <div className={classes.imgWrapper}>
        <img className={classes.smallImg} src={links6}></img>
      </div>
      <p className={classes.text}>For more information on 'Link' for Next.js, please <a href="https://nextjs.org/docs/api-reference/next/link" target="_blank">visit the official documentation on nextjs.org.</a></p>
      <Link to={`/tutorial`}>
        <button>Tutorial</button>
      </Link>
    </div>
  );
};

export default withRouter(ComponentTree);