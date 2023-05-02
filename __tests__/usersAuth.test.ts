/**
 * @jest-environment node
 */
import request from 'supertest';
import app from '../server/server';
import mockObj from '../mockData';
const user = mockObj.user;
import { sessionIsCreated } from '../app/src/helperFunctions/auth';

//for creating unqiue login credentials
const num = Math.floor(Math.random() * 1000);
let username;
let password;
let isFbOauth;

describe('User authentication tests', () => {
  //test connection to server
  describe('initial connection test', () => {
    it('should connect to the server', async () => {
      const response = await request(app).get('/test');
      expect(response.text).toEqual('test request is working');
    });
  });
  //navigating to signup page should serve
  describe('/', () => {
    describe('GET', () => {
      it('respond with status 200 and load landing page', () => {
        request(app)
          .get('/signup')
          .expect('Content-Type', /text\/html/)
          .expect(200);
      });
    });

    describe('POST', () => {
      it('responds with status 200 and json object on valid new user signup', () => {
        return request(app)
          .post('/signup')
          .send({
            username: `supertest${num}`,
            email: `test${num}@test.com`,
            password: `${num}`
          })
          .set('Content-Type', 'application/json')
          .expect(200)
          .then((res) => expect(typeof res.body).toBe('object'));
      });

      it('responds with status 400 and json string on invalid new user signup', () => {
        return request(app)
          .post('/signup')
          .send(user)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .then((res) => expect(typeof res.body).toBe('string'));
      });
    });
  });
  describe('/login', () => {
    // tests whether existing login information permits user to log in
    describe('POST', () => {
      it('responds with status 200 and json object on verified user login', () => {
        return request(app)
          .post('/login')
          .set('Accept', 'application/json')
          .send(user)
          .expect(200)
          .expect('Content-Type', /json/)
          .then((res) => expect(res.body.sessionId).toEqual(user.userId));
      });
      // if invalid username/password, should respond with status 400
      it('responds with status 400 and json string on invalid user login', () => {
        return request(app)
          .post('/login')
          .send({ username: 'wrongusername', password: 'wrongpassword' })
          .expect(400)
          .expect('Content-Type', /json/)
          .then((res) => expect(typeof res.body).toBe('string'));
      });
      it('responds with status 400 and json string on invalid new user signup', () => {
        return request(app)
          .post('/signup')
          .send(user)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .then((res) => expect(typeof res.body).toBe('string'));
      });
    });
  });

  describe('sessionIsCreated', () => {
    it("returns the message 'No Username Input' when no username is entered", () => {
      return request(app)
        .post('/login')
        .send({
          username: '',
          password: 'Reactype123!@#',
          isFbOauth: false
        })
        .then((res) => expect(res.text).toBe('"No Username Input"'));
    });

    it("returns the message 'No Password Input' when no password is entered", () => {
      return request(app)
        .post('/login')
        .send({
          username: 'reactype123',
          password: '',
          isFbOauth: false
        })
        .then((res) => expect(res.text).toBe('"No Password Input"'));
    });

    it("returns the message 'Invalid Username' when username does not exist", () => {
      return request(app)
        .post('/login')
        .send({
          username: 'l!b',
          password: 'test',
          isFbOauth: false
        })
        .then((res) => expect(res.text).toBe('"Invalid Username"'));
    });
  });

  it("returns the message 'Incorrect Password' when password does not match", () => {
    return request(app)
      .post('/login')
      .send({
        username: 'test',
        password: 'test',
        isFbOauth: false
      })
      .then((res) => expect(res.text).toBe('"Incorrect Password"'));
  });
  // note that the username and password in this test are kept in the heroku database
  // DO NOT CHANGE unless you have access to the heroku database
  it("returns the message 'Success' when the user passes all auth checks", () => {
    return request(app)
      .post('/login')
      .send({
        username: 'test',
        password: 'password1!',
        isFbOauth: false
      })
      .then((res) => expect(res.body).toHaveProperty('sessionId'));
  });
});

// // // OAuth tests (currently inoperative)

// // xdescribe('Github oauth tests', () => {
// //   describe('/github/callback?code=', () => {
// //     describe('GET', () => {
// //       it('responds with status 400 and error message if no code received', () => {
// //         return request(server)
// //           .get('/github/callback?code=')
// //           .expect(400)
// //           .then((res) => {
// //             return expect(res.text).toEqual(
// //               '"Undefined or no code received from github.com"'
// //             );
// //           });
// //       });
// //       it('responds with status 400 if invalid code received', () => {
// //         return request(server).get('/github/callback?code=123456').expect(400);
// //       });
// //     });
// //   });
// // });
