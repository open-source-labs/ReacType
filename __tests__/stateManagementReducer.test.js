import reducer from '../app/src/redux/reducers/slice/appStateSlice';
import { initialState } from '../app/src/redux/reducers/slice/appStateSlice';

//initializing copy of initial state to be used for test suite
let state = JSON.parse(JSON.stringify(initialState));
state.components = [
  {
    id: 1,
    name: 'App',
    style: {},
    code: "import React, { useState, useEffect, useContext} from 'react';\n\n\n\nimport C1 from './C1'\nconst App = (props) => {\n\n\n      const [appState, setAppState] = useState<number | undefined>(1);\n\n  return(\n    <>\n<C1  id = \"1\" />\n    </>\n  );\n}\n\nexport default App\n",
    children: [
      {
        type: 'HTML Element',
        typeId: 1000,
        name: 'separator',
        childId: 1000,
        style: { border: 'none' },
        attributes: {},
        children: []
      },
      {
        type: 'Component',
        typeId: 2,
        name: 'C1',
        childId: 1,
        style: {},
        attributes: {},
        children: [],
        stateProps: [],
        passedInProps: []
      }
    ],
    isPage: true,
    past: [[]],
    future: [],
    stateProps: [],
    useStateCodes: [
      'const [appState, setAppState] = useState<number | undefined>(1)'
    ]
  },
  {
    id: 2,
    name: 'C1',
    nextChildId: 1,
    style: {},
    attributes: {},
    code: "import React, { useState, useEffect, useContext} from 'react';\n\n\n\n\nconst C1 = (props) => {\n\n\n\n  return(\n    <>\n\n    </>\n  );\n}\n\nexport default C1\n",
    children: [],
    isPage: false,
    past: [],
    future: [],
    stateProps: [],
    useStateCodes: [],
    passedInProps: []
  }
];

const findComponent = (components, componentId) => {
  return components.find((elem) => elem.id === componentId);
};

describe('stateManagementReducer test', () => {
  // TEST 'ADD STATE'
  describe('addState', () => {
    // setting canvas focus to root component (App)
    // state.canvasFocus.componentId = 1;
    // action dispatched to be tested
    const action1 = {
      type: 'appState/addState',
      payload: {
        newState: {
          id: 'App-testAppState',
          key: 'testAppState',
          type: 'number',
          value: 1
        },
        setNewState: {
          id: 'App-setTestAppState',
          key: 'setTestAppState',
          type: 'func',
          value: ''
        },
        contextParam: {
          allContext: []
        }
      }
    };

    // setting test state
    state = reducer(state, action1);
    let currComponent = findComponent(state.components, 1);

    it('should add state and its setter function to the stateProps array of the current component', () => {
      expect(currComponent.stateProps.length).toEqual(2);
    });
    it(`state id should be 'App-testAppState'`, () => {
      expect(currComponent.stateProps[0].id).toEqual('App-testAppState');
    });
    it(`state key should be 'testAppState'`, () => {
      expect(currComponent.stateProps[0].key).toEqual('testAppState');
    });
    it(`state value should be 1`, () => {
      expect(currComponent.stateProps[0].value).toEqual(1);
    });
    it(`state value type should be 'number'`, () => {
      expect(currComponent.stateProps[0].type).toEqual('number');
    });
    it(`function state id should be 'App-setTestAppState'`, () => {
      expect(currComponent.stateProps[1].id).toEqual('App-setTestAppState');
    });
    it(`function state key should be 'setTestAppState'`, () => {
      expect(currComponent.stateProps[1].key).toEqual('setTestAppState');
    });
    it(`function state value should be blank`, () => {
      expect(currComponent.stateProps[1].value).toEqual('');
    });
    it(`function state key should be func`, () => {
      expect(currComponent.stateProps[1].type).toEqual('func');
    });

    const action2 = {
      type: 'appState/addState',
      payload: {
        newState: {
          id: 'App-testAppState2',
          key: 'isLoggedIn',
          type: 'boolean',
          value: 'false'
        },
        setNewState: {
          id: 'App-setTestAppState2',
          key: 'setIsLoggedIn',
          type: 'func',
          value: ''
        },
        contextParam: {
          allContext: []
        }
      }
    };

    state = reducer(state, action2);

    describe('should handle value with type of boolean', () => {
      it(`state key type should be boolean`, () => {
        expect(state.components[0].stateProps[2].type).toEqual('boolean');
      });
      it(`state value should be false`, () => {
        expect(state.components[0].stateProps[2].value).toEqual('false');
      });
    });
  });

  // TEST 'ADD PASSEDINPROPS'
  describe('addPassedInProps', () => {
    state = JSON.parse(JSON.stringify(state));
    // setting canvas focus to the child component
    state.canvasFocus.componentId = 2;

    // action dispatched to be tested
    const action = {
      type: 'appState/addPassedInProps',
      payload: {
        passedInProps: {
          id: 'App-testAppState',
          key: 'testAppState',
          type: 'number',
          value: 1
        },
        contextParam: {
          allContext: []
        }
      }
    };

    // setting test state
    state = reducer(state, action);
    const currComponent = findComponent(state.components, 2);
    const parentComponent = findComponent(state.components, 1);

    it(`current component should have a state id: 'App-testAppState' `, () => {
      expect(currComponent.passedInProps[0].id).toEqual('App-testAppState');
    });
    it(`current component should have a state key: 'testAppState' `, () => {
      expect(currComponent.passedInProps[0].key).toEqual('testAppState');
    });
    it(`current component should have a state value equal to 1`, () => {
      expect(currComponent.passedInProps[0].value).toEqual(1);
    });
    it(`current component should have a state value type: 'number'`, () => {
      expect(currComponent.passedInProps[0].type).toEqual('number');
    });
    //check parent children array to make sure it is being added here as well
    it(`parent component 'passedInProps' array length should be 1`, () => {
      expect(currComponent.passedInProps.length).toEqual(1);
    });
    it(`parent component should have a state id: 'App-testAppState' `, () => {
      expect(parentComponent.children[1].passedInProps[0].id).toEqual(
        'App-testAppState'
      );
    });
    it(`parent component should have a state key: 'testAppState' `, () => {
      expect(parentComponent.children[1].passedInProps[0].key).toEqual(
        'testAppState'
      );
    });
    it(`parent component should have a state value equal to 1`, () => {
      expect(parentComponent.children[1].passedInProps[0].value).toEqual(1);
    });
    it(`parent component should have a state value type: 'number'`, () => {
      expect(parentComponent.children[1].passedInProps[0].type).toEqual(
        'number'
      );
    });
  });

  // TEST 'DELETE PASSEDINPROPS'
  describe('deletePassedInProps', () => {
    it('should delete the state passed down from parent component in the child component', () => {
      // setting canvas focus to the child component
      state = JSON.parse(JSON.stringify(state));
      state.canvasFocus.componentId = 2;

      // action dispatched to be tested
      const action = {
        type: 'appState/deletePassedInProps',
        payload: {
          rowId: 'App-testAppState',
          contextParam: {
            allContext: []
          }
        }
      };

      // setting test state
      state = reducer(state, action);
      const parentComponent = findComponent(state.components, 1);
      const currComponent = findComponent(state.components, 2);

      expect(currComponent.passedInProps.length).toEqual(0);
      expect(parentComponent.children[1].passedInProps.length).toEqual(0); // need to fix reducer
    });
  });

  // TEST 'DELETE STATE'
  describe('deleteState', () => {
    it('should delete all instances of state from stateProps and passedInProps', () => {
      // setting canvas focus to root component
      state = JSON.parse(JSON.stringify(state));
      state.canvasFocus.componentId = 1;

      // action dispatched to be tested
      const action = {
        type: 'appState/deleteState',
        payload: {
          stateProps: [],
          rowId: 'App-appState',
          otherId: 'App-setAppState',
          contextParam: {
            allContext: []
          }
        }
      };

      // setting intial test state
      let parentComponent = findComponent(state.components, 1);
      parentComponent.children[1].passedInProps = [
        {
          id: 'App-appState',
          key: 'appState',
          type: 'number',
          value: 1
        },
        {
          id: 'App-setAppState',
          key: 'setAppState',
          type: 'func',
          value: ''
        }
      ];

      let childComponent = findComponent(state.components, 2);
      childComponent.passedInProps = [
        {
          id: 'App-appState',
          key: 'appState',
          type: 'number',
          value: 1
        },
        {
          id: 'App-setAppState',
          key: 'setAppState',
          type: 'func',
          value: ''
        }
      ];

      // updating components after state updates
      state = reducer(state, action);
      parentComponent = findComponent(state.components, 1);
      childComponent = findComponent(state.components, 2);

      expect(childComponent.passedInProps.length).toEqual(0);
      expect(parentComponent.stateProps.length).toEqual(0);
      expect(parentComponent.children[1].passedInProps.length).toEqual(0);
    });
  });
});
