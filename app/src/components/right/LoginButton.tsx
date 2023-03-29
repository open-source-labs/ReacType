import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleLoggedIn } from '../../redux/reducers/slice/appStateSlice';
import config from '../../../../config';
const { API_BASE_URL, API_BASE_URL2 } = config;

export default function LoginButton() {
  const state = useSelector((store) => store.appState);
  const dispatch = useDispatch();

  const handleLogout = () => {
    window.localStorage.clear();
    document.cookie = 'ssid' + '=; Max-Age=0';

    if (state.isLoggedIn) {
      dispatch(toggleLoggedIn());
    }

    window.location.href = state.isLoggedIn
      ? `${API_BASE_URL2}/#/login`
      : API_BASE_URL;
  };

  const handleLogin = () => {
    window.location.href = `${API_BASE_URL2}/#/login`;
  };
  if (state.isLoggedIn) {
    return (
      <button onClick={handleLogout}>
        Log out
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
      </button>
    );
  }

  return (
    <button onClick={handleLogin}>
      Log in
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
    </button>
  );
}
