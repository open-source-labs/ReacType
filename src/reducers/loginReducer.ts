import { initialLoginState } from './initialState';
import { Action } from '../interfaces/Interfaces';
import { SET_USERNAME, SET_PASSWORD } from '../actionTypes/index';
/*
export interface LoginInt {
  username: string;
  password: string;
}

export const initialLoginState: LoginInt = {
  username: '',
  password: ''
};

export interface Action {
  type: string;
  payload?: any;
}

export const setUsername = (username: string): Action => ({
  type: SET_USERNAME,
  payload: username
});

export const setPassword = (password: string): Action => ({
  type: SET_PASSWORD,
  payload: password
})
*/

const loginReducer = (state = initialLoginState, action: Action) => {
  switch(action.type) {
    case SET_USERNAME:
      return {
        ...state,
        username: action.payload
      }

    case SET_PASSWORD:
      return {
        ...state,
        password: action.payload
      }

    default: 
      return state;
  }
}

export default loginReducer