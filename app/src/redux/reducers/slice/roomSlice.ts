import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  roomCode: '',
  meetingId: '',
  userName: '',
  userList: [],
  userJoined: false,
  userJoinMeeting: null,
  meetingParticipants: [],
  meetingInfoState: {},
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
    setMeetingInfoState: (state, action) => {
      state.meetingInfoState = action.payload;
    },
    // setMicOnState: (state, action) => {
    //   state.micOnState = action.payload;
    // },
    // setWebcamOnState: (state, action) => {
    //   state.webcamOnState = action.payload;
    // },
    // setIsLocalState: (state, action) => {
    //   state.isLocalState = action.payload;
    // },
    // setDisplayNameState: (state, action) => {
    //   state.displayNameState = action.payload;
    // },
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
  // setWebcamStreamState,
  // setMicOnState,
  // setWebcamOnState,
  // setIsLocalState,
  // setDisplayNameState,
  setMeetingInfoState,
  setMessages,
  setPassword
} = roomSlice.actions;

export default roomSlice.reducer;
