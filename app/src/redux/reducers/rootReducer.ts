import { combineReducers } from '@reduxjs/toolkit';

// Need to import each slice which will be combined in the rootReducer
import codePreviewReducer from './slice/codePreviewSlice';
import contextReducer from './slice/contextReducer';
import appStateReducer from './slice/appStateSlice';
import styleReducer from './slice/styleSlice';
import roomCodeReducer from './slice/roomCodeSlice';

const rootReducer = combineReducers({
  // Add desired slices here
  codePreviewSlice: codePreviewReducer,
  contextSlice: contextReducer,
  appState: appStateReducer,
  styleSlice: styleReducer,
  roomCodeSlice: roomCodeReducer,
});

export default rootReducer;
