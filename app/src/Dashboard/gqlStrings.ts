import { gql } from '@apollo/client';
// Query
export const GET_PROJECTS = gql`query GetAllProjects($userId: ID) {
  getAllProjects(userId: $userId) { 
    name 
    likes 
    id
    userId
    username
    published
    comments {
      username
      text
    }
  }
}`;

// Mutation
export const ADD_LIKE = gql`
  mutation AddLike($projId: ID!, $likes: Int!) {
    addLike(projId: $projId, likes: $likes) 
    {
      id
    }
  }`;

export const MAKE_COPY = gql`
  mutation MakeCopy ($userId: ID!, $projId: ID!, $username: String!) {
    makeCopy(userId: $userId, projId: $projId, username: $username) 
    {
      id
    }
  }`;

export const DELETE_PROJECT = gql`
  mutation DeleteProject($projId: ID!) {
    deleteProject(projId: $projId) 
    {
      id
    }
  }`;

export const PUBLISH_PROJECT = gql`
  mutation Publish($projId: ID!, $published: Boolean!) {
    publishProject(projId: $projId, published: $published) 
    {
      id
      published
    }
  }`;

  export const ADD_COMMENT = gql`
  mutation AddComment($projId: ID!, $comment: String!, $username: String!) {
    addComment(projId: $projId, comment: $comment, username: $username)
    {
      id
    }
  }`;
