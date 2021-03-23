<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> master
const { Mongoose } = require('mongoose');
const request = require('supertest');


// initializes the project to be sent to server/DB
const { projectToSave, state } = require('../mockData');

const app = require('../server/server.js');
const http = require('http');
let server;
<<<<<<< HEAD
=======
=======
const request = require('supertest');
>>>>>>> 88cc3e590da1bd5641e96dc39eb4a7863d71dbfc
const app = require('../server/server');

let server = 'https://reactype.herokuapp.com';
const isDev = process.env.NODE_ENV === 'development';
if (isDev) {
  // server = 'http://localhost:5000';
  server = require('..server/server');
}
<<<<<<< HEAD
>>>>>>> d93eb6bfcae6f1452b6e7451c95370b5d9e558f5
=======
>>>>>>> master
=======
>>>>>>> 88cc3e590da1bd5641e96dc39eb4a7863d71dbfc

// save and get projects endpoint testing
describe('Project endpoints tests', () => {  
  beforeAll((done) => {
    server = http.createServer(app);
    server.listen(done);
  });

  afterAll((done) => {
    Mongoose.disconnect();
    server.close(done);
  });

  // test saveProject endpoint
  describe('/saveProject', () => {
    describe('/POST', () => {
      it('responds with a status of 200 and json object equal to project sent', () => {
        return request(server)
          .post('/saveProject')
          .set('Accept', 'application/json')
          .send(projectToSave)
          .expect(200)
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
          .expect('Content-Type', /application\/json/)
          .then((res) => expect(res.body.name).toBe(projectToSave.name));
=======
          .then(res => expect(res.body.project.name).toBe('test'));
>>>>>>> d93eb6bfcae6f1452b6e7451c95370b5d9e558f5
=======
          .expect('Content-Type', /application\/json/)
          .then((res) => expect(res.body.name).toBe(projectToSave.name));
>>>>>>> master
=======
          .then(res => expect(res.body.project.name).toBe('test'));
>>>>>>> 88cc3e590da1bd5641e96dc39eb4a7863d71dbfc
      });
    });
  });

  // test getProjects endpoint
  describe('/getProjects', () => {
    describe('POST', () => {
      it('responds with status of 200 and json object equal to an array of user projects', () => {
        return request(server)
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
      const { name, userId } = projectToSave;
      it('responds with status of 200 and json object equal to deleted project', () => {
        return request(server)
          .delete('/deleteProject')
          .set('Accept', 'application/json')
          .send({ name, userId })
          .expect(200)
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
          .then((res) => expect(res.body.name).toBe(projectToSave.name));
=======
          .expect('Content-Type', /json/)
          .then(res => expect(res.body.name).toBe('test'));
>>>>>>> d93eb6bfcae6f1452b6e7451c95370b5d9e558f5
=======
          .then((res) => expect(res.body.name).toBe(projectToSave.name));
>>>>>>> master
=======
          .expect('Content-Type', /json/)
          .then(res => expect(res.body.name).toBe('test'));
>>>>>>> 88cc3e590da1bd5641e96dc39eb4a7863d71dbfc
      });
    });
  });
});
