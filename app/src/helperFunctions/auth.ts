const isDev = process.env.NODE_ENV === 'development';
let serverURL = 'https://reactype.herokuapp.com';
if (isDev) {
  serverURL = 'http://localhost:5000';
}

export const sessionIsCreated = (
  username: string,
  password: string
): Promise<string> => {
  const body = JSON.stringify({
    username,
    password
  });
  console.log(process.env.NODE_ENV);
  const result = fetch(`${serverURL}/login`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body
  })
    .then(res => {
      return res.json();
    })
    .then(data => {
      console.log('the data', data);
      if (data.sessionId && typeof data.sessionId === 'string') {
        // check that a session id was passed down
        window.localStorage.setItem('ssid', data.sessionId);
        return 'Success';
      } else {
        return data; // error message returned from userController.verifyUser
      }
    })
    .catch(err => {
      console.log('Error while trying to login', err);
      return 'Error';
    });
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
  const result = fetch(`${serverURL}/signup`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body
  })
    .then(res => {
      return res.json();
    })
    .then(data => {
      if (data.sessionId && typeof data.sessionId === 'string') {
        // check that a session id was passed down
        window.localStorage.setItem('ssid', data.sessionId);
        return 'Success';
      }
      return data; // response is either Email Taken or Username Taken, refer to userController.createUser
    })
    .catch(err => {
      console.log(err);
      return 'Error';
    });
  return result;
};
