import { combineReducers } from 'redux';

import componentReducer from './rootReducer';
import loginReducer from './loginReducer';

const reducers = combineReducers({
  workspace: componentReducer,
  credentials: loginReducer
});

export default reducers;
