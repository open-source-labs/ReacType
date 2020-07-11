export const sessionIsCreated = (
  username: string,
  password: string
): Promise<string> => {
  console.log('Username and pw in sessionIsCreated', username, password);
  const body = JSON.stringify({
    username,
    password
  });
  console.log('In sessionIsCreated, body is', body);
  const result = fetch('http://localhost:8081/login', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Origin: 'reactype'
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
        console.log('Inside success');
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
  const result = fetch('http://localhost:8081/signup', {
    method: 'POST',
    //credentials: 'include',
    //mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json'
      //'Access-Control-Allow-Origin': 'https://localhost:8081'
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
      }
      return data; // response is either Email Taken or Username Taken, refer to userController.createUser
    })
    .catch(err => {
      console.log(err);
      return 'Error';
    });
  return result;
};
