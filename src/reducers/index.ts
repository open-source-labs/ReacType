import { combineReducers } from 'redux';

import applicationReducer from './applicationReducer';
import componentReducer from './componentReducer';

const reducers = combineReducers({
  workspace: applicationReducer,
  component: componentReducer,
});

export default reducers;
