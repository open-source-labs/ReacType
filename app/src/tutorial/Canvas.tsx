import React from 'react';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';

// import Grid from '@material-ui/core/Grid';

// import ComponentPanel from '../components/left/ComponentPanel';
// import HTMLPanel from '../components/left/HTMLPanel';

// Left-hand portion of the app, where component options are displayed

const Canvas: React.FC<RouteComponentProps> = () => {
  return (
    <div className={'rootCanvas'}>
      <h1>Canvas Tutorial</h1>
        <div className={'btn'}>
      <Link to={`/`}>
        <button >Application</button>
      </Link>
      <Link to={`/tutorial`}>
        <button>Tutorial</button>
      </Link>
      </div>
      <div>
        <h4>
          The canvas is located at the center of the page. 
          The drag-n-drop functionality is implemented for this technology.
          Select a given HTML tag or a custom HTML tag, click and hold. 
          Drag the tag on to the center canvas.
          When div HTML tag is selected and dragged onto the canvas.
          Users are able to drag-n-drop div tags and other selected tags into other tags on the page.
        </h4>
        
        {/* <img src="" alt=""/> */}
      </div>
    </div>
  );
};

export default withRouter(Canvas);

