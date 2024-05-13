import { createSlice } from '@reduxjs/toolkit';


/**
 * Represents the initial state of the MUIpropsSlice reducer.
 */
const initialState = {
  roomCode: '',
  meetingId: '',
  userName: '',
  userList: [],
  userJoinCollabRoom: false,
  userJoinMeetingStatus: null,
  meetingParticipants: [],
  messages: [],
  password: '',
  useMic: false,
  useWebcam: false
};

/**
 * `roomSlice` manages the room and meeting-related state of the application within a Redux store.
 * It handles information such as room codes, meeting IDs, user details, and chat functionalities.
 * This slice is designed to manage the state for collaborative rooms and meetings, including participant management
 * and media settings like microphone and webcam usage.
 *
 * @module roomSlice
 * @type {Slice}
 *
 * @typedef {Object} RoomState
 * @property {string} roomCode - Unique identifier for the room.
 * @property {string} meetingId - Identifier for the meeting within the room.
 * @property {string} userName - Name of the current user.
 * @property {array} userList - List of users in the room.
 * @property {boolean} userJoinCollabRoom - Indicates whether the user has joined the collaboration room.
 * @property {string|null} userJoinMeetingStatus - Status of the user's meeting participation, such as 'JOINED' or null.
 * @property {array} meetingParticipants - List of participant IDs in the meeting.
 * @property {array} messages - Collection of chat messages within the room.
 * @property {string} password - Password for secure room access.
 * @property {boolean} useMic - Indicates if the microphone is in use.
 * @property {boolean} useWebcam - Indicates if the webcam is in use.
 *
 * Actions:
 * - setRoomCode: Sets the room code.
 * - setMeetingId: Sets the meeting ID.
 * - setUserName: Sets the current user's name.
 * - setUserList: Updates the list of users in the room.
 * - setUserJoinCollabRoom: Sets the flag indicating whether the user has joined the collaboration room.
 * - setUserJoinMeetingStatus: Sets the user's meeting join status.
 * - setMeetingParticipants: Sets the list of meeting participants.
 * - setMessages: Appends a new message to the chat.
 * - setEmptyMessages: Clears all messages from the chat.
 * - setPassword: Sets or updates the room's password.
 * - setUseMic: Toggles or sets the microphone usage status.
 * - setUseWebcam: Toggles or sets the webcam usage status.
 *
 * @example
 * dispatch(setRoomCode('ABC123'));
 * dispatch(setMeetingId('meeting123'));
 * dispatch(setUserName('John Doe'));
 *
 * @returns {Reducer<RoomState>} The reducer for this slice of state, handling updates to room and meeting properties.
 */

const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    setRoomCode: (state, action) => {
      state.roomCode = action.payload;
    },
    setMeetingId: (state, action) => {
      state.meetingId = action.payload;
    },
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
    setUserList: (state, action) => {
      state.userList = action.payload;
    },
    setUserJoinCollabRoom: (state, action) => {
      state.userJoinCollabRoom = action.payload;
    },
    setUserJoinMeetingStatus: (state, action) => {
      state.userJoinMeetingStatus = action.payload;
    },
    setMeetingParticipants: (state, action) => {
      state.meetingParticipants = action.payload;
    },
    setMessages: (state, action) => {
      state.messages = [...state.messages, action.payload];
    },
    setEmptyMessages: (state, action) => {
      state.messages = [];
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setUseMic: (state, action) => {
      if (action.payload === null) state.useMic = !state.useMic;
      else state.useMic = action.payload;
    },
    setUseWebcam: (state, action) => {
      if (action.payload === null) state.useWebcam = !state.useWebcam;
      else state.useWebcam = action.payload;
    }
  }
});

export const {
  setRoomCode,
  setMeetingId,
  setUserName,
  setUserList,
  setUserJoinCollabRoom,
  setUserJoinMeetingStatus,
  setMeetingParticipants,
  setMessages,
  setEmptyMessages,
  setPassword,
  setUseMic,
  setUseWebcam
} = roomSlice.actions;

export default roomSlice.reducer;
