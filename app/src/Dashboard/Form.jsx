
import React from 'react';
import { gql, useMutation } from '@apollo/client';
import PropTypes from 'prop-types';


const Form = ({ description, id, likes }) => {

  const ADD_LIKE = gql`
  mutation UpdateTest($id: ID, $name: String, $likes: Int) {
    updateTest(id: $id, name: $name, likes: $likes ) 
    {
      description
      id
      likes
    }
  }`;

  const [updateTest] = useMutation(ADD_LIKE);

  // go to bed
  function handleClick(e) {
    e.preventDefault();
    // IMPORTANT: DO NOT ADD extra comma to the last line of the variable object, the query will not work
    const myVar = {
      variables:
      {
        id,
        name: 'testname',
        likes: likes + 1,
      },
    };
    // send Mutation
    updateTest(myVar);
  }

  return (
  <div className = 'form'>
    <h2>{ description }</h2>
    <button id={ id } onClick={ handleClick }>heart</button>
    <h3>Likes: { likes }</h3>
  </div>
  );
};

// Variable validation using propTypes
Form.propTypes = {
  description: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
};


export default Form;
