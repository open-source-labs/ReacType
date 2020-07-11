import reducer from '../app/src/reducers/componentReducer';
// import { State, Action, Component, ChildElement } from '../app/src/interfaces/InterfacesNew';

import initialState from '../app/src/context/initialState';

const path = require('path');
const Application = require('spectron').Application;
const baseDir = path.join(__dirname, '..');
const electronPath = path.join(baseDir, 'node_modules', '.bin', 'electron');

const appArg = path.join(baseDir, 'app', 'electron', 'main.js');
//const appArg = path.join(baseDir, 'app', 'electron');
console.log(electronPath);
console.log(appArg);

//const electronPath = '../node_modules/.bin/electron';
//const electronPath = require('electron');

const app = new Application({
  path: electronPath,
  args: [appArg],
  chromeDriverArgs: ['--no-proxy-server'],
  env: {
    'NO_PROXY': '127.0.0.1,localhost'
  }
})

console.log(app);
// const testComponent: Component = {
//   id: 2,
//   name: "Test",
//   nextChildId: 1,
//   style: {},
//   code: '',
//   children: []
// }

describe('Testing componentReducer functionality', () => {
  let state = initialState;
  

  beforeAll(async () => {
    return await app.start();
  })

  afterAll(() => {
    if (app && app.isRunning()) {
      return app.stop();
    }
  })

  // TEST 'ADD COMPONENT'
  describe('ADD COMPONENT reducer', () => {
    it('should add new reuseable component to state', () => {
      const action = {
        type: 'ADD COMPONENT',
        payload: {
          componentName: "TestRegular",
          root: false
        }
      }
      state = reducer(state, action);
      // expect state.components array to have length 2
      const length = state.components.length;
      expect(length).toEqual(2);
      // expect new component name to match name of last elem in state.components array
      expect(state.components[length - 1].name).toEqual(action.payload.componentName);
    })
  })

  // TEST 'ADD CHILD'
  describe('ADD CHILD reducer', () => {
    it('should add child component to top-level component', () => {
      const action = {
        type: 'ADD CHILD',
        payload: {
          type: 'Component',
          typeId: 2,
          childId: null
        }
      }
      state.canvasFocus = { componentId: 1, childId: null };
      console.log(state);
      const newState = reducer(state, action);
      const newParent = newState.components[0];
      // expect newParent's children array to have length 1
      expect(newParent.children.length).toEqual(1);
      // expect child to have type 'Component' and name 'TestRegular'
      expect(newParent.children[0].type).toEqual('Component');
      expect(newParent.children[0].name).toEqual('TestRegular');
    })
  })
  // TEST 'CHANGE FOCUS'

  // TEST 'UPDATE CSS'

  // TEST 'SET INITIAL STATE'

})