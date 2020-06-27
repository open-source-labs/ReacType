import Cookies from 'js-cookie';

// check for a cookie when and redirect to main app when first loaded
export const hasValidSession = () => {
  // Cookies.get('ssid');
}

export const sessionIsCreated = (username: string, password: string): Promise<boolean> => {
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