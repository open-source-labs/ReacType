import React from 'react';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import display from '../../../resources/customizing_elements_images/Display.png';
import flex from '../../../resources/customizing_elements_images/Flex.png';
import height from '../../../resources/customizing_elements_images/Height.png';
import width from '../../../resources/customizing_elements_images/Width.png';
import backgroundcolor from '../../../resources/customizing_elements_images/BackgroundColor.png';

// import Grid from '@material-ui/core/Grid';

// import ComponentPanel from '../components/left/ComponentPanel';
// import HTMLPanel from '../components/left/HTMLPanel';

// Left-hand portion of the app, where component options are displayed

const Customization: React.FC<RouteComponentProps> = () => {
  return (
    <div className="tutorial_styling">
      <Link to={`/tutorial`}>
        <button>Back to Tutorial Page</button>
      </Link>
      <hr />
      <h1 style={{ color: 'black' }}>Customizing Elements</h1>
      <br />
      <h2>Display</h2>
      <br />
      <img src={display} />
      <p>
        After having moved a page, component, route link, or element into the
        canvas, select the one that needs customizing simply by clicking on it.
        Then, to give it a display feature of either a block, inline-block, or
        flex styling, select from the drop down box.
        <br />
        <br />
        <img src={flex} />
        <br />
        <br />
        If the display option 'flex' is chosen, few more sub-options are
        displayed under the display option.
      </p>
      <br />
      <h2>Width</h2>
      <img src={width} />
      <br />
      <p>Change the width of each component, route link, or element.</p>
      <br />
      <h2>Height</h2>
      <img src={height} />
      <br />
      <p>Change the height of each component, route link, or element.</p>
      <br />
      <h2>Background Color</h2>
      <img src={backgroundcolor} />
      <br />
      <p>
        Select an element, type in the color you wish to change the background
        color to, and click save!
      </p>
      <br />
    </div>
  );
};

export default withRouter(Customization);
