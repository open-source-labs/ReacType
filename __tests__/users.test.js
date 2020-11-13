const request = require('supertest');
//let server = 'https://reactype.herokuapp.com';
let server = 'http://localhost:5000';
const isDev = process.env.NODE_ENV === 'development';
if (isDev) {
  server = 'http://localhost:5000';
}

console.log('is Dev====???', process.env.NODE_ENV);

// tests user signup and login routes
describe('User authentication tests', () => {
  let num = Math.floor(Math.random() * 1000);

  describe('/signup', () => {
    describe('POST', () => {
      it('responds with status 200 and json object on valid new user signup', () => {
        return request(server)
          .post('/signup')
          .send({
            username: `supertest${num}`,
            email: `test${num}@test.com`,
            password: `${num}`,
          })
          .expect('Content-Type', /json/)
          .expect(200)
          .then((res) => expect(typeof res.body).toBe('object'));
      });
      it('responds with status 400 and json string on invalid new user signup', () => {
        return request(server)
          .post('/signup')
          .send({
            username: 'reactyp3test',
            email: 'testaccount@gmail.com',
            password: 'password',
          })
          .expect('Content-Type', /json/)
          .expect(400)
          .then((res) => expect(typeof res.body).toBe('string'));
      });
    });
  });
  describe('/login', () => {
    describe('POST', () => {
      it('responds with status 200 and json object on verified user login', () => {
        return request(server)
          .post('/login')
          .send({ username: 'testing', password: 'codesmith1!' })
          .expect(200)
          .expect('Content-Type', /json/)
          .then((res) =>
            expect(res.body.sessionId).toEqual('5fa99d1930e67b513c17ba61')
          );
      });
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
describe('Github oauth tests', () => {
  describe('/github/callback?code=', () => {
    describe('GET', () => {
      it('responds with status 400 and error message if no code received', () => {
        return request(server)
          .get('/github/callback?code=')
          .expect(400)
          .then(res => {
            return expect(res.text).toEqual('\"Undefined or no code received from github.com\"');
          });
      });
      it('responds with status 400 if invalid code received', () => {
        return request(server)
          .get('/github/callback?code=123456')
          .expect(400)
      });
    });
  });
});
