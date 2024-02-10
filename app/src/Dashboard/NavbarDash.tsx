import React, { useState, useContext } from 'react';
import { Theme } from '@mui/material/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Brightness3Icon from '@mui/icons-material/Brightness3';
import Brightness5Icon from '@mui/icons-material/Brightness5';
import Button from '@mui/material/Button';
import EventNoteIcon from '@mui/icons-material/EventNote';
import HomeIcon from '@mui/icons-material/Home';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SortIcon from '@mui/icons-material/Sort';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import PersonIcon from '@mui/icons-material/Person';
import greenLogo from '../public/icons/png/512x512.png';
import { setStyle } from '../redux/reducers/slice/styleSlice';
import { useSelector, useDispatch } from 'react-redux';

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
// sorting options
const sortMethods = ['RATING', 'DATE', 'USER'];
// Drop down menu button for SORT PROJECTS
const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5'
  }
})((props) => (
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
const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white
      }
    }
  }
}))(MenuItem);
// TO DO: set types of props validation
export default function NavBar(props) {
  // TO DO: import setStyle
  const classes = useStyles();
  const style = useSelector((store) => store.styleSlice);
  const dispatch = useDispatch();
  const toggling = () => setIsOpen(!isOpen);
  // toggle to open and close dropdown sorting menu
  const [isOpen, setIsOpen] = useState(false);
  // State for sort projects button
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className={classes.root} style={style}>
      <AppBar position="static">
        <Toolbar>
          <Link
            to="/"
            style={{
              display: 'inline-flex',
              justifyContent: 'center',
              textDecoration: 'none'
            }}
          >
            <Avatar src={greenLogo}></Avatar>
            <Typography
              variant="h6"
              style={{
                marginTop: '0.3rem',
                marginLeft: '0.5rem',
                color: 'silver'
              }}
              className={classes.title}
            >
              ReacType
            </Typography>
          </Link>
          <div style={{ marginLeft: '0.5rem', textDecoration: 'none' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleClick}
              className="navbarButton"
              id="navbarButton"
              endIcon={<SortIcon />}
            >
              SORT PROJECT
            </Button>
            <StyledMenu // Dropdown menu connected to Manage Project Button
              id="customized-menus"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {sortMethods.map((option, index) => (
                <StyledMenuItem
                  onClick={() => {
                    props.optionClicked(option);
                    toggling();
                    handleClose();
                  }}
                  variant="contained"
                  color="primary"
                  style={{ minWidth: '137.69px' }}
                  className={classes.manageProject}
                  key={index}
                >
                  <Button
                    color="primary"
                    endIcon={
                      option === 'RATING' ? (
                        <StarBorderIcon />
                      ) : option === 'DATE' ? (
                        <EventNoteIcon />
                      ) : option === 'USER' ? (
                        <PersonIcon />
                      ) : (
                        ''
                      )
                    }
                  >
                    {option}
                  </Button>
                </StyledMenuItem>
              ))}
            </StyledMenu>
          </div>
          <Button
            className="navbarButton"
            id="navbarDashButton"
            color="primary"
            variant="contained"
            style={{ minWidth: '113.97px' }}
            endIcon={
              props.isThemeLight ? <Brightness3Icon /> : <Brightness5Icon />
            }
            onClick={() => {
              !style.backgroundColor
                ? dispatch(setStyle({ backgroundColor: '#21262D' })) //dark mode color
                : dispatch(setStyle(null));
              props.isThemeLight ? props.setTheme(false) : props.setTheme(true);
            }}
          >
            {props.isThemeLight ? 'Dark Mode' : 'Light Mode'}
          </Button>
          <div>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <Button
                variant="contained"
                color="primary"
                style={{ minWidth: '137.69px' }}
                className="navbarButton"
                id="ratingButton"
                endIcon={<HomeIcon />}
              >
                HOME
              </Button>
            </Link>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
