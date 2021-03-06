import React from 'react';
import { gql, useMutation } from '@apollo/client';
import PropTypes from 'prop-types';


const Project = ({ name, likes, projId, userId, username }) => {

  // IMPORTANT: 
  // 1) schema change projId => id to allows Apollo Client cache auto-update. Only works with 'id'
  // 2) always request the 'id' in a mutation request

  const ADD_LIKE = gql`
  mutation AddLike($projId: ID!, $likes: Int!) {
    addLike(projId: $projId, likes: $likes) 
    {
      id
      likes
    }
  }`;

  const [addLike] = useMutation(ADD_LIKE);


  const MAKE_COPY = gql`
  mutation MakeCopy ($userId: ID!, $projId: ID!, $username: String!) {
    makeCopy(userId: $userId, projId: $projId, username: $username) 
    {
      id
    }
  }`;
  
  const [ makeCopy ] = useMutation(MAKE_COPY);


  function handleLike(e) {
    e.preventDefault();
    // IMPORTANT: DO NOT ADD extra comma to the last line of the variable object, the query will not work
    const myVar = {
      variables:
      {
        projId,
        likes: likes + 1,
      },
    };
    // send Mutation
    addLike(myVar);
  }

  // Use current user info to make a make copy of another user's project
  const currUserSSID = window.localStorage.getItem('ssid') || 'unavailable';
  const currUsername = window.localStorage.getItem('username') || 'unavailable';
  // if (userSSID !== 'guest') {
  //   myVar = { userId: userSSID };
  // }

  function handleDownload(e) {
    e.preventDefault();
    const myVar = {
      variables:
      {
        projId,
        userId: currUserSSID,
        username: currUsername,
      },
    };
    // send Mutation
    makeCopy(myVar);
  }

  return (
  <div className = 'project'>
    <h2>Project: { name }</h2>
    {/* <h3>Project ID: {projId} </h3> */}
    <h3>Author: { username }</h3>
    <h3>Likes: { likes }</h3>
    <div>
      <button onClick={ handleLike }>like me!</button>
      <button onClick={ handleDownload }>download me!</button>
    </div>
  </div>
  );
};

// Variable validation using propTypes
Project.propTypes = {
  name: PropTypes.string.isRequired,
  projId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
};


export default Project;
