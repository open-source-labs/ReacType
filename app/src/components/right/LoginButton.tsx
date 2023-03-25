import React from 'react';
import Button from '@mui/material/Button';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { toggleLoggedIn } from '../../redux/reducers/slice/appStateSlice';

export default function LoginButton() {
  const state = useSelector(store => store.appState)
  const dispatch = useDispatch();
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
