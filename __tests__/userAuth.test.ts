/**
 * @vitest-environment node
 */
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import app from '../server/server';
import mockData from '../mockData';
import { Sessions, Users } from '../server/models/reactypeModels';
import supertest from 'supertest';
import mongoose from 'mongoose';
// const mockNext = jest.fn(); // Mock nextFunction
const MONGO_DB = import.meta.env.MONGO_DB; // _TEST
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

const request = supertest(app)

describe('User Authentication tests', () => {
  describe('initial connection test', () => {
    it('should connect to the server', async () => {
      const response = await request.get('/test');
      expect(response.status).toBe(200);
      expect(response.text).toBe('test request is working');
    });
  });
  describe('/signup', () => {
    describe('POST', () => {
      //testing new signup
      it('responds with status 200 and sessionId on valid new user signup', async () => {
        const response = await request
          .post('/signup')
          .set('Content-Type', 'application/json')
          .send({
            username: `supertest${num}`,
            email: `test${num}@test.com`,
            password: `${num}`
          })
          expect(response.status).toBe(200)
          expect(response.body.ssId).toBeDefined();
      });

      it('responds with status 400 and json string on invalid new user signup (Already taken)', async () => {
        const response = await request
          .post('/signup')
          .send(user)
          .set('Accept', 'application/json');
          // .expect('Content-Type', /json/)

          expect(response.status).toBe(400)
          expect(typeof response.body).toBe('string');
      });
    });
  });

  describe('/login', () => {
    // tests whether existing login information permits user to log in
    describe('POST', () => {
      it('responds with status 200 and json object on verified user login', () => {
        return request
          .post('/login')
          .set('Accept', 'application/json')
          .send(user)
          .expect(200)
          .expect('Content-Type', /json/)
          .then((res) => expect(res.body.sessionId).toEqual(user.userId));
      });
      // if invalid username/password, should respond with status 400
      it('responds with status 400 and json string on invalid user login', () => {
        return request
          .post('/login')
          .send({ username: 'wrongusername', password: 'wrongpassword' })
          .expect(400)
          .expect('Content-Type', /json/)
          .then((res) => expect(typeof res.body).toBe('string'));
      });
      it("returns the message 'No Username Input' when no username is entered", () => {
        return request
          .post('/login')
          .send({
            username: '',
            password: 'Reactype123!@#',
            isFbOauth: false
          })
          .then((res) => expect(res.text).toBe('"No Username Input"'));
      });

      it("returns the message 'No Username Input' when no username is entered", () => {
        return request
          .post('/login')
          .send({
            username: '',
            password: 'Reactype123!@#',
            isFbOauth: false
          })
          .then((res) => expect(res.text).toBe('"No Username Input"'));
      });

      it("returns the message 'No Password Input' when no password is entered", () => {
        return request
          .post('/login')
          .send({
            username: 'reactype123',
            password: '',
            isFbOauth: false
          })
          .then((res) => expect(res.text).toBe('"No Password Input"'));
      });

      it("returns the message 'Invalid Username' when username does not exist", () => {
        return request
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
      return request
        .post('/login')
        .send({
          username: 'test',
          password: 'password1!',
          isFbOauth: false
        })
        .then((res) => expect(res.text).toBe('"Incorrect Password"'));
    });
  });

  describe('/updatePassword', () => {
    describe('PATCH', () => {
      //testing update password
      const testUsername = `supertest${Date.now()}`;
      const testPassword = `password${Date.now()}`;
      it('responds with status 200 and json string on valid password update (Success)', () => {
        return request
          .patch('/updatePassword')
          .set('Content-Type', 'application/json')
          .send({
            username: testUsername,
            password: testPassword
          })
          .expect(200)
          .then((res) => expect(res.body.message).toBe('Success')); // might need to be res.text instead of res.body.message
      });

      it('responds with status 400 and json string if no password is provided (Password is required.)', () => {
        return request
          .patch('/updatePassword')
          .set('Accept', 'application/json')
          .send({ username: testUsername })
          .expect('Content-Type', /json/)
          .expect(400)
          .then((res) => expect(res.body.error).toBe('Password is required.'));
      });

      it('responds with status 404 and json string if user is not found (User not found.)', () => {
        return request
          .patch('/updatePassword')
          .set('Accept', 'application/json')
          .send({ username: 'doesntexist', password: 'fakepassword' })
          .expect('Content-Type', /json/)
          .expect(404)
          .then((res) => expect(res.body.error).toBe('User not found.'));
      });

      it('responds with status 400 and json string the provided password is the same as the current password (New password must be different from the current password.)', () => {
        return request
          .patch('/updatePassword')
          .set('Accept', 'application/json')
          .send({
            username: testUsername,
            password: testPassword
          })
          .expect('Content-Type', /json/)
          .expect(400)
          .then((res) =>
            expect(res.body.error).toBe(
              'New password must be different from the current password.'
            )
          );
      });
    });
  });
});
