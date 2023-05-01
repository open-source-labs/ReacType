import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import type { RootState } from '../redux/store';

// -------------------------//
// interfaces for all methods // calling actions payloads type referencss assigning type // typesccript
//Defined Slice State and Action Types on this page
interface Context {
  name: string;
  values: Array<{ key: string; value: string }>;
  components: string[];
}

interface AddContextPayload {
  name: string;
}

interface AddContextValuesPayload {
  name: string;
  inputKey: string;
  inputValue: string;
}

interface DeleteContextPayload {
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
  allContext: [],
};

const contextReducerSlice = createSlice({
  name: 'context',
  initialState,
  reducers: {
    addContext: (state, action:PayloadAction<AddContextPayload>) => {
      let newName = action.payload.name.trim();
      newName = newName.charAt(0).toUpperCase() + newName.slice(1);
      const newContext = {
        name: newName,
        values: [],
        components: []
      };
      state.allContext = [...state.allContext, newContext];
    },
    addContextValues: (state, action: PayloadAction<AddContextValuesPayload>) => {
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
    addComponentToContext: (state, action: PayloadAction<AddComponentToContextPayload>) => {
      const newTempState = [...state.allContext];
      for (let i = 0; i < newTempState.length; i += 1) {
        if (newTempState[i].name === action.payload.context.name) {
          newTempState[i].components.push(action.payload.component.name);
        }
      }
      state.allContext = newTempState;
    },
    getAllContext: (state,action) => {
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
