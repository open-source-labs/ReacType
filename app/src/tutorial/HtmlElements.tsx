import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

// import Grid from '@material-ui/core/Grid';

// import ComponentPanel from '../components/left/ComponentPanel';
// import HTMLPanel from '../components/left/HTMLPanel';

// Left-hand portion of the app, where component options are displayed

const HtmlElements: React.FC<{
  classes: any;
  setPage: Function;
}> = ({ classes, setPage }) => {
  // useEffect(() => {
  // }, [match.params.learn])

  return (
    <div className={classes.wrapper}>
      <h1 className={classes.title}>HtmlElements</h1>
      <p className={classes.text}>ReacType has default elements to help get you started.<br/>
      You can drag and drop elements into the <span className={classes.notLink} onClick={() => setPage('Canvas')} >Canvas</span> to create a React Component with HTML Elements.</p>
      <h2>Custom Elements</h2>
      <p className={classes.text}>You can create new custom elements to better suit your needs.<br/>
      Click <a href="">here</a> for a link to more HTML tags that you can add.<br/>
      "Tag" should be the HTML tag you are creating and "Tag Name" should be something that makes it easy to remember what this tag is/does.</p>
      <h2>Delete Buttons</h2>
      <p className={classes.text}>Delete buttons that you don't need.</p>
      <h2>Persisting Elements</h2>
      <p className={classes.text}>Saving the project (available only to users) will allow you to save custom elements that you created. However, when opening a new project, only the tags saved for each specific project will show up again.<br/>
      In order to save custom tags across multiple projects, we recommend creating custom tags first, then saving multiple projects with the custom tags. This will allow access to custom tags across multiple projects.</p>
      <h2>Customization</h2>
      <p className={classes.text}>Add attributes to elements in the generated code in the code preview. When making changes/editing the code, please make sure not to add anymore components/elements to the canvas. This should be the final step before exporting your project. Please see <span className={classes.notLink} onClick={() => setPage('Code_Preview')}>Code Preview</span> for more details on when/how to make changes to your code in ReacType.</p>
    </div>
  );
};

export default HtmlElements;

