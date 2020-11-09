import reducer from '../app/src/reducers/componentReducer';
import { State, Action, Component, ChildElement } from '../app/src/interfaces/InterfacesNew';

import initialState from '../app/src/context/initialState';


xdescribe('Testing componentReducer functionality', function () {
  let state: State = initialState;


  // TEST 'ADD COMPONENT'
  describe('ADD COMPONENT reducer', () => {
    it('should add new reuseable component to state', () => {
      const action: Action = {
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
      const action: Action = {
        type: 'ADD CHILD',
        payload: {
          type: 'Component',
          typeId: 2,
          childId: null
        }
      }
      // switch focus to very first root component
      state.canvasFocus = { componentId: 1, childId: null };
      state = reducer(state, action);
      const newParent = state.components[0];
      // expect new parent's children array to have length 1
      expect(newParent.children.length).toEqual(1);
      // expect new child to have type 'Component'
      expect(newParent.children[0].type).toEqual('Component');
      const addedChild = state.components.find(comp => comp.id === newParent.children[0].typeId);
      // expect new child typeId to correspond to component with name 'TestRegular'
      expect(addedChild.name).toEqual('TestRegular');
    })
  })

  // TEST 'CHANGE POSITION'
  describe('CHANGE POSITION reducer ', () => {
    it('should move position of an instance', () => {
      const actionHtml: Action = {
        type: 'ADD CHILD',
        payload: {
          type: 'HTML Element',
          typeId: 9,
          childId: null
        }
      }
      state = reducer(state, actionHtml);
      const actionChangePos: Action = {
        type: 'CHANGE POSITION',
        payload: {
          currentChildId: 1,
          newParentChildId: null
        }
      }
      state = reducer(state, actionChangePos);
      const changeParent = state.components.find(comp => comp.id === state.canvasFocus.componentId);
      const changeParentChildLength = changeParent.children.length;
      // expect last child of parent to be moved Component element
      expect(changeParent.children[changeParentChildLength-1].type).toEqual('Component');
      // expect last child of parent to have current child ID of payload
      expect(changeParent.children[changeParentChildLength-1].childId).toEqual(1);
    })
  })

  // TEST 'DELETE CHILD'
  describe('DELETE CHILD reducer', () => {
    it('should delete child of focused top-level component', () => {
      // canvas still focused on childId: 2, which is an HTML element
      const action: Action = {
        type: 'DELETE CHILD'
      }
      state = reducer(state, action);
      // expect only one remaining child
      const delParent = state.components.find(comp => comp.id === state.canvasFocus.componentId);
      // expect remaining child to have type 'Component'
      expect(delParent.children.length).toEqual(1);
      expect(delParent.children[delParent.children.length -1].type).toEqual('Component');
    })
  })

  // TEST 'CHANGE FOCUS'
  describe('CHANGE FOCUS reducer', () => {
    it('should change focus to specified component', () => {
      const action: Action = {
        type: 'CHANGE FOCUS',
        payload: {
          componentId: 2,
          childId: null
        }
      }
      state = reducer(state, action);
      expect(state.canvasFocus.componentId).toEqual(2);
      expect(state.canvasFocus.childId).toEqual(null);
    })
  })

  // TEST 'UPDATE CSS'
  describe('UPDATE CSS reducer', () => {
    it('should add style to focused component', () => {
      const action: Action = {
        type: 'UPDATE CSS',
        payload: {
          style: {
            backgroundColor: 'gray'
          }
        }
      }
      state = reducer(state, action);
      const styledComp = state.components.find(comp => comp.id === state.canvasFocus.componentId);
      // expect the style property on targeted comp to equal style property in payload
      expect(styledComp.style.backgroundColor).toEqual(action.payload.style.backgroundColor);
    })
  })

  // TEST 'UPDATE PROJECT NAME'
  describe('UPDATE PROJECT NAME reducer', () => {
    it('should update project with specified name', () => {
      const action: Action = {
        type: 'UPDATE PROJECT NAME',
        payload: 'TESTNAME'
      }
      state = reducer(state, action);
      // expect state name to equal payload
      expect(state.name).toEqual(action.payload);
    })
  })

  // TEST 'CHANGE PROJECT TYPE'
  describe('CHANGE PROJECT TYPE reducer', () => {
    it('should change project type to specified type', () => {
      const action: Action = {
        type: 'CHANGE PROJECT TYPE',
        payload: {
          projectType: 'Classic React'
        }
      };
      state = reducer(state, action);
      expect(state.projectType).toEqual(action.payload.projectType);
    })
  })

  // TEST 'RESET STATE'
  describe('RESET STATE reducer', () => {
    it('should reset project to initial state', () => {
      const action: Action = {
        type: 'RESET STATE',
        payload: ''
      }
      state = reducer(state, action);
      // expect default project to have empty string as name
      expect(state.name).toEqual('TESTNAME');
      // expect default project to only have one component in components array
      expect(state.components.length).toEqual(1);
      // expect lone component to have no children :(
      expect(state.components[0].children.length).toEqual(0);
    })
  })

})
