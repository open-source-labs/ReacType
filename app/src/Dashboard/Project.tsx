import React from 'react';
import { useMutation } from '@apollo/client';
import { ADD_LIKE, MAKE_COPY, DELETE_PROJECT } from './gqlStrings';

// Variable validation using typescript
type props = {
  name: string,
  id: string,
  userId: string,
  username: string,
  likes: number,
};

const Project = ({
  name, likes, id, username,
}: props) : JSX.Element => {
  // IMPORTANT:
  // 1) schema change projId => id to allows Apollo Client cache auto-update. Only works with 'id'
  // 2) always request the 'id' in a mutation request

  const [addLike] = useMutation(ADD_LIKE);
  const [makeCopy] = useMutation(MAKE_COPY);
  const [deleteProject] = useMutation(DELETE_PROJECT);

  function handleLike(e) {
    e.preventDefault();
    // IMPORTANT: DO NOT ADD extra comma to the last line of the variable object, the query will not work
    const myVar = {
      variables:
      {
        projId: id,
        likes: likes + 1,
      },
    };
    // send Mutation
    addLike(myVar);
  }

  // Use current user info to make a make copy of another user's project
  const currUserSSID = window.localStorage.getItem('ssid') || 'unavailable';
  const currUsername = window.localStorage.getItem('username') || 'unavailable';
 

  function handleDownload(e) {
    e.preventDefault();
    const myVar = {
      variables:
      {
        projId: id,
        userId: currUserSSID,
        username: currUsername,
      },
    };
    // send Mutation
    makeCopy(myVar);
  }

  function handleDelete(e) {
    e.preventDefault();
    const myVar = {
      variables:
      {
        projId: id,
      },
    };
    deleteProject(myVar);
  }

  return (
  <div className = 'project'>
    <h2>Project: { name }</h2>
    <h3>Author: { username }</h3>
    <h3>Likes: { likes }</h3>
    <div>
      <button onClick={ handleLike }>like me!</button>
      {currUsername !== username ?  <button onClick={ handleDownload }>download me!</button> : <span></span>}
      <button onClick={ handleDelete }>delete</button>
    </div>
  </div>
  );
};


export default Project;
