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
import VideoMeetingControl from './VideoMeetingControl';

const Videomeeting = (props): JSX.Element => {
  const videoSDKToken = `${import.meta.env.VITE_VIDEOSDK_TOKEN}`;
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
  };

  const onMeetingLeave = () => {
    dispatch(setUserJoinMeetingStatus(null));
    dispatch(setUseWebcam(false));
    dispatch(setUseMic(false));
  };

  const handleUserInfoStyle = (isLocalParticipant: boolean) => {
    if (isLocalParticipant) return { color: '#FC00BD' };
    else return { color: 'white' };
  };

  const ParticipantView = ({
    participantId,
    key,
    isLocalParticipant,
    joinMeeting,
    idx
  }) => {
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
                justifyContent: 'center',
                alignItems: 'center',
                display: 'column',
                paddingLeft: '10px',
                paddingRight: '10px'
              }}
            >
              <p style={handleUserInfoStyle(isLocalParticipant)}>
                Participant: {isLocalParticipant ? 'You' : displayName} |
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
  };

  const MeetingView = ({ meetingId, onMeetingLeave }) => {
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
          width: '80%',
          height: '100%',
          position: 'relative',
          overflow: 'auto'
        }}
      >
        <div style={{ overflow: 'auto' }}>
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
  };

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
