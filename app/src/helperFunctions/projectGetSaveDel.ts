/* eslint-disable max-len */
import { State } from '../interfaces/Interfaces';
import serverConfig from '../serverConfig.js';

const isDev = import.meta.env.NODE_ENV === 'development';

const { DEV_PORT, API_BASE_URL } = serverConfig;
// import config from '../../../config.js';
// const { DEV_PORT, API_BASE_URL } = config;
let serverURL = API_BASE_URL;

// check if we're in dev mode
if (isDev) {
  serverURL = `http://localhost:${DEV_PORT}`;
}

/**
 * Retrieves projects from the server.
 * @returns {Promise<any>} - A promise that resolves to an array of projects.
 */
export const getProjects = (): Promise<any> => {
  const projects = fetch(`${serverURL}/getProjects`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    // need credentials for userid pull from cookie
    credentials: 'include',
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => console.log(`Error getting project ${err}`));
  return projects; // returns an array of projects with _id, name, project
};

/**
 * Saves a project to the server.
 * @param {string} name - The name of the project.
 * @param {State} workspace - The state of the workspace to be saved.
 * @returns {Promise<Object>} - A promise that resolves to the saved project object.
 */
export const saveProject = (
  name: string,
  workspace: State,
): Promise<object> => {
  const newProject = { ...workspace };
  delete newProject._id;
  delete newProject.name; // deleting the _id from the current state slice. We don't actually want it in the project object in the mongo db document
  const body = JSON.stringify({
    name,
    project: { ...newProject },
    comments: [],
  });
  const project = fetch(`${serverURL}/saveProject`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    credentials: 'include',
    body,
  })
    .then((res) => res.json())
    .then((data) => ({
      _id: data._id,
      name: data.name,
      published: data.published,
      ...data.project,
    })) // passing up what is needed for the global appstateslice
    .catch((err) => console.log(`Error saving project ${err}`));
  return project; // returns _id in addition to the project object from the document
};

/**
 * Publishes a project on the server.
 * @param {string} name - The name of the project.
 * @param {State} workspace - The state of the workspace to be published.
 * @returns {Promise<Object>} - A promise that resolves to the published project object.
 */
export const publishProject = (
  name: string,
  workspace: State,
): Promise<object> => {
  const newProject = { ...workspace };
  delete newProject.name;
  const body = JSON.stringify({
    _id: workspace._id,
    name: name,
    project: { ...newProject },
    comments: [],
  });

  const response = fetch(`${serverURL}/publishProject`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body,
  });

  const publishedProject = response
    .then((res) => res.json())
    .then((data) => ({
      _id: data._id,
      name: data.name,
      published: data.published,
      ...data.project,
    }))
    .catch((err) => {
      console.log(`Error publishing project ${err}`);
      throw err;
    });

  return publishedProject;
};

/**
 * Unpublishes a project on the server.
 * @param {State} projectData - The data of the project to be unpublished.
 * @returns {Promise<Object>} - A promise that resolves to the unpublished project object.
 */
export const unpublishProject = (projectData: State): Promise<object> => {
  const body = JSON.stringify({
    _id: projectData._id,
  });

  const response = fetch(`${serverURL}/unpublishProject`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body,
  });

  const unpublishedProject = response
    .then((res) => res.json())
    .then((data) => ({
      _id: data._id,
      name: data.name,
      published: data.published,
      ...data.project,
    }))
    .catch((err) => {
      console.log(`Error unpublishing project ${err}`);
      throw err;
    });

  return unpublishedProject;
};

/**
 * Deletes a project from the server.
 * @param {State} project - The project to be deleted.
 * @returns {Promise<Object>} - A promise that resolves to the deleted project object.
 */
export const deleteProject = (project: any): Promise<object> => {
  const body = JSON.stringify({
    _id: project._id,
    // userId: window.localStorage.getItem('ssid')
  });
  const deletedProject = fetch(`${serverURL}/deleteProject`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  })
    .then((res) => res.json())
    .then((data) => ({
      _id: data._id,
      name: data.name,
      published: data.published,
      ...data.project,
    }))
    .catch((err) => console.log(`Error deleting project ${err}`));
  return deletedProject;
};
