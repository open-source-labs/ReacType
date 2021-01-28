import { sessionIsCreated, newUserIsCreated } from '../app/src/helperFunctions/auth';

describe('Login Tests', () => {
  jest.setTimeout(10000);
  let username;
  let password;
  let isFbOauth;

  // Called under SignIn.tsx
  describe('sessionIsCreated', () => {
    it('returns the message \'No Username Input\' when no username is entered', async () => {
      username = '';
      password = 'Reactype123!@#';
      isFbOauth = false;
      const result = await sessionIsCreated(username, password, isFbOauth).then((loginStatus) => loginStatus);
      expect(result).toEqual('No Username Input');
    })

    it('returns the message \'No Password Input\' when no password is entered', async () => {
      username = 'reactype123';
      password = '';
      isFbOauth = false;
      const result = await sessionIsCreated(username, password, isFbOauth).then((loginStatus) => loginStatus);
      expect(result).toEqual('No Password Input');
    })

    it('returns the message \'Invalid Username\' when username does not exist', async () => {
      username = 'l!b'; //breaks the 4 character minimum and no special characters
      password = 'test';
      isFbOauth = false;
      const result = await sessionIsCreated(username, password, isFbOauth).then((loginStatus) => loginStatus);
      expect(result).toEqual('Invalid Username');
    })

    it('returns the message \'Incorrect Password\' when password does not match', async () => {
      username = 'reactyp3test';
      password = 'incorrect';
      isFbOauth = false;
      const result = await sessionIsCreated(username, password, isFbOauth).then((loginStatus) => loginStatus);
      expect(result).toEqual('Incorrect Password');
    })

    it('returns the message \'Success\' when the user passes all auth checks', async () => {
      username = 'testing';
      password = 'codesmith1!';
      isFbOauth = false;
      const result = await sessionIsCreated(username, password, isFbOauth).then((loginStatus) => loginStatus);
      expect(result).toEqual('Success');
    })
  })

})

