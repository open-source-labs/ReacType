import * as types from '../../constants/actionTypes';

const initialState = {
  allContext: [
    {
      name: 'ContextExample1',
      values: [
        { key: 'theme', value: 'testValue1' },
        { key: 'navbar', value: 'testValue2' }
      ],
      components: ['MainContainer', 'SubmitForm']
    },
    {
      name: 'ContextExample2',
      values: [
        { key: 'header', value: 'testValue3' },
        { key: 'footer  ', value: 'testValue33' }
      ],
      components: ['MainContainer', 'EditForm', 'TableContainer']
    }
  ]
  // allContext: []
};

const contextReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_CONTEXT:
      //MainContext + ainContext
      let newName =
        action.payload.name
          .trim()
          .charAt(0)
          .toUpperCase() + action.payload.name.slice(1);
      const newContext = {
        name: newName,
        values: [],
        components: []
      };

      return {
        ...state,
        allContext: [...state.allContext, newContext]
      };

    case types.ADD_CONTEXT_VALUES:
      const newAllContext = [...state.allContext];

      for (let i = 0; i < newAllContext.length; i += 1) {
        if (newAllContext[i].name === action.payload.name) {
          newAllContext[i].values.push({
            key: action.payload.inputKey,
            value: action.payload.inputValue
          });
        }
      }

      return {
        ...state,
        allContext: newAllContext
      };

    case types.DELETE_CONTEXT:
      const tempState = [...state.allContext];
      const remains = tempState.filter(el => el.name !== action.payload.name);

      return {
        ...state,
        allContext: remains
      };

    case types.ADD_COMPONENT_TO_CONTEXT:
      const newTempState = [...state.allContext];

      for (let i = 0; i < newTempState.length; i += 1) {
        if (newTempState[i].name === action.payload.context.name) {
          newTempState[i].components.push(action.payload.component.name);
        }
      }

      return {
        ...state,
        allContext: newTempState
      };

    case types.GET_ALL_CONTEXT:
      return {
        ...state
      };
    default: {
      return state;
    }
  }
};

export default contextReducer;
