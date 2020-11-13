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
        clicking on it. Then, to give it a display feature of either a block,
        inline-block, or flex styling, select from the drop down box.
      </p>
      <div className={classes.imgWrapper}>
        <img src={flex} />
      </div>
      <p className={classes.text}>
        If the display option 'flex' is chosen, few more sub-options are
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
        color to, and click save!
      </p>
      <hr />
    </div>
  );
};

export default Customization;
