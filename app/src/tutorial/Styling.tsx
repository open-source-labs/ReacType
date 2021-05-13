import React from 'react';
import theme from '../../../resources/customizing_elements_images/Theme.png';
import lighting from '../../../resources/customizing_elements_images/Lighting.png';
import resize from '../../../resources/customizing_elements_images/Resize.gif';
import codeChange from '../../../resources/customizing_elements_images/CodeChange.png';


const Styling: React.FC<{
  classes: any;
  setPage: Function;
}> = ({ classes, setPage }) => {
  return (
    <div className={classes.wrapper}>
      <h1 className={classes.title}>Styling Features</h1>
      <hr />
      <h2>Dark Mode</h2>
      <div className={classes.imgWrapper}>
        <img src={lighting} />
      </div>
      <p className={classes.text}>
        Spice up the app and ease the strian on your eyes by switching to DARK MODE. DARK
        MODE will change the background and text colors of the app.
      </p>
      <hr />
      <h2>Resize Code Preview & Component Tree</h2>
      <div className={classes.imgWrapper}>
        <img className={classes.img} src={resize} />
      </div>
      <p className={classes.text}>
        Hover over the line above the <span className={classes.notLink} onClick={() => setPage('Code Preview')} >code preview</span> and/or <span className={classes.notLink} onClick={() => setPage('Component Tree')} >component tree</span> to
        resize the section. Simply click and drag up or down to resize.
      </p>
      <hr />
      <h2>Customize Code Preview</h2>
      <div className={classes.imgWrapper}>
        <img className={classes.img} src={codeChange} />
      </div>
      <p className={classes.text}>
        You can manually change your code in the <span className={classes.notLink} onClick={() => setPage('Code Preview')} >code preview</span> before exporting and see the changes reflected in your exported
        file!
      </p>
      <hr />
    </div>
  );
};

export default Styling;
