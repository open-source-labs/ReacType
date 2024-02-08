import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import Box from '@mui/material/Box';
import {
  initializeSocket,
  getSocket,
  emitEvent,
  disconnectSocket
} from '../../helperFunctions/socket';

const Chatroom = (props): JSX.Element => {
  const collaborationRoom = useSelector((store: RootState) => store.roomSlice);
  //   const newMessage = useSelector(
  //     (store: RootState) => store.roomSlice.newMessage
  //   );
  const socket = getSocket();

  const nickName = collaborationRoom.userName;
  const roomCode = collaborationRoom.roomCode;
  //   const newMessage = collaborationRoom.newMessage;

  const wrapperStyles = {
    border: `2px solid #f2fbf8`,
    borderRadius: '8px',
    width: '70%',
    height: '90%',
    display: 'column',
    padding: '20px',
    // justifyContent: 'center',
    backgroundColor: '#42464C',
    overflow: 'auto'
    // scrollTop: 'scrollHeight'
  };

  const inputContainerStyles = {
    width: '100%',
    padding: '10px',
    display: 'flex',
    justifyContent: 'center'
  };

  const inputStyles = {
    width: '70%',
    padding: '10px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#333333',
    color: 'white'
  };

  const buttonStyles = {
    padding: '10px',
    marginLeft: '10px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const messageInput = document.getElementById(
      'message-input'
    ) as HTMLInputElement;
    const message = messageInput.value;
    emitEvent('send-chat-message', roomCode, { message, nickName });
    messageInput.value = '';
  };

  socket.on('new chat message', (remoteData) => {
    const messageContainer = document.getElementById('message-container');
    const messageElement = document.createElement('div');
    messageElement.innerText =
      nickName === remoteData.nickName
        ? `You: ${remoteData.message}`
        : `${remoteData.nickName}: ${remoteData.message}`;
    messageContainer.append(messageElement);
  });

  return (
    <div
      className="livechat-panel"
      style={{ paddingLeft: '10px', width: '100%', height: '100%' }}
    >
      <div className="roomInfo" style={{ paddingLeft: '10px' }}>
        <p>Current room: {roomCode}</p>
        <p>Your Nickname: {nickName}</p>
      </div>
      <div style={{ justifyContent: 'center', display: 'flex', height: '90%' }}>
        <div id="message-container" style={{ ...wrapperStyles }}></div>
      </div>
      <form
        id="send-container"
        style={inputContainerStyles}
        onSubmit={handleSubmit}
      >
        <input type="text" id="message-input" style={inputStyles} />
        <button type="submit" id="send-button" style={buttonStyles}>
          Send
        </button>
      </form>
    </div>
  );
};

export default Chatroom;
