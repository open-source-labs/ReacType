/* eslint-disable max-len */
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers/rootReducer';

/**
 * Configures and creates a Redux store for the application. This setup includes the root reducer,
 * and custom middleware to handle serializability checks. The store is configured with default middleware
 * from Redux Toolkit, modified to ignore certain non-serializable parts of the state that are expected
 * due to the use of complex objects (like components or elements in the state).
 *
 * The serializability check middleware is configured to ignore paths where non-serializable values
 * are known to exist. This is necessary when state includes elements like React components or other
 * non-serializable objects.
 *
 * @module store
 * @function
 * @example
 * import store from './store';
 *
 * console.log(store.getState()); // Logs the current state of the Redux store.
 *
 * @returns {object} The Redux store configured with root reducers and customized middleware.
 *
 * @typedef {ReturnType<typeof store.getState>} RootState
 * Defines a type that represents the state of the entire Redux store, returned by `store.getState()`.
 *
 * @typedef {typeof store} AppStore
 * Defines a type representing the Redux store itself for use in typing contexts where the store object is used.
 */
const store = configureStore({
  reducer: rootReducer, // combine all reducers into one rootReducer
  middleware: (getDefaultMiddleware) => {
    let ignoredPaths: string[] = [];

    for (let i = 0; i < 21; i++) { // iterate through paths of the state and ignore specific properties from serializability checks
      ignoredPaths.push(`appState.HTMLTypes.${i}.icon`);
      ignoredPaths.push(`appState.HTMLTypes.${i}.icon.$$typeof`);
    }

    return getDefaultMiddleware({ // return getDefaultMiddleware but with customized serializability check
      serializableCheck: {
        ignoredPaths, // specified paths to be ignored for serializability checks
      },
    });
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppStore = typeof store;

export default store;
