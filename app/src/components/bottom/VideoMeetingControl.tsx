import React, { useState, useCallback } from 'react';
import { useMeeting } from '@videosdk.live/react-sdk';
import CallEndIcon from '@mui/icons-material/CallEnd';
import MicOffIcon from '@mui/icons-material/MicOff';
import MicIcon from '@mui/icons-material/Mic';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';

interface VideoMeetingControlProps {
  userJoinMeetingStatus: string;
  useWebcam: boolean;
  useMic: boolean;
}

const VideoMeetingControl: React.FC<VideoMeetingControlProps> = ({
  userJoinMeetingStatus,
  useWebcam,
  useMic
}) => {
  const { leave, toggleMic, toggleWebcam } = useMeeting();

  const [callEndHovered, setCallEndHovered] = useState(false);
  const [micHovered, setMicHovered] = useState(false);
  const [webcamHovered, setWebcamHovered] = useState(false);

  const handleCallEndHover = useCallback((hovered: boolean) => {
    setCallEndHovered(hovered);
  }, []);

  const handleMicHover = useCallback((hovered: boolean) => {
    setMicHovered(hovered);
  }, []);

  const handleWebcamHover = useCallback((hovered: boolean) => {
    setWebcamHovered(hovered);
  }, []);

  return (
    userJoinMeetingStatus === 'JOINED' && (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          transform: 'translate(-50%, 0)',
          bottom: 5,
          left: '50%',
          right: 0,
          zIndex: 9999
        }}
      >
        {/* Call End Button */}
        <div
          style={{
            backgroundColor: callEndHovered ? '#dddddd' : 'transparent',
            transition: 'background-color 0.3s',
            borderRadius: '5px',
            padding: '5px'
          }}
          onMouseEnter={() => handleCallEndHover(true)}
          onMouseLeave={() => handleCallEndHover(false)}
        >
          <button
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              margin: 0,
              outline: 'none'
            }}
            onClick={() => {
              leave();
              // Additional logic if needed
              setCallEndHovered(false);
            }}
          >
            <CallEndIcon
              style={{ fontSize: 36, color: 'red', margin: '0 15px' }}
            />
          </button>
        </div>
        {/* Mic Button */}
        <div
          style={{
            backgroundColor: micHovered ? '#dddddd' : 'transparent',
            transition: 'background-color 0.3s',
            borderRadius: '5px',
            padding: '5px'
          }}
          onMouseEnter={() => handleMicHover(true)}
          onMouseLeave={() => handleMicHover(false)}
        >
          <button
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              margin: 0,
              outline: 'none'
            }}
            onClick={() => {
              toggleMic();
              // Additional logic if needed
              setMicHovered(false);
            }}
          >
            {useMic ? (
              <MicIcon
                style={{ fontSize: 36, color: '#0070BA', margin: '0 15px' }}
              />
            ) : (
              <MicOffIcon
                style={{ fontSize: 36, color: '#0070BA', margin: '0 15px' }}
              />
            )}
          </button>
        </div>
        {/* Webcam Button */}
        <div
          style={{
            backgroundColor: webcamHovered ? '#dddddd' : 'transparent',
            transition: 'background-color 0.3s',
            borderRadius: '5px',
            padding: '5px'
          }}
          onMouseEnter={() => handleWebcamHover(true)}
          onMouseLeave={() => handleWebcamHover(false)}
        >
          <button
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              margin: 0,
              outline: 'none'
            }}
            onClick={() => {
              toggleWebcam();
              // Additional logic if needed
              setWebcamHovered(false);
            }}
          >
            {useWebcam ? (
              <VideocamIcon
                style={{ fontSize: 36, color: '#0070BA', margin: '0 15px' }}
              />
            ) : (
              <VideocamOffIcon
                style={{ fontSize: 36, color: '#0070BA', margin: '0 15px' }}
              />
            )}
          </button>
        </div>
      </div>
    )
  );
};

export default VideoMeetingControl;
