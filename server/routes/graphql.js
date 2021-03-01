
const express = require('express');


const router = express.Router();


const { graphqlExpress } = require('apollo-server-express');

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
};

// bodyParser is needed just for POST.
router.use('/', graphqlExpress({ schema: myGraphQLSchema }));


module.exports = router;
