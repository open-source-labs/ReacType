import React from 'react';
import { useState, useRef, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { emitEvent } from '../../helperFunctions/socket';
import { setMeetingId } from '../../redux/reducers/slice/roomSlice';
import {
  MeetingProvider,
  MeetingConsumer,
  useMeeting,
  useParticipant
} from '@videosdk.live/react-sdk';
import ReactPlayer from 'react-player';

const Chatroom = (props): JSX.Element => {
  const userName = useSelector((store: RootState) => store.roomSlice.userName);
  const roomCode = useSelector((store: RootState) => store.roomSlice.roomCode);
  const messages = useSelector((store: RootState) => store.roomSlice.messages);
  const meetingId = useSelector(
    (store: RootState) => store.roomSlice.meetingId
  );

  const [inputContent, setInputContent] = useState('');
  // const [joinMeeting, setJoinMeeting] = useState(false);
  const [videoSDKToken, setVideoSDKToken] = useState(
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiJjYzg4NGJjNi0xOTE5LTQ0OTMtOWE5ZS0wYTdlZDcxMjJiODgiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTcwNzQxMTE3NSwiZXhwIjoxNzM4OTQ3MTc1fQ.W6d992rzBjtcb6sCRz5c1Cr2dIy7d8m80mvgwirz4Ts'
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

  function Controls() {
    const { leave, toggleMic, toggleWebcam } = useMeeting();
    return (
      <div>
        <button onClick={() => leave()}>Leave</button>
        <button onClick={() => toggleMic()}>toggleMic</button>
        <button onClick={() => toggleWebcam()}>toggleWebcam</button>
      </div>
    );
  }

  const onMeetingLeave = () => {
    setMeetingId(null);
  };

  function OldParticipantView({ participantId }: { participantId: string }) {
    const micRef = useRef<HTMLAudioElement | null>(null);
    const { webcamStream, micStream, webcamOn, micOn, isLocal, displayName } =
      useParticipant(participantId);

    const videoStream = useMemo(() => {
      if (webcamOn && webcamStream) {
        const mediaStream = new MediaStream();
        mediaStream.addTrack(webcamStream.track);
        return mediaStream;
      }
    }, [webcamStream, webcamOn]);

    useEffect(() => {
      if (micRef.current) {
        if (micOn && micStream) {
          const mediaStream = new MediaStream();
          mediaStream.addTrack(micStream.track);

          micRef.current.srcObject = mediaStream;
          micRef.current
            .play()
            .catch((error) =>
              console.error('videoElem.current.play() failed', error)
            );
        } else {
          micRef.current.srcObject = null;
        }
      }
    }, [micStream, micOn]);

    return (
      <div key={participantId}>
        <p>
          Participant: {displayName} | Webcam: {webcamOn ? 'ON' : 'OFF'} | Mic:{' '}
          {micOn ? 'ON' : 'OFF'}
        </p>
        <audio ref={micRef} autoPlay muted={isLocal} />
        {webcamOn && (
          <ReactPlayer
            playsinline
            pip={false}
            light={false}
            controls={false}
            muted={true}
            playing={true}
            url={videoStream}
            height={'200px'}
            width={'300px'}
            onError={(err) => {
              console.log(err, 'participant video error');
            }}
          />
        )}
      </div>
    );
  }

  function ParticipantView(props) {
    const micRef = useRef(null);
    const { webcamStream, micStream, webcamOn, micOn, isLocal, displayName } =
      useParticipant(props.participantId);

    const videoStream = useMemo(() => {
      if (webcamOn && webcamStream) {
        const mediaStream = new MediaStream();
        mediaStream.addTrack(webcamStream.track);
        return mediaStream;
      }
    }, [webcamStream, webcamOn]);

    useEffect(() => {
      if (micRef.current) {
        if (micOn && micStream) {
          const mediaStream = new MediaStream();
          mediaStream.addTrack(micStream.track);

          micRef.current.srcObject = mediaStream;
          micRef.current
            .play()
            .catch((error) =>
              console.error('videoElem.current.play() failed', error)
            );
        } else {
          micRef.current.srcObject = null;
        }
      }
    }, [micStream, micOn]);

    return (
      <div key={props.participantId}>
        <p>
          Participant: {displayName} | Webcam: {webcamOn ? 'ON' : 'OFF'} | Mic:{' '}
          {micOn ? 'ON' : 'OFF'}
        </p>
        <audio ref={micRef} autoPlay muted={isLocal} />
        {webcamOn && (
          <ReactPlayer
            //
            playsinline // very very imp prop
            pip={false}
            light={false}
            controls={false}
            muted={true}
            playing={true}
            //
            url={videoStream}
            //
            height={'200px'}
            width={'300px'}
            onError={(err) => {
              console.log(err, 'participant video error');
            }}
          />
        )}
      </div>
    );
  }

  // function MeetingView({
  //   onMeetingLeave,
  //   meetingId
  // }: {
  //   onMeetingLeave: () => void;
  //   meetingId: string;
  // }) {
  //   const [joined, setJoined] = useState<string | null>(null);
  //   //Get the method which will be used to join the meeting.
  //   //We will also get the participants list to display all participants
  //   // const { join, participants } = useMeeting({
  //   //   //callback for when meeting is joined successfully
  //   //   onMeetingJoined: () => {
  //   //     setJoined('JOINED');
  //   //   },
  //   //   //callback for when meeting is left
  //   //   onMeetingLeft: () => {
  //   //     onMeetingLeave();
  //   //   }
  //   // });
  //   const { join } = useMeeting();
  //   const { participants } = useMeeting({
  //     onMeetingJoined: () => {
  //       setJoined('JOINED');
  //     },
  //     onMeetingLeft: () => {
  //       props.onMeetingLeave();
  //     }
  //   });
  //   const joinMeeting = () => {
  //     setJoined('JOINING');
  //     join();
  //   };

  //   console.log('Here check joined and meeting id: ', joined, meetingId);

  //   return (
  //     <div className="container">
  //       <h3>Meeting Id: {meetingId}</h3>
  //       {joined && joined === 'JOINED' ? (
  //         <div>
  //           <Controls />
  //           {
  //             //For rendering all the participants in the meeting
  //             [...participants.keys()].map((participantId) => (
  //               <ParticipantView
  //                 participantId={participantId}
  //                 key={participantId}
  //               />
  //             ))
  //           }
  //         </div>
  //       ) : joined && joined === 'JOINING' ? (
  //         <p>Joining the meeting...</p>
  //       ) : (
  //         <button onClick={joinMeeting}>Join</button>
  //       )}
  //     </div>
  //   );
  // }

  function OldMeetingView(props) {
    const [joined, setJoined] = useState(null);
    const { join } = useMeeting();
    console.log('Check joined: ', joined);
    const { participants } = useMeeting({
      onMeetingJoined: () => {
        setJoined('JOINED');
      },
      onMeetingLeft: () => {
        props.onMeetingLeave();
      }
    });
    const joinMeeting = () => {
      setJoined('JOINING');
      join();
    };

    return (
      <div className="container">
        <h3>Meeting Id: {props.meetingId}</h3>
        {joined && joined === 'JOINED' ? (
          <div>
            <Controls />
            {[...participants.keys()].map((participantId) => (
              <ParticipantView
                participantId={participantId}
                key={participantId}
              />
            ))}
          </div>
        ) : joined && joined === 'JOINING' ? (
          <p>Joining the meeting...</p>
        ) : (
          <button onClick={joinMeeting}>Join</button>
        )}
      </div>
    );
  }

  function MeetingView(props) {
    const [joined, setJoined] = useState(null);
    const { join } = useMeeting();
    console.log('Checking status of join: ', joined);
    const { participants } = useMeeting({
      onMeetingJoined: () => {
        setJoined('JOINED');
      },
      onMeetingLeft: () => {
        props.onMeetingLeave();
      }
    });
    const joinMeeting = () => {
      setJoined('JOINING');
      join();
    };

    return (
      <div className="container">
        <h3>Meeting Id: {props.meetingId}</h3>
        {joined && joined === 'JOINED' ? (
          <div>
            <Controls />
            {[...participants.keys()].map((participantId) => (
              <ParticipantView
                participantId={participantId}
                key={participantId}
              />
            ))}
          </div>
        ) : joined && joined === 'JOINING' ? (
          <p>Joining the meeting...</p>
        ) : (
          <button onClick={joinMeeting}>Join</button>
        )}
      </div>
    );
  }

  return (
    <div
      className="livechat-panel"
      style={{ paddingLeft: '10px', width: '100%', height: '100%' }}
    >
      <div className="video-meeting">
        {videoSDKToken && meetingId ? (
          <div>
            {/* <MeetingProvider
              config={{
                meetingId,
                micEnabled: true,
                webcamEnabled: true,
                name: 'project',
                participantId: 'xyz',
                mode: 'CONFERENCE'
              }}
              token={videoSDKToken}
            >
              <MeetingConsumer>
                {() => (
                  <MeetingView
                    meetingId={meetingId}
                    onMeetingLeave={onMeetingLeave}
                  />
                )}
              </MeetingConsumer>
            </MeetingProvider> */}
            <MeetingProvider
              config={{
                meetingId,
                micEnabled: true,
                webcamEnabled: true,
                name: userName
              }}
              token={videoSDKToken}
            >
              <MeetingConsumer>
                {() => (
                  <MeetingView
                    meetingId={meetingId}
                    onMeetingLeave={onMeetingLeave}
                  />
                )}
              </MeetingConsumer>
            </MeetingProvider>
          </div>
        ) : (
          <div>
            {/* <button onClick={() => setJoinMeeting(true)}>Join Meeting</button> */}
            <button>Join Meeting</button>
          </div>
        )}
      </div>
      <div
        className="chatroom"
        style={{
          justifyContent: 'center',
          display: 'flex',
          flexDirection: 'column',
          height: '80%'
        }}
      >
        <div
          style={{ justifyContent: 'center', display: 'flex', height: '80%' }}
        >
          <div id="message-container" ref={containerRef} style={wrapperStyles}>
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
    </div>
  );
};

export default Chatroom;
