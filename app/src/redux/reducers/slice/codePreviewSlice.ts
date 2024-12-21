import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  code: ``,
  input: ``
};

/**
 * `codePreviewSlice` manages the state of the code preview functionality in the application.
 * It handles real-time updates to the code editor and input fields. This slice is essential for functionalities
 * that require storing and retrieving user-entered code and associated input for execution or display purposes.
 *
 * @module codePreviewSlice
 * @type {Slice}
 *
 * @typedef {Object} CodePreviewState
 * @property {string} code - The current code stored in the state, typically representing the code written in an editor.
 * @property {string} input - Additional input or parameters associated with the code that might affect its execution or presentation.
 *
 * Actions:
 * - codePreviewSave: Updates the `code` property in the state with new content.
 * - codePreviewInput: Updates the `input` property in the state with new content.
 * - codePreviewCooperative: Merges provided payload into the existing state in a cooperative manner.
 *
 * @example
 * dispatch(codePreviewSave("function example() { return 'Hello, world!'; }"));
 * dispatch(codePreviewInput("Example input"));
 *
 * @returns {Reducer<CodePreviewState>} The reducer for this slice of state, handling updates to code and input properties.
 */
const codePreviewSlice = createSlice({
  name: 'codePreview',
  initialState,
  reducers: {
    codePreviewSave: (state, action) => {
      state.code = action.payload;
    },
    codePreviewInput: (state, action) => {
      state.input = action.payload;
    },
    codePreviewCooperative: (state, action) => {
      return Object.assign({}, state, action.payload);
    }
  }
});

export const { codePreviewSave, codePreviewInput, codePreviewCooperative } =
  codePreviewSlice.actions;

export default codePreviewSlice.reducer;
