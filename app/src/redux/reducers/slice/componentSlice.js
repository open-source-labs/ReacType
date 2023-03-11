// Main slice for all the component state
import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

// Creates new slice for components with applicable reducers
const componentSlice = createSlice({
  name: 'component',
  initialState,
  reducers: {}
});

// Exports the action creator function to be used with useDispatch
export const {} = componentSlice.actions;
// Exports so we can combine in rootReducer
export default componentSlice.reducer;
