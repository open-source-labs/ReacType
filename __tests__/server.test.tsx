/**
 * @jest-environment node
 */


import marketplaceController from '../server/controllers/marketplaceController'; 
import sessionController from '../server/controllers/sessionController';
import app from '../server/server';
import mockData from '../mockData';
import { profileEnd } from 'console';
import { Projects, Sessions} from '../server/models/reactypeModels';
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
  

  // // test saveProject endpoint
  // describe('/login', () => {
  //   describe('/POST', () => {
  //     it('responds with a status of 200 and json object equal to project sent', async () => {
  //       return request(app)
  //         .post('/login')
  //         .set('Cookie', [`ssid=${user.userId}`]) 
  //         .set('Accept', 'application/json')
  //         .send(projectToSave)
  //         .expect(200)
  //         .expect('Content-Type', /application\/json/)
  //         .then((res) => expect(res.body.name).toBe(projectToSave.name));
  //     });
  //   // });
  //   });
  // });

  // test saveProject endpoint
  describe('/saveProject', () => {
    describe('POST', () => {
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
  describe('/getProjects', () => {
    describe('POST', () => {
      it('responds with status of 200 and json object equal to an array of user projects', () => {
        return request(app)
          .post('/getProjects')
          .set('Accept', 'application/json')
          .set('Cookie', [`ssid=${user.userId}`]) 
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
        const response: Response = await request(app).post('/getProjects').set('Accept', 'application/json').set('Cookie', [`ssid=${user.userId}`]).send({ userId: projectToSave.userId });
        const _id: String = response.body[0]._id;
        const userId: String = user.userId;
        return request(app)
          .delete('/deleteProject')
          .set('Cookie', [`ssid=${user.userId}`]) 
          .set('Content-Type', 'application/json')
          .send({ _id, userId })
          .expect(200)
          .then((res) => expect(res.body._id).toBe(_id)); 
      });
    });
  });

  //test publishProject endpoint
  describe('/publishProject', () => {
    describe('POST', () => {
      it('responds with status of 200 and json object equal to published project', async () => {

        const projObj = await request(app)
          .post('/saveProject')
          .set('Cookie', [`ssid=${user.userId}`]) 
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
          .set('Cookie', [`ssid=${user.userId}`]) 
          .send({ _id, project, comments, userId, username, name })//_id, project, comments, userId, username, name 
          .expect(200)
          .then((res) => {
            expect(res.body._id).toBe(_id)
            expect(res.body.published).toBe(true);
          }); 
      });
      it('responds with status of 500 and error if userId and cookie ssid do not match', async () => {
        const projObj: Response = await request(app).post('/getProjects').set('Accept', 'application/json').set('Cookie', [`ssid=${user.userId}`]).send({ userId: projectToSave.userId });
        const _id: String = projObj.body[0]._id;
        const project: String = projObj.body[0].project;
        const comments: String = projObj.body[0].comments;
        const username: String = projObj.body[0].username;
        const name: String = projObj.body[0].name;
        const userId: String = "ERROR";
        return request(app)
          .post('/publishProject')
          .set('Content-Type', 'application/json')
          .set('Cookie', [`ssid=${user.userId}`]) 
          .send({ _id, project, comments, userId, username, name })//_id, project, comments, userId, username, name 
          .expect(500)
          .then((res) => {
            expect(res.body.err).not.toBeNull()
          }); 
      });
      it('responds with status of 500 and error if _id was not a valid mongo ObjectId', async () => {
        const projObj: Response = await request(app).post('/getProjects').set('Accept', 'application/json').set('Cookie', [`ssid=${user.userId}`]).send({ userId: projectToSave.userId });
        const _id: String = 'ERROR';
        const project: String = projObj.body[0].project;
        const comments: String = projObj.body[0].comments;
        const username: String = user.username;
        const name: String = projObj.body[0].name;
        const userId: String = user.userId;
        
        return request(app)
          .post('/publishProject')
          .set('Content-Type', 'application/json')
          .set('Cookie', [`ssid=${user.userId}`]) 
          .send({ _id, project, comments, userId, username, name })//_id, project, comments, userId, username, name 
          .expect(200)
          .then((res) => {
            expect(res.body._id).not.toEqual(_id)
          }); 
      });
    });
  });

  //test getMarketplaceProjects endpoint
  describe('/getMarketplaceProjects', () => {//most recent project should be the one from publishProject

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
  describe('/cloneProject/:docId', () => {
    describe('GET', () => {
      it('responds with status of 200 and json object equal to cloned project', async () => {

        const projObj = await request(app)
          .get('/getMarketplaceProjects')
          .set('Content-Type', 'application/json')

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
      it('responds with status of 500 and error', async () => {

        const projObj = await request(app)
          .get('/getMarketplaceProjects')
          .set('Content-Type', 'application/json')

        return request(app)
          .get(`/cloneProject/${projObj.body[0]._id}`)
          .set('Cookie', [`ssid=${user.userId}`]) // Set the cookie
          .query({ username: [] })
          .expect(500)
          .then((res) => {
            expect(res.body.err).not.toBeNull()
          }); 
      });
    });
  });

  //test unpublishProject endpoint
  describe('/unpublishProject', () => {
    describe('PATCH', () => {
      it('responds with status of 200 and json object equal to unpublished project', async () => {
        const response: Response = await request(app).post('/getProjects').set('Accept', 'application/json').set('Cookie', [`ssid=${user.userId}`]).send({ userId: projectToSave.userId }); //most recent project should be the one from publishProject
        const _id: String = response.body[0]._id;
        const userId: String = user.userId;
        return request(app)
          .patch('/unpublishProject')
          .set('Content-Type', 'application/json')
          .set('Cookie', [`ssid=${user.userId}`])
          .send({ _id, userId })
          .expect(200)
          .then((res) => {
            expect(res.body._id).toBe(_id)
            expect(res.body.published).toBe(false);
          }); 
      });
      it('responds with status of 500 and error if userId and cookie ssid do not match', async () => {
        const projObj: Response = await request(app).post('/getProjects').set('Accept', 'application/json').set('Cookie', [`ssid=${user.userId}`]).send({ userId: projectToSave.userId });
        const _id: String = projObj.body[0]._id;
        const project: String = projObj.body[0].project;
        const comments: String = projObj.body[0].comments;
        const username: String = projObj.body[0].username;
        const name: String = projObj.body[0].name;
        let userId: String = user.userId;
        await request(app)//publishing a project first
          .post('/publishProject')
          .set('Content-Type', 'application/json')
          .set('Cookie', [`ssid=${user.userId}`]) 
          .send({ _id, project, comments, userId, username, name })
          
        
        userId = "ERROR";
        return request(app)
          .patch('/unpublishProject')
          .set('Content-Type', 'application/json')
          .set('Cookie', [`ssid=${user.userId}`])
          .send({ _id, userId })
          .expect(500)
          .then((res) => {
            expect(res.body.err).not.toBeNull()
          }); 
      });
      it('responds with status of 500 and error if _id was not a string', async () => {
        const userId: String = user.userId;

        return request(app)
          .patch('/unpublishProject')
          .set('Content-Type', 'application/json')
          .set('Cookie', [`ssid=${user.userId}`])
          .send({userId })
          .expect(500)
          .then((res) => {
            expect(res.body.err).not.toBeNull()
          }); 
      });
    });
  });

  xdescribe('SessionController tests', () => {
    

  
    
    afterEach(() => {
      jest.resetAllMocks();
    })
    
    xdescribe('isLoggedIn',() => {
      // Mock Express request and response objects and next function
      const mockReq: any = {
        cookies: null,//trying to trigger if cookies was not assigned
        body: {
          userId: 'sampleUserId', // Set up a sample userId in the request body
        },
      } 
      
      const mockRes: any = {
        json: jest.fn(),
        status: jest.fn(),
        redirect: jest.fn()
      };
    
      const next = jest.fn();
      it('Assign userId from request body to cookieId', async () => {
        // Call isLoggedIn 
        await sessionController.isLoggedIn(mockReq, mockRes, next);
        expect(mockRes.redirect).toHaveBeenCalledWith('/');
        // Ensure that next() was called
      });
  
      it('Trigger a database query error for findOne', async () => {
        jest.spyOn(mongoose.model('Sessions'), 'findOne').mockImplementation(() => {
          throw new Error('Database query error');
        });
        // Call isLoggedIn
        await sessionController.isLoggedIn(mockReq, mockRes, next);
    
        // Ensure that next() was called with the error
        expect(next).toHaveBeenCalledWith(expect.objectContaining({
          log: expect.stringMatching('Database query error'), // The 'i' flag makes it case-insensitive
        }));
      });
    });

    xdescribe('startSession',() => {
      const mockReq: any = {
        cookies: projectToSave.userId,//trying to trigger if cookies was not assigned
        body: {
          userId: 'sampleUserId', // Set up a sample userId in the request body
        },
      } 
      
      const mockRes: any = {
        json: jest.fn(),
        status: jest.fn(),
        redirect: jest.fn()
      };

      jest.spyOn(mongoose.model('Sessions'), 'findOne').mockImplementation(() => {
        throw new Error('Database query error');
      });
    
      const next = jest.fn();

      it('Trigger a database query error for findOne', async () => {

        jest.spyOn(mongoose.model('Sessions'), 'findOne').mockImplementation(() => {
          throw new Error('Database query error');
        });
        // Call startSession
        await sessionController.startSession(mockReq, mockRes, next);
    
        // Ensure that next() was called with the error
        expect(next).toHaveBeenCalledWith(expect.objectContaining({
          log: expect.stringMatching('Database query error'), // The 'i' flag makes it case-insensitive
        }));
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
