const { Mongoose } = require('mongoose');
const request = require('supertest');
const http = require('http');
const app = require('../server/server.js');
const mock = require('../mockData');
// tests user signup and login routes
describe('GraphQL tests', () => {
  let server;
  // Mutation test variables
  const projectId = '62fd62c6d37748133a6fdc81'; // Must use a valid projectId from the database. NOTE: This should be revised for each Production Project Team since the database store different projectId
  const testNum = 100;
  const makeCopyUserIdTest = '604333d10004ad51c899e250';
  const makeCopyUsernameTest = 'test1';
  let makeCopyProjId = '';
  beforeAll((done) => {
    server = http.createServer(app);
    server.listen(done);
  });
  afterAll((done) => {
    Mongoose.disconnect();
    server.close(done);
  });
  // GraphQL Query
  xdescribe('Testing GraphQL query', () => {
    it('getAllProjects should return more than 1 project by default', () => request(server)
      .post('/graphql')
      .set('Content-Type', 'application/json')
      .send({
        query: mock.GET_PROJECTS,
      })
      .expect(200)
      .then(res => expect(res.body.data.getAllProjects.length).toBeGreaterThanOrEqual(1)));
    it('getAllProjects should return projects that matches the provided userId', () => request(server)
      .post('/graphql')
      .set('Content-Type', 'application/json')
      .send({
        query: mock.GET_PROJECTS,
        variables: {
          userId: '604d21b2b61a1c95f2dc9105',
        },
      })
      .expect(200)
      .then(res => expect(res.body.data.getAllProjects[0].userId).toBe('604d21b2b61a1c95f2dc9105')));
  });
  // GraphQL Mutation
  xdescribe('Testing GraphQL mutation', () => {
    // Add likes
    it('addLike should update the "likes" field of the project document', () => request(server)
      .post('/graphql')
      .set('Content-Type', 'application/json')
      .send({
        query: mock.ADD_LIKE,
        variables: {
          projId: projectId,
          likes: testNum,
        },
      })
      .expect(200)
      .then(res => expect(res.body.data.addLike.likes).toBe(testNum)));
    // Publish project
    it('Should set the "published" on the project document to TRUE', () => request(server)
      .post('/graphql')
      .set('Content-Type', 'application/json')
      .send({
        query: mock.PUBLISH_PROJECT,
        variables: {
          projId: projectId,
          published: true,
        },
      })
      .expect(200)
      .then(res => expect(res.body.data.publishProject.published).toBe(true)));
    it('Should set the "published" on the project document to FALSE', () => request(server)
      .post('/graphql')
      .set('Content-Type', 'application/json')
      .send({
        query: mock.PUBLISH_PROJECT,
        variables: {
          projId: projectId,
          published: false,
        },
      })
      .expect(200)
      .then(res => expect(res.body.data.publishProject.published).toBe(false)));
    // Make copy
    it('Should make a copy of an existing project and change the userId and userName', () => request(server)
      .post('/graphql')
      .set('Content-Type', 'application/json')
      .send({
        query: mock.MAKE_COPY,
        variables: {
          projId: projectId,
          userId: makeCopyUserIdTest,
          username: makeCopyUsernameTest,
        },
      })
      .expect(200)
      .then((res) => {
        expect(res.body.data.makeCopy.userId).toBe(makeCopyUserIdTest);
        expect(res.body.data.makeCopy.username).toBe(makeCopyUsernameTest);
        makeCopyProjId = res.body.data.makeCopy.id;
      }));

    // Delete copy
    it('Should make a copy of an existing project and change the userId and userName', () => request(server)
      .post('/graphql')
      .set('Content-Type', 'application/json')
      .send({
        query: mock.DELETE_PROJECT,
        variables: {
          projId: makeCopyProjId,
        },
      })
      .expect(200)
      .then((res) => {
        expect(res.body.data.deleteProject.id).toBe(makeCopyProjId);
      }));
  });

});
