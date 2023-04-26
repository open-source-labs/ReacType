// Migration to redux toolkit with configureStore
import { configureStore } from '@reduxjs/toolkit';
// Import of combined reducers in rootReducer
import rootReducer from './reducers/rootReducer';

/*
// Define the root state type based on the rootReducer
export type RootState = ReturnType<typeof rootReducer>;

// Define the type of the Redux store
export type AppStore = Store<RootState>;
*/

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    let ignoredPaths: string[] = [];

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
        // ignoredPaths: ignoredPaths,
        ignoredPaths
      }
    });
  }
});

// Define the root state type based on the rootReducer
//export type RootState = ReturnType<typeof rootReducer>;
export type RootState = ReturnType<typeof store.getState>;

// Define the type of the Redux store
export type AppStore = typeof store;

export default store;
