import { createSlice , PayloadAction } from '@reduxjs/toolkit';

// interface InititalState {
//   code: string;
//   input: string
// }

const initialState = {
  code: ``,
  input: ``
};

// interface Action {
//   payload: any,
//   type: string
// }

// interface Reducers {
//   codePreviewSave: (state:InititalState, action:Action) => void;
//   codePreviewInput: (state:InititalState , action:Action) => void;
//   codePreviewCooperative: (state:InititalState , action:Action) => ObjectConstructor;
// }

// interface CodePreviewSlice {
//   name: string;
//   initialState: InititalState;
//   reducers: Reducers;
// }

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
