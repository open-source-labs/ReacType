const request = require('supertest');
let server = 'https://reactype.herokuapp.com';
const isDev = process.env.NODE_ENV === 'development';
if (isDev) {
  server = 'http://localhost:5000';
}

// save and get projects endpoint testing
xdescribe('Project endpoints tests', () => {
  // initializes the project to be sent to server/DB
  const state = {
    name: 'test',
    isLoggedIn: false,
    components: [
      {
        id: 1,
        name: 'index',
        style: {},
        code: '<div>Drag in a component or HTML element into the canvas!</div>',
        children: [],
      },
    ],
    projectType: 'Next.js',
    rootComponents: [1],
    canvasFocus: { componentId: 1, childId: null },
    nextComponentId: 2,
    nextChildId: 1,
  };
  const projectToSave = {
    name: 'test',
    project: state,
    userId: '5f0df0636678ba002ba43b88',
  };

  // test saveProject endpoint
  describe('/saveProject', () => {
    describe('/POST', () => {
      it('responds with a status of 200 and json object equal to project sent', () => {
        return request(server)
          .post('/saveProject')
          .send(projectToSave)
          .expect('Content-Type', /json/)
          .expect(200)
          .then((res) => expect(res.body.project.name).toBe('test'));
      });
    });
  });

  // test getProjects endpoint
  describe('/getProjects', () => {
    describe('POST', () => {
      it('responds with status of 200 and json object equal to an array of user projects', () => {
        return request(server)
          .post('/getProjects')
          .send({ userId: projectToSave.userId })
          .expect(200)
          .expect('Content-Type', /json/)
          .then((res) => {
            expect(Array.isArray(res.body)).toBeTruthy;
            expect(res.body[0].name).toBe('test');
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
          .send({ name, userId })
          .expect(200)
          .expect('Content-Type', /json/)
          .then((res) => expect(res.body.name).toBe('test'));
      });
    });
  });
});
