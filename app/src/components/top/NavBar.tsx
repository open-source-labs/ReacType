import React, { useState, useContext } from 'react';
import { Theme } from '@mui/material/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Brightness3Icon from '@mui/icons-material/Brightness3';
import Brightness5Icon from '@mui/icons-material/Brightness5';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';
import LoginButton from '../right/LoginButton';
import ExportButton from '../right/ExportButton';
import SaveProjectButton from '../right/SaveProjectButton';
import DeleteProjects from '../right/DeleteProjects';
import ProjectsFolder from '../right/OpenProjects';
import createModal from '../right/createModal';
import logo from '../../public/icons/win/logo.png';
// Imports for redux toolkit usage
import { toggleDarkMode } from '../../redux/reducers/slice/darkModeSlice';
import { resetAllState } from '../../redux/reducers/slice/appStateSlice';
import { useSelector, useDispatch } from 'react-redux';
import { setStyle } from '../../redux/reducers/slice/styleSlice'
// NavBar text and button styling
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      width: '100%'
    },
    menuButton: {
      marginRight: theme.spacing(1),
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
    // getContentAnchorEl={null}
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

//export default function NavBar(props)
const NavBar = (props) => {
  const classes = useStyles();
  // const { style, setStyle } = useContext(styleContext);

  // State for export menu button
  const [anchorEl, setAnchorEl] = React.useState(null);
  // State for clear canvas button
  const [modal, setModal] = useState(null);
  // const [state, dispatch] = useContext(StateContext);
  const dispatch = useDispatch();
  const { state, style, isDarkMode } = useSelector(store => ({
    state: store.appState,
    style: store.style,
    isDarkMode: store.darkMode.isDarkMode

  }));

  //NEW DARK MODE
  const handleDarkModeToggle = () => {
    dispatch(toggleDarkMode());
    // Add your logic to update the style and theme based on darkMode
    isDarkMode ? dispatch(setStyle(null)) : dispatch(setStyle({ backgroundColor: '#21262c' }));
    props.setTheme(isDarkMode);
  };

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
      dispatch(resetAllState());
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
            style={{
              marginLeft: '1rem',
              color: isDarkMode ? '#fff' : '#0d47a1'
            }}
            className={classes.title}
          >
            ReacType
          </Typography>
          <Link to="/tutorial" style={{ textDecoration: 'none' }} target='_blank'>
            <Button
              variant="contained"
              color="secondary"
              style={{ minWidth: '137.69px' }}
              className="navbarButton"
              id="navbarButton"
            >
              Tutorial
            </Button>
          </Link>
          {/* ==================================Dashboard Button================================================== */}
          {state.isLoggedIn ? (
            <Link to="/dashboard" style={{ textDecoration: 'none' }}>
              <Button
                variant="contained"
                color="secondary"
                style={{ minWidth: '137.69px' }}
                className="navbarButton"
                endIcon={<DashboardIcon />}
                id="navbarButton"
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
            onClick={handleDarkModeToggle}
          >
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
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
              id="navbarButton"
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

export default NavBar;
