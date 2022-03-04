import * as types from '../../constants/actionTypes';

const initialState = {
  code: ``,
  input: ``
};

const codePreviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CODE_PREVIEW_SAVE:
      return {
        ...state,
        code: action.payload
      };
    case types.CODE_PREVIEW_INPUT:
      return {
        ...state,
        input: action.payload
      };
    default:
      return state;
  }
};

export default codePreviewReducer;
