import React from 'react';
import { useState, useRef, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { emitEvent } from '../../helperFunctions/socket';
import {
  setMeetingId,
  setUserJoinMeeting,
  setMeetingParticipants,
  // setWebcamStreamState,
  // setMicOnState,
  // setWebcamOnState,
  // setIsLocalState,
  // setDisplayNameState
  setMeetingInfoState
} from '../../redux/reducers/slice/roomSlice';
import {
  MeetingProvider,
  MeetingConsumer,
  useMeeting,
  useParticipant
} from '@videosdk.live/react-sdk';
import ReactPlayer from 'react-player';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import MicOffIcon from '@mui/icons-material/MicOff';
import MicIcon from '@mui/icons-material/Mic';

const Chatroom = (props): JSX.Element => {
  const videoSDKToken = `${import.meta.env.VITE_VIDEOSDK_TOKEN}`;
  const dispatch = useDispatch();
  const {
    userName,
    roomCode,
    messages,
    meetingId,
    userJoinMeeting,
    meetingParticipants,
    meetingInfoState
  } = useSelector((store: RootState) => store.roomSlice);

  const [inputContent, setInputContent] = useState('');
  const [useWebcam, setUseWebCam] = useState(true);
  const [useMic, setUseMic] = useState(true);

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

  // function Controls() {
  //   const { leave, toggleMic, toggleWebcam } = useMeeting();
  //   return (
  //     <div>
  //       <button onClick={() => leave()}>Leave</button>
  //       <button onClick={() => toggleMic()}>toggleMic</button>
  //       <button onClick={() => toggleWebcam()}>toggleWebcam</button>
  //     </div>
  //   );
  // }
  function Controls() {
    const { leave, toggleMic, toggleWebcam } = useMeeting();
    return (
      <div>
        <button onClick={() => leave()}>Leave</button>
        <button onClick={() => toggleMic()}>
          {useMic ? <MicIcon /> : <MicOffIcon />}
        </button>
        <button onClick={() => toggleWebcam()}>
          {useWebcam ? <VideocamIcon /> : <VideocamOffIcon />}
        </button>
      </div>
    );
  }

  const onMeetingLeave = () => {
    setMeetingId(null);
    dispatch(setUserJoinMeeting(null));
  };

  function ParticipantView(props) {
    const micRef = useRef(null);
    const { webcamStream, micStream, webcamOn, micOn, isLocal, displayName } =
      useParticipant(props.participantId);

    const meetingInfo = {
      webcamStream,
      micStream,
      webcamOn,
      micOn,
      isLocal,
      displayName
    };
    console.log('Here checking meetingInfo');

    if (
      JSON.stringify(meetingInfo) !== JSON.stringify(meetingInfoState) &&
      JSON.stringify(meetingInfoState) === '{}'
    ) {
      dispatch(setMeetingInfoState(meetingInfo));
      console.log('Here inside: ', meetingInfoState);
    }
    console.log('Checkign outside: ', meetingInfoState);
    // setUseWebCam(webcamOn);
    // setUseMic(micOn);

    // const videoStream = useMemo(() => {
    //   if (webcamOn && webcamStream) {
    //     const mediaStream = new MediaStream();
    //     mediaStream.addTrack(webcamStream.track);
    //     return mediaStream;
    //   }
    // }, [webcamStream, webcamOn]);

    const videoStream = useMemo(() => {
      if (meetingInfoState['webcamOn'] && meetingInfoState['webcamStream']) {
        const mediaStream = new MediaStream();
        mediaStream.addTrack(meetingInfoState['webcamStream'].track);
        return mediaStream;
      }
    }, [meetingInfoState['webcamStream'], meetingInfoState['webcamOn']]);

    // useEffect(() => {
    //   if (micRef.current) {
    //     if (micOn && micStream) {
    //       console.log('Checking micStream: ', micStream);
    //       const mediaStream = new MediaStream();
    //       mediaStream.addTrack(micStream.track);

    //       micRef.current.srcObject = mediaStream;
    //       micRef.current
    //         .play()
    //         .catch((error) =>
    //           console.error('videoElem.current.play() failed', error)
    //         );
    //     } else {
    //       micRef.current.srcObject = null;
    //     }
    //   }
    // }, [micStream, micOn]);

    useEffect(() => {
      if (micRef.current) {
        if (meetingInfoState['micOn'] && meetingInfoState['micStream']) {
          console.log('Checking micStream: ', meetingInfoState['micStream']);
          const mediaStream = new MediaStream();
          mediaStream.addTrack(meetingInfoState['micStream'].track);

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
    }, [meetingInfoState['micStream'], meetingInfoState['micOn']]);

    return (
      <div key={props.participantId}>
        <p>
          Participant: {displayName} | Webcam: {webcamOn ? 'ON' : 'OFF'} | Mic:{' '}
          {micOn ? 'ON' : 'OFF'}
        </p>
        {/* <audio ref={micRef} autoPlay muted={isLocal} /> */}
        <audio
          ref={meetingInfoState['micRef']}
          autoPlay
          muted={meetingInfoState['isLocal']}
        />
        {/* {webcamOn && ( */}
        {meetingInfoState['webcamOn'] && (
          <ReactPlayer
            playsinline
            pip={false}
            light={false}
            controls={false}
            muted={true}
            playing={true}
            url={videoStream}
            // height={'200px'}
            // width={'300px'}
            height="50%"
            width="50%"
            onError={(err) => {
              console.log(err, 'participant video error');
            }}
          />
        )}
      </div>
    );
  }

  function MeetingView(props) {
    const { join } = useMeeting();
    console.log(
      'Checking status of join and meeting id: ',
      userJoinMeeting,
      meetingId
    );
    const { participants } = useMeeting({
      onMeetingJoined: () => {
        dispatch(setUserJoinMeeting('JOINED'));
      },
      onMeetingLeft: () => {
        props.onMeetingLeave();
      }
    });

    const meetingParticipantsId = [...participants.keys()];
    if (
      JSON.stringify(meetingParticipantsId) !==
        JSON.stringify(meetingParticipants) &&
      meetingParticipantsId.length > 0
    ) {
      dispatch(setMeetingParticipants(meetingParticipantsId));
    }

    const joinMeeting = () => {
      dispatch(setUserJoinMeeting('JOINING'));
      join();
    };
    console.log('Checking meetingParticipants: ', meetingParticipants);
    return (
      <div className="meeting-container">
        {userJoinMeeting && userJoinMeeting === 'JOINED' ? (
          <div className="meeting">
            <Controls />
            <div className="meeting-video">
              {[...meetingParticipants].map((participantId) => (
                <ParticipantView
                  participantId={participantId}
                  key={participantId}
                />
              ))}
            </div>
          </div>
        ) : userJoinMeeting && userJoinMeeting === 'JOINING' ? (
          <p>Joining the meeting...</p>
        ) : (
          <button onClick={joinMeeting}>Join Meeting</button>
        )}
      </div>
    );
  }

  return (
    <div
      className="livechat-panel"
      style={{
        paddingLeft: '10px',
        width: '100%',
        height: '100%',
        display: 'flex'
      }}
    >
      <div
        className="video-meeting"
        style={{
          justifyContent: 'center',
          display: 'flex',
          flexDirection: 'column',
          height: '80%',
          width: '50%'
        }}
      >
        {videoSDKToken && meetingId ? (
          <div>
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
            <p>Please contact the team for technical support</p>
          </div>
        )}
      </div>
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
