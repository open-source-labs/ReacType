// const { gql } = require('apollo-server-express');
const { gql } = require('@apollo/client');

// Link to defining a schema in Apollo:
// https://www.apollographql.com/docs/apollo-server/schema/schema/
// The schema specifies which queries and mutations are available for clients
// to execute against your data graph.

// NOTE: Project type does not return the detail of the project's components,
// but info needed for the dashboard

// line 15, returns type Project from line 29
const Project = gql`

  type Mutation {
    addLike(projId: ID!, likes: Int!): Project
    makeCopy(projId: ID!, userId: ID!, username: String!): Project
    deleteProject(projId: ID!): Project
    publishProject(projId: ID!, published: Boolean!): Project
    addComment(projId: ID!, comment: String!, username: String!): Project
  }

  type Comment {
    id: ID!
    username: String! 
    text: String!
    projectId: ID!
  }

  type Project {
    name: String!
    likes: Int
    published: Boolean!
    id: ID!
    userId: ID!
    username: String!
    createdAt: String
    comments: [Comment!]
  }

  type Query {
    getProject(projId: ID!): Project
    getAllProjects(userId: ID): [Project]
  }
`;

module.exports = Project;
