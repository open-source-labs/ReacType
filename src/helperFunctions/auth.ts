export const sessionIsCreated = (
  username: string,
  password: string
): Promise<boolean> => {
  const body = JSON.stringify({
    username,
    password
  });
  const result = fetch('https://localhost:8080/login', {
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
        return true;
      }
      return false;
    })
    .catch(err => {
      console.log(err);
      return false;
    });
  return result;
};

export const newUserIsCreated = (
  username: string,
  email: string,
  password: string
): Promise<boolean> => {
  const body = JSON.stringify({
    username,
    email,
    password
  });
  const result = fetch('https://localhost:8080/signup', {
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
        return true;
      }
      return false;
    })
    .catch(err => {
      console.log(err);
      return false;
    });
  return result;
};

export const githubOauth = (): Promise<boolean> => {
  const result = fetch('https://github.com/login/oauth/authorize', {
    method: 'GET',
    mode: 'no-cors',
    params: {
      client_id: process.env.GITHUB_ID
    }
  })
    .then(res => res.json())
    .then(data => {
      console.log('Data from github oauth', data);
      return true;
    })
    .catch(err => {
      console.log('Error from github oauth', err);
      return false;
    });
  return result;
};
