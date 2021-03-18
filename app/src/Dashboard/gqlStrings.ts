import { gql } from '@apollo/client';
//query, mutation, subscription
//query is type of operation 
//line 7, query label[<- optional] ($ <- required params: param ) {
 // resolver defined in backend for keyword getAllProjects(key: requesting only for value "userID")
// }

// Query
export const GET_PROJECTS = gql`query GetAllProjects($userId: ID) {
  getAllProjects(userId: $userId) { 
    name 
    likes 
    id
    userId
    username
    published 
    createdAt
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
// line 22 - 24, what i want returned
// when line 21 is invoked, line 21 will only return the id
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
