// helper functions that will do fetch requests to get and save user/guest projects
export const getProjects = (): Promise<Object> => {
  console.log("Loading user's projects...");
  const projects = fetch('https://localhost:8080/getProjects', {
    // need credentials for userid pull from cookie
    credentials: 'include'
  })
    .then(res => res.json())
    .then(data => {
      console.log("User's projects are", data);
      return data;
    })
    .catch(err => console.log(`Error getting project ${err}`));
  return projects;
};

export const saveProject = (
  name: String,
  workspace: Object
): Promise<Object> => {
  console.log("Saving user's project...");
  const body = JSON.stringify({
    name,
    project: workspace
  });
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
      console.log('Saved project is', data.project);
      return data.project;
    })
    .catch(err => console.log(`Error saving project ${err}`));
  return project;
};
