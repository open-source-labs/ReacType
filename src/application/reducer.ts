import { ApplicationStateInt } from '../types/types';
import { cloneDeep, updateState, updateArray, updateCurrentComponent } from '../utils/index.util';

import * as types from '../types/actionTypes';
import { Component } from 'react';

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
  totalComponents: 0,
  // imagePath: '',
  successOpen: false,
  errorOpen: false,
  focusComponent: {},
  selectableChildren: [],
  ancestors: [],
  components: [],
  initialApplicationFocusChild,
  focusChild: cloneDeep(initialApplicationFocusChild),
  appDir: '',
  loading: false,
};

const applicationReducer = (state = initialApplicationState, action: any) => {
  switch (action.type) {
    case types.LOAD_INIT_DATA:
      // ** Currently loading the data of the last session as the application first boots up
      return updateState (state, {
        ...action.payload.data,
        loading: false,
        appDir: '',
        successOpen: false,
        errorOpen: false,
      });
    case types.ADD_COMPONENT:
      // ** creating deep clone of the state component array
      const components = cloneDeep(state.components);
      components.push(action.payload.component); // pushing our new component to the array of components 
      return updateState(state, { 
        components, 
        totalComponents: state.totalComponents + 1 
      });
    case types.UPDATE_COMPONENT:
      // ** desctructuring the payload object and setting all of the values to be null initially. In our updateCuurentComponent callback in updateArray, I check to see which value was updated and check which values are still null.
      const { id, title = null, stateful = null, parentId = null, props = null} = action.payload;
      const updatedComponents = updateArray(state.components, id, updateCurrentComponent, {
        title,
        stateful,
        parentId, 
        props
      });
      return updateState(state, { components: updatedComponents });
    // case types.DELETE_COMPONENT:
    //   return deleteComponent(state, action.payload);
    // case types.CHANGE_FOCUS_COMPONENT:
    //   return changeFocusComponent(state, action.payload);
    // case types.CHANGE_FOCUS_CHILD:
    //   return changeFocusChild(state, action.payload);
    // case types.CHANGE_COMPONENT_FOCUS_CHILD:
    //   return changeComponentFocusChild(state, action.payload);
    // case types.CREATE_APPLICATION:
    // case types.EXPORT_FILES:
    //   return { ...state, loading: true };
    // case types.EXPORT_FILES_SUCCESS:
    //   return exportFilesSuccess(state, action.payload);
    // case types.CREATE_APPLICATION_ERROR:
    // case types.EXPORT_FILES_ERROR:
    //   return exportFilesError(state, action.payload);
    // case types.HANDLE_CLOSE:
    //   return handleClose(state, action.payload);
    // case types.HANDLE_TRANSFORM:
    //   return handleTransform(state, action.payload);
    // case types.OPEN_EXPANSION_PANEL:
    //   return openExpansionPanel(state, action.payload);
    // case types.DELETE_ALL_DATA:
    //   return initialApplicationState;
    // case types.ADD_PROP:
    //   return addProp(state, action.payload);
    // case types.DELETE_PROP:
    //   return deleteProp(state, action.payload);
    // case types.UPDATE_HTML_ATTR:
    //   return updateHtmlAttr(state, action.payload);
    // case types.UPDATE_CHILDREN_SORT:
    //   return updateChildrenSort(state, action.payload);
    default:
      return state;
  }
};

export default applicationReducer;
