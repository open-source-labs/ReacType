import * as reducers from '../leftReducers';
import cloneDeep from '../../helperFunctions/cloneDeep';
import * as interfaces from '../../interfaces/Interfaces';
import * as types from '../../actionTypes/index';
import { initialApplicationState, testComponent } from '../initialState';

describe('Left reducers', () => {
  let state: interfaces.ApplicationStateInt;

  // redefine the default state before each reducer test
  beforeEach(() => {
    state = initialApplicationState;
    state.components.push(testComponent);
  });

  describe('toggleComponentClass', () => {
    it('toggles the component passed in between class and functional', () => {
      const action = {
        type: 'TOGGLE_CLASS',
        payload: { id: 1 }
      };

      const newState = reducers.toggleComponentClass(state, action.payload);
      // type error below appears to be due to typing of the Components interface.. investigate later
      expect(newState.components[0].classBased).toEqual(
        !state.components[0].classBased
      );
    });
  });

  describe('toggleComponentState', () => {
    it('inverts the statefulness of component passed in', () => {
      const action = {
        type: 'TOGGLE_STATE',
        payload: { id: 1 }
      };

      const newState = reducers.toggleComponentState(state, action.payload);
      // type error below appears to be due to typing of the Components interface.. investigate later
      expect(newState.components[0].stateful).toEqual(
        !state.components[0].stateful
      );
    });
  });

  // toggleEditMode reducer allows changing of component names in left container
  describe('toggleEditMode reducer', () => {
    it('should return the same state if id === 1', () => {
      const action = {
        type: 'EDIT_MODE',
        payload: { id: 1 }
      };
      const newState = reducers.toggleEditMode(state, action.payload);
      expect(newState).toStrictEqual(state);
    });
    it('should return new state with updated editMode', () => {
      const action = {
        type: 'EDIT_MODE',
        payload: { id: 2 }
      };
      const newState = reducers.toggleEditMode(state, action.payload);
      expect(newState.editMode).toEqual(action.payload.id);
    });
  });

  // TEST CHANGE FOCUS COMPONENT: test component will add "look" for "test" after it's added
  describe('changeFocusComponent reducer', () => {
    it('should change the focus component title', () => {
      const action = {
        type: types.CHANGE_FOCUS_COMPONENT,
        payload: { title: 'TEST' }
      };
      const newState = reducers.changeFocusComponent(state, action.payload);
      // expecting new payload of "title" to the payload we just created
      expect(newState.focusComponent.title).toEqual(action.payload.title);
    });
  });

  // TEST IMAGE SOURCE CHANGE: image URL should be changed after local state is changed
  describe('changeImageSource reducer', () => {
    it('should change the change the image source', () => {
      const action = {
        type: types.CHANGE_IMAGE_SOURCE,
        payload: { imageSource: 'www.test.com/test.img' }
      };
      const newState = reducers.changeImageSource(state, action.payload);
      // expecting new payload of "title" to the payload we just created
      expect(newState.imageSource).toEqual(action.payload.imageSource);
    });
  });

  // TEST DELETE CHILD: test child should be deleted from local state components array
  // describe('deleteChild reducer', () => {
  //   it('should delete test component', () => {
  //     // CHANGE FOCUS COMPONENT FIRST
  //     // const action = {
  //     //   type: types.CHANGE_FOCUS_COMPONENT,
  //     //   payload: { title: 'TEST' }
  //     // };
  //     // const newState = reducers.changeFocusComponent(state, action.payload);
  //     const prevState = cloneDeep(state);
  //     console.log('this is prevState', prevState)
  //     const newState = reducers.deleteChild(state, {});
  //     // expecting new payload of "title" to the payload we just created
  //     expect(prevState.focusComponent.childrenArray).not.toEqual(
  //       newState.focusComponent.childrenArray
  //     );
  //   });
});

// NEXT TEST
