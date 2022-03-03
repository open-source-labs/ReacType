import { combineReducers } from 'redux';

import darkModeReducer from './slice/darkModeSlice';

const rootReducer = combineReducers({
  darkModeSlice: darkModeReducer
  // add the rest of your slice imports here
});

export default rootReducer;
