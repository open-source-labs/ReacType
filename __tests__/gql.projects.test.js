const { Mongoose } = require('mongoose');
const request = require('supertest');
const http = require('http');
const app = require('../server/server.js');

const { GET_PROJECTS, ADD_LIKE } = require('../mockData');
const { projectToSave, state } = require('../app/mockData');

// tests user signup and login routes
describe('GraphQL tests', () => {
  let server;
  let projectId;

  beforeAll((done) => {
    server = http.createServer(app);
    server.listen(done);
  });

  afterAll((done) => {
    Mongoose.disconnect();
    server.close(done);
  });

  // GraphQL Query
  describe('Testing GraphQL query', () => {
    it('getAllProjects should return more than 1 project by default', () => request(server)
      .post('/graphql')
      .set('Content-Type', 'application/json')
      .send({
        query: GET_PROJECTS,
      })
      .expect(200)
      .then(res => expect(res.body.data.getAllProjects.length).toBeGreaterThanOrEqual(1)),
    );

    it('getAllProjects should return projects that matches the provided userId', () => request(server)
      .post('/graphql')
      .set('Content-Type', 'application/json')
      .send({
        query: GET_PROJECTS,
        variables: {
          userId: '603ac3454625489e492abe16',
        }
      })
      .expect(200)
      .then(res => expect(res.body.data.getAllProjects[0].userId).toBe('603ac3454625489e492abe16')),
    ); 
  });
  
  // GraphQL Mutation
  describe('Testing GraphQL mutation', () => {

    // Create project
    describe('/POST', () => {
      it('responds with a status of 200 and json object equal to project sent', () => {
        return request(server)
          .post('/saveProject')
          .set('Accept', 'application/json')
          .send(projectToSave)
          .expect(200)
          .expect('Content-Type', /application\/json/)
          .then((res) => { projectId = res.body.id; })
          .then((res) => expect(res.body.name).toBe(projectToSave.name));
      });
    });

    // Add likes
    it('Increment likes by 1', () => request(server)
      .post('/graphql')
      .set('Content-Type', 'application/json')
      .send({
        mutation: ADD_LIKE,
        variables: {
          projId: projectId,
          likes: 100,
        }
      })
      .expect(200)
      .then(res => expect(res.body.data.likes).toBe(1)),
    );
  
    
    // Publish project
  
    // Make copy
  
    // Delete copy
  
    // Delete project
    

    it('getAllProjects should return projects that matches the provided userId', () => request(server)
      .post('/graphql')
      .set('Content-Type', 'application/json')
      .send({
        query: GET_PROJECTS,
        variables: {
          userId: '603ac3454625489e492abe16',
        }
      })
      .expect(200)
      .then(res => expect(res.body.data.getAllProjects[0].userId).toBe('603ac3454625489e492abe16')),
    ); 
  });

});
