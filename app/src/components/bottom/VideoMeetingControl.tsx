import React, { useState, useCallback } from 'react';
import { useMeeting } from '@videosdk.live/react-sdk';
import { useSelector, useDispatch } from 'react-redux';
import CallEndIcon from '@mui/icons-material/CallEnd';
import MicOffIcon from '@mui/icons-material/MicOff';
import MicIcon from '@mui/icons-material/Mic';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';

import { setUseMic, setUseWebcam } from '../../redux/reducers/slice/roomSlice';
import { RootState } from '../../redux/store';

interface VideoMeetingControlProps {
  userJoinMeetingStatus: string;
  useWebcam: boolean;
  useMic: boolean;
}

enum ButtonType {
  CALL_END = 'Call End',
  MIC = 'Mic',
  WEBCAM = 'Webcam'
}

/**
 * VideoMeetingControl is a component that provides user interface controls for managing video and audio settings
 * during a video meeting. It includes buttons to toggle microphone and webcam states, and to leave the meeting.
 * This component utilizes the VideoSDK's `useMeeting` hook for control functionality and interacts with Redux to manage
 * application state.
 *
 * @component
 * @example
 * const props = {
 *   userJoinMeetingStatus: 'JOINED',
 *   useWebcam: true,
 *   useMic: true
 * }
 * return <VideoMeetingControl {...props} />
 *
 * @param {Object} props - The props object.
 * @param {string} props.userJoinMeetingStatus - Current status of the user's meeting join process.
 * @param {boolean} props.useWebcam - Indicates whether the webcam is currently activated.
 * @param {boolean} props.useMic - Indicates whether the microphone is currently activated.
 *
 * Redux State:
 * - userJoinMeetingStatus (string): Reflects whether the user has joined the meeting.
 * - useMic (boolean): State to track if the user's microphone is active.
 * - useWebcam (boolean): State to track if the user's webcam is active.
 *
 * Functions:
 * - handleButtonHover(button: string, hovered: boolean): Manages hover state changes for control buttons.
 * - toggleMic(): Toggles the microphone on or off.
 * - toggleWebcam(): Toggles the webcam on or off.
 * - leave(): Function from useMeeting hook that is called to leave the meeting.
 *
 * @returns {JSX.Element | null} Renders the control bar with microphone, webcam, and call end buttons, or null if the user has not joined.
 */
const VideoMeetingControl: React.FC<VideoMeetingControlProps> = (): JSX.Element | null => {
  const { leave, toggleMic, toggleWebcam } = useMeeting();

  const [callEndHovered, setCallEndHovered] = useState(false);
  const [micHovered, setMicHovered] = useState(false);
  const [webcamHovered, setWebcamHovered] = useState(false);

  const dispatch = useDispatch();
  const { userJoinMeetingStatus, useMic, useWebcam } = useSelector(
    (store: RootState) => store.roomSlice
  );

  const handleButtonHover = useCallback((button: string, hovered: boolean) => {
    switch (button) {
      case ButtonType.CALL_END:
        setCallEndHovered(hovered);
        break;
      case ButtonType.MIC:
        setMicHovered(hovered);
        break;
      default:
        setWebcamHovered(hovered);
    }
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
          zIndex: 9999,
          width: '270px',
          border: '1px solid #31343A',
          borderRadius: '15px',
          backgroundColor: '#1B1B1B',
          padding: '5px'
        }}
      >
        {/* Mic Button */}
        <div
          style={{
            transition: 'background-color 0.3s',
            borderRadius: '5px',
            padding: '5px'
          }}
          onMouseEnter={() => handleButtonHover(ButtonType.MIC, true)}
          onMouseLeave={() => handleButtonHover(ButtonType.MIC, false)}
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
              dispatch(setUseMic(null));
              handleButtonHover(ButtonType.MIC, false);
            }}
          >
            {useMic ? (
              <MicIcon
                style={{ fontSize: 36, color: micHovered ? 'white' : '#0671E3', transition: 'color 0.3s', margin: '0 15px' }}
              />
            ) : (
              <MicOffIcon
                style={{ fontSize: 36, color: micHovered ? 'white' : '#9C9D9F', transition: 'color 0.3s', margin: '0 15px' }}
              />
            )}
          </button>
        </div>
        {/* Webcam Button */}
        <div
          style={{
            transition: 'background-color 0.3s',
            borderRadius: '5px',
            padding: '5px'
          }}
          onMouseEnter={() => handleButtonHover(ButtonType.WEBCAM, true)}
          onMouseLeave={() => handleButtonHover(ButtonType.WEBCAM, false)}
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
              dispatch(setUseWebcam(null));
              handleButtonHover(ButtonType.WEBCAM, false);
            }}
          >
            {useWebcam ? (
              <VideocamIcon
                style={{ fontSize: 36, color: webcamHovered ? 'white' : '#0671E3', transition: 'color 0.3s', margin: '0 15px' }}
              />
            ) : (
              <VideocamOffIcon
                style={{ fontSize: 36, color: webcamHovered ? 'white' : '#9C9D9F', transition: 'color 0.3s', margin: '0 15px' }}
              />
            )}
          </button>
        </div>
        {/* Call End Button */}
        <div
          style={{
            transition: 'background-color 0.3s',
            borderRadius: '5px',
            padding: '5px'
          }}
          onMouseEnter={() => handleButtonHover(ButtonType.CALL_END, true)}
          onMouseLeave={() => handleButtonHover(ButtonType.CALL_END, false)}
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
              handleButtonHover(ButtonType.CALL_END, false);
            }}
          >
            <CallEndIcon
              style={{ fontSize: 36, color: callEndHovered ? 'white' : '#E12D39', transition: 'color 0.3s', margin: '0 15px' }}
            />
          </button>
        </div>
      </div>
    )
  );
};

export default VideoMeetingControl;
