import { combineReducers } from 'redux';

import componentReducer from './componentReducer.ts';

const reducers = combineReducers({
  workspace: componentReducer,
});

export default reducers;
