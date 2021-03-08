import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_PROJECTS } from './gqlStrings';
import Project from './Project.tsx';

// Implement Apollo Client useQuery hook to retrieve data from the server through graphQL. This includes 2 steps:
// 1) Impliment Apollo Provider in the top component in ./src/index.js, this allows children components access to the queried data
// 2) useQuery hook will update the data stored in Apollo Client's cache and automatically trigger child components rendering

const ProjectContainer = () => {

  let myVar = {};
  // Need this for the individual user dasboard, for now, dashboard shows all projects from all users
  const userSSID = window.localStorage.getItem('ssid') || 'unavailable';
  const username = window.localStorage.getItem('username') || 'unavailable';
  // if (userSSID !== 'guest') {
  //   myVar = { userId: userSSID };
  // }

  // useQuery hook abstracts fetch request
  const { loading, error, data } = useQuery(GET_PROJECTS, { pollInterval: 2000, variables: myVar }); // Need to find where the userId is stored for the logged in user.
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :{error}</p>;
  // based on resolver(getAllProject) for this query, the data is stored in the data object with the key 'getAllProjects'
  const projects = data.getAllProjects;
  console.log('Projects >>> ', projects);
  // generate an array of Project components based on data
  const publicProjects = [];
  const userProjects = []; 
  projects.forEach((proj, index) => {
    const component = <Project
                  key= { index }
                  name = {proj.name}
                  likes = {proj.likes}
                  userId = {proj.userId}
                  username = {proj.username}
                  id = {proj.id}
                />;
    if (username === proj.username) userProjects.push(component);
    else publicProjects.push(component);
  });

  return (
      <div>
        <Link to="/">
          <button type="button">Go Back</button>
        </Link>
        <h1> Public Dashboard </h1>
        <div className = "projectContainer">
            {publicProjects}
        </div>
        <hr></hr>
        <h1> User Dashboard </h1>
        <div className = "projectContainer">
            {userProjects}
        </div>

        </div>
  );
};
export default ProjectContainer;
