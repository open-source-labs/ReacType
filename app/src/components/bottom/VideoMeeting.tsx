import { useState, useRef, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import {
  setUserJoinMeetingStatus,
  setMeetingParticipants
} from '../../redux/reducers/slice/roomSlice';
import {
  MeetingConsumer,
  useMeeting,
  useParticipant
} from '@videosdk.live/react-sdk';
import ReactPlayer from 'react-player';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import MicOffIcon from '@mui/icons-material/MicOff';
import MicIcon from '@mui/icons-material/Mic';
import CallEndIcon from '@mui/icons-material/CallEnd';
import Button from '@mui/material/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Videomeeting = (props): JSX.Element => {
  const videoSDKToken = `${import.meta.env.VITE_VIDEOSDK_TOKEN}`;
  const dispatch = useDispatch();
  const {
    meetingId,
    userJoinCollabRoom,
    userJoinMeetingStatus,
    meetingParticipants
  } = useSelector((store: RootState) => store.roomSlice);

  const [useWebcam, setUseWebCam] = useState(false);
  const [useMic, setUseMic] = useState(false);
  const micRef = useRef(null);

  function ControlPanel() {
    const { leave, toggleMic, toggleWebcam } = useMeeting();

    const iconStyle = {
      backgroundColor: 'transparent',
      color: '#0070BA',
      fontSize: 36
    };
    const buttonStyle = {
      backgroundColor: 'transparent',
      border: 'none',
      cursor: 'pointer',
      padding: 0,
      margin: 0,
      outline: 'none'
    };
    return (
      userJoinMeetingStatus === 'JOINED' && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <button
            style={buttonStyle}
            onClick={() => {
              leave();
              onMeetingLeave();
            }}
          >
            <CallEndIcon style={{ ...iconStyle, color: 'red' }} />
          </button>
          <button
            style={buttonStyle}
            onClick={() => {
              toggleMic();
              setUseMic(!useMic);
            }}
          >
            {useMic ? (
              <MicIcon style={iconStyle} />
            ) : (
              <MicOffIcon style={iconStyle} />
            )}
          </button>
          <button
            style={buttonStyle}
            onClick={() => {
              toggleWebcam();
              setUseWebCam(!useWebcam);
            }}
          >
            {useWebcam ? (
              <VideocamIcon style={iconStyle} />
            ) : (
              <VideocamOffIcon style={iconStyle} />
            )}
          </button>
        </div>
      )
    );
  }

  function TurnOffCameraDisplay() {
    return (
      <div
        style={{
          background: 'transparent',
          height: '200px',
          width: '300px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          paddingLeft: '10px',
          paddingRight: '10px'
        }}
      >
        <AccountCircleIcon style={{ fontSize: 100, color: 'white' }} />
      </div>
    );
  }

  const onMeetingLeave = () => {
    dispatch(setUserJoinMeetingStatus(null));
    setUseWebCam(false);
    setUseMic(false);
  };

  const handleUserInfoStyle = (isLocalParticipant: boolean) => {
    if (isLocalParticipant) return { color: '#FC00BD' };
    else return { color: 'white' };
  };

  function ParticipantView(props) {
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
      <>
        {userJoinMeetingStatus === 'JOINED' && (
          <>
            <div
              key={props.participantId}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                display: 'column',
                paddingLeft: '10px',
                paddingRight: '10px'
              }}
            >
              <p style={handleUserInfoStyle(props.isLocalParticipant)}>
                Participant: {props.isLocalParticipant ? 'You' : displayName} |
                Webcam: {webcamOn ? 'ON' : 'OFF'} | Mic: {micOn ? 'ON' : 'OFF'}
              </p>
              <audio ref={micRef} autoPlay muted={isLocal} />
              {!webcamOn && <TurnOffCameraDisplay />}
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
          </>
        )}
      </>
    );
  }

  function MeetingView(props) {
    const { join, localParticipant, leave } = useMeeting();

    const { participants } = useMeeting({
      onMeetingJoined: () => {
        dispatch(setUserJoinMeetingStatus('JOINED'));
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
      dispatch(setUserJoinMeetingStatus('JOINING'));
      join();
    };

    if (!userJoinCollabRoom && userJoinMeetingStatus !== null) {
      leave();
      onMeetingLeave();
      dispatch(setUserJoinMeetingStatus(null));
    }

    return (
      <div
        className="meeting-container"
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '80%',
          height: '100%',
          position: 'relative',
          overflow: 'auto'
        }}
      >
        <div style={{ overflow: 'auto' }}>
          <ControlPanel />
          <div
            className="video-wrapper"
            style={{
              width: 'auto',
              height: 'auto',
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            {[...meetingParticipantsId].map((participantId, idx) => (
              <ParticipantView
                participantId={participantId}
                key={participantId}
                isLocalParticipant={participantId === localParticipant.id}
                joinMeeting={joinMeeting}
                idx={idx}
              />
            ))}
          </div>
        </div>
        {userJoinMeetingStatus === 'JOINING' && <p>Joining the meeting...</p>}
        {userJoinCollabRoom && userJoinMeetingStatus === null && (
          <Button
            variant="contained"
            style={{ backgroundColor: '#0070BA' }}
            onClick={joinMeeting}
          >
            Join Meeting
          </Button>
        )}
      </div>
    );
  }

  return (
    videoSDKToken &&
    meetingId && (
      <MeetingConsumer>
        {() => (
          <MeetingView meetingId={meetingId} onMeetingLeave={onMeetingLeave} />
        )}
      </MeetingConsumer>
    )
  );
};

export default Videomeeting;
