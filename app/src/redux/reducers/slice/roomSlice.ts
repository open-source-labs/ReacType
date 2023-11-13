// With redux toolkit you can combine all the actions, action types, and reducers into one 'slice'
import { createSlice } from '@reduxjs/toolkit';
// Sets initial state to false
const initialState = {
  roomCode: '',
  userName: '',
  userList: [],
  // userIsHost: false,
  userJoined: false
};

// Creates new slice with the name , initial state, and reducer function
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
    // setUserIsHost: (state, action) => {
    //   state.userIsHost = action.payload;
    // },
    setUserJoined: (state, action) => {
      state.userJoined = action.payload;
    }
  }
});

// Exports the action creator function to be used with useDispatch
export const {
  setRoomCode,
  setUserName,
  setUserList,
  // setUserIsHost,
  setUserJoined
} = roomSlice.actions;
// Exports so we can combine in rootReducer
export default roomSlice.reducer;
