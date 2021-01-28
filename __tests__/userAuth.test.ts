import { sessionIsCreated, newUserIsCreated } from '../app/src/helperFunctions/auth';

describe('Login Tests', () => {
  jest.setTimeout(10000);
  let username;
  let password;

  // Called under SignIn.tsx
  describe('sessionIsCreated', () => {
    it('returns the message \'No Username Input\' when no username is entered', async () => {
      username = '';
      password = 'Reactype123!@#'
      const result = await sessionIsCreated(username, password).then((loginStatus) => loginStatus);
      expect(result).toEqual('No Username Input');
    })

    it('returns the message \'No Password Input\' when no password is entered', async () => {
      username = 'reactype123';
      password = ''
      const result = await sessionIsCreated(username, password).then((loginStatus) => loginStatus);
      expect(result).toEqual('No Password Input');
    })

    it('returns the message \'Invalid Username\' when username does not exist', async () => {
      username = 'l!b'; //breaks the 4 character minimum and no special characters
      password = 'test';
      const result = await sessionIsCreated(username, password).then((loginStatus) => loginStatus);
      expect(result).toEqual('Invalid Username');
    })

    it('returns the message \'Incorrect Password\' when password does not match', async () => {
      username = 'reactyp3test';
      password = 'incorrect';
      const result = await sessionIsCreated(username, password).then((loginStatus) => loginStatus);
      expect(result).toEqual('Incorrect Password');
    })

    it('returns the message \'Success\' when the user passes all auth checks', async () => {
      username = 'reactype123';
      password = 'Reactype123!@#';
      const result = await sessionIsCreated(username, password).then((loginStatus) => loginStatus);
      expect(result).toEqual('Success');
    })
  })

})

