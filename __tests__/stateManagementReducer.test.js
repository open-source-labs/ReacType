import reducer from '../app/src/reducers/componentReducer'; //does not exist
//
import initialState from '../app/src/context/initialState'; //does not exist

xdescribe('Testing componentReducer functionality for stateManagement tab', () => {
  const findComponent = (components, componentId) => {
    return components.find((elem) => elem.id === componentId);
  };

  let state = initialState;

  // setting up initial state
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

  // TEST 'ADD STATE'
  describe('ADD STATE test', () => {
    // setting canvas focus to root component (App)
    state.canvasFocus.componentId = 1;

    // action dispatched to be tested
    const action = {
      type: 'ADD STATE',
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
        }
      }
    };

    // setting test state
    state = reducer(state, action);
    const currComponent = findComponent(state.components, 1);

    it('should add state and its function modifier to the stateProps array of the current component', () => {
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
    it(`state key should be number`, () => {
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
  });

  // TEST 'ADD PASSEDINPROPS'
  describe('ADD PASSEDINPROPS test', () => {
    // setting canvas focus to the child component
    state.canvasFocus.componentId = 2;

    // action dispatched to be tested
    const action = {
      type: 'ADD PASSEDINPROPS',
      payload: {
        passedInProps: {
          id: 'App-testAppState',
          key: 'testAppState',
          type: 'number',
          value: 1
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
  describe('DELETE PASSEDINPROPS test', () => {
    it('should delete the state passed down from parent component in the child component', () => {
      // setting canvas focus to the child component
      state.canvasFocus.componentId = 2;

      // action dispatched to be tested
      const action = {
        type: 'DELETE PASSEDINPROPS',
        payload: { rowId: 'App-testAppState' }
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
  describe('DELETE STATE test', () => {
    it('should delete all instances of state from stateProps and passedInProps', () => {
      // setting canvas focus to root component
      state.canvasFocus.componentId = 1;

      // action dispatched to be tested
      const action = {
        type: 'DELETE STATE',
        payload: {
          stateProps: [],
          rowId: 'App-appState',
          otherId: 'App-setAppState'
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
