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
import AddCommentIcon from '@material-ui/icons/AddComment';
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
    e.preventDefault();
    let commentValue = e.target.value;
    setCommentVal(commentValue);
  }

  const recentComments = [];
  if (comments.length > 0) { 
    const reversedCommentArray = comments.slice(0).reverse();
    const min = Math.min(5, reversedCommentArray.length)
    for (let i = 0; i < min ; i++) {
    recentComments.push(<p>
      { reversedCommentArray[i].username }: 
      { reversedCommentArray[i].text }
      </p>)
    }
  }

  return (
  <div className = 'project'>
    <h2>Project: { name }</h2>
    <h3>Author: { username }</h3>
    <h3>Likes: { likes }</h3>
    <div>
      {currUsername !== username ? <Button onClick={ handleDownload }>download me!</Button> : <span></span>}
      {currUsername === username ? <Button onClick={ handleDelete }>delete</Button> : <span></span>}
      { currUsername === username
        ? <Button onClick={ handlePublish }> {published ? 'Unpublish Me!' : 'Publish Me!'} </Button>
        : <span></span> }
    </div>
    <hr/>
    <div id = "commentArea">
      { recentComments }
        <div id = "renderedCom">
        <br/>
        <div id = 'comments'>
          <span>
            <FavoriteBorderIcon fontSize="Large" id = "heart" onClick = { handleLike }/>
            <input type="text" placeholder="Add Comment" onChange={ handleChange } id = "commentBox"></input>
            <AddCommentIcon fontSize="Large" id = "commentButton" onClick={ handleComment }>Comment</AddCommentIcon>
          </span>
        </div>
      </div>
    </div>
  </div>
  );
};


export default Project;
