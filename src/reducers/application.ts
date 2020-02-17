import { ApplicationState } from '../types/types';
import { cloneDeep, updateState, updateArray, removeFromArray } from '../utils/index.util';
import { updateCurrentComponent, deleteCurrentComponent } from '../utils/reducer.util';

import * as types from '../types/actionTypes';

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

const initialApplicationState: ApplicationState = {
  totalComponents: 0,
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
    case types.LOAD_INIT_DATA: {
      // ** Currently loading the data of the last session as the application first boots up
      return updateState (state, {
        ...action.payload.data,
        loading: false,
        appDir: '',
        successOpen: false,
        errorOpen: false,
      });
    }
    case types.ADD_COMPONENT: {
      // ** creating deep clone of the state component array
      const components = cloneDeep(state.components);
      components.push(action.payload.component); // pushing our new component to the array of components 
      // ** update state just creates a new object with the currentState and the newState
      return updateState(state, { 
        components, 
        totalComponents: state.totalComponents + 1 
      });
    }
    case types.UPDATE_COMPONENT: {
      // ** desctructuring the payload object and setting all of the values to be null initially. In our updateCuurentComponent callback in updateArray, I check to see which value was updated and check which values are still null.
      const { id, title = null, stateful = null, parentId = null, props = null} = action.payload;
      // ** updateArray helper function takes the array of components, id and a callback to update the array
      const updatedComponents = updateArray(state.components, id, updateCurrentComponent, {
        title,
        stateful,
        parentId, 
        props
      });
      return updateState(state, { components: updatedComponents });
    }
    case types.DELETE_COMPONENT: {
      // ** grabbing the id of the current component payload and using the id to remove the component from our component array
      const { id } = action.payload;
      // ** removeFromArray takes the array of components and an id and returns the new array without that particular component
      const updatedComponents = removeFromArray(state.components, id);
      return updateState(state, { 
        totalComponents: state.totalComponents - 1,
        components: updatedComponents 
      });
    }
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
