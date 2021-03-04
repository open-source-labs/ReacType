
const { gql } = require('apollo-server-express');

// Link to defining a schema in Apollo:
// https://www.apollographql.com/docs/apollo-server/schema/schema/
// The schema specifies which queries and mutations are available for clients
// to execute against your data graph

const typeDefs = gql`

  type Mutation {
    addTest(name: String): Test
    updateTest(id: String, name: String): Test
    deleteTest(id: String): Test
  }
  type Test {
    description: String
    id: ID
  }
  type Query {
    readTest(id: String): Test
    readAllTests: [Test]
  }
`;

module.exports = {
  typeDefs,
};
