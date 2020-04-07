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
      state.components.push(testComponent);
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
  describe('deleteChild reducer', () => {
    it('should delete test component', () => {
      // grab initial copy of current state
      const prevState = cloneDeep(state);
      // push into it the test component
      prevState.focusComponent.childrenArray.push(testComponent);

      //take new state and delete from it the testComponent
      const newState = reducers.deleteChild(state, {});

      // expecting previous state not to equal new state after deletion of test component
      expect(prevState.focusComponent.childrenArray).not.toEqual(
        newState.focusComponent.childrenArray
      );
    });
  });
  // TEST ADD COMPONENT: adds component to the global state components array
  describe('addComponent reducer', () => {
    it('return the state as it was if an empty title', () => {
      const action = {
        type: types.ADD_COMPONENT,
        payload: { title: '' }
      };
      // grab initial copy of current state
      const prevState = cloneDeep(state);

      //take new state and add testComponent
      const newState = reducers.addComponent(state, action.payload);
      // expecting previous state not to equal new state after deletion of test component
      expect(prevState.components[2]).toEqual(newState.components[2]);
    });

    it('should add test component', () => {
      const action = {
        type: types.ADD_COMPONENT,
        payload: { title: 'TESTCOMPONENT' }
      };
      // grab initial copy of current state
      const prevState = cloneDeep(state);

      //take new state and add testComponent
      const newState = reducers.addComponent(prevState, action.payload);

      // expecting previous state not to equal new state after deletion of test component
      expect(prevState.components[2]).not.toEqual(newState.components[2]);
    });
  });
  // TEST ADD CHILD: adds child to the focus component's childrenArray
  describe('addChild reducer', () => {
    it('return focus component childrenarray with test react component', () => {
      const actionReact = {
        type: types.ADD_CHILD,
        payload: {
          title: 'TestREACTComponent',
          childType: 'COMP'
        }
      };

      state = reducers.addComponent(state, { title: 'TestREACTComponent' });
      const newState = reducers.addChild(state, actionReact.payload);

      expect(state.focusComponent.childrenArray).not.toEqual(
        newState.focusComponent.childrenArray
      );
    });

    it('return focus component childrenarray with test HTML component', () => {
      const actionHTML = {
        type: types.ADD_CHILD,
        payload: {
          title: 'TestHTMLComponent',
          childType: 'HTML'
        }
      };

      state = reducers.addComponent(state, { title: 'TestHTMLComponent' });
      const newState = reducers.addChild(state, actionHTML.payload);

      expect(state.focusComponent.childrenArray).not.toEqual(
        newState.focusComponent.childrenArray
      );
    });
  });
});
