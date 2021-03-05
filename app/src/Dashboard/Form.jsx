
import React from 'react';


const Form = (props) => {
  return (
  <div className = 'form'>
    <h2>{ props.description }</h2>
    <button id={ props.id }>heart</button>
  </div>);
};

export default Form;
