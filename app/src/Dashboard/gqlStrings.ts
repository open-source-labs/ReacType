import { gql } from '@apollo/client';


// Query
export const GET_PROJECTS = gql`query GetAllProjects($userId: ID) {
  getAllProjects(userId: $userId) { 
    name 
    likes 
    id
    userId
    username 
  }
}`;


// Mutation
export const ADD_LIKE = gql`
  mutation AddLike($projId: ID!, $likes: Int!) {
    addLike(projId: $projId, likes: $likes) 
    {
      id
      likes
    }
  }`;

export const  MAKE_COPY = gql`
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
