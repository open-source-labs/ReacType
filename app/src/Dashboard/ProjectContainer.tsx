import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_PROJECTS } from './gqlStrings';
import Project from './Project.tsx';
import NavBar from './NavbarDash';

// Implement Apollo Client useQuery hook to retrieve data from the server through graphQL. This includes 2 steps:
// 1) Impliment Apollo Provider in the top component in ./src/index.js, this allows children components access to the queried data
// 2) useQuery hook will update the data stored in Apollo Client's cache and automatically trigger child components rendering

const ProjectContainer = () => {
  const myVar = {};
  // Need this for the individual user dasboard, for now, dashboard shows all projects from all users
  const userSSID = window.localStorage.getItem('ssid') || 'unavailable';
  const username = window.localStorage.getItem('username') || 'unavailable';
  // if (userSSID !== 'guest') {
  //   myVar = { userId: userSSID };
  // }

  // --------------------------Sorting Buttons------------------------------------//
  
  // hook for sorting menu
  const [selectedOption, setSelectedOption] = useState(null);

  const sortByRating = (projects) => {
    // generate a sorted array of public projects based on likes
    const sortedRatings = projects.sort((a, b) =>  b.likes - a.likes);
    return sortedRatings;
  };

  const sortByDate = (projects) => {
    // generate a sorted array of public projects based on date
    const sortedRatings = projects.sort((a, b) => b.createdAt - a.createdAt);
    return sortedRatings;
  };

  const sortByUser = (projects) => {
    // generate a sorted array of public projects based on username
    const sortedRatings = projects.sort((a, b) => b.user - a.user);
    return sortedRatings;
  };
  // ===================================================================================== //

  // useQuery hook abstracts fetch request
  const { loading, error, data } = useQuery(GET_PROJECTS, { pollInterval: 2000, variables: myVar });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :{error}</p>;

  // based on resolver(getAllProject) for this query, the data is stored in the data object with the key 'getAllProjects'
  const projects = data.getAllProjects;

  // create array to hold the data recieved in the public dashboard the will be conditionally rendered
  let sortedProjects = [];
  // create array to hold the components Project of loggin-in users
  const userDisplay = [];
  // generate an array of Project components based on queried data
  projects.forEach((proj, index) => {
    const component = <Project
                  key= { index }
                  name = {proj.name}
                  likes = {proj.likes}
                  published = { proj.published }
                  userId = {proj.userId}
                  username = {proj.username}
                  createdAt = {proj.createdAt}
                  id = {proj.id}
                  comments = {proj.comments}
                  />;
    // sorting the public and private dashboards based on the user's username
    if (username === proj.username) userDisplay.push(component);
    if (proj.published) {

      sortedProjects.push(proj);
    }
  });


  // function for selecting drop down sorting menu
  const optionClicked = (value) => {
    setSelectedOption(value);
  };
  // checking which sorting method was selected from drop down menu and invoking correct sorting function
  if (selectedOption === 'date') sortedProjects = sortByDate(sortedProjects);
  else if (selectedOption === 'user') sortedProjects = sortByUser(sortedProjects);
  else if (selectedOption === 'rating') sortedProjects = sortByRating(sortedProjects);
  
  // create an array of components Project that will be conditionally rendered
  const sortedDisplay = [];
  sortedProjects.forEach((proj, index) => {
    sortedDisplay.push(<Project
      key= { index }
      name = {proj.name}
      likes = {proj.likes}
      published = { proj.published }
      userId = {proj.userId}
      username = {proj.username}
      createdAt = {proj.createdAt}
      id = {proj.id}
    />);
  });

  return (
    <div>
      <NavBar optionClicked = {optionClicked}/>
      <h1> Public Dashboard </h1>
        <div className = "projectContainer">
            {sortedDisplay}
        </div>
      <hr></hr>
        <h1> User Dashboard </h1>
        <div className = "projectContainer">
          {userDisplay}
        </div>
    </div>
  );
};
export default ProjectContainer;
