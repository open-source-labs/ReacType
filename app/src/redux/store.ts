// Migration to redux toolkit with configureStore
import { configureStore } from '@reduxjs/toolkit';
// Import of combined reducers in rootReducer
import rootReducer from './reducers/rootReducer';

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => {
    const ignoredPaths = [];

    for (let i = 0; i < 21; i++) {
      ignoredPaths.push(`appState.HTMLTypes.${i}.icon`);
      ignoredPaths.push(`appState.HTMLTypes.${i}.icon.$$typeof`);
    }

    return getDefaultMiddleware({
      serializableCheck: {
        // Ignore the `configToggle` action type
        // ignoredActions: ['configToggle'],
        // Ignore these field paths in all actions
        // ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
        // Ignore these paths in the state
        ignoredPaths: ignoredPaths,
      },
    });
  },
});


  
  



export default store;
