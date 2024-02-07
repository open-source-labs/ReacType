const fetch = require('node-fetch');
const isDev = process.env.NODE_ENV === 'development';
const { DEV_PORT, API_BASE_URL } = require('../../../config');

let serverURL = API_BASE_URL;
if (isDev) {
  serverURL = `http://localhost:${DEV_PORT}`;
}

export const sessionIsCreated = (
  username: string,
  password: string,
  isFbOauth: boolean
): Promise<string> => {
  const body = JSON.stringify({
    username,
    password,
    isFbOauth
  });
  const result = fetch(`/login`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.sessionId && typeof data.sessionId === 'string') {
        window.localStorage.setItem('ssid', data.sessionId);
        window.localStorage.setItem('username', username);
        return 'Success';
      }
      return data;
    })
    .catch((err) => 'Error');
  return result;
};

export const newUserIsCreated = (
  username: string,
  email: string,
  password: string
): Promise<string> => {
  const body = JSON.stringify({
    username,
    email,
    password
  });
  const result = fetch(`/signup`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.sessionId && typeof data.sessionId === 'string') {
        window.localStorage.setItem('ssid', data.sessionId);
        window.localStorage.setItem('username', username);
        window.localStorage.setItem('email', email);
        return 'Success';
      }
      return data;
    })
    .catch((err) => 'Error');
  return result;
};
