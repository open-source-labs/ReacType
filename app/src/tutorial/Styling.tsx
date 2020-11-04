import React from 'react';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import theme from '../../../resources/customizing_elements_images/Theme.png';
import lighting from '../../../resources/customizing_elements_images/Lighting.png';
import resize from '../../../resources/customizing_elements_images/Resize.png';
import codechange from '../../../resources/customizing_elements_images/CodeChange.png';

// import Grid from '@material-ui/core/Grid';

// import ComponentPanel from '../components/left/ComponentPanel';
// import HTMLPanel from '../components/left/HTMLPanel';

// Left-hand portion of the app, where component options are displayed

const Styling: React.FC<RouteComponentProps> = () => {
  return (
    <div className="tutorial_styling">
      <Link to={`/tutorial`}>
        <button>Back to Tutorial Page</button>
      </Link>
      <br />
      <h1 style={{ color: 'black' }}>Styling Features</h1>
      <h2>Code Preview Theme Changer</h2>
      <img src={theme} />
      <br />
      <p>
        Select your favorite theme from the drop down menu to personalize your
        view of the code preview!
      </p>
      <br />
      <h2>Lighting Mode</h2>
      <img src={lighting} />
      <br />
      <p>
        Spice up the app by toggling between different lighting modes! The
        lighting mode will change the background color of the app as well as the
        background color of the component tree.
      </p>
      <br />
      <h2>Resize Code Preview & Component Tree</h2>
      <img src={resize} />
      <br />
      <p>
        Hover over the line above the code preview and/or component tree to
        resize the section. Simply click and drag up or down to resize.
      </p>
      <br />
      <h2>Customize Code Preview</h2>
      <img src={codechange} />
      <br />
      <p>
        Change your code before exporting and see the changes in your exported
        file!
      </p>
      <br />
    </div>
  );
};

export default withRouter(Styling);
