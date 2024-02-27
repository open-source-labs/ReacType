import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleLoggedIn } from '../../redux/reducers/slice/appStateSlice';
import serverConfig from '../../serverConfig.js';
const { DEV_PORT, API_BASE_URL, API_BASE_URL2 } = serverConfig;
// const config = require('../../../../config.js');
import { RootState } from '../../redux/store';
import Cookies from 'js-cookie';
// note that API_BASE_URL is assigned to different pages on dev mode vs prod mode
// const { DEV_PORT, API_BASE_URL, API_BASE_URL2 } = config;
const isDev = import.meta.env.NODE_ENV === 'development';
let serverURL = API_BASE_URL;

//check if we're in dev mode
if (isDev) {
  serverURL = `http://localhost:${DEV_PORT}`;
}

export default function LoginButton() {
  const state = useSelector((store: RootState) => store.appState);
  const dispatch = useDispatch();

  const handleLogout = () => {
    const projects = fetch(`${serverURL}/logout`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      },
      // need credentials for userid pull from cookie
      credentials: 'include'
    })
      .then((res) => res.json())
      .then((data) => {
        return data;
      })
      .catch((err) => console.log(`Error getting project ${err}`));

    window.localStorage.clear();

    if (state.isLoggedIn) {
      dispatch(toggleLoggedIn(false));
    }

    window.location.href = state.isLoggedIn
      ? `${API_BASE_URL2}/#/login`
      : API_BASE_URL;
  };

  const handleLogin = () => {
    window.localStorage.clear();
    window.location.href = `${API_BASE_URL2}/#/login`;
  };

  if (state.isLoggedIn) {
    return (
      <button onClick={handleLogout}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-box-arrow-right"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
          />
          <path
            fillRule="evenodd"
            d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
          />
        </svg>
        <span>Log out</span>
      </button>
    );
  }

  return (
    <button onClick={handleLogin}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-box-arrow-right"
        viewBox="0 0 16 16"
      >
        <path
          fillRule="evenodd"
          d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
        />
        <path
          fillRule="evenodd"
          d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
        />
      </svg>
      <span>Log in</span>
    </button>
  );
}
