/* eslint-disable max-len */
import { combineReducers } from '@reduxjs/toolkit';

// Need to import each slice which will be combined in the rootReducer
import codePreviewReducer from './slice/codePreviewSlice';
import contextReducer from './slice/contextReducer';
import appStateReducer from './slice/appStateSlice';
import styleReducer from './slice/styleSlice';
import roomReducer from './slice/roomSlice';

/**
 * Combines individual reducers into a single root reducer to be used in the Redux store configuration.
 * This rootReducer integrates various features of the application such as code preview, context management,
 * application state, styling properties, and room functionalities into the Redux state management.
 *
 * Each reducer manages a specific aspect of the application's state:
 * - `codePreviewSlice`: Manages state related to code previews in the application.
 * - `contextSlice`: Handles state for contextual information within the application.
 * - `appState`: Manages general application state and settings.
 * - `styleSlice`: Controls style-related state, likely for dynamic styling in the app.
 * - `roomSlice`: Manages state related to room and meeting functionalities.
 *
 * @module rootReducer
 * @function
 * @example
 * import rootReducer from './reducers/rootReducer';
 *
 * const store = configureStore({
 *   reducer: rootReducer
 * });
 *
 * @returns {Reducer<CombinedState>} The combined reducer containing all individual slice reducers, ready to be used in the Redux store.
 */
const rootReducer = combineReducers({
  codePreviewSlice: codePreviewReducer,
  contextSlice: contextReducer,
  appState: appStateReducer,
  styleSlice: styleReducer,
  roomSlice: roomReducer
});

export default rootReducer;
