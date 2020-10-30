import React from 'react';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import AccountTreeIcon from '@material-ui/icons/AccountTree';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
// import Grid from '@material-ui/core/Grid';

// import ComponentPanel from '../components/left/ComponentPanel';
// import HTMLPanel from '../components/left/HTMLPanel';

// Left-hand portion of the app, where component options are displayed
const useStyles = makeStyles({});
const ComponentTree: React.FC<RouteComponentProps> = () => {
  return (
    <div>
      <h1>Component Tree</h1>
      ComponentTree
      <Link to={`/tutorial`}>
        <button>Tutorial</button>
      </Link>
    </div>
  );
};

export default withRouter(ComponentTree);

