import { combineReducers } from 'redux';

import componentReducer from './componentReducer.js';

const reducers = combineReducers({
  workspace: componentReducer,
});

export default reducers;
