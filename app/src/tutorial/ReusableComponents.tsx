import React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';

// import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

//images
import reusablecomponents1 from '../../../resources/reusable_components_tutorial_images/reusablecomponents1.png';
import reusablecomponents2 from '../../../resources/reusable_components_tutorial_images/reusablecomponents2.png';
import reusablecomponents3 from '../../../resources/reusable_components_tutorial_images/reusablecomponents3.png';

const ReusableComponents: React.FC<{
  classes: any;
  setPage: Function;
}> = ({ classes, setPage }) => {
  return (
    <div className={classes.wrapper}>
      <h1 className={classes.title}>Reusable Components Tutorial</h1>

      <div className={classes.wrapper}>
        <h1 className={classes.title}>Reusable Components</h1>
        <p className={classes.text}>To add a Reusable Component, use the top left input form to name a Component. Then select add to create a new Component.</p>
        
        <div className={classes.imgWrapper}>
          <img src={reusablecomponents1} />
        </div>
        <p className={classes.text}>The Components you create will populate the left container under the section called 'Reusable Components'.</p>

        <div className={classes.imgWrapper}>
          <img src={reusablecomponents2} />
        </div>

        <p className={classes.text}>After creating the desired Component, you can now use the components with the drag-n-drop functionality. 
          If you'd like to know about about the drag-n-drop functionality, please locate the tag Canvas Tutorial for more information on how it works.
        </p>

        <div className={classes.imgWrapper}>
          <img src={reusablecomponents3} />
        </div>

        <p className={classes.text}>You can place a reusable component inside Pages and populate the component itself with the HTML Elements.</p>
        
      </div>
    </div>
  );
};

export default ReusableComponents;

