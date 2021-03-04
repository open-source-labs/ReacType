import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Form from './Form.jsx';


const FormsContainer = () => {
  const [tests, updateTests] = useState([]);

  useEffect(() => {
    console.log('inside useEffect');

    fetch('http://localhost:5000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ query: '{readAllTests { description }}' }),
    }) 
      .then(res => res.json())
      .then((resp) => { 
        // console.log('resp: ', resp);
        const myTests = resp.data.readAllTests;
        console.log('myTests: ', myTests);
        updateTests(myTests);
      })
      .catch(err => console.log('error in readAllTests', err));
  }, []);

  const forms = tests.map((test, index) => <Form key={index} description={test.description} />);

  return (
    <div>
      <Link to="/">
        <button type="button">Go Back</button>
      </Link>
      {forms}
    </div>
  );
};

export default FormsContainer;
