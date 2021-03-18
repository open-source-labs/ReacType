import React, { useState, } from 'react';
import { useMutation } from '@apollo/client';
import { 
  ADD_LIKE,
  MAKE_COPY,
  DELETE_PROJECT,
  PUBLISH_PROJECT,
  ADD_COMMENT,
} from './gqlStrings';
import Button from '@material-ui/core/Button';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
// Variable validation using typescript
type props = {
  name: string,
  id: string,
  userId: string,
  username: string,
  likes: number,
  published: boolean,
  comments: object[],
};

// Use current user info to make a make copy of another user's project
const currUserSSID = window.localStorage.getItem('ssid') || 'unavailable';
const currUsername = window.localStorage.getItem('username') || 'unavailable';

const Project = ({
  name, likes, id, username, published, comments,
}: props) : JSX.Element => {
  // IMPORTANT:
  // 1) schema change projId => id to allows Apollo Client cache auto-update. Only works with 'id'
  // 2) always request the 'id' in a mutation request
  const [commentVal, setCommentVal] = useState('');
  const [clicked, setClicked] = useState(false);

  const [addLike] = useMutation(ADD_LIKE);
  const [makeCopy] = useMutation(MAKE_COPY);
  const [deleteProject] = useMutation(DELETE_PROJECT);
  const [publishProject] = useMutation(PUBLISH_PROJECT);
  const [addComment] = useMutation(ADD_COMMENT);

  const handleIconClick = (id) => {
    setClicked(true);
  }

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

  function handleComment(e) {
    e.preventDefault();
    const myVar = {
      variables:
      {
      projId: id,
      comment: commentVal,
      username: currUsername,
      },
    };
    addComment(myVar)
  }

  function handleChange(e) {
    const inputVal = e.target.value;
    setCommentVal(inputVal);
  }
/**TO-DO: change buttons to material UI  */

  return (
  <div className = 'project'>
    <h2>Project: { name }</h2>
    <h3>Author: { username }</h3>
    <h3>Likes: { likes }</h3>
    <div>
      <button onClick={ handleLike }>like me!</button>
      {currUsername !== username ? <button onClick={ handleDownload }>download me!</button> : <span></span>}
      {currUsername === username ? <button onClick={ handleDelete }>delete</button> : <span></span>}
      { currUsername === username
        ? <button onClick={ handlePublish }> {published ? 'Unpublish Me!' : 'Publish Me!'} </button>
        : <span></span> }
    </div>
    <hr/>
    <div id = "commentArea">
        <div id = "renderedCom">
        <br/>
        <div id = 'comments'>
          <span>
            <FavoriteBorderIcon fontSize="Large" id = "heart" onClick = { handleLike }/>
            <input type="text" placeholder="Add Comment" onChange={ handleChange } id = "commentBox"></input>
            <button id = "commentButton" onClick={ handleComment }>Comment</button>
          </span>
        </div>
      </div>
    </div>
  </div>
  );
};


export default Project;
