import { ApplicationState } from '../types/types';
import { cloneDeep, updateState, updateArray, removeFromArray } from '../utils/index.util';
import { updateCurrentComponent, togglePanel, closeExpanded, addChild, deleteChild, handleTransform, changeFocusComponent, changeFocusChild, changeComponentFocusChild, exportFilesSuccess, exportFilesError, handleClose, addProp, deleteProp, updateHtmlAttr, updateChildrenSort } from '../utils/reducer.util';

import * as types from '../types/actionTypes';

const initialApplicationState: ApplicationState = {
  imageSource: '',
  totalComponents: 0,
  successOpen: false,
  errorOpen: false,
  focusComponent: {},
  selectableChildren: [],
  ancestors: [],
  components: [],
  applicationFocusChild: {},
  focusChild: {}, // cloneDeep(applicationFocusChild)
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
    case types.TOGGLE_EXPANSION_PANEL: {
      const { id } = action.payload;
      // ** removeFromArray takes the array of components and an id and returns the new array without that particular component
      const components = cloneDeep(state.components);
      // ** sets each component expanded value to false. Takes an option id parameter which excludes that specific component from being set to false
      closeExpanded(components, id); 
      // ** updateArray takes an array of components, id, and a callback
      const updatedComponents = updateArray(components, id, togglePanel);
      // ** grabbing the currentComponent to set as the focusComponent when expanded
      const currentComponent = updatedComponents.find((component) => component.id === id);
      return updateState(state, { 
        components: updatedComponents,
        focusComponent: currentComponent.expanded ? currentComponent : {}, 
      });
    }
    case types.CHANGE_IMAGE_SOURCE: {
      return updateState(state, { imageSource: action.payload.imageSource });
    }
    case types.ADD_COMPONENT: {
      const { component } = action.payload;
      // ** creating deep clone of the state component array
      const components = cloneDeep(state.components);
      closeExpanded(components); // sets each component expanded value to false
      components.push(component); // pushing our new component to the array of components 
      // ** update state just creates a new object with the currentState and the newState
      return updateState(state, { 
        focusComponent: component,
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
      // ** set a new focus component after the component has been deleted. Conditionally assigned variable based on if the length of the updatedComponents array.
      const focusComponent = updatedComponents.length ? updatedComponents[updatedComponents.length - 1] : {};
      return updateState(state, { 
        totalComponents: state.totalComponents - 1,
        components: updatedComponents ,
        focusComponent
      });
    }
    case types.ADD_CHILD: {
      return addChild(state, action.payload);
    };
    case types.DELETE_CHILD: {
      return deleteChild(state, action.payload);
    };
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
