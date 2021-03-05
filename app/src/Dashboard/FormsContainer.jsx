import React from 'react';
import { Link } from 'react-router-dom';

import { gql, useQuery } from '@apollo/client';
import Form from './Form.jsx';

// Implement Apollo Client useQuery hook to retrieve data from the server through graphQL. This includes 2 steps:
// 1) Impliment Apollo Provider in the top component in ./src/index.js, this allows children components access to the queried data
// 2) useQuery hook will update the data stored in Apollo Client's cache and automatically trigger child components rendering

const FormsContainer = () => {
  // define the graphQL query string
  const GET_TESTS = gql`query {readAllTests { description id likes }}`;
  // useQuery hook abstracts fetch request
  const { loading, error, data } = useQuery(GET_TESTS, { pollInterval: 1000	} );
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :{error}</p>;
  // based on resolver(readAllTests) for this query, the data is stored in the data object with the key 'readAllTests'
  const myTests = data.readAllTests;
  // generate an array of Form components based on data
  const forms = myTests.map((test, index) => <Form key={index} id={test.id} description={test.description} likes={test.likes}/>);

  return (
      <div>
        <Link to="/">
          <button type="button">Go Back</button>
        </Link>
        <div className = "formContainer">
          {forms}
        </div>
      </div>
  );
};

export default FormsContainer;
