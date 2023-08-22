import { State } from "../interfaces/Interfaces";

const isDev = process.env.NODE_ENV === 'development';
const { DEV_PORT, API_BASE_URL } = require('../../../config.js');
let serverURL = API_BASE_URL;

//check if we're in dev mode
if (isDev) {
  serverURL = `http://localhost:${DEV_PORT}`;
}

export const getProjects = (): Promise<any> => {
  let userId = window.localStorage.getItem('ssid');
  const body = JSON.stringify({ userId });
  const projects = fetch(`${serverURL}/getProjects`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    // need credentials for userid pull from cookie
    credentials: 'include',
    body
  })
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((err) => console.log(`Error getting project ${err}`));
  return projects;
};

export const saveProject = (
  name: String,
  workspace: Object
): Promise<Object> => {
  const newProject = { ...workspace}
  delete newProject['_id']; //deleting the _id from the current state slice. We don't actually want it in the project object in the mongo db document
  const body = JSON.stringify({
    name,
    project: { ...newProject, name },
    userId: window.localStorage.getItem('ssid'),
    username: window.localStorage.getItem('username'),
    comments: []
  });
  const project = fetch(`${serverURL}/saveProject`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    credentials: 'include',
    body
  })
    .then((res) => res.json())
    .then((data) => {
      return {_id: data._id, ...data.project}; //passing up what is needed for the global appstateslice
    })
    .catch((err) => console.log(`Error saving project ${err}`));
  return project;//returns _id in addition to the project object from the document
};

export const deleteProject = (project: any): Promise<Object> => {
  const body = JSON.stringify({
    name: project.name,
    userId: window.localStorage.getItem('ssid')
  });
  const deletedProject = fetch(`${serverURL}/deleteProject`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body
  })
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((err) => console.log(`Error deleting project ${err}`));
  return deletedProject;
};
