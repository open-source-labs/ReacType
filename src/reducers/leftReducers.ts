import cloneDeep from '../helperFunctions/cloneDeep';
import getColor from '../helperFunctions/colors';
import getSelectable from '../helperFunctions/getSelectable';
import {
  ComponentInt,
  ApplicationStateInt,
  ChildInt
} from '../interfaces/Interfaces';
import { initialComponentState, nativeComponentTypes } from './initialState';
import { createHistory } from '../helperFunctions/createHistory';
import { getSize } from '../utils/htmlElements.util';
import { generateNewCode } from '../helperFunctions/generateNewCode';

export const addChild = (
  state: ApplicationStateInt,
  {
    title,
    childType = '',
    HTMLInfo = {},
    native
  }: {
    title: string;
    childType: string;
    HTMLInfo: { [index: string]: string };
    native: boolean;
  }
) => {
  const strippedTitle = title;

  //is this warning even possible to trigger witht he current flow?
  if (!childType) {
    window.alert('addChild Error! no type specified');
  }

  const htmlElement = childType !== 'COMP' ? childType : null;

  // if childType is NOT included in the array of NATIVE React types && also not coming from left panel then the childType will revert to HTML
  !nativeComponentTypes.includes(childType) && childType !== 'COMP'
    ? (childType = 'HTML')
    : (childType = 'NATIVE');

  // view represents the curretn FOCUSED COMPONENT - this is the component where the child is being added to
  // we only add childrent (or do any action) to the focused omconent
  const view: ComponentInt = state.components.find(
    (comp: ComponentInt) => comp.title === state.focusComponent.title
  );

  // parentComponent is the component this child is generated from (ex. instance of Box has comp of Box)
  let parentComponent: ComponentInt;

  // conditional if adding an HTML component
  if (childType === 'COMP') {
    parentComponent = state.components.find(
      (comp: ComponentInt) => comp.title === title
    );
  }

  let check: boolean;
  if (!state.codeReadOnly) {
    if (childType === 'COMP') {
      check = window.confirm(
        `Are you sure you want to add ${strippedTitle} as a child to ${parentComponent.title} while the program is in "Edit Mode"? \n\nAll of the changes to the "Code Preview" for the ${parentComponent.title} component will be overridden!`
      );
    } else {
      check = window.confirm(
        `Are you sure you want to add an HTML element to ${view.title} component while the program is in "Edit Mode"? \n\nAll of the changes to the "Code Preview" for the ${view.title} component will be overridden!`
      );
    }
    if (!check) {
      return {
        ...state
      };
    }
  }
  interface htmlElemPositionInt {
    width: number;
    height: number;
  }

  let htmlElemPosition: htmlElemPositionInt = { width: null, height: null };
  if (childType === 'HTML') {
    htmlElemPosition = getSize(htmlElement);
    // if above function doesnt reutn anything, it means html element is not in our database
    //looks like the group that originally worked on this app planend to have a back end that accessed a DB with element types.
    //I don't think this error does anything anymore either.
    if (!htmlElemPosition.width) {
      console.log(
        `Did not add html child: ${htmlElement} the GetSize function indicated that it isnt in our DB`
      );
      return;
    }
  }
  //intersting how they decided to offset the next child to be placed on the stage by multiplying
  //the next child ID by 16. I mean I guess it makes sense.
  const newPosition =
    childType === 'COMP'
      ? {
          x: view.position.x + ((view.nextChildId * 16) % 150), // new children are offset by some amount, map of 150px
          y: view.position.y + ((view.nextChildId * 16) % 150),
          width: parentComponent.position.width - 1, // new children have an initial position of their CLASS (maybe don't need 90%)
          height: parentComponent.position.height - 1
        }
      : {
          x: view.position.x + view.nextChildId * 16,
          y: view.position.y + view.nextChildId * 16,
          width: htmlElemPosition.width,
          height: htmlElemPosition.height
        };

  const newChild: ChildInt = {
    childId: view.nextChildId,
    childSort: view.nextChildId,
    childType,
    childComponentId: childType === 'COMP' ? parentComponent.id : null, // only relevant fot children of type COMPONENT
    componentName: strippedTitle,
    position: newPosition,
    color: null, // parentComponent.color, // only relevant fot children of type COMPONENT
    htmlElement, // only relevant fot children of type HTML
    HTMLInfo
  };

  const compsChildrenArr = [...view.childrenArray, newChild];

  //values to put into the focus component so it is updated along with the components array
  const component = {
    ...view,
    childrenArray: compsChildrenArr,
    focusChildId: newChild.childId,
    nextChildId: view.nextChildId + 1,
    changed: true
  };

  const components = [
    component,
    ...state.components.filter((comp: ComponentInt) => {
      if (comp.title !== view.title) return comp;
    })
  ];
  const { history, historyIndex, future } = createHistory(state);
  return {
    ...state,
    components,
    focusChild: newChild,
    focusComponent: component, // refresh the focus component so we have the new child
    history,
    historyIndex,
    future,
    codeReadOnly: true
  };
};

export const addComponent = (
  state: ApplicationStateInt,
  { title }: { title: string }
) => {
  // remove whitespace and digits, capitalize first char
  const strippedTitle = title
    .replace(/[a-z]+/gi, word => word[0].toUpperCase() + word.slice(1))
    .replace(/[-_\s0-9\W]+/gi, '');

  // duplicate component names not allowed
  if (
    state.components.find((comp: ComponentInt) => comp.title === strippedTitle)
  ) {
    window.alert(
      `A component with the name: "${strippedTitle}" already exists.\n Please think of another name.`
    );
    return {
      ...state
    };
  }

  // empty component name not allowed
  if (strippedTitle === '') {
    return {
      ...state
    };
  }

  //chooses a color for the component from the random color generator
  let componentColor = getColor();
  //Makes sure no two consecutive components have the same color
  const lastComponent = state.components.reduce((acc, curr) =>
    curr.id > acc.id ? curr : acc
  ).color;
  while (componentColor === lastComponent) {
    componentColor = getColor();
  }

  //assigns the componentID to whatever is supposed to be next
  const componentId = state.nextId;

  //creates a newcomponent and prepares it to be added to an array of components in the store
  const newComponent: ComponentInt = {
    ...initialComponentState,
    title: strippedTitle,
    id: componentId,
    color: componentColor,
    childrenArray: []
  };

  const components = [...state.components, newComponent];

  //increments both total components and the nextID
  const totalComponents = state.totalComponents + 1;
  const nextId = state.nextId + 1;

  //creates an array of component IDs that can be added as children to this newly created component.
  //the newly created component and the App component are never selectable.
  const selectableChildren = state.components
    .map((comp: ComponentInt) => comp.id)
    .filter((id: number) => id !== newComponent.id);

  const ancestors: number[] = [];

  // reset focused child to null values so when focused component is assigned to the newly created component,
  //child from previously focused component doesn;t show up
  const newFocusChild = cloneDeep(state.initialApplicationFocusChild);

  const { history, historyIndex, future } = createHistory(state);

  //generate initial code for the new component
  const code = generateNewCode(newComponent, components);
  newComponent.code = code;

  return {
    ...state,
    totalComponents,
    nextId,
    components,
    focusComponent: newComponent,
    focusChild: newFocusChild,
    ancestors,
    selectableChildren, // new component so everyone except yourself is available
    history,
    historyIndex,
    future
  };
};

export const changeFocusComponent = (
  state: ApplicationStateInt,
  { title = state.focusComponent.title }: { title: string }
) => {
  /** ****************
   * if the prm TITLE is a blank Object it means REFRESH focusd Components.
   * sometimes we update state  like adding Children/Props etc and we want those changes to be reflected in focus component
   ************************************************* */
  const newFocusComp: ComponentInt = state.components.find(
    (comp: ComponentInt) => comp.title === title
  );

  // set the "focus child" to the focus child of this particular component .

  let newFocusChild: ChildInt | any; // check if the components has a child saved as a Focus child
  if (newFocusComp.focusChildId > 0) {
    newFocusChild = newFocusComp.childrenArray.find(
      (child: ChildInt) => child.childId === newFocusComp.focusChildId
    );
  }

  if (!newFocusChild) {
    newFocusChild = cloneDeep(state.initialApplicationFocusChild);
  }

  const result = getSelectable(newFocusComp, state.components);

  return {
    ...state,
    editMode: -1,
    focusComponent: newFocusComp,
    selectableChildren: result.selectableChildren,
    ancestors: result.ancestors,
    focusChild: newFocusChild
  };
};

//change image source
export const changeImageSource = (
  state: ApplicationStateInt,
  { imageSource }: { imageSource: string }
) => {
  const { history, historyIndex, future } = createHistory(state);

  return {
    ...state,
    imageSource,
    history,
    historyIndex,
    future
  };
};

export const deleteChild = (
  state: ApplicationStateInt,
  {
    parentId = state.focusComponent.id,
    childId = state.focusChild.childId,
    calledFromDeleteComponent = false
  }
) => {
  /** ************************************************
    if no parameters are provided we default to delete the FOCUSED CHILD of the FOCUSED COMPONENTS
    however when deleting  component we wnt to delete ALL the places where it's used, so we call this function
    Also when calling from DELETE components , we do not touch focusComponent.
   ************************************************************************************ */
  if (!parentId) {
    window.alert('Cannot delete root child of a component');
    return state;
  }
  if (!childId) {
    window.alert('No child selected');
    return state;
  }
  if (!calledFromDeleteComponent && childId === -1) {
    window.alert('Cannot delete root child of a component');
    return state;
  }
  // make a DEEP copy of the parent component (the one thats about to loose a child)
  const parentComponentCopy: any = cloneDeep(
    state.components.find((comp: ComponentInt) => comp.id === parentId)
  );

  // delete the CHILD from the copied array
  const indexToDelete = parentComponentCopy.childrenArray.findIndex(
    (elem: ChildInt) => elem.childId === childId
  );
  if (!state.codeReadOnly) {
    const check = window.confirm(
      `Are you sure you want to delete ${parentComponentCopy.childrenArray[indexToDelete].componentName} as a child to ${parentComponentCopy.title} while the program is in "Edit Mode"? \n\nAll of the changes to the "Code Preview" for the ${parentComponentCopy.title} component will be overridden!`
    );
    if (!check) {
      return {
        ...state
      };
    }
  }
  if (indexToDelete < 0) {
    return window.alert('No such child component found');
  }
  parentComponentCopy.childrenArray.splice(indexToDelete, 1);

  // if deleted child is selected, reset it
  if (parentComponentCopy.focusChildId === childId) {
    parentComponentCopy.focusChildId = 0;
  }

  //mark that the parent component changed
  parentComponentCopy.changed = true;

  const modifiedComponentArray = [
    ...state.components.filter((comp: ComponentInt) => comp.id !== parentId), // all elements besides the one just changed
    parentComponentCopy
  ];

  const { history, historyIndex, future } = createHistory(state);

  return {
    ...state,
    components: modifiedComponentArray,
    focusComponent: calledFromDeleteComponent
      ? state.focusComponent
      : parentComponentCopy, // when called from delete component we dont need want to touch the focus
    focusChild: calledFromDeleteComponent
      ? cloneDeep(state.initialApplicationFocusChild)
      : parentComponentCopy.childrenArray[
          parentComponentCopy.childrenArray.length - 1
        ] || cloneDeep(state.initialApplicationFocusChild), // guard in case final child is deleted
    history,
    historyIndex,
    future,
    codeReadOnly: true
  };
};

//Reducer that deletes the component selected
export const deleteComponent = (
  state: ApplicationStateInt,
  { componentId }: { componentId: number }
) => {
  //select the component from list of components
  const compName = state.components.filter(
    (value: ComponentInt) => value.id === componentId
  );

  //if the program is in the edit mode
  if (!state.codeReadOnly) {
    const check = window.confirm(
      `Are you sure you want to delete ${compName[0].title} while the program is in the "Edit Mode"? \n\nAll of the changes to the "Code Preview" for the related components will be overridden!`
    );
    if (!check) {
      return {
        ...state,
        focusComponent: compName[0]
      };
    }
  } else {
    //confirmation window to see if user really wants to delete component
    const result = window.confirm(
      `Are you sure you want to delete ${compName[0].title}?\n\nAll of the changes to the "Code Preview" for the related components will be overridden!`
    );
    if (!result) {
      return {
        ...state,
        focusComponent: compName[0]
      };
    }
  }
  //if cancelled, return focus to current selected component
  //if app is selected, return state
  //is this really necessary if the App component is disabled from being deleted? -Tony
  if (componentId === 1) {
    return {
      ...state
    };
  }

  //finds index of component to delete
  const indexToDelete = state.components.findIndex(
    (comp: ComponentInt) => comp.id == componentId
  );

  //creates a deep copy of the components
  const componentsCopy = cloneDeep(state.components);
  //splices one element from copy of components at selected index
  componentsCopy.splice(indexToDelete, 1);
  //decrease number of components by one
  const totalComponents = state.totalComponents - 1;

  const { history, historyIndex, future } = createHistory(state);

  return {
    ...state,
    totalComponents,
    components: componentsCopy,
    history,
    historyIndex,
    future,
    codeReadOnly: true
  };
};

//Simple function that changes the imageSource in the global state.
//Should be refactored to also store image data not just source,
//since currently HTML image lives in a local state of AppContainer ( a big no-no)
//and if a user clicks on 'clear workspace', the button doesn't reset
export const deleteImage = (state: ApplicationStateInt) => {
  const { history, historyIndex, future } = createHistory(state);
  return {
    ...state,
    imageSource: '',
    history,
    historyIndex,
    future
  };
};

/*For the function below, it first changes the title of the component being edited to the new name.
Then, it checks for each child component that exists and make sure the names of those child components 
are changed as well. Otherwise, the code will break because when you focus on a component with the changed component
as a child. */
export const editComponent = (
  state: ApplicationStateInt,
  { id, title }: { id: number; title: string }
) => {
  let components = cloneDeep(state.components);
  let toEdit = components.find((element: ComponentInt) => element.id === id);
  toEdit.title = title;
  for (const [index, each] of components.entries()) {
    for (const value of each.childrenArray) {
      if (value.childComponentId === id) {
        value.componentName = title;
      }
    }
  }

  return {
    ...state,
    focusChild: state.initialApplicationFocusChild,
    editMode: -1,
    components
  };
};

export const exportFilesSuccess = (
  state: ApplicationStateInt,
  { status, dir }: { status: boolean; dir: string }
) => ({
  ...state,
  successOpen: status,
  appDir: dir,
  loading: false
});

export const exportFilesError = (
  state: ApplicationStateInt,
  { status, err }: { status: boolean; err: string }
) => ({
  ...state,
  errorOpen: status,
  appDir: err,
  loading: false
});

//Reducer that toggles the component class
export const toggleComponentClass = (
  state: ApplicationStateInt,
  { id }: { id: number }
) => {
  //creates a deep copy of the components array
  const componentCopy = cloneDeep(state.components);

  if (!state.codeReadOnly) {
    const check = window.confirm(
      `Are you sure you want to change the Class toggle for the ${state.focusComponent.title} component while the program is in the "Edit Mode"? \n\nAll of the changes to the "Code Preview" for the ${state.focusComponent.title} component will be overridden!`
    );
    if (!check) {
      return {
        ...state
      };
    }
  }
  //iterate array, and invert statefulness for targeted component based on id prop
  componentCopy.forEach((element: ComponentInt) => {
    if (element.id === id) {
      element.classBased = !element.classBased;
      element.changed = true;
    }
  });
  // return state and updated components array
  const { history, historyIndex, future } = createHistory(state);

  return {
    ...state,
    components: componentCopy,
    history,
    historyIndex,
    future,
    codeReadOnly: true
  };
};

//Reducer that toggles the component statefulness
export const toggleComponentState = (
  state: ApplicationStateInt,
  { id }: { id: number }
) => {
  //creates a deep copy of the components array
  const componentsCopy = cloneDeep(state.components);

  if (!state.codeReadOnly) {
    const check = window.confirm(
      `Are you sure you want to change the State toggle for the ${state.focusComponent.title}  component while the program is in the "Edit Mode"? \n\nAll of the changes to the "Code Preview" for the ${state.focusComponent.title} component will be overridden!`
    );
    if (!check) {
      return {
        ...state
      };
    }
  }
  //iterate array, and invert statefulness for targeted component based on id prop
  componentsCopy.forEach((element: ComponentInt) => {
    if (element.id === id) {
      element.stateful = !element.stateful;
      element.changed = true;
    }
  });

  // return state and updated components array
  const { history, historyIndex, future } = createHistory(state);

  return {
    ...state,
    components: componentsCopy,
    history,
    historyIndex,
    future,
    codeReadOnly: true
  };
};
//a reducer function to see if component name editing mode should be entered
export const toggleEditMode = (
  state: ApplicationStateInt,
  { id }: { id: number }
) => {
  if (id === 1) {
    return {
      ...state
    };
  }
  return {
    ...state,
    editMode: id
  };
};
