import React from 'react';

import Grid from '@material-ui/core/Grid';

import ComponentPanel from '../components/left/ComponentPanel';
import HTMLPanel from '../components/left/HTMLPanel';

// Left-hand portion of the app, where component options are displayed
const LeftContainer = ({ style }): JSX.Element => {
  return (
    <div style={style} className="column left">
      <Grid container direction="row" alignItems="center">
        <ComponentPanel />
        <HTMLPanel />
      </Grid>
    </div>
  );
};

export default LeftContainer;
