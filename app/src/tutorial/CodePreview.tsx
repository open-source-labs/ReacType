import React from 'react';

const CodePreview: React.FC<{
  classes: any;
  setPage: Function;
}> = ({ classes, setPage }) => {
  return (
    <div className={classes.wrapper}>
      <h1 className={classes.title}>Code Preview</h1>
      <div className={classes.wrapper}>
        <p className={classes.text}>The code preview is located at the bottom center of the page on the first tab.<br/>
        In the preview, the code will generate for functional components.<br/>
        This preview will populate and generate in real-time as you use the drag-n-drop functionality with the <span className={classes.notLink} onClick={() => setPage('Canvas')} >Canvas</span>.<br/>
        To learn more about the canvas, click <span className={classes.notLink} onClick={() => setPage('Canvas')} >"here"</span></p>
      </div>
    </div>
  );
};

export default CodePreview;

