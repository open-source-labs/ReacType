import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { emitEvent } from '../../helperFunctions/socket';

const Chatroom = (props): JSX.Element => {
  const userName = useSelector((store: RootState) => store.roomSlice.userName);
  const roomCode = useSelector((store: RootState) => store.roomSlice.roomCode);

  const messages = useSelector((store: RootState) => store.roomSlice.messages);

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
      emitEvent('send-chat-message', roomCode, { userName, message });
      messageInput.value = '';
    }
  };

  const handleMessageContainerStyle = (message: object) => {
    if (message['type'] === 'activity') {
      return { color: 'yellow' };
    } else {
      if (message['userName'] === userName) return { color: '#66C4EB' };
      return { color: 'white' };
    }
  };

  const renderMessages = () => {
    return messages.map((message, index) => {
      if (message.type === 'activity') {
        return (
          <div key={index} style={handleMessageContainerStyle(message)}>
            {message.message}
          </div>
        );
      } else if (message.type === 'chat') {
        return (
          <div key={index} style={handleMessageContainerStyle(message)}>
            {message.userName === userName ? 'You' : message.userName}:{' '}
            {message.message}
          </div>
        );
      }
      return null;
    });
  };

  return (
    <div
      className="livechat-panel"
      style={{ paddingLeft: '10px', width: '100%', height: '100%' }}
    >
      <div className="roomInfo" style={{ paddingLeft: '70px' }}>
        <p>Current room: {roomCode}</p>
        <p>Your nickname: {userName}</p>
      </div>
      <div style={{ justifyContent: 'center', display: 'flex', height: '80%' }}>
        <div id="message-container" style={wrapperStyles}>
          {renderMessages()}
        </div>
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
