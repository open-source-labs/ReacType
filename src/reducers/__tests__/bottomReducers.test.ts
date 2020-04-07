import * as reducers from '../bottomReducers';
import * as interfaces from '../../interfaces/Interfaces';
import * as types from '../../actionTypes/index';
import { initialApplicationState, testComponent } from '../initialState';

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
});
