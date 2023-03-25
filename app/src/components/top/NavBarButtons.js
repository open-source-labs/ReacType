import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { resetAllState } from '../../redux/reducers/slice/appStateSlice.ts';
import createModal from '../right/createModal.tsx';
import ExportButton from '../right/ExportButton.tsx';
import { setStyle } from '../../redux/reducers/slice/styleSlice'
import { toggleDarkMode } from '../../redux/reducers/slice/darkModeSlice';
import LoginButton from '../right/LoginButton.tsx';
import withStyles from '@mui/styles/withStyles';
import MenuItem from '@mui/material/MenuItem';
import makeStyles from '@mui/styles/makeStyles';
import createStyles from '@mui/styles/createStyles';
import SaveProjectButton from '../right/SaveProjectButton.tsx';
import ProjectsFolder from '../right/OpenProjects.tsx';
import DeleteProjects from '../right/DeleteProjects.tsx';
import Menu from '@mui/material/Menu';

const useStyles = makeStyles((theme) =>
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

function navbarDropDown () {
    
    const dispatch = useDispatch();
    const [modal, setModal] = React.useState(null);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const classes = useStyles();

    const { isDarkMode, state } = useSelector(store=>({
        isDarkMode: store.darkMode.isDarkMode,
        state: store.appState,
        }
        ))
    const closeModal = () => setModal('');
    const handleClick = event => {
        setAnchorEl(event.currentTarget);
      };

    const clearWorkspace = () => {
        // Reset state for project to initial state
        const resetState = () => {
          dispatch(resetAllState());
        };
        // Set modal options
        const children = (
          <List className="export-preference" style={{zIndex: '12'}}>
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

      const handleDarkModeToggle = () => {
        dispatch(toggleDarkMode());
        // Add your logic to update the style and theme based on darkMode
        isDarkMode ? dispatch(setStyle(null)) : dispatch(setStyle({ backgroundColor: '#21262c' }));
        // props.setTheme(isDarkMode);
      };

      const handleClose = () => {
        setAnchorEl(null);
      };

      const switchDark = isDarkMode ? 
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-lightbulb" viewBox="0 0 16 16">
            <path d="M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13a.5.5 0 0 1 0 1 .5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1 0-1 .5.5 0 0 1 0-1 .5.5 0 0 1-.46-.302l-.761-1.77a1.964 1.964 0 0 0-.453-.618A5.984 5.984 0 0 1 2 6zm6-5a5 5 0 0 0-3.479 8.592c.263.254.514.564.676.941L5.83 12h4.342l.632-1.467c.162-.377.413-.687.676-.941A5 5 0 0 0 8 1z"/>
        </svg>
        :
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-moon" viewBox="0 0 16 16">
            <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278zM4.858 1.311A7.269 7.269 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.316 7.316 0 0 0 5.205-2.162c-.337.042-.68.063-1.029.063-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286z"/>
        </svg>

    return (
        <div className="navDropDown">
            <Link to="/tutorial" style={{ textDecoration: 'none' }} target='_blank'>
                <button>Tutorial
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-book" viewBox="0 0 16 16">
                        <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z"/>
                    </svg>
                </button>
            </Link>
            <button onClick={()=>clearWorkspace()}>Clear Canvas
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                </svg>
            </button>
            {state.isLoggedIn && <ExportButton/>}
            <button onClick={handleDarkModeToggle}>{isDarkMode ? 'Light' : 'Dark'} Mode {switchDark}</button>
            {state.isLoggedIn && <button onClick={handleClick}>Manage Project
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-database" viewBox="0 0 16 16">
                    <path d="M4.318 2.687C5.234 2.271 6.536 2 8 2s2.766.27 3.682.687C12.644 3.125 13 3.627 13 4c0 .374-.356.875-1.318 1.313C10.766 5.729 9.464 6 8 6s-2.766-.27-3.682-.687C3.356 4.875 3 4.373 3 4c0-.374.356-.875 1.318-1.313ZM13 5.698V7c0 .374-.356.875-1.318 1.313C10.766 8.729 9.464 9 8 9s-2.766-.27-3.682-.687C3.356 7.875 3 7.373 3 7V5.698c.271.202.58.378.904.525C4.978 6.711 6.427 7 8 7s3.022-.289 4.096-.777A4.92 4.92 0 0 0 13 5.698ZM14 4c0-1.007-.875-1.755-1.904-2.223C11.022 1.289 9.573 1 8 1s-3.022.289-4.096.777C2.875 2.245 2 2.993 2 4v9c0 1.007.875 1.755 1.904 2.223C4.978 15.71 6.427 16 8 16s3.022-.289 4.096-.777C13.125 14.755 14 14.007 14 13V4Zm-1 4.698V10c0 .374-.356.875-1.318 1.313C10.766 11.729 9.464 12 8 12s-2.766-.27-3.682-.687C3.356 10.875 3 10.373 3 10V8.698c.271.202.58.378.904.525C4.978 9.71 6.427 10 8 10s3.022-.289 4.096-.777A4.92 4.92 0 0 0 13 8.698Zm0 3V13c0 .374-.356.875-1.318 1.313C10.766 14.729 9.464 15 8 15s-2.766-.27-3.682-.687C3.356 13.875 3 13.373 3 13v-1.302c.271.202.58.378.904.525C4.978 12.71 6.427 13 8 13s3.022-.289 4.096-.777c.324-.147.633-.323.904-.525Z"/>
                </svg>
            </button>}
            <LoginButton style={{marginLeft: '10%'}}/>
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
            {modal}
        </div>
    )
}

export default navbarDropDown