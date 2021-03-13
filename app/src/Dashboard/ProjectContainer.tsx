import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
    // console.log('sort by rating :', projects);
    // generate a sorted array of public projects based on likes
    const sortedRatings = projects.sort((a, b) =>  b.likes - a.likes );
    // console.log('sort by rating result >>>', sortedRatings);

    // setRenderedOption(sortedRatings);
    return sortedRatings;
  };

  const sortByDate = (projects) => {
    console.log('sort by date', projects);
  
    const sortedRatings = projects.sort((a, b) => b.createdAt - a.createdAt);
    console.log('sort by date result >>>', sortedRatings);

    return sortedRatings;
  };

  const sortByUser = (projects) => {
    console.log('sort by user', projects);
    const sortedRatings = projects.sort((a, b) => b.user - a.user);
    console.log('sort by rating result >>>', sortedRatings);

    return sortedRatings;
  };


  // ===================================================================================== //

  // useQuery hook abstracts fetch request
  // Need to find where the userId is stored for the logged in user.
  const { loading, error, data } = useQuery(GET_PROJECTS, { pollInterval: 2000, variables: myVar }); 
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :{error}</p>;
  // based on resolver(getAllProject) for this query, the data is stored in the data object with the key 'getAllProjects'
  const projects = data.getAllProjects;
  console.log("projects >>>>>>", projects);
  let sortedProjects = [];
  // console.log('Projects >>> ', projects);
  // generate an array of Project components based on data
  let publicDisplay = [];
  const userDisplay = [];
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
                  />;
    if (username === proj.username) userDisplay.push(component);
    if (proj.published) {
      // publicDisplay.push(component);
      sortedProjects.push(proj);
    }
  });


  // function for sorting menu in nav bar
  
  const optionClicked = (value) => {
    console.log('value', value);
    setSelectedOption(value);
  };
  
 
    
  console.log('SortedProject >>> ', sortedProjects);
  
  // if selectedOption === null, displaySorted = publicProjects
  // else displaySorted = convert to components from return value of a sortBy function)
  if (selectedOption === 'date') sortedProjects = sortByDate(sortedProjects);
  else if (selectedOption === 'user') sortedProjects = sortByUser(sortedProjects);
  else if (selectedOption === 'rating') sortedProjects = sortByRating(sortedProjects);
  
  const sortedDisplay = [];
  sortedProjects.forEach((proj, index) => {
    console.log('Pushing to displayProjects >>> ', proj);
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
  console.log('displaySorted >>> ', sortedDisplay);
  
  
  // if (selectedOption === 'date') sortByDate(publicProjects);
  // if (selectedOption === 'user') sortByUser(publicProjects); 
  // console.log('selectedOption', selectedOption);
  
  
  
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
