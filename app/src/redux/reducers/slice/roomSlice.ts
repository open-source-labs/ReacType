import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  roomCode: '',
  userName: '',
  userList: [],
  userJoined: false,
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
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
    setUserList: (state, action) => {
      state.userList = action.payload;
    },
    setUserJoined: (state, action) => {
      state.userJoined = action.payload;
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
  setUserName,
  setUserList,
  setUserJoined,
  setMessages,
  setPassword,
  setEmptyMessages
} = roomSlice.actions;

export default roomSlice.reducer;
