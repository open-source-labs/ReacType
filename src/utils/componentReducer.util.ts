import getSelectable from './getSelectable.util';
import getColor from './colors.util';
import { getSize } from './htmlElements.util';
import cloneDeep from './cloneDeep';
import {
  ComponentInt,
  ApplicationStateInt,
  //ChildrenInt, //unused import//
  ChildInt,
  ComponentsInt,
  PropInt
} from './Interfaces';
import { format } from 'prettier';
import componentRender from '../utils/componentRender.util';
import { createHistory } from './helperFunctions';

//this is the default values for any component added to the app.

const initialComponentState: ComponentInt = {
  id: 0,
  stateful: false,
  classBased: false,
  title: '',
  color: getColor(),
  props: [],
  nextPropId: 1,
  position: {
    x: 25,
    y: 25,
    width: 800,
    height: 550
  },
  childrenArray: [],
  nextChildId: 1,
  focusChildId: 0
};

const generateNewCode = (comp: ComponentInt, components: ComponentsInt) => {
  const code = format(componentRender(comp, components), {
    singleQuote: true,
    trailingComma: 'es5',
    bracketSpacing: true,
    jsxBracketSameLine: true,
    parser: 'typescript'
  });
  return code;
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

//reducer function to add component or HTML child to currently focused component
export const addChild = (
  state: ApplicationStateInt,
  {
    title,
    childType = '',
    HTMLInfo = {}
  }: {
    title: string;
    childType: string;
    HTMLInfo: { [index: string]: string };
  }
) => {
  const strippedTitle = title;

  //is this warning even possible to trigger witht he current flow?
  if (!childType) {
    window.alert('addChild Error! no type specified');
  }

  //weird use of a ternary operator, could've wrapped it in one if statement
  const htmlElement = childType !== 'COMP' ? childType : null;
  if (childType !== 'COMP') {
    childType = 'HTML';
  }

  // view represents the curretn FOCUSED COMPONENT - this is the component where the child is being added to
  // we only add childrent (or do any action) to the focused omconent
  const view: ComponentInt = state.components.find(
    (comp: ComponentInt) => comp.title === state.focusComponent.title
  );

  // parentComponent is the component this child is generated from (ex. instance of Box has comp of Box)
  let parentComponent;

  // conditional if adding an HTML component
  if (childType === 'COMP') {
    parentComponent = state.components.find(
      (comp: ComponentInt) => comp.title === title
    );
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
    ...state.components.filter((comp: ComponentInt) => {
      if (comp.title !== view.title) return comp;
    }),
    component
  ];
  const { history, historyIndex, future } = createHistory(state);
  return {
    ...state,
    components,
    focusChild: newChild,
    focusComponent: component, // refresh the focus component so we have the new child
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
    future
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

export const updateCode = (
  state: ApplicationStateInt,
  { componentId, code }: { componentId: number; code: string }
) => {
  //creates a deep copy of the components
  const componentsCopy = cloneDeep(state.components);
  const focusCompCopy = cloneDeep(state.focusComponent);
  if (focusCompCopy.id === componentId) {
    focusCompCopy.code = code;
    focusCompCopy.changed = false;
  }
  componentsCopy.forEach((comp: ComponentInt) => {
    if (comp.id === componentId) {
      comp.code = code;
      comp.changed = false;
    }
  });
  return {
    ...state,
    components: componentsCopy,
    focusComponent: focusCompCopy
  };
};

//the function that handles the transformation of all children in the stage
export const handleTransform = (
  state: ApplicationStateInt,
  {
    componentId,
    childId,
    x,
    y,
    width,
    height
  }: {
    componentId: number;
    childId: number;
    x: number;
    y: number;
    width: number;
    height: number;
  }
) => {
  if (childId === -1) {
    // the pseudochild has been transformed, its position is stored in the component
    const component = state.components.find(
      (comp: ComponentInt) => comp.id === componentId
    );

    //first check if changed, if falsy then assign the original values
    const transformedComponent = {
      ...component,
      position: {
        x: x || component.position.x,
        y: y || component.position.y,
        width: width || component.position.width,
        height: height || component.position.height
      }
    };

    //return state with updated component values
    const components = [
      ...state.components.filter((comp: ComponentInt) => {
        if (comp.id !== componentId) return comp;
      }),
      transformedComponent
    ];
    return { ...state, components };
  }

  // else, a normal child has been transformed, its position lives in the children array
  const child = state.components
    .find((comp: ComponentInt) => comp.id === componentId)
    .childrenArray.find((child: ChildInt) => child.childId === childId);

  const transformedChild = {
    ...child,
    position: {
      x: x || child.position.x,
      y: y || child.position.y,
      width: width || child.position.width,
      height: height || child.position.height
    }
  };

  const children = [
    ...state.components
      .find((comp: ComponentInt) => comp.id === componentId)
      .childrenArray.filter((child: ChildInt) => {
        if (child.childId !== childId) return child;
      }),
    transformedChild
  ];

  let newFocusChild = state.focusChild;
  if (state.focusChild.childId == childId) {
    newFocusChild = transformedChild;
  }

  const component = {
    ...state.components.find((comp: ComponentInt) => comp.id === componentId),
    childrenArray: children,
    focusChild: newFocusChild
  };

  const components: ComponentsInt = [
    ...state.components.filter((comp: ComponentInt) => {
      if (comp.id !== componentId) return comp;
    }),
    component
  ];
  const { history, historyIndex, future } = createHistory(state);

  return {
    ...state,
    components,
    focusChild: newFocusChild,
    history,
    historyIndex,
    future
  };
};

//Change which step of the tutorial the user currently is at
export const changeTutorial = (
  state: ApplicationStateInt,
  { tutorial }: { tutorial: number }
) => {
  return {
    ...state,
    tutorial
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

//Reducer that deletes the component selected
export const deleteComponent = (
  state: ApplicationStateInt,
  { componentId }: { componentId: number }
) => {
  //select the component from list of components
  const compName = state.components.filter(
    (value: ComponentInt) => value.id === componentId
  );
  //confimation window to see if user really wants to delete component
  const result = window.confirm(
    `Are you sure you want to delete ${compName[0].title}?`
  );
  //if cancelled, return focus to current selected component
  if (!result) {
    return {
      ...state,
      focusComponent: compName[0]
    };
  }
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
    future
  };
};

//Reducer that toggles the component statefulness
export const toggleComponentState = (
  state: ApplicationStateInt,
  { id }: { id: number }
) => {
  //creates a deep copy of the components array
  const componentsCopy = cloneDeep(state.components);

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
    future
  };
};

//Reducer that toggles the component class
export const toggleComponentClass = (
  state: ApplicationStateInt,
  { id }: { id: number }
) => {
  //creates a deep copy of the components array
  const componentCopy = cloneDeep(state.components);

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
    future
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

export const changeFocusChild = (
  state: ApplicationStateInt,
  { childId }: { childId: number }
) => {
  const focComp = state.components.find(
    (comp: ComponentInt) => comp.title === state.focusComponent.title
  );
  let newFocusChild: ChildInt = focComp.childrenArray.find(
    (child: ChildInt) => child.childId === childId
  );

  if (!newFocusChild) {
    newFocusChild = {
      childId: -1,
      childComponentId: focComp.id,
      componentName: focComp.title,
      position: {
        x: focComp.position.x,
        y: focComp.position.y,
        width: focComp.position.width,
        height: focComp.position.height
      },
      childSort: 0,
      color: focComp.color,
      childType: '',
      htmlElement: '',
      HTMLInfo: {}
    };
  }

  return {
    ...state,
    focusChild: newFocusChild
  };
};

export const changeComponentFocusChild = (
  state: ApplicationStateInt,
  { componentId, childId }: { componentId: number; childId: number }
) => {
  const component: ComponentInt = state.components.find(
    comp => comp.id === componentId
  );
  const modifiedComponent: any = cloneDeep(component);
  modifiedComponent.focusChildId = childId;
  const components: ComponentsInt = state.components.filter(
    comp => comp.id !== componentId
  );
  return {
    ...state,
    components: [modifiedComponent, ...components]
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

export const handleClose = (state: ApplicationStateInt, status: string) => ({
  ...state,
  errorOpen: status,
  successOpen: status
});

export const openExpansionPanel = (
  state: ApplicationStateInt,
  { component }: { component: ComponentInt }
) => ({
  ...state
});

export const addProp = (
  state: ApplicationStateInt,
  {
    key,
    value = null,
    required,
    type
  }: { key: string; value: string; required: boolean; type: string }
) => {
  if (!state.focusComponent.id) {
    console.log('Add prop error. no focused component ');
    return state;
  }

  const selectedComponent = state.components.find(
    (comp: ComponentInt) => comp.id === state.focusComponent.id
  );

  const newProp: PropInt = {
    id: selectedComponent.nextPropId,
    key,
    value: value || key,
    required,
    type
  };
  const newProps = [...selectedComponent.props, newProp];

  const modifiedComponent: ComponentInt = {
    ...selectedComponent,
    props: newProps,
    nextPropId: selectedComponent.nextPropId + 1,
    changed: true
  };

  const newComponents: ComponentsInt = state.components.filter(
    (comp: ComponentInt) => comp.id !== selectedComponent.id
  );
  newComponents.push(modifiedComponent);
  const { history, historyIndex, future } = createHistory(state);

  return {
    ...state,
    components: newComponents,
    focusComponent: modifiedComponent,
    historyIndex,
    history,
    future
  };
};

export const deleteProp = (state: ApplicationStateInt, propId: number) => {
  if (!state.focusComponent.id) {
    console.log('Delete prop error. no focused component ');
    return state;
  }

  const modifiedComponent: any = cloneDeep(
    state.components.find(
      (comp: ComponentInt) => comp.id === state.focusComponent.id
    )
  );

  const indexToDelete = modifiedComponent.props.findIndex(
    (prop: PropInt) => prop.id === propId
  );
  if (indexToDelete === -1) {
    console.log(
      `Delete prop Error. Prop id:${propId} not found in ${modifiedComponent.title}`
    );
    return state;
  }

  modifiedComponent.props.splice(indexToDelete, 1);

  modifiedComponent.changed = true;

  const newComponentsArray = state.components.filter(
    (comp: ComponentInt) => comp.id !== modifiedComponent.id
  );
  newComponentsArray.push(modifiedComponent);
  const { history, historyIndex, future } = createHistory(state);

  return {
    ...state,
    components: newComponentsArray,
    focusComponent: modifiedComponent,
    history,
    historyIndex,
    future
  };
};

export const updateHtmlAttr = (
  state: ApplicationStateInt,
  { attr, value }: { attr: string; value: string }
) => {
  if (!state.focusChild.childId) {
    console.log('Update HTML error. no focused child ');
    return state;
  }

  const modifiedChild: any = cloneDeep(state.focusChild);
  modifiedChild.HTMLInfo[attr] = value;

  const modifiedComponent: ComponentInt = JSON.parse(
    JSON.stringify(
      state.components.find(
        (comp: ComponentInt) => comp.id === state.focusComponent.id
      )
    )
  );
  modifiedComponent.changed = true;
  modifiedComponent.childrenArray = modifiedComponent.childrenArray.filter(
    (child: ChildInt) => child.childId !== modifiedChild.childId
  );
  modifiedComponent.childrenArray.push(modifiedChild);

  const newComponentsArray = state.components.filter(
    (comp: ComponentInt) => comp.id !== modifiedComponent.id
  );
  newComponentsArray.push(modifiedComponent);
  const { history, historyIndex, future } = createHistory(state);

  return {
    ...state,
    components: newComponentsArray,
    focusComponent: modifiedComponent,
    focusChild: modifiedChild,
    history,
    historyIndex,
    future
  };
};

export const updateChildrenSort = (
  state: ApplicationStateInt,
  { newSortValues }: { newSortValues: any }
) => {
  const modifiedChildrenArray: any = cloneDeep(
    state.focusComponent.childrenArray
  );

  for (let i = 0; i < modifiedChildrenArray.length; i += 1) {
    const currChild = modifiedChildrenArray[i];
    const currChildId = currChild.childId;
    const newValueObj = newSortValues.find(
      (n: any) => n.childId === currChildId
    );
    const newSortValue = newValueObj.childSort;
    console.log(
      ` currChildId  ${currChildId} currSortValue: ${currChild.childSort} newSortValue:${newSortValue}`
    );
    currChild.childSort = newSortValue;
  }

  const modifiedComponent = state.components.find(
    (comp: ComponentInt) => comp.id === state.focusComponent.id
  );
  modifiedComponent.childrenArray = modifiedChildrenArray;

  const modifiedComponentsArray = state.components.filter(
    (comp: ComponentInt) => comp.id !== state.focusComponent.id
  );
  modifiedComponentsArray.push(modifiedComponent);

  return {
    ...state,
    components: modifiedComponentsArray,
    focusComponent: modifiedComponent
  };
};

export const undo = (state: ApplicationStateInt) => {
  //return current state if there is no history
  if (!state.historyIndex) return { ...state };
  const stateCopy = cloneDeep(state);
  const futureCopy = cloneDeep(state.future);
  const historyCopy = cloneDeep(state.history);
  //remove last element of history to assign it to the 'undone' state on the 'undoData' varaiable below
  historyCopy.pop();
  const history = historyCopy;
  //create a new element for the 'redo' history array
  futureCopy.unshift({ ...stateCopy, history: [] });
  const future = futureCopy;
  const undoData = state.history[state.historyIndex - 1];
  return {
    ...undoData,
    history,
    future
  };
};

export const redo = (state: ApplicationStateInt) => {
  //if the future history array is empty, return the current state
  if (!state.future) return { ...state };
  const stateCopy = cloneDeep(state);
  const futureCopy = cloneDeep(state.future);
  //grab the first element of the future history array and assign it to the new state
  //the rest of this is mostly the same logic as 'undo' but flipped
  futureCopy.shift();
  const future = futureCopy;
  const historyCopy = cloneDeep(state.history);
  historyCopy.push({ ...stateCopy, history: [] });
  const history = historyCopy;
  const redoData = state.future[0];
  return {
    ...redoData,
    history,
    future
  };
};
