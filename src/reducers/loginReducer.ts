import { initialLoginState } from './initialState';
import { Action } from '../interfaces/Interfaces';
import { SET_LOGIN_STATE } from '../actionTypes/index';

const loginReducer = (state = initialLoginState, action: Action) => {
  switch(action.type) {
    case SET_LOGIN_STATE:
      const status = !state.isLoggedIn
      return {
        isLoggedIn: status
      }

    default: 
      return state;
  }
}

export default loginReducer