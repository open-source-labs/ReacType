import localforage from 'localforage';
//localforage is a storage library for JavaScript. localforage uses asynchronous storage (IndexedDB or WebSQL) with a localStorage-like API.
// localForage uses localStorage in browsers with no IndexedDB or WebSQL support.

// localforage.setItem saves data to an offline store. 
export const saveState = (state) => localforage.setItem('state-v1.0.1', state);

// localforage.getItem loads data from the offline store
export const loadState = () => localforage.getItem('state-v1.0.1');
