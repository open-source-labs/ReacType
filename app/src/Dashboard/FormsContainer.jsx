import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import {
  ApolloClient, InMemoryCache, gql, ApolloProvider, useQuery,
} from '@apollo/client';
import Form from './Form.jsx';


const FormsContainer = () => {
  // const [tests, updateTests] = useState([]);
  /* GET using fetch */
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


  /* RULES OF HOOKS: DO NOT use hooks within hooks or conditionals */
  // useEffect(() => {
  //   const GET_TESTS = gql`query {readAllTests { description }}`;
  //   const { loading, error, data } = useQuery(GET_TESTS);
  //   if (loading) console.log('Loading...');
  //   if (error) console.log(`Error :${error}`);
  //   const myTests = data.readAllTests;
  //   console.log('myTests: ', myTests);
  //   updateTests(myTests);
  // }, []);


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
        {forms}
      </div>
  );
};

export default FormsContainer;
