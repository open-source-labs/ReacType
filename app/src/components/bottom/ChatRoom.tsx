import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { emitEvent } from '../../helperFunctions/socket';
import Videomeeting from './VideoMeeting';

const Chatroom = (props): JSX.Element => {
  const { userName, roomCode, messages, userJoinCollabRoom } = useSelector(
    (store: RootState) => store.roomSlice
  );

  const [inputContent, setInputContent] = useState('');

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
    if (inputContent !== '') {
      emitEvent('send-chat-message', roomCode, {
        userName,
        message: inputContent
      });
      setInputContent('');
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

  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll to the bottom of the container whenever new messages are added
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      className="livechat-panel"
      style={{
        paddingLeft: '10px',
        width: '100%',
        height: '100%',
        display: 'center',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      <div
        className="livechat-panel-join"
        style={{
          paddingLeft: '10px',
          width: userJoinCollabRoom ? '100%' : '0%',
          height: userJoinCollabRoom ? '100%' : '0%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Videomeeting />
        {userJoinCollabRoom && (
          <div
            className="chatroom"
            style={{
              justifyContent: 'center',
              display: 'flex',
              flexDirection: 'column',
              height: '80%',
              width: '50%'
            }}
          >
            <div
              style={{
                justifyContent: 'center',
                display: 'flex',
                height: '80%'
              }}
            >
              <div
                id="message-container"
                ref={containerRef}
                style={wrapperStyles}
              >
                {renderMessages()}
              </div>
            </div>
            <div className="chatroom-input">
              <form
                id="send-container"
                style={inputContainerStyles}
                onSubmit={handleSubmit}
              >
                <input
                  type="text"
                  id="message-input"
                  onChange={(e) => setInputContent(e.target.value)}
                  value={inputContent}
                  style={inputStyles}
                />
                <button type="submit" id="send-button" style={buttonStyles}>
                  Send
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
      {!userJoinCollabRoom && (
        <div
          className="join-notification"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%'
          }}
        >
          <p style={{ color: 'white', fontSize: '18px' }}>
            Please join a collaboration room to enable this function
          </p>
        </div>
      )}
    </div>
  );
};
export default Chatroom;
