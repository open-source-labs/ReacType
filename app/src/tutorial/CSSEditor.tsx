/* eslint-disable max-len */
import React from 'react';
import cssEditorTab from '../../../resources/csseditor_tutorial_images/CSSEditorTab.png';
import cssEdit from '../../../resources/csseditor_tutorial_images/DirectCSSEdit.gif';
import copyPaste from '../../../resources/csseditor_tutorial_images/CopyPasteCSS.gif';

/**
 * CSSEditor component displays the tutorial for the CSS editor tab, allowing users to edit CSS code directly and see the changes reflected immediately.
 *
 * @param {object} props - Component props.
 * @param {object} props.classes - CSS classes for styling.
 * @param {Function} props.setPage - Function to set the current page.
 * @returns {JSX.Element} CSSEditor component JSX.
 */
const CSSEditor: React.FC<{
  classes: any;
  setPage: Function;
}> = ({ classes, setPage }): JSX.Element => (
  <div className={classes.wrapper}>
    <h1 className={classes.title}>CSS Editor</h1>
    <hr />
    <p className={classes.text}>
      The CSS editor tab is located in the bottom panel of the application and
      is where the CSS file&apos;s code is located.
      <br />
      <br />
      You are able to freely edit the CSS code directly and have the changes
      reflected immediately in the demo render panel. You can also copy and
      paste your own CSS code into the editor to take full control of custom
      CSS classes.
      <br />
    </p>
    <div className={classes.imgWrapper}>
      <img className={classes.img} src={cssEditorTab} />
    </div>
    <hr />
    <h1 className={classes.title}>Edit CSS code</h1>
    <p className={classes.text}>
      To edit the CSS code in the CSS editor, make the desired changes
      directly within the editor.
      <br />
    </p>
    <div className={classes.imgWrapper}>
      <img className={classes.medImg} src={cssEdit} />
    </div>
    <br />
    <p className={classes.text}>
      Or copy and paste your own CSS code directly into the editor.
    </p>
    <br />
    <div className={classes.imgWrapper}>
      <img className={classes.medImg} src={copyPaste} />
    </div>
    <hr />
  </div>
);

export default CSSEditor;
