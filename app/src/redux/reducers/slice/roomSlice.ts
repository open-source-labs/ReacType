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
