import React, { useState, useContext } from 'react';
import {
  withStyles,
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
// ROUTING TO DASHBOARD
import { Link } from 'react-router-dom';
import { styleContext } from '../containers/AppContainer';
import StateContext from '../../context/context';
import logo from '../../../resources/icon.png';

import SortMenu from './SortMenu';




// NavBar text and button styling
const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
    width: '100%',
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: 'white',
  },
  title: {
    flexGrow: 1,
    color: 'white',
  },
  manageProject: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

export default function NavBar(props) {
  const classes = useStyles();

  const { style, setStyle } = useContext(styleContext);
  // added className="navbarButton" to test for buttons in enzyme.test.tsx
  return (
    <div className={classes.root} style={style}>
      <AppBar position="static">
        <Toolbar>
          <Avatar src={logo}></Avatar>
          <Typography variant="h6" style={{ marginLeft: '1rem' }} className={classes.title}>
            ReacType
          </Typography>

          {/* ==================================Sort by Button================================================== */}
         
         {/* //drop down menu logic goes here */}
          <SortMenu/>
        </Toolbar>
      </AppBar>
    </div>
  );
}
