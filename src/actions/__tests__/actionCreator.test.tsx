import * as actions from '../actionCreators';
import * as types from '../../actionTypes/index';

describe('Testing All of The Action Creators', () => {
  it('addComponent returns a proper action', () => {
    const payld = { title: 'Test' };
    const expectedAction = {
      type: types.ADD_COMPONENT,
      payload: payld
    };
    expect(actions.addComponent(payld)).toEqual(expectedAction);
  });

  it('addChild returns a proper action', () => {
    const payld = { title: 'Test', childType: 'COMP', HTMLInfo: {} };
    const expectedAction = {
      type: types.ADD_CHILD,
      payload: payld
    };
    expect(actions.addChild(payld)).toEqual(expectedAction);
  });

  it('addProp returns a proper action', () => {
    const payld = { key: 'Test', type: 'string' };
    const expectedAction = {
      type: types.ADD_PROP,
      payload: payld
    };
    expect(actions.addProp(payld)).toEqual(expectedAction);
  });
});
