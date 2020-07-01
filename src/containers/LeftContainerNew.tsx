import React from 'react';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';
import ComponentPanel from '../components/left/ComponentPanelNew';
import HTMLPanel from '../components/left/HTMLPanelNew';
import GetAppIcon from '@material-ui/icons/GetApp';

const useStyles = makeStyles({
  btnGroup: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    position: 'absolute',
    bottom: '65px',
    left: '0px'
  },
  exportBtn: {
    width: '55%',
    backgroundColor: 'rgba(1,212,109,0.1)',
    fontSize: '1em'
  }
})

// Left-hand portion of the app, where component options are displayed
const LeftContainer = (): JSX.Element => {
  const classes = useStyles();
  return (
    <div className="column left" style={{ minWidth: '375px' }}>
      <Grid container direction="row" alignItems="center">
        <ComponentPanel />
        <HTMLPanel />
        <div className={classes.btnGroup}>
          <Button className={classes.exportBtn} variant="outlined" color="primary" endIcon={<GetAppIcon />}>
            EXPORT PROJECT
          </Button>
        </div>
      </Grid>
    </div>
  );
};

export default LeftContainer;
