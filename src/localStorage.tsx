import localforage from 'localforage';

export const saveState = (state: any) =>
  localforage.setItem('state-v1.0.1', state);
export const loadState = () => localforage.getItem('state-v1.0.1');
