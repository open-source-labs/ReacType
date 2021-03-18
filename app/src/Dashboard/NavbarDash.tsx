import React, { useState, useContext } from 'react';
import {
  withStyles, //added
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { styleContext } from '../containers/AppContainer';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import greenLogo from '../public/icons/png/512x512.png';

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

// sorting options
const sortMethods = ['Rating', 'Date', 'User'];

// Drop down menu button for SORT PROJECTS
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

// TO DO: set types of props validation
export default function NavBar(props) {
  // TO DO: import setStyle
  const classes = useStyles();
  const { style, setStyle } = useContext(styleContext);

  const toggling = () => setIsOpen(!isOpen);
  
  // toggle to open and close dropdown sorting menu
  const [isOpen, setIsOpen] = useState(false);

  // State for sort projects button
  const [anchorEl, setAnchorEl] = React.useState(null);


  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root} style={style}>
      <AppBar position="static">
        <Toolbar>
          <Avatar src={greenLogo}></Avatar>
          <Typography variant="h6" style={{ marginLeft: '1rem' }} className={classes.title}>
            ReacType
          </Typography>

          {/* ==========================================Sort by Button================================================== */}
         
          <div style ={ { textDecoration: 'none' } }>
            <Button
            variant="contained"
            color="primary"
            onClick={handleClick}
            className="navbarButton"
            id="navbarButton"
          >
            SORT PROJECT
          </Button>
          <StyledMenu  // Dropdown menu connected to Manage Project Button
            id="customized-menus"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {sortMethods.map((option, index) => (
                    <StyledMenuItem onClick={() => {
                      props.optionClicked(option);
                      toggling();
                      handleClose();
                    }}
                      variant="contained"
                      color="primary"
                      style={{ minWidth: '137.69px' }}
                      className="navbarButton"
                      key={index}
                      > 
                      {option}
                    </StyledMenuItem>
                  ))}
          </StyledMenu>
        </div>
        <Button
            className="navbarButton"
            id="navbarDashButton"
            color="primary"
            variant="contained"
            style={{minWidth: '113.97px'}}
            onClick={() => {
              !props.styles[0].backgroundColor
                ? props.styles[1]({ backgroundColor: '#21262D' }) //dark mode color
                : props.styles[1]({ backgroundColor: null })
              props.isThemeLight ? props.setTheme(false) : props.setTheme(true);
            }}
          >
            {props.isThemeLight ? 'Dark Mode' : 'Light Mode'}
          </Button>
          {/* ====================================Home Button============================================== */}
          
          <div style ={ { textDecoration: 'none' } }>
            <Link to="/">
              <Button
                variant="contained"
                color="primary"
                style={{ minWidth: '137.69px' }}
                className="navbarButton"
                id="ratingButton"
                > Home
              </Button>
            </Link>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
