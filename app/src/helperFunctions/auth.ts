const fetch = require('node-fetch');

const isDev = process.env.NODE_ENV === 'development';
let serverURL = 'https://desolate-scrubland-40010.herokuapp.com';
if (isDev) {
  serverURL = 'http://localhost:5000';
}

export const sessionIsCreated = (
  username: string,
  password: string,
  isFbOauth: boolean,
): Promise<string> => {
  const body = JSON.stringify({
    username,
    password,
    isFbOauth,
  });

  const result = fetch(`${serverURL}/login`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  })
    .then(res => res.json())
    .then((data) => {
      if (data.sessionId && typeof data.sessionId === 'string') {
        // check that a session id was passed down
        window.localStorage.setItem('ssid', data.sessionId);
        // save username locally, will be added to saved project for each user
        window.localStorage.setItem('username', username);

        return 'Success';
      }
      return data; // error message returned from userController.verifyUser
    })
    .catch(err => 'Error');
  return result;
};

export const newUserIsCreated = (
  username: string,
  email: string,
  password: string,
): Promise<string> => {
  const body = JSON.stringify({
    username,
    email,
    password,
  });
  const result = fetch(`${serverURL}/signup`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  })
    .then(res => res.json())
    .then((data) => {
      if (data.sessionId && typeof data.sessionId === 'string') {
        // check that a session id was passed down
        window.localStorage.setItem('ssid', data.sessionId);
        // save username locally, will be added to saved project for each user
        window.localStorage.setItem('username', username);
        return 'Success';
      }
      return data; // response is either Email Taken or Username Taken, refer to userController.createUser
    })
    .catch(err => 'Error');
  return result;
};
