import React, { useContext } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { styleContext } from '../../containers/AppContainer';
 
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

export default function ButtonAppBar(props) {
  const classes = useStyles();

  const { style, setStyle } = useContext(styleContext);

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
