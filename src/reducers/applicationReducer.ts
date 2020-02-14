import { ComponentInt, ChildInt, ApplicationStateInt } from '../utils/interfaces.ts';

import * as types from '../actionTypes/application';

import {
  addComponent,
  addChild,
  deleteChild,
  deleteComponent,
  changeFocusComponent,
  changeComponentFocusChild,
  changeFocusChild,
  exportFilesSuccess,
  exportFilesError,
  handleClose,
  handleTransform,
  openExpansionPanel,
  addProp,
  deleteProp,
  updateHtmlAttr,
  updateChildrenSort,
} from '../utils/componentReducer.util.ts';
import cloneDeep from '../utils/cloneDeep.ts';

const appComponent: ComponentInt = {
  id: 1,
  stateful: false,
  title: 'App',
  color: '#FF6D00',
  props: [],
  nextPropId: 1,
  position: {
    x: 25,
    y: 25,
    width: 600,
    height: 400,
  },
  childrenArray: [],
  nextChildId: 1,
  focusChildId: 0,
};

const initialApplicationFocusChild: ChildInt = {
  childId: 0,
  componentName: null,
  position: {
    x: 25,
    y: 25,
    width: 800,
    height: 550,
  },
  childType: null,
  childSort: 0,
  childComponentId: 0,
  color: null,
  htmlElement: null,
  HTMLInfo: null,
};

const initialApplicationState: ApplicationStateInt = {
  totalComponents: 1,
  nextId: 2,
  successOpen: false,
  errorOpen: false,
  focusComponent: appComponent,
  selectableChildren: [],
  ancestors: [],
  initialApplicationFocusChild,
  focusChild: cloneDeep(initialApplicationFocusChild),
  components: [appComponent],
  appDir: '',
  loading: false,
};

const applicationReducer = (state = initialApplicationState, action: any) => {
  switch (action.type) {
    case types.LOAD_INIT_DATA:
      return {
        ...state,
        ...action.payload.data,
        loading: false,
        appDir: '',
        successOpen: false,
        errorOpen: false,
      };
    case types.ADD_COMPONENT:
      return addComponent(state, action.payload);
    case types.ADD_CHILD:
      return addChild(state, action.payload);
    case types.DELETE_CHILD:
      return deleteChild(state, action.payload);
    case types.DELETE_COMPONENT:
      return deleteComponent(state, action.payload);
    case types.CHANGE_FOCUS_COMPONENT:
      return changeFocusComponent(state, action.payload);
    case types.CHANGE_FOCUS_CHILD:
      return changeFocusChild(state, action.payload);
    case types.CHANGE_COMPONENT_FOCUS_CHILD:
      return changeComponentFocusChild(state, action.payload);
    case types.CREATE_APPLICATION:
    case types.EXPORT_FILES:
      return { ...state, loading: true };
    case types.EXPORT_FILES_SUCCESS:
      return exportFilesSuccess(state, action.payload);
    case types.CREATE_APPLICATION_ERROR:
    case types.EXPORT_FILES_ERROR:
      return exportFilesError(state, action.payload);
    case types.HANDLE_CLOSE:
      return handleClose(state, action.payload);
    case types.HANDLE_TRANSFORM:
      return handleTransform(state, action.payload);
    case types.OPEN_EXPANSION_PANEL:
      return openExpansionPanel(state, action.payload);
    case types.DELETE_ALL_DATA:
      return initialApplicationState;
    case types.ADD_PROP:
      return addProp(state, action.payload);
    case types.DELETE_PROP:
      return deleteProp(state, action.payload);
    case types.UPDATE_HTML_ATTR:
      return updateHtmlAttr(state, action.payload);
    case types.UPDATE_CHILDREN_SORT:
      return updateChildrenSort(state, action.payload);
    default:
      return state;
  }
};

export default applicationReducer;
