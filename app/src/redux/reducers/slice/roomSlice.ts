import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  roomCode: '',
  meetingId: '',
  userName: '',
  userList: [],
  userJoined: false,
  userJoinMeeting: null,
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
    setUserJoined: (state, action) => {
      state.userJoined = action.payload;
    },
    setUserJoinMeeting: (state, action) => {
      state.userJoinMeeting = action.payload;
    },
    setMeetingParticipants: (state, action) => {
      state.meetingParticipants = action.payload;
    },
    setMessages: (state, action) => {
      state.messages = [...state.messages, action.payload];
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
  setUserJoined,
  setUserJoinMeeting,
  setMeetingParticipants,
  setMessages,
  setPassword
} = roomSlice.actions;

export default roomSlice.reducer;
