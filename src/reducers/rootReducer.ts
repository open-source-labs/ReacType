import { initialApplicationState } from './initialState';
import { Action } from '../interfaces/Interfaces';
import {
  addChild,
  addComponent,
  changeFocusComponent,
  changeImageSource,
  deleteChild,
  deleteComponent,
  deleteImage,
  editComponent,
  exportFilesSuccess,
  exportFilesError,
  toggleComponentState,
  toggleComponentClass,
  toggleEditMode,
} from './leftReducers';
import {
  changeComponentFocusChild,
  changeFocusChild,
  changeTutorial,
  handleTransform,
  undo,
  redo,
} from './mainReducers';
import {
  handleClose,
  addProp,
  deleteProp,
  updateChildrenSort,
  updateHtmlAttr,
  updateCode,
} from './bottomReducers';
import {
  ADD_CHILD,
  ADD_COMPONENT,
  ADD_PROP,
  CHANGE_COMPONENT_FOCUS_CHILD,
  CHANGE_FOCUS_CHILD,
  CHANGE_FOCUS_COMPONENT,
  CHANGE_IMAGE_SOURCE,
  CHANGE_TUTORIAL,
  DELETE_ALL_DATA,
  DELETE_CHILD,
  DELETE_COMPONENT,
  DELETE_IMAGE,
  DELETE_PROP,
  EDIT_COMPONENT,
  EDIT_MODE,
  EXPORT_FILES,
  EXPORT_FILES_ERROR,
  EXPORT_FILES_SUCCESS,
  HANDLE_CLOSE,
  HANDLE_TRANSFORM,
  LOAD_INIT_DATA,
  REDO,
  TOGGLE_CLASS,
  TOGGLE_STATE,
  UNDO,
  UPDATE_CODE,
  UPDATE_CHILDREN_SORT,
  UPDATE_HTML_ATTR,
} from '../actionTypes/index';

const componentReducer = (state = initialApplicationState, action: Action) => {
  switch (action.type) {
    case LOAD_INIT_DATA:
      return {
        ...state,
        ...action.payload.data,
        loading: false,
        appDir: '',
        successOpen: false,
        errorOpen: false,
      };
    case ADD_COMPONENT:
      return addComponent(state, action.payload);
    case ADD_PROP:
      return addProp(state, action.payload);
    case ADD_CHILD:
      return addChild(state, action.payload);
    case DELETE_CHILD:
      return deleteChild(state, action.payload);
    case DELETE_COMPONENT:
      return deleteComponent(state, action.payload);
    case EDIT_COMPONENT:
      return editComponent(state, action.payload);
    case TOGGLE_STATE:
      return toggleComponentState(state, action.payload);
    case TOGGLE_CLASS:
      return toggleComponentClass(state, action.payload);
    case CHANGE_FOCUS_COMPONENT:
      return changeFocusComponent(state, action.payload);
    case CHANGE_FOCUS_CHILD:
      return changeFocusChild(state, action.payload);
    case CHANGE_COMPONENT_FOCUS_CHILD:
      return changeComponentFocusChild(state, action.payload);
    case CHANGE_IMAGE_SOURCE:
      return changeImageSource(state, action.payload);
    case CHANGE_TUTORIAL:
      return changeTutorial(state, action.payload);
    case DELETE_ALL_DATA:
      return {
        ...initialApplicationState,
        focusComponent: { ...appComponent, changed: true },
      };
    case DELETE_IMAGE:
      return deleteImage(state);
    case EXPORT_FILES:
      return { ...state, loading: true };
    case EXPORT_FILES_SUCCESS:
      return exportFilesSuccess(state, action.payload);
    case EXPORT_FILES_ERROR:
      return exportFilesError(state, action.payload);
    case HANDLE_CLOSE:
      return handleClose(state, action.payload);
    case HANDLE_TRANSFORM:
      return handleTransform(state, action.payload);
    case DELETE_PROP:
      return deleteProp(state, action.payload);
    case EDIT_MODE:
      return toggleEditMode(state, action.payload);
    case UPDATE_HTML_ATTR:
      return updateHtmlAttr(state, action.payload);
    case UPDATE_CHILDREN_SORT:
      return updateChildrenSort(state, action.payload);
    case UNDO:
      return undo(state);
    case REDO:
      return redo(state);
    case UPDATE_CODE:
      return updateCode(state, action.payload);
    default:
      return state;
  }
};

export default componentReducer;
