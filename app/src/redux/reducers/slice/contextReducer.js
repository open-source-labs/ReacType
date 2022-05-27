import * as types from '../../constants/actionTypes';

const initialState = {
  allContext: []
}

const contextReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_CONTEXT:
      const newContext = {
        name: action.payload.trim(),
        values: [],
      }

      return {
        ...state,
        allContext: [...allContext, newContext]
      }
    default: {
      return state;
    }
  }
}

export default contextReducer;