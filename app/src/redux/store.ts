import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers/rootReducer';

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
        ignoredPaths
      }
    });
  }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppStore = typeof store;

export default store;
