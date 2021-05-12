const isDev = process.env.NODE_ENV === 'development';
let serverURL = 'https://desolate-scrubland-40010.herokuapp.com';
if (isDev) {
  serverURL = 'http://localhost:5000';
}
// helper functions that will do fetch requests to get and save user/guest projects

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
    .then(res => res.json())
    .then(data => {
      return data;
    })
    .catch(err => console.log(`Error getting project ${err}`));
  return projects;
};

export const saveProject = (
  name: String,
  workspace: Object
): Promise<Object> => {
  const body = JSON.stringify({
    name,
    project: workspace,
    userId: window.localStorage.getItem('ssid'),
    username: window.localStorage.getItem('username'),
    comments: [],
  });
  const project = fetch(`${serverURL}/saveProject`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    credentials: 'include',
    body
  })
    .then(res => res.json())
    .then(data => {
      return data.project;
    })
    .catch(err => console.log(`Error saving project ${err}`));
  return project;
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
    .then(res => res.json())
    .then(data => {
      return data;
    })
    .catch(err => console.log(`Error deleting project ${err}`));
  return deletedProject;
};
