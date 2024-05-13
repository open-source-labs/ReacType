import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// -------------------------//
// interfaces for all methods // calling actions payloads type referencss assigning type // typesccript
//Defined Slice State and Action Types on this page
interface Context {
  name: string;
  values: Array<{ key: string; value: string }>;
  components: string[];
}

export interface AddContextPayload {
  name: string;
}

export interface AddContextValuesPayload {
  name: string;
  inputKey: string;
  inputValue: string;
}

export interface DeleteContextPayload {
  name: string;
}

interface AddComponentToContextPayload {
  context: { name: string };
  component: { name: string };
}
// did not do getall context and allcontext cooperative
// most imprtant because it allows reference from the intial state to all the interfaces
interface ContextState {
  allContext: Context[];
}
// -------------------------//

const initialState: ContextState = {
  allContext: []
};

/**
 * The `contextReducerSlice` manages the context states of the application within the Redux store.
 * It handles a variety of operations including adding, deleting, and updating contexts, each of which
 * can contain a collection of values and components. This slice is essential for managing app-wide context configurations,
 * which can include settings and parameters across different components and pages.
 *
 * @module contextReducerSlice
 * @type {Slice}
 *
 * @typedef {Object} Context
 * @property {string} name - Unique name for the context.
 * @property {Array<{key: string, value: string}>} values - List of key-value pairs associated with the context.
 * @property {string[]} components - List of component names that are linked to the context.
 *
 * @typedef {Object} ContextState
 * @property {Context[]} allContext - Array containing all context objects.
 *
 * Actions:
 * - addContext: Adds a new context with the specified name.
 * - addContextValues: Adds key-value pairs to an existing context.
 * - deleteContext: Removes a context from the state by its name.
 * - addComponentToContext: Adds a component name to the list of components associated with a context.
 * - getAllContext: An example action that might fetch or handle contexts in bulk; currently just a stub.
 * - allContextCooperative: A reducer that merges given payload into the existing context state.
 *
 * @example
 * dispatch(addContext({ name: 'UserSettings' }));
 * dispatch(addContextValues({ name: 'UserSettings', inputKey: 'Theme', inputValue: 'Dark' }));
 *
 * @returns {Reducer<ContextState>} The reducer for this slice of state, handling updates to contexts.
 */
const contextReducerSlice = createSlice({
  name: 'context',
  initialState,
  reducers: {
    addContext: (state, action: PayloadAction<AddContextPayload>) => {
      let newName = action.payload.name.trim();
      newName = newName.charAt(0).toUpperCase() + newName.slice(1);
      const newContext = {
        name: newName,
        values: [],
        components: []
      };
      state.allContext = [...state.allContext, newContext];
    },
    addContextValues: (
      state,
      action: PayloadAction<AddContextValuesPayload>
    ) => {
      const newAllContext = [...state.allContext];

      for (let i = 0; i < newAllContext.length; i += 1) {
        if (newAllContext[i].name === action.payload.name) {
          newAllContext[i].values.push({
            key: action.payload.inputKey,
            value: action.payload.inputValue
          });
        }
      }
      state.allContext = newAllContext;
    },
    deleteContext: (state, action: PayloadAction<DeleteContextPayload>) => {
      const tempState = [...state.allContext];
      const remains = tempState.filter((el) => el.name !== action.payload.name);
      state.allContext = remains;
    },
    addComponentToContext: (
      state,
      action: PayloadAction<AddComponentToContextPayload>
    ) => {
      const newTempState = [...state.allContext];
      for (let i = 0; i < newTempState.length; i += 1) {
        if (newTempState[i].name === action.payload.context.name) {
          newTempState[i].components.push(action.payload.component.name);
        }
      }
      state.allContext = newTempState;
    },
    getAllContext: (state, action) => {
      state = state;
    },
    allContextCooperative: (state, action) => {
      return Object.assign({}, state, action.payload);
    }
  }
});

export const {
  addContext,
  addContextValues,
  deleteContext,
  getAllContext,
  addComponentToContext,
  allContextCooperative
} = contextReducerSlice.actions;
export default contextReducerSlice.reducer;
