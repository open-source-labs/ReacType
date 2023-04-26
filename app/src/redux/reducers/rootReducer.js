import { combineReducers } from 'redux';

// Need to import each slice which will be combined in the rootReducer
import darkModeReducer from './slice/darkModeSlice.ts';
import codePreviewReducer from './slice/codePreviewSlice.ts';
import contextReducer from './slice/contextReducer.ts';
import appStateReducer from './slice/appStateSlice.ts';
import styleReducer from './slice/styleSlice.ts';
import roomCodeReducer from './slice/roomCodeSlice.ts';

const rootReducer = combineReducers({
  // Add desired slices here
  darkMode: darkModeReducer,
  codePreviewSlice: codePreviewReducer,
  contextSlice: contextReducer,
  appState: appStateReducer,
  styleSlice: styleReducer,
  roomCodeSlice: roomCodeReducer
});

export default rootReducer;
