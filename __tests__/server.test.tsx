/**
 * @jest-environment node
 */


import marketplaceController from '../server/controllers/marketplaceController'; 
import app from '../server/server';
import mockData from '../mockData';
import { profileEnd } from 'console';
import { Projects } from '../server/models/reactypeModels';
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

  const result = await Projects.deleteMany({});//clear the projects collection after tests are done
  console.log(`${result.deletedCount} documents deleted.`);
  await mongoose.connection.close();
});

describe('Server endpoint tests', () => {
  it('should pass this test request', async () => {
    const response = await request(app).get('/test');
    expect(response.status).toBe(200);
    expect(response.text).toBe('test request is working');
  });

  // test saveProject endpoint
  describe('/login', () => {
    describe('/POST', () => {
      it('responds with a status of 200 and json object equal to project sent', async () => {
        return request(app)
          .post('/login')
          .set('Cookie', [`ssid=${user.userId}`]) 
          .set('Accept', 'application/json')
          .send(projectToSave)
          .expect(200)
          .expect('Content-Type', /application\/json/)
          .then((res) => expect(res.body.name).toBe(projectToSave.name));
      });
    // });
    });
  });

  // test saveProject endpoint
  describe('/saveProject', () => {
    describe('/POST', () => {
      it('responds with a status of 200 and json object equal to project sent', async () => {
        return request(app)
          .post('/saveProject')
          .set('Cookie', [`ssid=${user.userId}`]) 
          .set('Accept', 'application/json')
          .send(projectToSave)
          .expect(200)
          .expect('Content-Type', /application\/json/)
          .then((res) => expect(res.body.name).toBe(projectToSave.name));
      });
    // });
    });
  });
  // test getProjects endpoint
  xdescribe('/getProjects', () => {
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
  xdescribe('/deleteProject', () => {
    describe('DELETE', () => {
      it('responds with status of 200 and json object equal to deleted project', async () => {
        const response: Response = await request(app).post('/getProjects').set('Accept', 'application/json').send({ userId: projectToSave.userId });
        const _id: String = response.body[0]._id;
        const userId: String = user.userId;
        return request(app)
          .delete('/deleteProject')
          .set('Content-Type', 'application/json')
          .send({ _id, userId })
          .expect(200)
          .then((res) => expect(res.body._id).toBe(_id)); // @Denton might want to check more of these fields
      });
    });
  });

  //test publishProject endpoint
  xdescribe('/publishProject', () => {
    describe('POST', () => {
      it('responds with status of 200 and json object equal to published project', async () => {

        const projObj = await request(app)
          .post('/saveProject')
          .set('Accept', 'application/json')
          .send(projectToSave)
          
        const _id: String = projObj.body._id;
        const project: String = projObj.body.project;
        const comments: String = projObj.body.comments;
        const username: String = projObj.body.username;
        const name: String = projObj.body.name;
        const userId: String = user.userId;
        return request(app)
          .post('/publishProject')
          .set('Content-Type', 'application/json')
          .send({ _id, project, comments, userId, username, name })//_id, project, comments, userId, username, name 
          .expect(200)
          .then((res) => {
            expect(res.body._id).toBe(_id)
            expect(res.body.published).toBe(true);
          }); 
      });
    });
  });

  //test getMarketplaceProjects endpoint
  xdescribe('/getMarketplaceProjects', () => {//most recent project should be the one from publishProject
    describe('GET', () => {
      it('responds with status of 200 and json object equal to unpublished project', async () => {
        return request(app)
          .get('/getMarketplaceProjects')
          .set('Content-Type', 'application/json')
          .expect(200)
          .then((res) => {

            expect(Array.isArray(res.body)).toBe(true);
            expect(res.body[0]._id).toBeTruthy;
          }); 
      });
    });
  });

  //test cloneProject endpoint
  xdescribe('/cloneProject/:docId', () => {
    describe('GET', () => {
      it('responds with status of 200 and json object equal to cloned project', async () => {

        const projObj = await request(app)
          .get('/getMarketplaceProjects')
          .set('Content-Type', 'application/json')
        console.log(projObj.body)
      //   const _id: String = projObj.body._id;
      //   const project: String = projObj.body.project;
      //   const comments: String = projObj.body.comments;
      //   const username: String = projObj.body.username;
      //   const name: String = projObj.body.name;
      //   const userId: String = user.userId;
        return request(app)
          .get(`/cloneProject/${projObj.body[0]._id}`)
          .set('Cookie', [`ssid=${user.userId}`]) // Set the cookie
          .query({ username: user.username })
          .expect(200)
          .then((res) => {
            expect(res.body.forked).toBeTruthy;
            expect(res.body.username).toBe(user.username);
          }); 
      });
    });
  });

  //test unpublishProject endpoint
  xdescribe('/unpublishProject', () => {
    describe('PATCH', () => {
      it('responds with status of 200 and json object equal to unpublished project', async () => {
        const response: Response = await request(app).post('/getProjects').set('Accept', 'application/json').send({ userId: projectToSave.userId }); //most recent project should be the one from publishProject
        const _id: String = response.body[0]._id;
        const userId: String = user.userId;
        return request(app)
          .patch('/unpublishProject')
          .set('Content-Type', 'application/json')
          .send({ _id, userId })//_id, project, comments, userId, username, name 
          .expect(200)
          .then((res) => {
            expect(res.body._id).toBe(_id)
            expect(res.body.published).toBe(false);
          }); // @Denton might want to check more of these fields
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
