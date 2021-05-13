import React from 'react';
import defaultElements from '../../../resources/html_elements_tutorial_images/defaultElements.png';
import createNew from '../../../resources/html_elements_tutorial_images/createNew.png';
import newTag from '../../../resources/html_elements_tutorial_images/newTag.png';
import codeSnippet from '../../../resources/html_elements_tutorial_images/codeSnippet.png';

const HtmlElements: React.FC<{
  classes: any;
  setPage: Function;
}> = ({ classes, setPage }) => {
  return (
    <div className={classes.wrapper}>
      <h1 className={classes.title}>HTML Elements</h1>
      <hr/>
      <p className={classes.text}>ReacType has default elements to help get you started.<br/>
      You can drag and drop elements into the <span className={classes.notLink} onClick={() => setPage('Canvas')} >Canvas</span> to create a React Component with HTML Elements.</p>
      <div className={classes.imgWrapper} >
        <img className={classes.smallImg} src={defaultElements} />
      </div>
      <hr/>
      <h2>Custom Elements</h2>
      <p className={classes.text}>You can create new custom elements to better suit your needs.<br/>
      Click <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element" target="_blank">here</a> for a link to more HTML tags that you can add.<br/>
      "Tag" should be the HTML tag you are creating and "Tag Name" should be something that makes it easy to remember what this tag is/does.<br/>
      You can also create your own custom elements besides the standard HTML Elements. For example you can create an element &lt;hello&gt;&lt;hello&gt; and it will work! You can add functionality to these elements once you export your project. Just be sure to import them into the files where you are using them! For more information on how to create custom tags check out these resources from <a href="https://www.html5rocks.com/en/tutorials/webcomponents/customelements/" target="_blank">HTML5Rocks</a> and <a href="https://www.smashingmagazine.com/2014/03/introduction-to-custom-elements/" target="_blank">smashing magazine</a>.
      </p>
      <div className={classes.imgWrapper} >
        <img className={classes.smallImg} src={createNew} />
      </div>
      <hr/>
      <h2>Persisting Elements</h2>
      <p className={classes.text}>Saving the project (available only to users) will allow you to save custom elements that you created. However, when opening a new project, only the tags saved for each specific project will show up again.<br/>
      In order to save custom tags across multiple projects, we recommend creating custom tags first, then saving multiple projects with the custom tags. This will allow access to custom tags across multiple projects.</p>
      <hr/>
      <h2>Customization</h2>
      <p className={classes.text}>Add attributes to elements in the generated code in the code preview. When making changes/editing the code, please make sure not to add anymore components/elements to the canvas. This should be the final step before exporting your project. Please see <span className={classes.notLink} onClick={() => setPage('Code Preview')}>Code Preview</span> for more details on when/how to make changes to your code in ReacType.</p>
      <div className={classes.imgWrapper} >
        <img className={classes.img} src={codeSnippet} />
      </div>
      <hr/>
    </div>
  );
};

export default HtmlElements;

