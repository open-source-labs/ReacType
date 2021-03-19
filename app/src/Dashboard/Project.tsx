import React, { useState, } from 'react';
import { useMutation } from '@apollo/client';
import { 
  ADD_LIKE,
  MAKE_COPY,
  DELETE_PROJECT,
  PUBLISH_PROJECT,
  ADD_COMMENT,
} from './gqlStrings';
import {
  withStyles,
  createStyles,
  makeStyles,
  Theme
} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ClearIcon from '@material-ui/icons/Clear';
import CloseIcon from '@material-ui/icons/Close';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import GetAppIcon from '@material-ui/icons/GetApp';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import IconButton from '@material-ui/core/IconButton';
import PublishIcon from '@material-ui/icons/Publish';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
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

  const recentComments = [];
  if (comments.length > 0) { 
    const reversedCommentArray = comments.slice(0).reverse();
    const min = Math.min(6, reversedCommentArray.length)
    for (let i = 0; i < min ; i++) {
    recentComments.push(
    <p>
      <b>{ reversedCommentArray[i].username }</b>: { reversedCommentArray[i].text }
    </p>
    )}
  }

  const noPointer = {cursor: 'default'};

  return (
  <div className = 'project'>
    { currUsername === username ?
      <IconButton tooltip = "Delete Project" onClick={ handleDelete } style={{position: 'absolute', right: '0', padding: '0'}}>
        <CloseIcon/>
      </IconButton>
    : '' }
    <div className = 'projectInfo'>
      <h2>Project: { name }</h2>
      <h3>Author: { username }</h3>
      <h3>Likes: { likes }</h3>
    </div>
    <div className = "icons">
      { currUsername !== username ?
        <IconButton tooltip="Like Template" style={noPointer} onClick = { handleLike }>
          <FavoriteBorderIcon fontSize="large" className = "heart" style={noPointer}/> 
        </IconButton> 
      : '' }
      { currUsername !== username ?
        <IconButton tooltip ="Download Template" style={noPointer} onClick={ handleDownload }>
          <GetAppIcon fontSize="large" className="download"/> 
        </IconButton>       
      : '' }
      { currUsername === username ?
        <IconButton tooltip ="Download Template" style={noPointer} onClick={ handlePublish }>
          <PublishIcon fontSize="large"/> 
        </IconButton>
        : '' }
    </div>
  <hr/>
    { published ? 
      <div className = "commentArea">
          {recentComments}
          <br/>
          <div className = 'comments'>
            <span>
              <input type="text" placeholder="Add Comment" onChange={ handleChange } className = "commentBox"></input>
              <button className = "commentButton" onClick={ handleComment }>Comment</button>
            </span>
          </div>
      </div>
   : '' }
  </div>
  );
};


export default Project;
