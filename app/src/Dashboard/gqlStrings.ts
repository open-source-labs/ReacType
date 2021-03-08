import { gql } from '@apollo/client';

export const {
  ADD_LIKE: gql`mutation AddLike($projId: ID!, $likes: Int!) {
    addLike(projId: $projId, likes: $likes) 
    {
      id
      likes
    }
  }`,
  
  MAKE_COPY: gql`
  mutation MakeCopy ($userId: ID!, $projId: ID!, $username: String!) {
    makeCopy(userId: $userId, projId: $projId, username: $username) 
    {
      id
    }
  }`;

}