import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  code: ``,
  input: ``
};

//realtime updates for the code preview

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
