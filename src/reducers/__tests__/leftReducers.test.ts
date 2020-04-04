import * as reducers from '../leftReducers';
import { initialApplicationState } from '../initialState';

describe('Left reducers', () => {
  let state: any;

  // redefine the default state before each reducer test
  beforeEach(() => {
    state = initialApplicationState;
    // state = {
    //   editMode: -1,
    //   testing: 'testingReducer',
    //   codeReadOnly: true,
    //   components: [
    //     {
    //       changed: true,
    //       childrenArray: [{}],
    //       classBased: false,
    //       code: '....',
    //       color: '#FF6D00',
    //       focusChild: {},
    //       focusChildId: -1,
    //       id: 1,
    //       nextChildId: 3,
    //       nextPropId: 2,
    //       position: {
    //         height: 850,
    //         width: 500,
    //         x: 70,
    //         y: 100
    //       },
    //       props: [],
    //       stateful: false,
    //       title: 'App'
    //     }
    //   ]
    // };
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
});
