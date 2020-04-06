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
  //     //   const action = {
  //     //     type: types.CHANGE_IMAGE_SOURCE,
  //     //     payload: { imageSource: 'www.test.com/test.img' }
  //     //   };
  //     const model = {
  //       parentId = state.focusComponent.id,
  //       childId = state.focusChild.childId,
  //       calledFromDeleteComponent = false
  //     };
  //     const newState = reducers.deleteChild();
  //     // expecting new payload of "title" to the payload we just created
  //     expect(newState.imageSource).toEqual(action.payload.imageSource);
  //   });
  // });
  // NEXT TEST

  describe('editComponent', () => {
    it('should change the name of the component', () => {
      const test = {
        id: 19, //this id is established in the testComponent
        title: 'Edited'
      };
      const newState = reducers.editComponent(state, test);

      // find the updated component in the state returned above
      const newComp = newState.components.find(
        (component: any) => component.id === test.id
      );

      // check to see if the name was updated accurately
      expect(newComp.title).toEqual(test.title);
    });

    // it('should change the name of the component in all locations', () => {});

    it('should set editMode back to -1', () => {
      const test = {
        id: 19, //this id is established in the testComponent
        title: 'Edited'
      };
      const newState = reducers.editComponent(state, test);
      expect(newState.editMode).toEqual(-1);
    });
  });

  describe('exportFilesSuccess', () => {
    it('upon success, updates successOpen and appDir with correct values', () => {
      // the values from this object should be added into state upon error
      const test = {
        status: false,
        err: 'SUCCESS'
      };

      const newState = reducers.exportFilesError(state, test);
      expect(newState.errorOpen).toEqual(test.status);
      expect(newState.appDir).toEqual(test.err);
    });
  });

  describe('exportFilesError', () => {
    it('upon error, updates successOpen and appDir with correct values', () => {
      // the values from this object should be added into state upon error
      const test = {
        status: false,
        err: 'ERROR'
      };

      const newState = reducers.exportFilesError(state, test);
      expect(newState.errorOpen).toEqual(test.status);
      expect(newState.appDir).toEqual(test.err);
    });
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
