/**
 * @jest-environment node
 */

import app from '../server/server';
import mockData from '../mockData';
import { Sessions, Users } from '../server/models/reactypeModels';
const request = require('supertest');
const mongoose = require('mongoose');
const mockNext = jest.fn(); // Mock nextFunction
const MONGO_DB = import.meta.env.MONGO_DB_TEST;
const { user } = mockData;
const PORT = 8080;

const num = Math.floor(Math.random() * 1000);

beforeAll(async () => {
  await mongoose.connect(MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
});

afterAll(async () => {
  const result = await Users.deleteMany({
    _id: { $ne: '64f551e5b28d5292975e08c8' }
  }); //clear the users collection after tests are done except for the mockdata user account
  const result2 = await Sessions.deleteMany({
    cookieId: { $ne: '64f551e5b28d5292975e08c8' }
  });
  console.log(
    `${result.deletedCount} and ${result2.deletedCount} documents deleted.`
  );
  await mongoose.connection.close();
});

describe('User Authentication tests', () => {
  describe('initial connection test', () => {
    it('should connect to the server', async () => {
      const response = await request(app).get('/test');
      expect(response.status).toBe(200);
      expect(response.text).toBe('test request is working');
    });
  });
  describe('/signup', () => {
    describe('POST', () => {
      //testing new signup
      it('responds with status 200 and sessionId on valid new user signup', () => {
        return request(app)
          .post('/signup')
          .set('Content-Type', 'application/json')
          .send({
            username: `supertest${num}`,
            email: `test${num}@test.com`,
            password: `${num}`
          })
          .expect(200)
          .then((res) => expect(res.body.sessionId).not.toBeNull());
      });

      it('responds with status 400 and json string on invalid new user signup (Already taken)', () => {
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
  });
});
