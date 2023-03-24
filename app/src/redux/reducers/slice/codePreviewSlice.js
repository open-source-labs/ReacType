import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  code: ``,
  input: ``
};

const codePreviewSlice = createSlice({
  name: 'codePreview',
  initialState,
  reducers: {
    codePreviewSave: (state,action) => {
      state.code = action.payload
    },
    codePreviewInput: (state, action) => {
      state.input = action.payload
    },
    codePreviewCooperative: (state, action) => {
      return Object.assign({}, state, action.payload)
    },
  }
})


export const { codePreviewSave, codePreviewInput, codePreviewCooperative } = codePreviewSlice.actions;

export default codePreviewSlice.reducer;
// import * as types from '../../constants/actionTypes';

// const initialState = {
//   code: ``,
//   input: ``
// };

// const codePreviewReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case types.CODE_PREVIEW_SAVE:
//       return {
//         ...state,
//         code: action.payload
//       };
//     case types.CODE_PREVIEW_INPUT:
//       return {
//         ...state,
//         input: action.payload
//       };
//     default:
//       return state;
//   }
// };

// export default codePreviewReducer;
