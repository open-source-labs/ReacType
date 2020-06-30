export const sessionIsCreated = (username: string, password: string): Promise<string> => {
  const body = JSON.stringify({
    username,
    password
  });
  const result = fetch('http://localhost:8080/login', {
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
      if (data.sessionId && typeof data.sessionId === 'string') { // check that a session id was passed down
        return 'Success'
      } else {
        return data; // error message returned from userController.verifyUser
      }
    })
    .catch(err => {
      console.log(err);
      return 'Error'
    });
  return result;
}

export const newUserIsCreated = (username: string, email: string, password: string): Promise<boolean> => {
  const body = JSON.stringify({
    username,
    email,
    password
  });
  const result = fetch('http://localhost:8080/signup', {
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
      if (data.sessionId && typeof data.sessionId === 'string') { // check that a session id was passed down
        return true;
      }
      return false;
    })
    .catch(err => {
      console.log(err);
      return false
    });
  return result;
}