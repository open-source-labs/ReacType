import React from 'react';
import { Link } from 'react-router-dom';

import { gql, useQuery } from '@apollo/client';

import Project from './Project.jsx';
// Implement Apollo Client useQuery hook to retrieve data from the server through graphQL. This includes 2 steps:
// 1) Impliment Apollo Provider in the top component in ./src/index.js, this allows children components access to the queried data
// 2) useQuery hook will update the data stored in Apollo Client's cache and automatically trigger child components rendering

const ProjectContainer = () => {
  // define the graphQL query string
  const GET_PROJECTS = gql`query GetAllProjects($userId: ID) {
    getAllProjects(userId: $userId) { 
      name 
      likes 
      id
      userId
      username 
    }
  }`;

  let myVar = {};
  // Need this for the individual user dasboard, for now, dashboard shows all projects from all users
  const userSSID = window.localStorage.getItem('ssid') || 'unavailable';
  const username = window.localStorage.getItem('username') || 'unavailable';
  // if (userSSID !== 'guest') {
  //   myVar = { userId: userSSID };
  // }

  // useQuery hook abstracts fetch request
  const { loading, error, data } = useQuery(GET_PROJECTS, { pollInterval: 2000, variables: myVar } ); // Need to find where the userId is stored for the logged in user.
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :{error}</p>;
  // based on resolver(getAllProject) for this query, the data is stored in the data object with the key 'getAllProjects'
  const myProjs = data.getAllProjects;
  console.log('Projects >>> ', myProjs);
  // generate an array of Project components based on data
  const projects = myProjs.map((proj, index) => <Project 
    key= { index }
    name = {proj.name}
    likes = {proj.likes}
    userId = {proj.userId}
    username = {proj.username}
    projId = {proj.id}
    />);

  return (
      <div>
        <h1> Public Dashboard </h1>
        <Link to="/">
          <button type="button">Go Back</button>
        </Link>
        <div className = "projectContainer">
          {projects}
        </div>
      </div>
  );
};

export default ProjectContainer;
