import React from 'react';
import display from '../../../resources/customizing_elements_images/Display.png';
import flex from '../../../resources/customizing_elements_images/Flex.png';
import height from '../../../resources/customizing_elements_images/Height.png';
import width from '../../../resources/customizing_elements_images/Width.png';
import backgroundColor from '../../../resources/customizing_elements_images/BackgroundColor.png';

const Customization: React.FC<{
  classes: any;
  setPage: Function;
}> = ({ classes, setPage }) => {
  return (
    <div className={classes.wrapper}>
      <h1 className={classes.title}>Customization</h1>
      <hr />
      <p className={classes.text}>
        Customize your HTML elements on the canvas with the below features. Any changes <br/>
        made in the <span className={classes.notLink} onClick={() => setPage('Customization')}>
        Customization</span> panel will be reflected immediately in the <span className={classes.notLink} onClick={() => setPage('Code_Preview')}> 
        Code Preview </span> and Demo Render. See your changes in real time to decide what's best!<br/><br/>
        To customize an HTML element, drag it onto the canvas and select it on the canvas. Then use the desired cusotmization feature.
      </p>
      <hr />
      <h2>Display</h2>
      <div className={classes.imgWrapper}>
        <img src={display} />
      </div>
      <p className={classes.text}>
        After having moved a{' '}
        <span className={classes.notLink} onClick={() => setPage('Pages')}>
          page
        </span>
        ,{' '}
        <span
          className={classes.notLink}
          onClick={() => setPage('Reusable_Components')}
        >
          component
        </span>
        ,{' '}
        <span
          className={classes.notLink}
          onClick={() => setPage('Route_Links')}
        >
          route link
        </span>
        , or{' '}
        <span
          className={classes.notLink}
          onClick={() => setPage('HTML_Elements')}
        >
          element
        </span>{' '}
        into the canvas, select the one that needs customizing simply by
        clicking on it. Then, to give it block,
        inline-block, or flex styling, select from the drop down box in the right container.
      </p>
      <div className={classes.imgWrapper}>
        <img src={flex} />
      </div>
      <p className={classes.text}>
        If the display option 'flex' is chosen, a few more sub-options are
        displayed under the display option.
      </p>
      <hr />
      <h2>Width</h2>
      <div className={classes.imgWrapper}>
        <img src={width} />
      </div>
      <p className={classes.text}>
        Change the width of each{' '}
        <span
          className={classes.notLink}
          onClick={() => setPage('Reusable_Components')}
        >
          component
        </span>
        ,{' '}
        <span
          className={classes.notLink}
          onClick={() => setPage('Route_Links')}
        >
          route link
        </span>
        , or{' '}
        <span
          className={classes.notLink}
          onClick={() => setPage('HTML_Elements')}
        >
          element
        </span>
        .
      </p>
      <hr />
      <h2>Height</h2>
      <div className={classes.imgWrapper}>
        <img src={height} />
      </div>
      <p className={classes.text}>
        Change the height of each{' '}
        <span
          className={classes.notLink}
          onClick={() => setPage('Reusable_Components')}
        >
          component
        </span>
        ,{' '}
        <span
          className={classes.notLink}
          onClick={() => setPage('Route_Links')}
        >
          route link
        </span>
        , or{' '}
        <span
          className={classes.notLink}
          onClick={() => setPage('HTML_Elements')}
        >
          element
        </span>
        .
      </p>
      <hr />
      <h2>Background Color</h2>
      <div className={classes.imgWrapper}>
        <img src={backgroundColor} />
      </div>
      <p className={classes.text}>
        Select an element, type in the color you wish to change the background
        color to, and click save.
      </p>
      <hr />
      <h2>Text</h2>
      <div className={classes.imgWrapper}>
        <img src={backgroundColor} />
      </div>
      <p className={classes.text}>
        Add HTML text to a selected element on the canvas by typing in the desired text.
      </p>
      <hr />
      <h2>Link</h2>
      <div className={classes.imgWrapper}>
        <img src={backgroundColor} />
      </div>
      <p className={classes.text}>
        Add a hyperlink to a selected element on the canvas by typing in the url.
      </p>
      <hr />
      <h2>CSS Classes</h2>
      <div className={classes.imgWrapper}>
        <img src={backgroundColor} />
      </div>
      <p className={classes.text}>
        Change the CSS class of a selected element on the canvas by typing in the class name.
      </p>
      <hr />
    </div>
  );
};

export default Customization;
