import React, { useState, useContext } from 'react';
import {
  withStyles,
  createStyles,
  makeStyles,
  Theme
} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Brightness3Icon from '@material-ui/icons/Brightness3';
import Brightness5Icon from '@material-ui/icons/Brightness5';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import { styleContext } from '../../containers/AppContainer';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';
import LoginButton from '../right/LoginButton';
import ExportButton from '../right/ExportButton';
import SaveProjectButton from '../right/SaveProjectButton';
import DeleteProjects from '../right/DeleteProjects';
import ProjectsFolder from '../right/OpenProjects';
import createModal from '../right/createModal';
import StateContext from '../../context/context';
import logo from '../../public/icons/win/logo.png';

// NavBar text and button styling
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      width: '100%'
    },
    menuButton: {
      marginRight: theme.spacing(2),
      color: 'white'
    },
    title: {
      flexGrow: 1,
      color: 'white'
    },
    manageProject: {
      display: 'flex',
      justifyContent: 'center'
    }
  })
);

// Drop down menu button for export
const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5'
  }
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center'
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center'
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles(theme => ({
  root: {
    '&:focus': {
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white
      }
    }
  }
}))(MenuItem);

export default function NavBar(props) {
  const classes = useStyles();

  const { style, setStyle } = useContext(styleContext);

  // State for export menu button
  const [anchorEl, setAnchorEl] = React.useState(null);
  // State for clear canvas button
  const [modal, setModal] = useState(null);
  const [state, dispatch] = useContext(StateContext);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // ---Clear canvas functionality---
  // Closes out the open modal
  const closeModal = () => setModal('');
  // Creates modal that asks if user wants to clear workspace
  // If user clears their workspace, then their components are removed from state and the modal is closed
  const clearWorkspace = () => {
    // Reset state for project to initial state
    const resetState = () => {
      dispatch({ type: 'RESET STATE', payload: {} });
    };
    // Set modal options
    const children = (
      <List className="export-preference">
        <ListItem
          key={'clear'}
          button
          onClick={resetState}
          style={{
            border: '1px solid #3f51b5',
            marginBottom: '2%',
            marginTop: '5%'
          }}
        >
          <ListItemText
            primary={'Yes, delete all project data'}
            style={{ textAlign: 'center' }}
            onClick={closeModal}
          />
        </ListItem>
      </List>
    );
    // Create modal
    setModal(
      createModal({
        closeModal,
        children,
        message: 'Are you sure want to delete all data?',
        primBtnLabel: null,
        primBtnAction: null,
        secBtnAction: null,
        secBtnLabel: null,
        open: true
      })
    );
  };
  return (
    <div className={classes.root} style={style}>
      <AppBar position="static">
        <Toolbar>
          <Avatar src={logo}></Avatar>
          <Typography
            variant="h6"
            style={{ marginLeft: '1rem' }}
            className={classes.title}
          >
            ReacType
          </Typography>
          {/* ==================================Dashboard Button================================================== */}
          {state.isLoggedIn ? (
            <Link to="/dashboard" style={{ textDecoration: 'none' }}>
              <Button
                variant="contained"
                color="secondary"
                style={{ minWidth: '137.69px' }}
                className="navbarButton"
                endIcon={<DashboardIcon />}
              >
                Dashboard
              </Button>
            </Link>
          ) : (
            <span></span>
          )}
          {/* ==================================Clear Canvas Button================================================== */}
          <Button
            variant="contained"
            color="secondary"
            style={{ minWidth: '137.69px' }}
            onClick={clearWorkspace}
            className="navbarButton"
            id="navbarButton"
            endIcon={<DeleteIcon />}
          >
            Clear Canvas
          </Button>
          <ExportButton />
          <Button
            className="navbarButton"
            id="navbarButton"
            color="secondary"
            variant="contained"
            style={{ minWidth: '113.97px' }}
            endIcon={
              props.isThemeLight ? <Brightness3Icon /> : <Brightness5Icon />
            }
            onClick={() => {
              !style.backgroundColor
                ? setStyle({ backgroundColor: '#21262D' }) // dark mode color
                : setStyle({});
              props.isThemeLight ? props.setTheme(false) : props.setTheme(true);
            }}
          >
            {props.isThemeLight ? 'Dark Mode' : 'Light Mode'}
          </Button>
          {state.isLoggedIn ? ( // render Manage Project button/dropdown only if user is logged in
            <Button
              variant="contained"
              color="secondary"
              onClick={handleClick}
              className="navbarButton"
              id="navbarButton"
              endIcon={<FilterListIcon />}
            >
              MANAGE PROJECT
            </Button>
          ) : (
            <span></span>
          )}
          <LoginButton />
          <StyledMenu // Dropdown menu connected to Manage Project Button
            id="customized-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <StyledMenuItem
              className={classes.manageProject}
              onClick={handleClose}
            >
              <SaveProjectButton />
            </StyledMenuItem>
            <StyledMenuItem
              className={classes.manageProject}
              onClick={handleClose}
            >
              <ProjectsFolder />
            </StyledMenuItem>
            <StyledMenuItem
              className={classes.manageProject}
              onClick={handleClose}
            >
              <DeleteProjects />
            </StyledMenuItem>
          </StyledMenu>
        </Toolbar>
      </AppBar>
      {modal}
    </div>
  );
}
