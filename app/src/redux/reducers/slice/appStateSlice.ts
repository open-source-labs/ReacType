// Main slice for all the component state.
import { createSlice } from '@reduxjs/toolkit';
// Import Interfaces for State, and HTML Types
import { State } from '../../../interfaces/Interfaces';
import HTMLTypes from '../../../context/HTMLTypes';

const initialState: State = {
  name: '',
  isLoggedIn: false,
  config: { saveFlag: true, saveTimer: false },
  components: [
    {
      id: 1,
      name: 'App',
      style: {},
      code: '<div>Drag in a component or HTML element into the canvas!</div>',
      children: [],
      isPage: true,
      past: [],
      future: [],
      stateProps: [],
      useStateCodes: [], // array of strings for each useState codes
    }
  ],
  projectType: 'Classic React',
  rootComponents: [1],
  canvasFocus: { componentId: 1, childId: null },
  nextComponentId: 2,
  nextChildId: 1,
  nextTopSeparatorId: 1000,
  HTMLTypes,
  tailwind: false
};

// Creates new slice for components with applicable reducers
const appStateSlice = createSlice({
  name: 'appState',
  initialState,
  reducers: {
      changeFocus: (state, action) => {
      const { componentId, childId } = action.payload;
      state.canvasFocus = { componentId, childId };
    },
    resetAllState: (state) => {
      Object.assign(state, initialState);
    }
  
  }
});

// Exports the action creator function to be used with useDispatch
export const { changeFocus, resetAllState } = appStateSlice.actions;
// Exports so we can combine in rootReducer
export default appStateSlice.reducer;
