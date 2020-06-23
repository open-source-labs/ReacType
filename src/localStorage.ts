import localforage from 'localforage';
import { ApplicationStateInt } from './interfaces/Interfaces';

export const saveState = (state: ApplicationStateInt) => {
  localforage.setItem('state-v1.0.1', state);
}
export const loadState = () => localforage.getItem('state-v1.0.1').then((value) => {
  console.log('The value stored in local storage: ', value);
});