import { combineReducers } from 'redux';
import applicationReducer from './application';

const reducers = combineReducers({
  application: applicationReducer,
});

export default reducers;
