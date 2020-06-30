import React from 'react';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import ComponentPanel from '../components/left/ComponentPanelNew';
import HTMLPanel from '../components/left/HTMLPanelNew';

// Left-hand portion of the app, where component options are displayed
const LeftContainer = (): JSX.Element => {
  return (
    <div className="column left" style={{ minWidth: '375px' }}>
      <Grid container direction="row" alignItems="center">
        <ComponentPanel />
        <HTMLPanel />
      </Grid>
    </div>
  );
};

export default LeftContainer;
