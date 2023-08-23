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
  const body = JSON.stringify({
    name,
    project: { ...workspace, name },
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
      return data.project;
    })
    .catch((err) => console.log(`Error saving project ${err}`));
  return project;
};

export const publishProject = (
  projectData: State, 
  projectName: string
): Promise<Object> => {
  const body = JSON.stringify({
    _id: projectData._id, 
    project: { ...projectData, name: projectName },
    userId: window.localStorage.getItem('ssid'),
    username: window.localStorage.getItem('username'),
    comments: [],
    name: projectName,
  });

  const response = fetch(`${serverURL}/publishProject`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body
  });

  const publishedProject = response
    .then((res) => res.json())
    .then((data) => {
      return data.project;
    })
    .catch((err) => {
      console.log(`Error publishing project ${err}`);
      throw err;
    });

  return publishedProject;
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
