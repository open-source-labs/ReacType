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
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    position: 'absolute',
    bottom: '40px',
    left: '0px'
  },
  exportBtn: {
    width: '55%',
    backgroundColor: 'rgba(1,212,109,0.1)',
    fontSize: '1em'
  },
  clearBtn: {
    width: '55%',
    fontSize: '1em',
    marginTop: '15px',
    color: 'red'
  }
})

// Left-hand portion of the app, where component options are displayed
const LeftContainer = (): JSX.Element => {
  const classes = useStyles();
  return (
    <div className="column left">
      <Grid container direction="row" alignItems="center">
        <ComponentPanel />
        <HTMLPanel />
        <div className={classes.btnGroup}>
          <Button className={classes.exportBtn} variant="outlined" color="primary" endIcon={<GetAppIcon />}>
            EXPORT PROJECT
          </Button>
          <Button className={classes.clearBtn}>
            CLEAR WORKSPACE
          </Button>
        </div>
      </Grid>
    </div>
  );
};

export default LeftContainer;
