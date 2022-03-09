import * as types from '../../constants/actionTypes';

const initialState = {
  darkMode: false
};

const darkModeReducer = (state = initialState, action) => {
  switch (action.type) {
    // change darkMode to be the opposite of current state
    case types.DARK_MODE_TOGGLE:
      return {
        ...state,
        darkMode: !state.darkMode
      };

    default:
      return state;
  }
};

export default darkModeReducer;
