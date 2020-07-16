import React, { useContext } from 'react';
import { stateContext } from '../../context/context';
import Button from '@material-ui/core/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

export default function LoginButton() {
  let history = useHistory();
  const [state, dispatch] = useContext(stateContext);

  const classes = useStyles();

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    // clear local storage
    window.localStorage.clear();
    // destroys cookie by backdating expiration time
    document.cookie = 'ssid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    // destroy cookie in production via electron main process
    window.api.delCookie();
    // uses useHistory to return to the login page
    history.push('/login');
  };

  if (state.isLoggedIn) {
    return (
      <Button
        variant="contained"
        onClick={handleLogout}
        color="secondary"
        className={classes.button}
        endIcon={<ExitToAppIcon />}
      >
        Log Out
      </Button>
    );
  } else {
    return (
      <Button
        variant="contained"
        onClick={handleLogout}
        color="secondary"
        className={classes.button}
        endIcon={<ExitToAppIcon />}
      >
        Log In
      </Button>
    );
  }
}

const useStyles = makeStyles({
  button: {
    backgroundColor: 'rgba(1,212,109,0.4)',
    fontSize: '1em',
    minWidth: '300px',
    marginTop: '10px',
    marginBotton: '10px'
  }
});
