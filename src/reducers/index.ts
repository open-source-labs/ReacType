import { combineReducers } from 'redux';

import componentReducer from './rootReducer';
import loginReducer from './loginReducer';

const reducers = combineReducers({
  workspace: componentReducer,
  auth: loginReducer
});

export default reducers;
