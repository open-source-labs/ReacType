
const { gql } = require('apollo-server-express');

// Link to defining a schema in Apollo:
// https://www.apollographql.com/docs/apollo-server/schema/schema/
// The schema specifies which queries and mutations are available for clients
// to execute against your data graph.

const Test = gql`

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

//NOTE: Project type does not return the detail of the project's components, but info needed for the dashboard
const Project = gql`

  type Mutation {
    addLike(projId: ID!, likes: Int!): Project
    makeCopy(projId: ID!, userId: ID!): Project
  }

  type Project {
    name: String!
    likes: Int
    projId: ID!
    userId: ID!
  }

  type Query {
    getProject(projId: ID!): Project
    getAllProjects: [Project]
  }
`;

module.exports = {
  typeDefsTest: Test,
  typeDefsProject: Project,
};
