import { combineReducers } from 'redux';

// Need to import each slice which will be combined in the rootReducer
import darkModeReducer from './slice/darkModeSlice';
import codePreviewReducer from './slice/codePreviewSlice';
import contextReducer from './slice/contextReducer';

const rootReducer = combineReducers({
  // Add desired slices here
  darkMode: darkModeReducer,
  codePreviewSlice: codePreviewReducer,
  contextSlice: contextReducer,
});

export default rootReducer;
