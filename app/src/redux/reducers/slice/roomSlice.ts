import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  roomCode: '',
  meetingId: '',
  userName: '',
  userList: [],
  userJoinCollabRoom: false,
  userJoinMeetingStatus: null,
  meetingParticipants: [],
  messages: [],
  password: ''
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
  setPassword
} = roomSlice.actions;

export default roomSlice.reducer;
