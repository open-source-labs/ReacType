// import * as types from '../../constants/actionTypes';
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  allContext: [
  ]
};

const contextReducerSlice = createSlice({
  name: 'context',
  initialState,
  reducers: {
    addContext: (state, action) => {
      let newName = action.payload.name.trim();
      newName = newName.charAt(0).toUpperCase() + newName.slice(1);
      const newContext = {
        name: newName,
        values: [],
        components: []
      };
      state.allContext = [...state.allContext, newContext];
    },
    addContextValues: (state, action) => {
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
    deleteContext: (state, action) => {
      const tempState = [...state.allContext];
      const remains = tempState.filter(el => el.name !== action.payload.name);
      state.allContext = remains;
    },
    addComponentToContext: (state, action) => {
      const newTempState = [...state.allContext];
      for (let i = 0; i < newTempState.length; i += 1) {
        if (newTempState[i].name === action.payload.context.name) {
          newTempState[i].components.push(action.payload.component.name);
        }
      }
      state.allContext = newTempState
    },
    getAllContext: (state, action) => {
      state = state;
    }

  }
})

export const { addContext, addContextValues, deleteContext, getAllContext, addComponentToContext} = contextReducerSlice.actions
export default contextReducerSlice.reducer;

// const contextReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case types.ADD_CONTEXT:
//       let newName = action.payload.name.trim();
//       newName = newName.charAt(0).toUpperCase() + newName.slice(1);
//       const newContext = {
//         name: newName,
//         values: [],
//         components: []
//       };

//       return {
//         ...state,
//         allContext: [...state.allContext, newContext]
//       };

//     case types.ADD_CONTEXT_VALUES:
//       const newAllContext = [...state.allContext];

//       for (let i = 0; i < newAllContext.length; i += 1) {
//         if (newAllContext[i].name === action.payload.name) {
//           newAllContext[i].values.push({
//             key: action.payload.inputKey,
//             value: action.payload.inputValue
//           });
//         }
//       }

//       return {
//         ...state,
//         allContext: newAllContext
//       };

//     case types.DELETE_CONTEXT:
//       const tempState = [...state.allContext];
//       const remains = tempState.filter(el => el.name !== action.payload.name);

//       return {
//         ...state,
//         allContext: remains
//       };

//     case types.ADD_COMPONENT_TO_CONTEXT:
//       const newTempState = [...state.allContext];

//       for (let i = 0; i < newTempState.length; i += 1) {
//         if (newTempState[i].name === action.payload.context.name) {
//           newTempState[i].components.push(action.payload.component.name);
//         }
//       }

//       return {
//         ...state,
//         allContext: newTempState
//       };

//     case types.GET_ALL_CONTEXT:
//       return {
//         ...state
//       };
//     default: {
//       return state;
//     }
//   }
// };

// export default contextReducer;







  //dummy data for context slice commented out
   // {
    //   name: 'FirstContext',
    //   values: [
    //     { key: 'theme', value: 'testValue1' },
    //     { key: 'navbar', value: 'testValue2' }
    //   ],
    //   components: ['MainContainer', 'SubmitForm']
    // },
    // {
    //   name: 'ContextExample2',
    //   values: [
    //     { key: 'header', value: 'testValue3' },
    //     { key: 'footer  ', value: 'testValue33' }
    //   ],
    //   components: ['MainContainer', 'EditForm', 'TableContainer']
    // }