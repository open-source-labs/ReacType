import { cloneDeep, updateState, updateArray, removeFromArray } from '../utils/index.util';
import { updateCurrentComponent, togglePanel, closeExpanded, handleTransform, changeFocusComponent, changeFocusChild, changeComponentFocusChild, exportFilesSuccess, exportFilesError, handleClose, addProp, deleteProp, updateHtmlAttr, updateChildrenSort } from '../utils/reducer.util';
import { getSize } from '../utils/htmlElements.util';
import { ApplicationState, ChildState } from '../types/types';
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
  nextComponentId: 0,
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
        totalComponents: state.totalComponents + 1,
        nextComponentId: state.nextComponentId + 1
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
      let { title, childType = '', HTMLInfo = {} } = action.payload;
      const strippedTitle = title;

      const htmlElement = childType !== 'COMP' ? childType : null;
      if (childType !== 'COMP') childType = 'HTML';

      //* view represents the curretn FOCUSED COMPONENT - this is the component where the child is being added to
      //* we only add childrent (or do any action) to the focused omconent
      const view = state.components.find(comp => comp.id === state.focusComponent.id);

      //* parentComponent is the component this child is generated from (ex. instance of Box has comp of Box)
      let parentComponent;

      //* conditional if adding an HTML component
      if (childType === 'COMP') {
        parentComponent = state.components.find((comp) => comp.title === title);
      }

      type htmlElemPosition = {
        width: number;
        height: number;
      }

      let htmlElemPosition: htmlElemPosition = { width: null, height: null };

      if (childType === 'HTML') {
        htmlElemPosition = getSize(htmlElement);
        //* if above function doesnt reutn anything, it means html element is not in our database
        if (!htmlElemPosition.width) {
          console.log(
            `Did not add html child: ${htmlElement} the GetSize function indicated that it isnt in our DB`
          );
          return;
        }
      }

      const newPosition = childType === 'COMP' ? {
        x: view.position.x + ((view.nextChildId * 16) % 150), //* new children are offset by some amount, map of 150px
        y: view.position.y + ((view.nextChildId * 16) % 150),
        width: parentComponent.position.width - 1, //* new children have an initial position of their CLASS (maybe don't need 90%)
        height: parentComponent.position.height - 1
      } : {
        x: view.position.x + view.nextChildId * 16,
        y: view.position.y + view.nextChildId * 16,
        width: htmlElemPosition.width,
        height: htmlElemPosition.height
      };

      const newChild = {
        childId: view.nextChildId,
        childSort: view.nextChildId,
        childType,
        childComponentId: childType === 'COMP' ? parentComponent.id : null, //* only relevant fot children of type COMPONENT
        componentName: strippedTitle,
        position: newPosition,
        color: null, //* parentComponent.color, // only relevant fot children of type COMPONENT
        htmlElement, //* only relevant fot children of type HTML
        HTMLInfo
      };

      const compsChildrenArr = [...view.children, newChild];

      const component = {
        ...view,
        children: compsChildrenArr,
        focusChildId: newChild.childId,
        nextChildId: view.nextChildId + 1
      };

      const components = [
        ...state.components.filter((comp) => {
          if (comp.title !== view.title) return comp;
        }),
        component
      ];

      return updateState(state, { 
        components,
        focusChild: newChild,
        focusComponent: component //* refresh the focus component so we have the new child
      });
    };
    case types.DELETE_CHILD: {
      const { parentId, childId } = action.payload;
      //* make a DEEP copy of the parent component (the one thats about to loose a child)
      const parentComponentCopy = cloneDeep(
        state.components.find((component) => component.id === parentId)
      );
      //* delete the  CHILD from the copied array
      const indexToDelete = parentComponentCopy.children.findIndex((elem: ChildState) => elem.childId === childId);

      if (indexToDelete < 0) return window.alert('No such child component found');

      parentComponentCopy.children.splice(indexToDelete, 1);
    
      // if deleted child is selected, reset it
      if (parentComponentCopy.focusChildId === childId) {
        parentComponentCopy.focusChildId = 0;
      }
    
      const modifiedComponentArray = [
        ...state.components.filter((component) => component.id !== parentId), // all elements besides the one just changed
        parentComponentCopy
      ];

      return updateState(state, {
        components: modifiedComponentArray,
        focusComponent: state.focusComponent,
        focusChild: parentComponentCopy.focusChildId === 0 && {}
      });
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
