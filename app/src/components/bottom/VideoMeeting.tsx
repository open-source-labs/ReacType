import { useState, useRef, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import {
  setUserJoinMeetingStatus,
  setMeetingParticipants,
  setUseMic,
  setUseWebcam
} from '../../redux/reducers/slice/roomSlice';
import {
  MeetingConsumer,
  useMeeting,
  useParticipant
} from '@videosdk.live/react-sdk';
import ReactPlayer from 'react-player';
import Button from '@mui/material/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MicOffIcon from '@mui/icons-material/MicOff';
import MicIcon from '@mui/icons-material/Mic';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import VideoMeetingControl from './VideoMeetingControl';

const Videomeeting = (props): JSX.Element => {
  const dispatch = useDispatch();
  const {
    meetingId,
    userJoinCollabRoom,
    userJoinMeetingStatus,
    meetingParticipants,
    useMic,
    useWebcam
  } = useSelector((store: RootState) => store.roomSlice);

  const micRef = useRef(null);

  const TurnOffCameraDisplay = () => {
    return (
      <div
        style={{
          border: '1px solid #31343A',
          borderRadius: '15px',
          backgroundColor: '#1B1B1B',
          height: '170px',
          width: '300px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '29px 0 15px 0',
          paddingLeft: '10px',
          paddingRight: '10px'
        }}
      >
        <AccountCircleIcon style={{ fontSize: 100, color: '#9C9D9F' }} />
      </div>
    );
  };

  const onMeetingLeave = () => {
    dispatch(setUserJoinMeetingStatus(null));
    dispatch(setUseWebcam(false));
    dispatch(setUseMic(false));
  };

  const handleUserInfoStyle = (isLocalParticipant: boolean) => {
    if (isLocalParticipant) return { color: '#0671E3', alignItems: 'center' };
    else return { color: 'white', alignItems: 'center' };
  };

  const ParticipantView = ({ participantId, isLocalParticipant }) => {
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
      <>
        {userJoinMeetingStatus === 'JOINED' && (
          <>
            <div
              key={participantId}
              style={{
                display: 'flex',
                flexDirection: 'column',
                paddingLeft: '5px',
                paddingRight: '5px'
              }}
            >
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
              <div
                style={{
                  ...handleUserInfoStyle(isLocalParticipant),
                  display: 'flex',
                  marginTop: '-50px',
                  marginLeft: '15px'
                }}
              >
                <span>{displayName}</span>
                {webcamOn ? (
                  <VideocamIcon style={{ marginLeft: '14.5px' }} />
                ) : (
                  <VideocamOffIcon style={{ marginLeft: '14.5px' }} />
                )}{' '}
                {micOn ? (
                  <MicIcon style={{ marginLeft: '10px' }} />
                ) : (
                  <MicOffIcon style={{ marginLeft: '10px' }} />
                )}
              </div>
            </div>
          </>
        )}
      </>
    );
  };

  const MeetingView = ({ onMeetingLeave }) => {
    const { join, localParticipant, leave } = useMeeting();

    const { participants } = useMeeting({
      onMeetingJoined: () => {
        dispatch(setUserJoinMeetingStatus('JOINED'));
      },
      onMeetingLeft: () => {
        onMeetingLeave();
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
          width: '60%',
          height: '100%',
          position: 'relative',
          overflow: 'auto',
          paddingBottom: '68px'
        }}
      >
        <div className="video-scrollable" style={{ overflow: 'auto' }}>
          <VideoMeetingControl
            userJoinMeetingStatus={userJoinMeetingStatus}
            useWebcam={useWebcam}
            useMic={useMic}
          />
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
                isLocalParticipant={participantId === localParticipant.id}
              />
            ))}
          </div>
        </div>
        {userJoinMeetingStatus === 'JOINING' && <p>Joining the meeting...</p>}
        {userJoinCollabRoom && userJoinMeetingStatus === null && (
          <Button
            variant="contained"
            style={{ backgroundColor: '#0671E3' }}
            onClick={joinMeeting}
            sx={{ textTransform: 'capitalize' }}
          >
            Join Meeting
          </Button>
        )}
      </div>
    );
  };

  return (
    meetingId && (
      <MeetingConsumer>
        {() => <MeetingView onMeetingLeave={onMeetingLeave} />}
      </MeetingConsumer>
    )
  );
};

export default Videomeeting;
