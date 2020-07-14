import { sessionIsCreated, newUserIsCreated } from '../app/src/helperFunctions/auth';

describe('Login Tests', () => {
  let username;
  let password; 

  // Called under SignIn.tsx
  describe('sessionIsCreated', async () => {

    it('returns the message \'No Username Input\' when no username is entered', async () => {
      username = '';
      password = 'codesmith'
      const result = await sessionIsCreated(username, password).then((loginStatus) => loginStatus);
      expect(result).toEqual('No Username Input');
    })

    it('returns the message \'No Password Input\' when no password is entered', async () => {
      username = 'reactype';
      password = ''
      const result = await sessionIsCreated(username, password).then((loginStatus) => loginStatus);
      expect(result).toEqual('No Password Input');
    })

  })

})

