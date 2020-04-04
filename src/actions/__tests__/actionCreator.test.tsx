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

  it('changeTutorial returns a proper action', () => {
    const payld = 1;
    const expectedAction = {
      type: types.CHANGE_TUTORIAL,
      payload: { tutorial: payld }
    };
    expect(actions.changeTutorial(payld)).toEqual(expectedAction);
  });

  it('changeImagePath returns a proper action', () => {
    const payld = 'test/path';
    const expectedAction = {
      type: types.CHANGE_IMAGE_SOURCE,
      payload: { imageSource: payld }
    };
    expect(actions.changeImagePath(payld)).toEqual(expectedAction);
  });

  it('deleteChild returns a proper action', () => {
    const payld = {};
    const expectedAction = {
      type: types.DELETE_CHILD,
      payload: {}
    };
    expect(actions.deleteChild(payld)).toEqual(expectedAction);
  });

  it('changeComponentFocusChild returns a proper action', () => {
    const payld = { componentId: 1, childId: 2 };
    const expectedAction = {
      type: types.CHANGE_COMPONENT_FOCUS_CHILD,
      payload: payld
    };
    expect(actions.changeComponentFocusChild(payld)).toEqual(expectedAction);
  });

  it('changeFocusChild returns a proper action', () => {
    const payld = { childId: 2 };
    const expectedAction = {
      type: types.CHANGE_FOCUS_CHILD,
      payload: payld
    };
    expect(actions.changeFocusChild(payld)).toEqual(expectedAction);
  });

  it('changeFocusComponent returns a proper action', () => {
    const payld = { title: 'Test' };
    const expectedAction = {
      type: types.CHANGE_FOCUS_COMPONENT,
      payload: payld
    };
    expect(actions.changeFocusComponent(payld)).toEqual(expectedAction);
  });

  it('deleteAllData returns a proper action', () => {
    const expectedAction = {
      type: types.DELETE_ALL_DATA
    };
    expect(actions.deleteAllData()).toEqual(expectedAction);
  });

  it('deleteImage returns a proper action', () => {
    const expectedAction = {
      type: types.DELETE_IMAGE
    };
    expect(actions.deleteImage()).toEqual(expectedAction);
  });

  it('deleteProp returns a proper action', () => {
    const payld = 2;
    const expectedAction = {
      type: types.DELETE_PROP,
      payload: payld
    };
    expect(actions.deleteProp(payld)).toEqual(expectedAction);
  });

  it('editComponent returns a proper action', () => {
    const payld = { id: 1, title: 'Test' };
    const expectedAction = {
      type: types.EDIT_COMPONENT,
      payload: payld
    };
    expect(actions.editComponent(payld)).toEqual(expectedAction);
  });

  it('handleClose returns a proper action', () => {
    const expectedAction = {
      type: types.HANDLE_CLOSE,
      payload: false
    };
    expect(actions.handleClose()).toEqual(expectedAction);
  });

  it('handleTransform returns a proper action', () => {
    const payld = { x: 100, y: 200, width: 50, height: 75 };
    const componentId = 2;
    const childId = 3;
    const expectedAction = {
      type: types.HANDLE_TRANSFORM,
      payload: { componentId, childId, ...payld }
    };
    expect(actions.handleTransform(componentId, childId, payld)).toEqual(
      expectedAction
    );
  });

  it('redo returns a proper action', () => {
    const expectedAction = {
      type: types.REDO
    };
    expect(actions.redo()).toEqual(expectedAction);
  });

  it('toggleComponentState returns a proper action', () => {
    const payld = { id: 2 };
    const expectedAction = {
      type: types.TOGGLE_STATE,
      payload: payld
    };
    expect(actions.toggleComponentState(payld)).toEqual(expectedAction);
  });

  it('toggleComponentClass returns a proper action', () => {
    const payld = { id: 2 };
    const expectedAction = {
      type: types.TOGGLE_CLASS,
      payload: payld
    };
    expect(actions.toggleComponentClass(payld)).toEqual(expectedAction);
  });

  it('toggleEditMode returns a proper action', () => {
    const payld = { id: 2 };
    const expectedAction = {
      type: types.EDIT_MODE,
      payload: payld
    };
    expect(actions.toggleEditMode(payld)).toEqual(expectedAction);
  });
});
