export const getProjects = (): Promise<Object> => {
  console.log("Loading user's projects...");
  const project = fetch('https://localhost:8080/getProjects', {
    credentials: 'include'
  })
    .then(res => res.json())
    .then(data => {
      console.log("User's project is", data);
      return data;
    })
    .catch(err => console.log(`Error getting project ${err}`));
  return project;
};

export const saveProject = (
  workspace: Object,
  name: string = 'Default'
): Promise<Object> => {
  console.log("Saving user's project...");
  console.log('Name is', name);
  const body = JSON.stringify({ name, project: workspace });
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
