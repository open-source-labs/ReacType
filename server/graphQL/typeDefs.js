
const { gql } = require('apollo-server-express');

// Link to defining a schema in Apollo:
// https://www.apollographql.com/docs/apollo-server/schema/schema/
// The schema specifies which queries and mutations are available for clients
// to execute against your data graph.

const typeDefs = gql`

  type Mutation {
    addTest(name: String, likes: Int): Test
    updateTest(id: ID, name: String, likes: Int): Test
    deleteTest(id: ID): Test
  }
  type Test {
    description: String
    likes: Int
    id: ID
  }
  type Query {
    readTest(id: ID): Test
    readAllTests: [Test]
  }
`;

module.exports = {
  typeDefs,
};
