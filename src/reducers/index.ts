import { combineReducers } from 'redux';

import componentReducer from './rootReducer';

const reducers = combineReducers({
  workspace: componentReducer,
});

export default reducers;
