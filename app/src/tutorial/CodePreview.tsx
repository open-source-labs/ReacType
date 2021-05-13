import React from 'react';
import codePreview from '../../../resources/code_preview_images/CodePreview.png';

const CodePreview: React.FC<{
  classes: any;
  setPage: Function;
}> = ({ classes, setPage }) => {
  return (
    <div className={classes.wrapper}>
      <h1 className={classes.title}>Code Preview</h1>
      <hr/>
        <p className={classes.text}>The code preview is located at the bottom center panel of the page on the fourth tab.<br/><br/>
        The code preview will generate the lines of code for functional components. As you drag and drop elements or components onto the <span className={classes.notLink} onClick={() => setPage('Canvas')} >canvas</span>
        , the code preview will populate and generate the corresponding lines of code in real-time.<br/><br/>
        Adding a <span className={classes.notLink} onClick={() => setPage('States')} >state</span> will also generate the corresponding line of code for the state in the code preview.<br/><br/>
        Code preview will also change depending on whether Classic React / Gatsby.js / Next.js is chosen.<br/><br/>
        To learn more about the <span className={classes.notLink} onClick={() => setPage('Canvas')} >canvas</span>, click <span className={classes.notLink} onClick={() => setPage('Canvas')} >"here"</span></p>
      <div className={classes.imgWrapper} >
        <img className={classes.smallImg} src={codePreview} />
      </div>
    </div>
  );
};

export default CodePreview;

