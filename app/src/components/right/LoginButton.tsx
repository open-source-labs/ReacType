import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import StateContext from '../../context/context';

export default function LoginButton() {
  const history = useHistory();
  const [state,] = useContext(StateContext);
  const handleLogout = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    // clear local storage
    window.localStorage.clear();
    window.api.delCookie();
    // destroys cookie by backdating expiration time
    // document.cookie = 'ssid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    // destroy cookie in production via electron main process
    // window.api.delCookie();
    // uses useHistory to return to the login page
    history.push('/login');
  };
  if (state.isLoggedIn) {
    return (
      <Button
        variant="contained"
        color="secondary"
        className="navbarButton"
        style={{ minWidth: '102.11px' }}
        onClick={handleLogout}
        endIcon={<ExitToAppIcon />}
      >
        Log Out
      </Button>
    );
  }
  return (
      <Button
        variant="contained"
        color="secondary"
        className="navbarButton"
        style={{ minWidth: '102.11px' }}
        onClick={handleLogout}
        endIcon={<ExitToAppIcon />}
      >
        Log In
      </Button>
  );
}
