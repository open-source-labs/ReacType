import React, { useContext } from 'react';
import { withStyles, createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { styleContext } from '../../containers/AppContainer';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';

// NavBar text and button styling
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      width: '100%',
    },
    menuButton: {
      marginRight: theme.spacing(2),
      color: 'white'
    },
    title: {
      flexGrow: 1,
      color: 'white'
    },
  }),
);

// Drop down menu button for export
const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default function ButtonAppBar(props) {
  const classes = useStyles();

  const { style, setStyle } = useContext(styleContext);

  // State for export menu button
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
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            ReactType
          </Typography>
          <Button color="inherit">Clear Canvas</Button>
          <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        Export
      </Button>

      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem>
          <ListItemText primary="Classic React" />
        </StyledMenuItem>

        <StyledMenuItem>
          <ListItemText primary="Next.js" />
        </StyledMenuItem>

        <StyledMenuItem>
          <ListItemText primary="Gatsby" />
        </StyledMenuItem>
      </StyledMenu>
          <Button color="inherit" onClick={() => {
           !style.backgroundColor
           ? setStyle({ backgroundColor: '#21262D' }) //dark mode color
           : setStyle({});
           props.isThemeLight ? props.setTheme(false) : props.setTheme(true);
          }}
          >Dark Mode</Button>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}