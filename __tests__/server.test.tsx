/* eslint-disable max-len */
// @vitest-environment node
import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest';
// import marketplaceController from '../server/controllers/marketplaceController';
import mongoose from 'mongoose';
import supertest from 'supertest';
import app from '../server/server';
import mockData from '../mockData';
// import { profileEnd } from 'console';
import { Projects, Users, Sessions } from '../server/models/reactypeModels';
import sessionController from '../server/controllers/sessionController';
// const mockNext = jest.fn(); // Mock nextFunction
const { MONGO_DB } = import.meta.env; // _TEST
const { state, projectToSave, user } = mockData;
// const PORT = 8080;

beforeAll(async () => {
  await mongoose.connect(MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await Projects.deleteMany({}); // clear the projects collection after tests are done
  await Users.deleteMany({
    _id: { $ne: '664247b09df40d692fb7fdef' },
  }); // clear the users collection after tests are done except for the mockdata user account
  await Sessions.deleteMany({
    cookieId: { $ne: '664247b09df40d692fb7fdef' },
  });
  await mongoose.connection.close();
});

const request = supertest(app);

describe('Server endpoint tests', () => {
  it('should pass this test request', async () => {
    const response = await request.get('/test');
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
      it('responds with a status of 200 and json object equal to project sent', async () => request
        .post('/saveProject')
        .set('Cookie', [`ssid=${user.userId}`])
        .set('Accept', 'application/json')
        .send(projectToSave)
        .expect(200)
        .expect('Content-Type', /application\/json/)
        .then((res) => expect(res.body.name).toBe(projectToSave.name)));
      // });
    });
  });
  // test getProjects endpoint
  describe('/getProjects', () => {
    describe('POST', () => {
      it('responds with status of 200 and json object equal to an array of user projects', () => request
        .post('/getProjects')
        .set('Accept', 'application/json')
        .set('Cookie', [`ssid=${user.userId}`])
        .send({ userId: projectToSave.userId })
        .expect(200)
        .expect('Content-Type', /json/)
        .then((res) => {
          expect(Array.isArray(res.body)).toBeTruthy;
          expect(res.body[0].name).toBe(state.name);
        }));
    });
  });
  // test deleteProject endpoint
  describe('/deleteProject', () => {
    describe('DELETE', () => {
      it('responds with status of 200 and json object equal to deleted project', async () => {
        const response = await request
          .post('/getProjects')
          .set('Accept', 'application/json')
          .set('Cookie', [`ssid=${user.userId}`])
          .send({ userId: projectToSave.userId });
        const _id: string = response.body?.[0]._id;
        const { userId } = user;
        return request
          .delete('/deleteProject')
          .set('Cookie', [`ssid=${user.userId}`])
          .set('Content-Type', 'application/json')
          .send({ _id, userId })
          .expect(200)
          .then((res) => expect(res.body._id).toBe(_id));
      });
    });
  });

  // test publishProject endpoint
  describe('/publishProject', () => {
    describe('POST', () => {
      it('responds with status of 200 and json object equal to published project', async () => {
        const projObj = await request
          .post('/saveProject')
          .set('Cookie', [`ssid=${user.userId}`])
          .set('Accept', 'application/json')
          .send(projectToSave);
        const { _id } = projObj.body;
        const { project } = projObj.body;
        const { comments } = projObj.body;
        const { username } = projObj.body;
        const { name } = projObj.body;
        const { userId } = user;
        return request
          .post('/publishProject')
          .set('Content-Type', 'application/json')
          .set('Cookie', [`ssid=${user.userId}`])
          .send({ _id, project, comments, userId, username, name })
          .expect(200)
          .then((res) => {
            expect(res.body._id).toBe(_id);
            expect(res.body.published).toBe(true);
          });
      });
      it('responds with status of 500 and error if userId and cookie ssid do not match', async () => {
        const projObj = await request
          .post('/getProjects')
          .set('Accept', 'application/json')
          .set('Cookie', [`ssid=${user.userId}`])
          .send({ userId: projectToSave.userId });
        const _id: string = projObj.body?.[0]._id;
        const project: string = projObj.body?.[0].project;
        const comments: string = projObj.body?.[0].comments;
        const username: string = projObj.body?.[0].username;
        const name: string = projObj.body?.[0].name;
        const userId = 'ERROR';
        return request
          .post('/publishProject')
          .set('Content-Type', 'application/json')
          .set('Cookie', [`ssid=${user.userId}`])
          .send({ _id, project, comments, userId, username, name })
          .expect(500)
          .then((res) => {
            expect(res.body.err).not.toBeNull();
          });
      });
      it('responds with status of 500 and error if _id was not a valid mongo ObjectId', async () => {
        const projObj = await request
          .post('/getProjects')
          .set('Accept', 'application/json')
          .set('Cookie', [`ssid=${user.userId}`])
          .send({ userId: projectToSave.userId });
        const _id = 'ERROR';
        const project: string = projObj.body?.[0].project;
        const comments: string = projObj.body?.[0].comments;
        const { username } = user;
        const name: string = projObj.body?.[0].name;
        const { userId } = user;

        return request
          .post('/publishProject')
          .set('Content-Type', 'application/json')
          .set('Cookie', [`ssid=${user.userId}`])
          .send({ _id, project, comments, userId, username, name })
          .expect(200)
          .then((res) => {
            expect(res.body._id).not.toEqual(_id);
          });
      });
    });
  });

  // test getMarketplaceProjects endpoint
  describe('/getMarketplaceProjects', () => {
    // most recent project should be the one from publishProject

    describe('GET', () => {
      it('responds with status of 200 and json object equal to unpublished project', async () => {
        return request
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

  // test cloneProject endpoint
  describe('/cloneProject/:docId', () => {
    describe('GET', () => {
      it('responds with status of 200 and json object equal to cloned project', async () => {
        const projObj = await request
          .get('/getMarketplaceProjects')
          .set('Content-Type', 'application/json');

        return request
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
        const projObj = await request
          .get('/getMarketplaceProjects')
          .set('Content-Type', 'application/json');

        return request
          .get(`/cloneProject/${projObj.body[0]._id}`)
          .set('Cookie', [`ssid=${user.userId}`]) // Set the cookie
          .query({ username: [] })
          .expect(500)
          .then((res) => {
            expect(res.body.err).not.toBeNull();
          });
      });
    });
  });

  // test unpublishProject endpoint
  describe('/unpublishProject', () => {
    describe('PATCH', () => {
      it('responds with status of 200 and json object equal to unpublished project', async () => {
        const response = await request
          .post('/getProjects')
          .set('Accept', 'application/json')
          .set('Cookie', [`ssid=${user.userId}`])
          .send({ userId: projectToSave.userId }); // most recent project should be the one from publishProject
        const _id: string = response.body?.[0]._id;
        const { userId } = user;
        return request
          .patch('/unpublishProject')
          .set('Content-Type', 'application/json')
          .set('Cookie', [`ssid=${user.userId}`])
          .send({ _id, userId })
          .expect(200)
          .then((res) => {
            expect(res.body._id).toBe(_id);
            expect(res.body.published).toBe(false);
          });
      });
      it('responds with status of 500 and error if userId and cookie ssid do not match', async () => {
        const projObj = await request
          .post('/getProjects')
          .set('Accept', 'application/json')
          .set('Cookie', [`ssid=${user.userId}`])
          .send({ userId: projectToSave.userId });
        const _id: string = projObj.body?.[0]._id;
        const project: string = projObj.body?.[0].project;
        const comments: string = projObj.body?.[0].comments;
        const username: string = projObj.body?.[0].username;
        const name: string = projObj.body?.[0].name;
        let { userId } = user;
        await request // publishing a project first
          .post('/publishProject')
          .set('Content-Type', 'application/json')
          .set('Cookie', [`ssid=${user.userId}`])
          .send({ _id, project, comments, userId, username, name });

        userId = 'ERROR';
        return request
          .patch('/unpublishProject')
          .set('Content-Type', 'application/json')
          .set('Cookie', [`ssid=${user.userId}`])
          .send({ _id, userId })
          .expect(500)
          .then((res) => {
            expect(res.body.err).not.toBeNull();
          });
      });
      it('responds with status of 500 and error if _id was not a string', async () => {
        const { userId } = user;

        return request
          .patch('/unpublishProject')
          .set('Content-Type', 'application/json')
          .set('Cookie', [`ssid=${user.userId}`])
          .send({ userId })
          .expect(500)
          .then((res) => {
            expect(res.body.err).not.toBeNull();
          });
      });
    });
  });
});

describe('isLoggedIn', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });
  // Mock Express request and response objects and next function
  const mockReq: any = {
    cookies: {},
    body: {
      userId: 'sampleUserId', // Set up a sample userId in the request body
    },
  };
  const mockRes: any = {
    json: vi.fn(),
    status: vi.fn(),
    redirect: vi.fn(),
    locals: {},
  };

  const next = vi.fn();
  it('Assign userId from request body to cookieId', async () => {
    // Call isLoggedIn
    await sessionController.isLoggedIn(mockReq, mockRes, next);
    expect(mockRes.locals.loggedIn).toBe(true);
    expect(next).toHaveBeenCalled();
  });
  it('Trigger a database query error for findOne', async () => {
    const mockFindOne = vi
      .spyOn(mongoose.model('Sessions'), 'findOne')
      .mockImplementation(() => {
        throw new Error('Database query error');
      });
    // Call isLoggedIn
    await sessionController.isLoggedIn(mockReq, mockRes, next);
    // Ensure that next() was called with the error
    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({
        log: expect.stringMatching('Database query error'), // The 'i' flag makes it case-insensitive
      }),
    );

    mockFindOne.mockRestore();
  });
});

describe('startSession', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });
  it('Trigger a database query error for findOne', async () => {
    const mockReq: any = {
      cookies: projectToSave.userId, // trying to trigger if cookies was not assigned
      body: {
        userId: 'sampleUserId', // Set up a sample userId in the request body
      },
    };
    const mockRes: any = {
      json: vi.fn(),
      status: vi.fn(),
      redirect: vi.fn(),
      locals: { id: projectToSave.userId },
    };

    const next = vi.fn();
    const findOneMock = vi.spyOn(mongoose.model('Sessions'), 'findOne');
    findOneMock.mockImplementation(
      (query: any, callback: (err: any, ses: any) => void) => {
        callback(new Error('Database query error'), null);
      },
    );
    // Call startSession
    sessionController.startSession(mockReq, mockRes, next);
    // Check that next() was called with the error
    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({
        log: expect.stringMatching('Database query error'), // The 'i' flag makes it case-insensitive
      }),
    );

    vi.restoreAllMocks();
  });

  // it.skip('Check if a new Session is created', async () => {
  //   //not working for some reason cannot get mocknext() to be called in test?

  //   const mockReq: any = {
  //     cookies: projectToSave.userId, //trying to trigger if cookies was not assigned
  //     body: {
  //       userId: 'sampleUserId' // Set up a sample userId in the request body
  //     }
  //   };
  //   const mockRes: any = {
  //     json: vi.fn(),
  //     status: vi.fn(),
  //     redirect: vi.fn(),
  //     locals: { id: 'testID' } //a sesion id that doesnt exist
  //   };

  //   const mockNext = vi.fn();

  //   //Call startSession
  //   // Wrap your test logic in an async function
  //   await sessionController.startSession(mockReq, mockRes, mockNext);

  //   //check if it reaches next()
  //   //await expect(mockRes.locals.ssid).toBe('testID');
  //   expect(mockNext).toHaveBeenCalled();
  // });
});

// describe('marketplaceController Middleware', () => {
//   describe('getProjects tests', () => {
//     it('should add the projects as an array to res.locals', () => {
//       const req = {};
//       const res = { locals: {} };

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
