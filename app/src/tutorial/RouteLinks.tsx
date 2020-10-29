import React from 'react';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';

// import Grid from '@material-ui/core/Grid';

// import ComponentPanel from '../components/left/ComponentPanel';
// import HTMLPanel from '../components/left/HTMLPanel';

// Left-hand portion of the app, where component options are displayed

const RouteLinks: React.FC<RouteComponentProps> = () => {
  return (
    <div>
      RouteLinks
      <Link to={`/`}>
        <button>Application</button>
      </Link>
      <Link to={`/tutorial`}>
        <button>Tutorial</button>
      </Link>
    </div>
  );
};

export default withRouter(RouteLinks);

