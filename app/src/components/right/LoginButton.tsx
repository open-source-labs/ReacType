import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useHistory } from 'react-router-dom';
import makeStyles from '@mui/styles/makeStyles';
import StateContext from '../../context/context';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { toggleLoggedIn } from '../../redux/reducers/slice/appStateSlice';

export default function LoginButton() {
  const history = useHistory();
  // const [state,] = useContext(StateContext);
  const state = useSelector(store => store.appState)
  const dispatch = useDispatch();
  // const handleLogout = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  //   e.preventDefault();
  //   // clear local storage
  //   window.localStorage.clear();
  //   // destroy cookie in production via electron main process
  //   window.api.delCookie();
  //   // destroys cookie by backdating expiration time
  //   // document.cookie = 'ssid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  //   // uses useHistory to return to the login page
  //   history.push('/login');
  // };

  const handleLogout = () => {
    window.localStorage.clear();
    if (process.env.NODE_ENV === 'production') {
      window.api.delCookie();
      window.location.href = '/index-prod.html'
    } else {
    window.location.href = 'http://localhost:8080/#/login';
    if(state.isLoggedIn){
      dispatch(toggleLoggedIn())
    }
   
    }
  }
  if (state.isLoggedIn) {
    return (
      <Button
        id="navbarButton"
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
