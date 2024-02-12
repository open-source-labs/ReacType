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
    setPassword: (state, action) => {
      state.password = action.payload;
    }
  }
});

// Exports the action creator function to be used with useDispatch
export const {
  setRoomCode,
  setUserName,
  setUserList,
  setUserJoined,
  setMessages,
  setPassword
} = roomSlice.actions;
// Exports so we can combine in rootReducer

export default roomSlice.reducer;
