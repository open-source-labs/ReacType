import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { emitEvent } from '../../helperFunctions/socket';

const Chatroom = (props): JSX.Element => {
  const nickName = useSelector((store: RootState) => store.roomSlice.userName);
  const roomCode = useSelector((store: RootState) => store.roomSlice.roomCode);

  const newMessage = useSelector(
    (store: RootState) => store.roomSlice.newMessage
  );

  const userChange = useSelector(
    (store: RootState) => store.roomSlice.userChange
  );

  const wrapperStyles = {
    border: `2px solid #f2fbf8`,
    borderRadius: '8px',
    width: '70%',
    height: '100%',
    display: 'column',
    padding: '20px',
    backgroundColor: '#42464C',
    overflow: 'auto'
  };

  const inputContainerStyles = {
    width: '100%',
    paddingLeft: '30px',
    paddingTop: '10px',
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
    backgroundColor: '#0070BA',
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
    const message = messageInput.value.trim();
    if (message !== '') {
      emitEvent('send-chat-message', roomCode, { message, nickName });
      messageInput.value = '';
    }
  };

  const handleMessageStyle = (messageNickName: string) => {
    return {
      color: messageNickName === nickName ? '#66C4EB' : 'white'
    };
  };

  useEffect(() => {
    if (newMessage.nickName !== '' && newMessage.message !== '') {
      const messageContainer = document.getElementById('message-container');
      const messageElement = document.createElement('div');
      messageElement.innerText =
        nickName === newMessage.nickName
          ? `You: ${newMessage.message}`
          : `${newMessage.nickName}: ${newMessage.message}`;
      messageElement.style.color = handleMessageStyle(
        newMessage.nickName
      ).color;
      messageContainer.append(messageElement);
    }
  }, [newMessage]);

  useEffect(() => {
    if (userChange.nickName !== '' && userChange.status !== '') {
      const messageContainer = document.getElementById('message-container');
      const messageElement = document.createElement('div');
      messageElement.innerText =
        userChange.status === 'JOIN'
          ? `${userChange.nickName} joined the chat room`
          : `${userChange.nickName} left the chat room`;
      messageElement.style.color = 'yellow';
      messageContainer.append(messageElement);
    }
  }, [userChange]);

  return (
    <div
      className="livechat-panel"
      style={{ paddingLeft: '10px', width: '100%', height: '100%' }}
    >
      <div className="roomInfo" style={{ paddingLeft: '70px' }}>
        <p>Current room: {roomCode}</p>
        <p>Your nickname: {nickName}</p>
      </div>
      <div style={{ justifyContent: 'center', display: 'flex', height: '80%' }}>
        <div id="message-container" style={wrapperStyles}></div>
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
