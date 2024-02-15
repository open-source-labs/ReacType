import { useState, useRef, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import {
  setMeetingId,
  setUserJoinMeeting,
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
  const videoSDKToken = `${import.meta.env.VITE_VIDEOSDK_TOKEN}`;
  const dispatch = useDispatch();
  const { meetingId, userJoinMeeting, meetingParticipants } = useSelector(
    (store: RootState) => store.roomSlice
  );

  const [useWebcam, setUseWebCam] = useState(true);
  const [useMic, setUseMic] = useState(true);
  const micRef = useRef(null);

  function ControlPanel() {
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
    );
  }

  function MeetingView(props) {
    const { join, localParticipant, meeting } = useMeeting();
    console.log('Here check localParticipant: ', localParticipant);

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

    return (
      <div className="meeting-container">
        {userJoinMeeting === 'JOINED' ? (
          <div className="meeting">
            <ControlPanel />
            <div className="meeting-video">
              {[...meetingParticipantsId].map((participantId) => (
                <ParticipantView
                  participantId={participantId}
                  key={participantId}
                  isLocalParticipant={participantId === localParticipant.id}
                />
              ))}
            </div>
          </div>
        ) : userJoinMeeting === 'JOINING' ? (
          <p>Joining the meeting...</p>
        ) : (
          <button onClick={joinMeeting}>Join Meeting</button>
        )}
      </div>
    );
  }

  return (
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
          <MeetingConsumer>
            {() => (
              <MeetingView
                meetingId={meetingId}
                onMeetingLeave={onMeetingLeave}
              />
            )}
          </MeetingConsumer>
        </div>
      ) : (
        <div>
          <p>Please contact the team for technical support</p>
        </div>
      )}
    </div>
  );
};

export default Videomeeting;
