import * as types from '../constants/actionTypes';

export const darkModeToggle = () => ({
  type: types.DARK_MODE_TOGGLE
});

export const addContextActionCreator = contextName => ({
  type: types.ADD_CONTEXT,
  payload: contextName
});

export const addContextValuesActionCreator = newEntry => ({
  type: types.ADD_CONTEXT_VALUES,
  payload: newEntry
});
