import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { emitEvent } from '../../helperFunctions/socket';
import Videomeeting from './VideoMeeting';
import { Send } from '@mui/icons-material';

const Chatroom = (props): JSX.Element => {
  const { userName, roomCode, messages, userJoinCollabRoom } = useSelector(
    (store: RootState) => store.roomSlice
  );

  const [inputContent, setInputContent] = useState('');

  const wrapperStyles = {
    border: '1px solid #31343A',
    borderRadius: '15px',
    width: '70%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    padding: '12px 20px',
    backgroundColor: '#1B1B1B',
    overflow: 'auto'
  };

  const inputContainerStyles = {
    width: '100%',
    paddingLeft: '20px',
    paddingTop: '10px',
    display: 'flex',
    justifyContent: 'center'
  };

  const inputStyles = {
    width: '72%',
    padding: '10px 12px',
    borderRadius: '50px',
    backgroundColor: '#1B1B1B',
    color: 'white',
    border: '1px solid #31343A',
    marginLeft: '28px'
  };

  const buttonStyles = {
    padding: '5px 7px',
    marginLeft: '10px',
    backgroundColor: '#0671E3',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
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
      return {
        color: '#E8E9EB',
        fontSize: '12px',
        alignSelf: 'center',
        margin: '3px 0'
      };
    } else {
      if (message['userName'] === userName)
        return {
          alignSelf: 'end',
          padding: '8px 15px',
          backgroundColor: '#0671E3',
          borderRadius: '15.5px',
          margin: '3px 0',
          maxWidth: '300px'
        };
      return {
        color: 'white',
        padding: '8px 15px',
        backgroundColor: '#333333',
        borderRadius: '15.5px',
        margin: '3px 0',
        maxWidth: '300px'
      };
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
        if (message.userName === userName) {
          return (
            <div key={index} style={handleMessageContainerStyle(message)}>
              {message.message}
            </div>
          );
        } else
          return (
            <div key={index} style={{ alignSelf: 'start' }}>
              <div
                style={{ color: '#E8E9EB', fontSize: '12px', margin: '3px 0' }}
              >
                {message.userName}
              </div>
              <div style={handleMessageContainerStyle(message)}>
                {message.message}
              </div>
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
              height: '90%',
              width: '60%'
            }}
          >
            <div
              style={{
                justifyContent: 'center',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                width: '100%'
              }}
            >
              <div
                id="message-container"
                ref={containerRef}
                style={wrapperStyles}
              >
                {renderMessages()}
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
                    placeholder="message"
                    onChange={(e) => setInputContent(e.target.value)}
                    value={inputContent}
                    style={inputStyles}
                  />
                  <button type="submit" id="send-button" style={buttonStyles}>
                    <Send
                      sx={{
                        width: '20px',
                        height: '20px',
                        marginLeft: '2px',
                        marginTop: '2px'
                      }}
                    />
                  </button>
                </form>
              </div>
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
