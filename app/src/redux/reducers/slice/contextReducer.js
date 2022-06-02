import * as types from '../../constants/actionTypes';

const initialState = {
  allContext: [
    {
      name: 'MainContext1',
      values: [
        { key: 'testKey1', value: 'testValue1' },
        { key: 'testKey2', value: 'testValue2' }
      ],
      components: ['MainContainer', 'SubmitForm']
    },
    {
      name: 'MainContext3',
      values: [
        { key: 'testKey3', value: 'testValue3' },
        { key: 'testKey33', value: 'testValue33' }
      ],
      components: ['MainContainer', 'EditForm', 'TableContainer']
    }
  ]
};

const contextReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_CONTEXT:
      const newContext = {
        name: action.payload.name.trim(),
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
    default: {
      return state;
    }
  }
};

export default contextReducer;
