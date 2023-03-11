// Migration to redux toolkit with configureStore
import { configureStore } from '@reduxjs/toolkit';
// Import of combined reducers in rootReducer
import rootReducer from './reducers/rootReducer';

const store = configureStore({
  reducer: rootReducer
});

export default store;
