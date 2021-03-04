import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import {
  ApolloClient, InMemoryCache, gql, ApolloProvider, useQuery,
} from '@apollo/client';
import Form from './Form.jsx';


const FormsContainer = () => {
  
  /* GET using fetch */
  // const [tests, updateTests] = useState([]);
  // useEffect(() => {
  //   console.log('inside useEffect');
  //   fetch('http://localhost:5000/graphql', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Accept: 'application/json',
  //     },
  //     body: JSON.stringify({ query: '{readAllTests { description }}' }),
  //   })
  //     .then(res => res.json())
  //     .then((resp) => {
  //       // console.log('resp: ', resp);
  //       const myTests = resp.data.readAllTests;
  //       console.log('myTests: ', myTests);
  //       updateTests(myTests);
  //     })
  //     .catch(err => console.log('error in readAllTests', err));
  // }, []);


  /* RULES OF HOOKS: DO NOT useState and useQuery together */
  /* updateTest triggers re-rendering which in turn triggers useQuery and create an infinite loop. Just use the */
  /* NOTE: useEffect is use for async function such as fetching. When using useQuery, loading is immediately return and the component will automatically render when the result is returned */


  const GET_TESTS = gql`query {readAllTests { description id }}`;

  const { loading, error, data } = useQuery(GET_TESTS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :{error}</p>;

  const myTests = data.readAllTests;
  console.log('myTests: ', myTests);

  const forms = myTests.map((test, index) => <Form key={index} id={test.id} description={test.description} />);

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
