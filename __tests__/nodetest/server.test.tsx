/**
 * @jest-environment node
 */


import marketplaceController from '../../server/controllers/marketplaceController'; 
import app from '../../server/server';
import mockData from '../../mockData';
import { profileEnd } from 'console';
const request = require('supertest');
const mongoose = require('mongoose');
const mockNext = jest.fn(); // Mock nextFunction
const MONGO_DB = process.env.MONGO_DB_TEST;
const { state, projectToSave, user } = mockData
const PORT = 8080;

beforeAll(async () => {
  await mongoose.connect(MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Server endpoint tests', () => {
  it('should pass this test request', async () => {
    const response = await request(app).get('/test');
    expect(response.status).toBe(200);
    expect(response.text).toBe('test request is working');
  });
  describe('Marketplace endpoint testing', () => {
    it('get requests to /getMarketplaceProjects should return an array of projects', async () => {
      const response = await request(app).get('/getMarketplaceProjects');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
    it('the return array should be populated with project objects', async () => {
      const response = await request(app).get('/getMarketplaceProjects');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });
  // test saveProject endpoint
  describe('/saveProject', () => {
    describe('/POST', () => {
      it('responds with a status of 200 and json object equal to project sent', async () => {
        // const response = await request(app).post('/saveProject').set('Accept', 'application/json').send(projectToSave);
        // console.log(response);
        // console.log(response.body);
        // expect(response.status).toBe(200);
        return request(app)
          .post('/saveProject')
          .set('Accept', 'application/json')
          .send(projectToSave)
          .expect(200)
          .expect('Content-Type', /application\/json/)
          .then((res) => expect(res.body.name).toBe(projectToSave.name));
      });
    // });
  });
  // test getProjects endpoint
  describe('/getProjects', () => {
    describe('POST', () => {
      it('responds with status of 200 and json object equal to an array of user projects', () => {
        return request(app)
          .post('/getProjects')
          .set('Accept', 'application/json')
          .send({ userId: projectToSave.userId })
          .expect(200)
          .expect('Content-Type', /json/)
          .then((res) => {
            expect(Array.isArray(res.body)).toBeTruthy;
            expect(res.body[0].name).toBe(state.name);
          });
      });
    });
  });
  // test deleteProject endpoint
  describe('/deleteProject', () => {
    describe('DELETE', () => {
      it('responds with status of 200 and json object equal to deleted project', async () => {
        const response: Response = await request(app).post('/getProjects').set('Accept', 'application/json').send({ userId: projectToSave.userId });
        const _id: String = response.body[0]._id;
        const userId: String = user.userId;
        console.log(_id, userId);
        return request(app)
          .delete('/deleteProject')
          .set('Content-Type', 'application/json')
          .send({ _id, userId })
          .expect(200)
          .then((res) => expect(res.body._id).toBe(_id)); // @Denton might want to check more of these fields
      });
    });
  });
});
});







// describe('marketplaceController Middleware', () => {
//   describe('getProjects tests', () => {
//     it('should add the projects as an array to res.locals', () => {
//       const req = {};
//       const res = { locals: {} };
//       console.log(marketplaceController.getPublishedProjects);
//       console.log(typeof marketplaceController.getPublishedProjects);
//       marketplaceController.getPublishedProjects(req, res, mockNext);
//       expect(Array.isArray(res.locals.publishedProjects)).toBe(true);
//       expect(mockNext).toHaveBeenCalled();
//     });
//   });


//   it('should send an error response if there is an error in the middleware', () => {
//     const req = { user: { isAuthenticated: false } };
//     const res = mockResponse();
    
//     marketplaceController.authenticateMiddleware(req, res, mockNext);
    
//     expect(res.status).toHaveBeenCalledWith(500);
//     expect(res.json).toHaveBeenCalledWith({ err: 'Error in marketplaceController.getPublishedProjects, check server logs for details' });
//   });
// });
