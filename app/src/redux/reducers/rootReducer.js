import { combineReducers } from 'redux';

import darkModeReducer from './slice/darkModeSlice';
import codePreviewReducer from './slice/codePreviewSlice';

const rootReducer = combineReducers({
  darkModeSlice: darkModeReducer,
  codePreviewSlice: codePreviewReducer
  // add the rest of your slice imports here
});

export default rootReducer;
