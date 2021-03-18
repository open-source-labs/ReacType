import React from 'react';
import { useMutation } from '@apollo/client';
import { 
  ADD_LIKE,
  MAKE_COPY,
  DELETE_PROJECT,
  PUBLISH_PROJECT,
} from './gqlStrings';
import Button from '@material-ui/core/Button';

// Variable validation using typescript
type props = {
  name: string,
  id: string,
  userId: string,
  username: string,
  likes: number,
  published: boolean,
};

// Use current user info to make a make copy of another user's project
const currUserSSID = window.localStorage.getItem('ssid') || 'unavailable';
const currUsername = window.localStorage.getItem('username') || 'unavailable';

const Project = ({
  name, likes, id, username, published,
}: props) : JSX.Element => {
  // IMPORTANT:
  // 1) schema change projId => id to allows Apollo Client cache auto-update. Only works with 'id'
  // 2) always request the 'id' in a mutation request

  const [addLike] = useMutation(ADD_LIKE);
  const [makeCopy] = useMutation(MAKE_COPY);
  const [deleteProject] = useMutation(DELETE_PROJECT);
  const [publishProject] = useMutation(PUBLISH_PROJECT);

  function handleLike(e) {
    e.preventDefault();
    const myVar = {
      variables:
      {
        projId: id,
        likes: likes + 1,
      },
    };
    // send Mutation
    addLike(myVar);
  }


  function handleDownload(e) {
    e.preventDefault();
    const myVar = {
      variables:
      {
        projId: id,
        userId: currUserSSID,
        username: currUsername,
      },
    };
    makeCopy(myVar);
  }

  function handleDelete(e) {
    e.preventDefault();
    const myVar = {
      variables:
      {
        projId: id,
      },
    };
    deleteProject(myVar);
  }

  function handlePublish(e) {
    e.preventDefault();
    const myVar = {
      variables:
      {
        projId: id,
        published: !published,
      },
    };
    publishProject(myVar);
  }



/**TO-DO: change buttons to material UI  */

  return (
  <div className = 'project'>
    <h2>Project: { name }</h2>
    <h3>Author: { username }</h3>
    <h3>Likes: { likes }</h3>
    <div>
      <Button onClick={ handleLike }>like me!</Button>
      {currUsername !== username ? <Button onClick={ handleDownload }>download me!</Button> : <span></span>}
      {currUsername === username ? <Button onClick={ handleDelete }>delete</Button> : <span></span>}
      { currUsername === username
        ? <Button onClick={ handlePublish }> {published ? 'Unpublish Me!' : 'Publish Me!'} </Button>
        : <span></span> }
    </div>
  </div>
  );
};


export default Project;
