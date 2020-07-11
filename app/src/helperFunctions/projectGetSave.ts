// Get all of a user's projects from MongoDB
export const getProjects = (): Promise<Object> => {
  const project = fetch('https://localhost:8080/getProjects', {
    credentials: 'include'
  })
    .then(res => res.json())
    .then(data => {
      return data.project;
    })
    .catch(err => console.log(`Error getting project ${err}`));
  return project;
};

// Send updates to a user's projects to MongoDB
export const saveProject = (workspace: Object): Promise<Object> => {

  const body = JSON.stringify({ name: 'Andrew project', project: workspace });
  const project = fetch('https://localhost:8080/saveProject', {
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
