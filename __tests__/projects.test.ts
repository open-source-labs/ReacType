// @vitest-environment node
import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest';
import Mongoose from 'mongoose';
import Request from 'supertest';
// initializes the project to be sent to server/DB
import http from 'http';
import mockData from '../mockData';
import app from '../server/server.ts';

const { state, projectToSave } = mockData;

// save and get projects endpoint testing
describe.skip('Project endpoints tests', () => {
  let server;
  beforeAll(async () => {
    server = http.createServer(app);
    // server.listen();
    await vi.waitFor(() => server.listen());
  });

  afterAll(async () => {
    await Mongoose.disconnect();
    // Close the HTTP server
    server.close();
  });

  // test saveProject endpoint
  describe.skip('/saveProject', () => {
    describe('POST', () => {
      it('responds with a status of 200 and json object equal to project sent', async () => {
        const res = await Request(server)
          .post('/saveProject')
          .set('Accept', 'application/json')
          .send(projectToSave);

        expect(res.status).toBe(200);
        expect(res.header['content-type']).toContain('application/json');
        expect(res.body.name).toBe(projectToSave.name);
      }, 20000);
    });
  });
  // test getProjects endpoint
  describe.skip('/getProjects', () => {
    describe('POST', () => {
      it('responds with status of 200 and json object equal to an array of user projects', async () => {
        const res = await Request(server)
          .post('/getProjects')
          .set('Accept', 'application/json')
          .send({ userId: projectToSave.userId });

        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBeTruthy();
        expect(res.body[0].name).toBe(state.name);
      }, 20000);
    });
  });
  // test deleteProject endpoint
  describe.skip('/deleteProject', () => {
    describe('DELETE', () => {
      const { name, userId } = projectToSave;
      it('responds with status of 200 and json object equal to deleted project', async () => {
        const res = await Request(server)
          .delete('/deleteProject')
          .set('Accept', 'application/json')
          .send({ name, userId });

        expect(res.status).toBe(200);
        expect(res.body.name).toBe(projectToSave.name);
      }, 20000);
    });
  });
});
