
import React from 'react';
import { gql, useMutation } from '@apollo/client';



const Form = (props) => {
  // const TEST = gql`mutation UpdateTest {
  //   updateTest (id:"6041a075cf29434bf8e4552e", name: "first entry with HEC", likes: 23) {
  //     description
  //     id
  //     likes
  //   }
  // }`;
  const ADD_LIKE = gql`
  mutation UpdateTest($id: ID, $name: String, $likes: Int) {
    updateTest(id: $id, name: $name, likes: $likes ) 
       {
      	description
      	id
      	likes
    }
  }
  `;
  const [ updateTest, { data }] = useMutation(ADD_LIKE);
  // console.log('mutation returned data >>> ', data);

  // go to bed
  function handleClick(e) {
    e.preventDefault();
    // IMPORTANT: DO NOT ADD extra comma to the last line of the variable object, the query will not work
    const myVar = { variables: {
      id: props.id, 
      name: "testname", 
      likes: (props.likes + 1)
       }
    };
    updateTest(myVar);
  }

  return (
  <div className = 'form'>
    <h2>{ props.description }</h2>
    <button id={ props.id } onClick={ handleClick }>heart</button>
    <h3>Likes: { props.likes }</h3>
  </div>
  );
};

export default Form;
