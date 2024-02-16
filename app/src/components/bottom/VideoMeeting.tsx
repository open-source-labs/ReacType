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

const Videomeeting = (props): JSX.Element => {
  const { joinStatus } = props;
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
  const [isJoinButtonVisible, setIsJoinButtonVisible] = useState(
    userJoinMeetingStatus === null
  );
  function ControlPanel() {
    const { leave, toggleMic, toggleWebcam } = useMeeting();
    return (
      userJoinMeetingStatus === 'JOINED' && (
        <div>
          <button
            onClick={() => {
              leave();
              onMeetingLeave();
            }}
          >
            Leave
          </button>
          <button onClick={() => toggleMic()}>
            {useMic ? <MicIcon /> : <MicOffIcon />}
          </button>
          <button onClick={() => toggleWebcam()}>
            {useWebcam ? <VideocamIcon /> : <VideocamOffIcon />}
          </button>
        </div>
      )
    );
  }

  const onMeetingLeave = () => {
    // dispatch(setMeetingId(null));
    dispatch(setUserJoinMeetingStatus(null));
    setIsJoinButtonVisible(true);
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
          <div key={props.participantId}>
            <p>
              Participant: {props.isLocalParticipant ? 'You' : displayName} |
              Webcam: {webcamOn ? 'ON' : 'OFF'} | Mic: {micOn ? 'ON' : 'OFF'}
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
                // height="50%"
                // width="50%"
                onError={(err) => {
                  console.log(err, 'participant video error');
                }}
              />
            )}
          </div>
        )}
        {/* {userJoinMeetingStatus === 'JOINING' && <p>Joining the meeting...</p>}
        {userJoinCollabRoom && userJoinMeetingStatus === null && (
          <button onClick={props.joinMeeting()}>Join Meeting</button>
        )} */}
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
      setIsJoinButtonVisible(false);
    };

    console.log('Here check status: ', joinStatus);

    if (!userJoinCollabRoom && userJoinMeetingStatus !== null) {
      console.log('MeetingView: ', userJoinCollabRoom, userJoinMeetingStatus);
      leave();
      onMeetingLeave();
      dispatch(setUserJoinMeetingStatus(null));
    }

    return (
      <div className="meeting-container">
        {/* {userJoinMeetingStatus === 'JOINED' && ( */}
        <div className="meeting">
          <ControlPanel />
          <div className="meeting-video">
            {[...meetingParticipantsId].map((participantId) => (
              <ParticipantView
                participantId={participantId}
                key={participantId}
                isLocalParticipant={participantId === localParticipant.id}
                joinMeeting={joinMeeting}
              />
            ))}
          </div>
        </div>
        {userJoinMeetingStatus === 'JOINING' && <p>Joining the meeting...</p>}
        {userJoinCollabRoom && userJoinMeetingStatus === null && (
          <button onClick={joinMeeting}>Join Meeting</button>
        )}
      </div>
    );
  }

  return (
    videoSDKToken &&
    meetingId && (
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
        <div>
          <MeetingConsumer>
            {() => (
              <MeetingView
                meetingId={meetingId}
                onMeetingLeave={onMeetingLeave}
              />
            )}
          </MeetingConsumer>
        </div>
      </div>
    )
    // </div>
  );
};

export default Videomeeting;
