import React from 'react';
import reusableComponents1 from '../../../resources/reusable_components_tutorial_images/reusablecomponents1.png';
import reusableComponents2 from '../../../resources/reusable_components_tutorial_images/reusablecomponents2.png';
import reusableComponents3 from '../../../resources/reusable_components_tutorial_images/reusablecomponents3.png';

const ReusableComponents: React.FC<{
  classes: any;
  setPage: Function;
}> = ({ classes, setPage }) => {
  return (
    <div className={classes.wrapper}>
      <h1 className={classes.title}>Reusable Components</h1>
      <hr/>
      <p className={classes.text}>To add a Reusable Component, use the New Component input form in the Creation Panel to name a Component. Leave the Root/Page checkbox unchecked. Then click Create to add a new Reusable Component.</p>
      <div className={classes.imgWrapper}>
        <img className={classes.img} src={reusableComponents1} />
      </div>
      <hr/>
      <p className={classes.text}>The Components you create will populate on the left panel under the section 'Reusable Components'.</p>
      <div className={classes.imgWrapper}>
        <img className={classes.img} src={reusableComponents2} />
      </div>
      <hr/>
      <p className={classes.text}>After creating the desired Component, you can now drag-n-drop to the Canvas.
        If you'd like to know about about the drag-n-drop functionality, please locate the <span className={classes.notLink} onClick={() => setPage('Canvas')} >Canvas Tutorial</span> for more information on how it works.
      </p>
      <div className={classes.imgWrapper}>
        <img className={classes.img} src={reusableComponents3} />
      </div>
      <p className={classes.text}>You can place a reusable component inside <span className={classes.notLink} onClick={() => setPage('Pages')} >Pages</span> and populate the component itself with other <span className={classes.notLink} onClick={() => setPage('HTML_Elements')} >HTML Elements</span>.</p>
      <hr/>
    </div>
  );
};

export default ReusableComponents;

