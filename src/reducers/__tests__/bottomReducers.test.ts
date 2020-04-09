import * as reducers from '../bottomReducers';
import * as interfaces from '../../interfaces/Interfaces';
import * as types from '../../actionTypes/index';
import { initialApplicationState, testComponent } from '../initialState';
//tests
describe('Testing bottom reducer:', () => {
  let state: interfaces.ApplicationStateInt;
  // redefine the default state before each reducer test
  beforeEach(() => {
    state = initialApplicationState;
    state.components.push(testComponent);
  });

  describe('addProp', () => {
    it('Properly adds prop to a focus component', () => {
      const payload = { key: 'test', type: 'string' };
      const newState = reducers.addProp(state, payload);
      let expectedProp = {
        id: state.focusComponent.nextPropId,
        key: 'test',
        type: 'string'
      };
      const newAppComp = newState.components.find(
        (comp: interfaces.ComponentInt) => comp.id === 1
      );

      expect(newState.focusComponent.props[0]).toEqual(expectedProp);
      expect(newAppComp.props[0]).toEqual(expectedProp);
    });
  });

  describe('deleteProp', () => {
    it('Properly deletes a prop for a focus component', () => {
      const payload = { key: 'test', type: 'string' };
      let newState = reducers.addProp(state, payload);

      const propId = state.focusComponent.nextPropId;
      newState = reducers.deleteProp(newState, propId);

      expect(newState.focusComponent.props.length).toEqual(0);
    });
  });

  describe('toggleCodeEdit', () => {
    it('Properly switches the app into "Code Edit" mode', () => {
      const newState = reducers.toggleCodeEdit(state);
      expect(newState.codeReadOnly).toEqual(false);
    });
  });

  describe('toggelNative', () => {
    let newState: any;
    it('Properly switches the app into "Native" mode', () => {
      window.confirm = jest.fn(() => true);

      newState = reducers.toggleNative(state);

      //check that it doesn't mutate original state
      expect(newState).not.toBe(state);
      //check if the native toggle switched
      expect(newState.native).toEqual(true);

      //expect window confirm message to run
      expect(window.confirm).toBeCalled();

      //check proper width and height
      expect(newState.focusComponent.position.width).toEqual(500);
      expect(newState.focusComponent.position.height).toEqual(850);

      //check if it has been marked as changed
      expect(newState.focusComponent.changed).toEqual(true);

      //check if it has been updated in components array
      const appInComps = newState.components.find(
        (e: interfaces.ComponentInt) => e.id === 1
      );

      //check proper width and height
      expect(appInComps.position.width).toEqual(500);
      expect(appInComps.position.height).toEqual(850);

      //check if it has been marked as changed
      expect(appInComps.changed).toEqual(true);
    });

    it('Properly switches the app back into "React" mode', () => {
      window.confirm = jest.fn(() => true);

      newState = reducers.toggleNative(newState);

      //check if the native toggle switched
      expect(newState.native).toEqual(false);

      //expect window confirm message to run
      expect(window.confirm).toBeCalled();

      //check proper width and height
      expect(newState.focusComponent.position.width).toEqual(1200);
      expect(newState.focusComponent.position.height).toEqual(800);

      //check if it has been marked as changed
      expect(newState.focusComponent.changed).toEqual(true);

      //check if it has been updated in components array
      const appInComps = newState.components.find(
        (e: interfaces.ComponentInt) => e.id === 1
      );

      //check proper width and height
      expect(appInComps.position.width).toEqual(1200);
      expect(appInComps.position.height).toEqual(800);

      //check if it has been marked as changed
      expect(appInComps.changed).toEqual(true);
    });

    it('Handles user choosing not to proceed when prompted', () => {
      window.confirm = jest.fn(() => false);

      newState = reducers.toggleNative(newState);

      //expect window confirm message to run
      expect(window.confirm).toBeCalled();
    });
  });

  describe('updateCode', () => {
    it(' Properly updates the code of a given component', () => {
      const payload = { componentId: 1, code: 'testing code' };
      const newState = reducers.updateCode(state, payload);
      //check if it has been marked as changed
      expect(newState.focusComponent.changed).toEqual(false);

      //check if it has been updated in components array
      const appInComps = newState.components.find(
        (e: interfaces.ComponentInt) => e.id === 1
      );

      //check proper width and height
      expect(appInComps.code).toEqual(payload.code);
      expect(appInComps.changed).toEqual(false);

      //doesn't mutate the state
      expect(newState).not.toBe(state);
    });
  });
});
