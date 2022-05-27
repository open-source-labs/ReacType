import * as types from '../../constants/actionTypes';

const initialState = {
  allContext: [
    {
      name: "MainContext1",
      values: [{key : "testKey1", value: 'testValue1'}, {key: "testKey2", value: "testValue2"}]
    },
    {
      name: "MainContext3",
      values: [{key : "testKey3", value: 'testValue3'}, {key: "testKey33", value: "testValue33"}]
    }
  ]
}

const contextReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_CONTEXT:
      const newContext = {
        name: action.payload.trim(),
        values: [],
      }

      return {
        ...state,
        allContext: [...allContext, newContext]
      }
    default: {
      return state;
    }
  }
}

export default contextReducer;