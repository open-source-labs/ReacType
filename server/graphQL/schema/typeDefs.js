const { gql } = require('apollo-server-express');

// Link to defining a schema in Apollo:
// https://www.apollographql.com/docs/apollo-server/schema/schema/
// The schema specifies which queries and mutations are available for clients
// to execute against your data graph.

// NOTE: Project type does not return the detail of the project's components,
// but info needed for the dashboard
const Project = gql`

  type Mutation {
    addLike(projId: ID!, likes: Int!): Project
    makeCopy(projId: ID!, userId: ID!, username: String!): Project
    deleteProject(projId: ID!): Project
    publishProject(projId: ID!, published: Boolean!): Project
  }

  type Project {
    name: String!
    likes: Int
    published: Boolean!
    id: ID!
    userId: ID!
    username: String!
    createdAt: String
    comments: String![]
  }

  type Query {
    getProject(projId: ID!): Project
    getAllProjects(userId: ID): [Project]
  }
`;

module.exports = Project;
