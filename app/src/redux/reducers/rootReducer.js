import { combineReducers } from 'redux';


import darkModeReducer from './slice/darkModeSlice';
import codePreviewReducer from './slice/codePreviewSlice';
import contextReducer from './slice/contextReducer';

const rootReducer = combineReducers({
  darkModeSlice: darkModeReducer,
  codePreviewSlice: codePreviewReducer,
  // add the rest of your slice imports here
  contextSlice: contextReducer,
});

export default rootReducer;
