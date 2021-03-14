import { sessionIsCreated, newUserIsCreated } from '../app/src/helperFunctions/auth';

const { Mongoose } = require('mongoose');

const http = require('http');
const app = require('../server/server.js');

let server;


// tests auth.ts helper function and associated server routes
describe('Login Tests', () => {
  jest.setTimeout(10000);
  let username;
  let password;
  let isFbOauth; // whether OAuth is used


  beforeAll((done) => {
    server = http.createServer(app);
    server.listen(done);
  });

  afterAll((done)=> {
    Mongoose.disconnect();
    server.close(done);
  });


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
      username = 'l!b'; //breaks the 4 character minimum and no special characters restriction
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
    // note that the username and password in this test are kept in the heroku database
    // DO NOT CHANGE unless you have access to the heroku database
    it('returns the message \'Success\' when the user passes all auth checks', async () => {
      username = 'testing';
      password = 'codesmith1!';
      isFbOauth = false;
      const result = await sessionIsCreated(username, password, isFbOauth).then((loginStatus) => loginStatus);
      expect(result).toEqual('Success');
    })
  })

})

