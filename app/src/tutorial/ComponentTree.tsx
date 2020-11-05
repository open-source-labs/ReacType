import React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import AccountTreeIcon from '@material-ui/icons/AccountTree';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import tree1 from '../../../resources/tree_tutorial_images/tree1.png';
import tree2 from '../../../resources/tree_tutorial_images/tree2.png';
import tree3 from '../../../resources/tree_tutorial_images/tree3.png';
import tree4 from '../../../resources/tree_tutorial_images/tree4.png';
import tree5 from '../../../resources/tree_tutorial_images/tree5.png';
import pages from '../../../resources/tree_tutorial_images/pages.png';
import re_comps from '../../../resources/tree_tutorial_images/re_comps.png';
// import Grid from '@material-ui/core/Grid';

// import ComponentPanel from '../components/left/ComponentPanel';
// import HTMLPanel from '../components/left/HTMLPanel';

// Left-hand portion of the app, where component options are displayed

const ComponentTree: React.FC<{
  classes: any;
  setPage: Function;
}> = ({ classes, setPage }) => {
  return (
    <div className={classes.wrapper}>
      <h1 className={classes.title}>React Component Tree</h1>
      <h2></h2>
      <p className={classes.text}>The tree provides the developer with a visual representation of the component hierarchy. The tree updates in real time as the developer adds or deletes components.</p>
      <div className={classes.imgWrapper}>
        <img className={classes.img} src={tree1}></img>
      </div>
      <p className={classes.text}>Each tree begins with a root node. The current page that is selected represents the root node.</p>
      <div className={classes.imgWrapper}>
        {/* <img className={classes.img} src={pages}></img> */}
        <img className={classes.img} src={tree2}></img>
      </div>
      <p className={classes.text}>Reusable components are shown attached to the current page along with their subtrees of components and HTML elements.</p>
      <div className={classes.imgWrapper}>
        {/* <img className={classes.img} src={re_comps}></img> */}
        <img className={classes.img} src={tree3}></img>
      </div>
      <p className={classes.text}>HTML elements are shown by their tag name.</p>
      <div className={classes.imgWrapper}>
        <img className={classes.img} src={tree4}></img>
      </div>
      <p className={classes.text}>You can also view the tree for each reusable component.</p>
      <div className={classes.imgWrapper}>
        <img className={classes.img} src={tree5}></img>
      </div>
    </div>
  );
};

export default ComponentTree;
