import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { emitEvent } from '../../helperFunctions/socket';
import {
  MeetingProvider,
  MeetingConsumer,
  Constants,
  useMeeting,
  useParticipant
} from '@videosdk.live/react-sdk';

const Chatroom = (props): JSX.Element => {
  const userName = useSelector((store: RootState) => store.roomSlice.userName);
  const roomCode = useSelector((store: RootState) => store.roomSlice.roomCode);
  const messages = useSelector((store: RootState) => store.roomSlice.messages);
  const [meetingId, setMeetingId] = useState(null);

  const [inputContent, setInputContent] = useState('');
  const token = 'token';

  const createMeeting = async ({ token }: { token: string }) => {
    const res = await fetch(`https://api.videosdk.live/v2/rooms`, {
      method: 'POST',
      headers: {
        authorization: `${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ customRoomId: 'aaa-bbb-ccc' })
    });
    //Destructuring the roomId from the response
    console.log('res: ', await res.json());
    const { roomId }: { roomId: string } = await res.json();
    console.log('Here room id: ', roomId);

    return roomId;
  };
  createMeeting({ token });
  const getMeetingAndToken = async (id?: string) => {
    const meetingId = id == null ? await createMeeting({ token }) : id;
    console.log('Checking meeting id: ', meetingId);
    setMeetingId(meetingId);
  };

  function JoinScreen({
    getMeetingAndToken
  }: {
    getMeetingAndToken: (meeting?: string) => void;
  }) {
    return null;
  }

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

  // const getMeetingId = async (token) => {
  //   try {
  //     const VIDEOSDK_API_ENDPOINT = `${LOCAL_SERVER_URL}/create-meeting`;
  //     const options = {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({ token })
  //     };
  //     const response = await fetch(VIDEOSDK_API_ENDPOINT, options)
  //       .then(async (result) => {
  //         const { meetingId } = await result.json();
  //         return meetingId;
  //       })
  //       .catch((error) => console.log('error', error));
  //     return response;
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  return (
    <div
      className="livechat-panel"
      style={{ paddingLeft: '10px', width: '100%', height: '100%' }}
    >
      <div style={{ justifyContent: 'center', display: 'flex', height: '80%' }}>
        <div id="message-container" style={wrapperStyles}>
          {renderMessages()}
        </div>
      </div>
      {/* {token && meetingId ? (
        <MeetingProvider
          config={{
            meetingId,
            micEnabled: true,
            webcamEnabled: true,
            name: 'C.V. Raman',
            multiStream: false
          }}
          token={token}
          reinitialiseMeetingOnConfigChange={true}
          joinWithoutUserInteraction={true}
        >
          <h1>{meetingId}</h1>
        </MeetingProvider>
      ) : (
        <JoinScreen getMeetingAndToken={getMeetingAndToken} />
      )} */}
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
  );
};

export default Chatroom;
