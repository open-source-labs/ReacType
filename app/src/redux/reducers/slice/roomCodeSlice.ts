// With redux toolkit you can combine all the actions, action types, and reducers into one 'slice'
import { createSlice } from '@reduxjs/toolkit';
// Sets initial state to false
const initialState = {
  roomCode: ''
};

// Creates new slice with the name darkMode, initial state, and reducer function which toggles dark mode state between true and false
const roomCodeSlice = createSlice({
  name: 'roomCode',
  initialState,
  reducers: {
    changeRoom: (state, action) => {
      state.roomCode = action.payload
    }
  }
});

// Exports the action creator function to be used with useDispatch
export const { changeRoom } = roomCodeSlice.actions;
// Exports so we can combine in rootReducer
export default roomCodeSlice.reducer;