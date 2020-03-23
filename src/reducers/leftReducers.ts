import cloneDeep from '../helperFunctions/cloneDeep';
import getColor from '../helperFunctions/colors';
import { ComponentInt, ApplicationStateInt } from '../intefaces/Interfaces';
import { initialComponentState } from './initialState';
import { createHistory } from '../helperFunctions/createHistory';

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
      ...state,
    };
  }

  // empty component name not allowed
  if (strippedTitle === '') {
    return {
      ...state,
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
    childrenArray: [],
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

  const ancestors: Array<number> = [];

  // reset focused child to null values so when focused component is assigned to the newly created component,
  //child from previously focused component doesn;t show up
  const newFocusChild = cloneDeep(state.initialApplicationFocusChild);

  const { history, historyIndex, future } = createHistory(state);

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
    future,
  };
};
