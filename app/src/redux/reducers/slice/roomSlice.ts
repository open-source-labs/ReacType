import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  roomCode: '',
  userName: '',
  userList: [],
  userJoined: false,
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
  setPassword
} = roomSlice.actions;

export default roomSlice.reducer;
