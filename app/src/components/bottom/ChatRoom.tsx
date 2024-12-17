/* eslint-disable max-len */
import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Send } from '@mui/icons-material';
import { RootState } from '../../redux/store';
import { emitEvent } from '../../helperFunctions/socket';
import Videomeeting from './VideoMeeting';

/**
 * Chatroom component for handling and displaying chat messages within a collaboration room.
 * This component integrates with the Redux store to access and manage chat-related states such as user details, room code, and messages.
 * It also provides a real-time chat interface that allows users to send messages that are displayed in a styled format based on the sender.
 *
 * @component
 * @example
 * return <Chatroom />
 *
 * @returns {JSX.Element} The Chatroom component with interactive chat and video meeting functionalities.
 *
 * Props:
 * - userName (string): The current user's name.
 * - roomCode (string): The unique code for the current chat room.
 * - messages (array): An array of message objects that contains details like message type, sender's username, and the message content.
 * - userJoinCollabRoom (boolean): A boolean state that indicates whether the user has joined a collaborative room.
 *
 * Redux State:
 * - userName (string): The user's name fetched from the Redux store.
 * - roomCode (string): The room code for the current session.
 * - messages (array): List of messages in the current chat room.
 * - userJoinCollabRoom (boolean): Indicates if the user has joined a collaboration room, affecting visibility of certain UI elements.
 *
 * Styles:
 * - wrapperStyles: Styles for the main message container.
 * - inputContainerStyles: Styles for the input container.
 * - inputStyles: Styles for the text input where users type their messages.
 * - buttonStyles: Styles for the send button.
 *
 * Functions:
 * - handleSubmit: Handles the submission of the chat form to send a message.
 * - handleMessageContainerStyle: Returns styling for message bubbles based on the message type and sender.
 * - renderMessages: Maps through the `messages` array and renders each message using specific styles.
 */
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
    backgroundColor: '#f88e16',
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
    if (message.type === 'activity') {
      return {
        color: '#E8E9EB',
        fontSize: '12px',
        alignSelf: 'center',
        margin: '3px 0'
      };
    } else {
      if (message.userName === userName)
        return {
          alignSelf: 'end',
          padding: '8px 15px',
          backgroundColor: '#f88e16',
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
