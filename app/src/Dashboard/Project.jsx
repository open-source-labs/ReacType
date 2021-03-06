import React from 'react';
import { gql, useMutation } from '@apollo/client';
import PropTypes from 'prop-types';


const Project = ({ name, likes, projId, userId }) => {

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

  function handleClick(e) {
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

  return (
  <div className = 'project'>
    <h2>Project: { name }</h2>
    {/* <h3>Project ID: {projId} </h3> */}
    <h3>Likes: { likes }</h3>
    <button onClick={ handleClick }>like me!</button>
  </div>
  );
};

// Variable validation using propTypes
Project.propTypes = {
  name: PropTypes.string.isRequired,
  projId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
};


export default Project;
