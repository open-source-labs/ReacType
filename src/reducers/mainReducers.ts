import cloneDeep from '../helperFunctions/cloneDeep';
import {
  ComponentInt,
  ApplicationStateInt,
  ChildInt,
  ComponentsInt,
} from '../interfaces/Interfaces';
import { createHistory } from '../helperFunctions/createHistory';

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
      components: [modifiedComponent, ...components],
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
        height: focComp.position.height,
      },
      childSort: 0,
      color: focComp.color,
      childType: '',
      htmlElement: '',
      HTMLInfo: {},
    };
  }

  return {
    ...state,
    focusChild: newFocusChild,
  };
};

//Change which step of the tutorial the user currently is at
export const changeTutorial = (
  state: ApplicationStateInt,
  { tutorial }: { tutorial: number }
) => {
  return {
    ...state,
    tutorial,
  };
};

export const handleTransform = (
  state: ApplicationStateInt,
  {
    componentId,
    childId,
    x,
    y,
    width,
    height,
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
        height: height || component.position.height,
      },
    };

    //return state with updated component values
    const components = [
      ...state.components.filter((comp: ComponentInt) => {
        if (comp.id !== componentId) return comp;
      }),
      transformedComponent,
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
      height: height || child.position.height,
    },
  };

  const children = [
    ...state.components
      .find((comp: ComponentInt) => comp.id === componentId)
      .childrenArray.filter((child: ChildInt) => {
        if (child.childId !== childId) return child;
      }),
    transformedChild,
  ];

  let newFocusChild = state.focusChild;
  if (state.focusChild.childId == childId) {
    newFocusChild = transformedChild;
  }

  const component = {
    ...state.components.find((comp: ComponentInt) => comp.id === componentId),
    childrenArray: children,
    focusChild: newFocusChild,
  };

  const components: ComponentsInt = [
    component,
    ...state.components.filter((comp: ComponentInt) => {
      if (comp.id !== componentId) return comp;
    }),
    
  ];
  const { history, historyIndex, future } = createHistory(state);

  return {
    ...state,
    components,
    focusChild: newFocusChild,
    history,
    historyIndex,
    future,
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
      future,
    };
  };
  
  export const redo = (state: ApplicationStateInt) => {
    //if the future history array is empty, return the current state
    if (!state.future || !state.future.length) return { ...state };
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
      future,
    };
  };
  