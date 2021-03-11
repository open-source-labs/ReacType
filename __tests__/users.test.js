const request = require('supertest');
// let server = 'https://reactype.herokuapp.com'; /* This is for production mode */

// const server = 'http://localhost:5000';
const browser = 'http://localhost:8080'; // for checking endpoints accessed with hash router

// tests user signup and login routes
describe('User authentication tests', () => {
  const { Mongoose } = require('mongoose');
  let server;
  
  const user = {
    username: 'reactype123',
    email: 'reactype@gmail.com',
    password: 'Reactype123!@#',
    userId: '604a552e9167c02198895823'
  };

  beforeAll((done)=> {
    const app = require('../server/server.js');
    const http = require('http');
    server = http.createServer(app);
    server.listen(done);



  });

  afterAll((done)=> {
    Mongoose.disconnect();
    server.close(done);
  });


  const num = Math.floor(Math.random() * 1000);

  // tests whether signup page is returned on navigation to /#/signup endpoint
  // note that /#/ is required in endpoint because it is accessed via hash router
  describe('/signup', () => {
    describe('GET', () => {
      it('respond with status 200 and load signup file', () => {
        return request(browser)
          .get('/#/signup')
          .expect('Content-Type', /text\/html/)
          .expect(200);
      });
    });
    // tests whether new user can sign up
    describe('POST', () => {
      it('responds with status 200 and json object on valid new user signup', () => {
        return request(server)
          .post('/signup')
          .send({
            username: `supertest${num}`,
            email: `test${num}@test.com`,
            password: `${num}`,
          })
          .set('Content-Type', 'application/json')
          .expect(200)
          .then(res => expect(typeof res.body).toBe('object'));
      });
      // if invalid signup input, should respond with status 400
      it('responds with status 400 and json string on invalid new user signup', () => {
        return request(server)
          .post('/signup')
          .send(user)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .then(res => expect(typeof res.body).toBe('string'));
      });
    });
  });
  // tests whether login page is returned on navigation to /#/login endpoint
  describe('/login', () => {
    describe('GET', () => {
      it('respond with status 200 and load login file', () => {
        return request(browser)
          .get('/#/login')
          .expect('Content-Type', /text\/html/)
          .expect(200);
      });
    });
    // tests whether existing login information permits user to log in
    describe('POST', () => {
      it('responds with status 200 and json object on verified user login', () => {
        return request(server)
          .post('/login')
          .set('Accept', 'application/json')
          .send(user)
          .expect(200)
          .expect('Content-Type', /json/)
          .then(res => expect(res.body.sessionId).toEqual(user.userId));
      });
      // if invalid username/password, should respond with status 400
      it('responds with status 400 and json string on invalid user login', () => {
        return request(server)
          .post('/login')
          .send({ username: 'wrongusername', password: 'wrongpassword' })
          .expect(400)
          .expect('Content-Type', /json/)
          .then((res) => expect(typeof res.body).toBe('string'));
      });
    });
  });
});
// OAuth tests (currently inoperative)
describe('Github oauth tests', () => {
  describe('/github/callback?code=', () => {
    describe('GET', () => {
      xit('responds with status 400 and error message if no code received', () => {
        return request(server)
          .get('/github/callback?code=')
          .expect(400)
          .then(res => {
            return expect(res.text).toEqual('\"Undefined or no code received from github.com\"');
          });
      });
      xit('responds with status 400 if invalid code received', () => {
        return request(server)
          .get('/github/callback?code=123456')
          .expect(400)
      });
    });
  });
});
