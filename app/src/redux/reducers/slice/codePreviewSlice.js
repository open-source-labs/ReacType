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
    }
  }
})


export const { codePreviewSave, codePreviewInput } = codePreviewSlice.actions;

export default codePreviewSlice.reducer;
