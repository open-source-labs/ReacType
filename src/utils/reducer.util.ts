import getSelectable from './getSelectable.util';
import { getColor, updateState, cloneDeep } from './index.util';
import { ComponentState, ChildState, ApplicationState, Prop } from '../types/types';
import { getSize } from './htmlElements.util';
import * as types from '../types/actionTypes';

// ** initial state for components
export const initialComponentState: ComponentState = {
  id: 0,
  stateful: false,
  title: 'App',
  expanded: false,
  color: '#ffffff',
  props: [],
  nextPropId: 0,
  position: {
    x: 25,
    y: 25,
    width: 800,
    height: 550
  },
  children: [],
  nextChildId: 1,
  focusChildId: 0
};

// ** initial state for Child components or HTML elements
export const initialChildState: ChildState = {
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

type htmlElemPosition = {
  width: number;
  height: number;
}

// ** FOLLOWING UTILITY FUNCTIONS ARE CALLED IN EITHER THE APPLICATION REDUCER OR THE ACTION CREATOR ** \\

// ! Redux thunk action
export const createComponent = (id: number, title: string, components: ComponentState[], state = initialComponentState) => {
  // ** Redux thunk returns a function rather than an action creator object
  // ** Thunks allow us to do async activity. In our example we don't need access to our dispatch function so we're return a function which will create an updated component and create a Promise to be resolved when we add the component to our application array
  return () => {
    // ** if the title is empty then we'll just return the initial component state
    if (title === '') {
      return Promise.resolve(state);
    }
    // ** regular expression to strip any non-alphanumeric characters from the inputted title
    const strippedTitle = title
    .replace(/[a-z0-9_-]+/gi, word => word[0].toUpperCase() + word.slice(1))
    .replace(/[\W]+/gi, '');
    // ** loop to see if the component name exist already. if it does then we'll just return the initial component state in a promise, since the addComponent action thunk is expecting a promise object
    for (let i = 0; i < components.length; i += 1) {
      const component = components[i];
      if (component.title.toLowerCase() === strippedTitle.toLowerCase()) {
        return Promise.resolve(state);
      }
    }

    const createdComponent = updateState(state, {
      id,
      title,
      color: getColor(),
      focusChild: cloneDeep(initialChildState),
      expanded: true,
    });
    return Promise.resolve(createdComponent); // creating a thenable promise that passes the created component to be passed down to the next then chain
  }
};

export const updateCurrentComponent = (component: ComponentState, { title, stateful, props }: ComponentState) => {
  // ** setting the next four values to be either the truth value of what was destructured from the object or whatver value it had to begin with
  const componentTitle = title || component.title;
  const componentStateful = stateful !== null ? stateful : component.stateful;
  const componentProps = props || component.props;
  // ** using our updateState utility method to return and merge the old component state with the new value to be updated
  return updateState(component, { 
    title: componentTitle,
    stateful: componentStateful,
    props: componentProps
  });
}

export const togglePanel = (component: ComponentState) => {
  // ** the current component will have a key of expanded which is either true or false. When the action runs and this utility function is invoked we want to update the state of expanded to the opposite of it's current value (true -> false || false -> true).
  const expanded = !component.expanded;
  return updateState(component, { expanded });
}

export const closeExpanded = (components: ComponentState[], id? : number): void => {
  // ** Only one panel should be open at a time. This helper util is used just to set each expanded value to false before the component is created or focused on in a seperate function
  components.forEach((component: ComponentState) => {
    if (!id || id !== component.id) component.expanded = false;
  });
}

<<<<<<< HEAD
// This action adds a child to the current focusComponent 
// (The component currently selected in LeftContainer)
export const addChild = (
  state: ApplicationState,
  { title, childType = '', HTMLInfo = {} }: { title: string; childType: string; HTMLInfo: object },
) => {
  const strippedTitle = title;

  if (!childType) {
    window.alert('addChild Error! no type specified');
  }

  const htmlElement = childType !== 'COMP' ? childType : null;
  if (childType !== 'COMP') {
    childType = 'HTML';
  }

  // view represents the current FOCUSED COMPONENT - this is the component where the child is being added to
  // we only add children (perform any action) to the focused component
  const view: ComponentState = state.components.find(comp => comp.title === state.focusComponent.title);

  // parentComponent is the component this child is generated from (ex. instance of Box has comp of Box)
  let parentComponent;

  // conditional if adding an HTML component
  if (childType === 'COMP') {
    parentComponent = state.components.find((comp) => comp.title === title);
  }

  interface htmlElemPositionInt {
    width: number;
    height: number;
  }

  let htmlElemPosition: htmlElemPositionInt = { width: null, height: null };
  if (childType === 'HTML') {
    htmlElemPosition = getSize(htmlElement);
    // if above function doesn't return anything, it means html element is not yet implemented
    if (!htmlElemPosition.width) {
      console.log(
        `Did not add html child: ${htmlElement} the GetSize function indicated that it isnt in our DB`
      );
      return;
    }
  }
  // The postion of the new child is dependent on its parent, the focusComponent (called view here)
  const newPosition =
    childType === 'COMP'
      ? {
          //In order to avoid the overlap of newly added children, this adds an x and y offset
          x: view.position.x + ((view.nextChildId * 16) % 150), // new children are offset by some amount, map of 150px
          y: view.position.y + ((view.nextChildId * 16) % 150),
          width: parentComponent.position.width - 1, // the size of new children is based on that of parent component
          height: parentComponent.position.height - 1
        }
      : {
          x: view.position.x + view.nextChildId * 16,
          y: view.position.y + view.nextChildId * 16,
          width: htmlElemPosition.width,
          height: htmlElemPosition.height
        };
  // Creation of the actual new child object with all data necessary to render a Rectangle
  const newChild: ChildState = {
    childId: view.nextChildId,
    childSort: view.nextChildId,
    childType,
    childComponentId: childType === 'COMP' ? parentComponent.id : null, // only relevant fot children of type COMPONENT
    componentName: strippedTitle,
    position: newPosition,
    color: null, // parentComponent.color, // only relevant for children of type COMPONENT 
    htmlElement, // only relevant fot children of type HTML
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

  return {
    ...state,
    components,
    focusChild: newChild,
    focusComponent: component // refresh the focus component so we have the new child
  };
};

=======
>>>>>>> dev
export const deleteChild = (
  state: ApplicationState,
  { parentId = state.focusComponent.id, childId = state.focusChild.childId, calledFromDeleteComponent = false },
) => {
  /** ************************************************
  if no parameters are provided we default to delete the FOCUSED CHILD of the FOCUSED COMPONENTS
  however when deleting  component we wnt to delete ALL the places where it's used, so we call this function
  Also when calling from DELETE components , we do not touch focusComponent.
 ************************************************************************************ */
  
};

export const handleTransform = (
  state: ApplicationState,
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
    const component = state.components.find((comp) => comp.id === componentId);
    const transformedComponent = {
      ...component,
      position: {
        x: x || component.position.x,
        y: y || component.position.y,
        width: width || component.position.width,
        height: height || component.position.height
      }
    };

    const components = [
      ...state.components.filter((comp) => {
        if (comp.id !== componentId) return comp;
      }),
      transformedComponent
    ];
    return { ...state, components };
  }

  // else, a normal child has been transformed, its position lives in the children array
  const child = state.components
    .find(comp => comp.id === componentId)
    .children.find(child => child.childId === childId);

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
    ...state.components.find(comp => comp.id === componentId).children.filter(child => {
      if (child.childId !== childId) return child;
    }),
    transformedChild,
  ];

  let newFocusChild = state.focusChild;
  if (state.focusChild.childId == childId) {
    newFocusChild = transformedChild;
  }

  const component = {
    ...state.components.find(comp => comp.id === componentId),
    children: children,
    focusChild: newFocusChild,
  };

  const components: ComponentState[] = [
    ...state.components.filter(comp => {
      if (comp.id !== componentId) return comp;
    }),
    component
  ];

  return {
    ...state,
    components,
    focusChild: newFocusChild
  };
};

export const changeFocusComponent = (
  state: ApplicationState,
  { title = state.focusComponent.title }: { title: string },
) => {
  /** ****************
   * if the prm TITLE is a blank Object it means REFRESH focusd Components.
   * sometimes we update state  like adding Children/Props etc and we want those changes to be reflected in focus component
   ************************************************* */
  const newFocusComp: ComponentState = state.components.find(comp => comp.title === title);
  // set the "focus child" to the focus child of this particular component .

  let newFocusChild: ChildState | any; // check if the components has a child saved as a Focus child
  if (newFocusComp.focusChildId > 0) {
    newFocusChild = newFocusComp.children.find(child => child.childId === newFocusComp.focusChildId);
  }

  if (!newFocusChild) {
    newFocusChild = cloneDeep(state.applicationFocusChild);
  }

  const result = getSelectable(newFocusComp, state.components);

  return {
    ...state,
    focusComponent: newFocusComp,
    selectableChildren: result.selectableChildren,
    ancestors: result.ancestors,
    focusChild: newFocusChild
  };
};

export const changeFocusChild = (state: ApplicationState, { childId }: { childId: number }) => {
  const focComp = state.components.find(comp => comp.title === state.focusComponent.title);
  let newFocusChild: ChildState = focComp.children.find(child => child.childId === childId);

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
  state: ApplicationState,
  { componentId, childId }: { componentId: number; childId: number },
) => {
  const component: ComponentState = state.components.find(comp => comp.id === componentId);
  const modifiedComponent: any = cloneDeep(component);
  modifiedComponent.focusChildId = childId;
  const components: ComponentState[] = state.components.filter(comp => comp.id !== componentId);
  return {
    ...state,
    components: [modifiedComponent, ...components]
  };
};

export const exportFilesSuccess = (state: ApplicationState, { status, dir }: { status: boolean; dir: string }) => ({
  ...state,
  successOpen: status,
  appDir: dir,
  loading: false
});

export const exportFilesError = (state: ApplicationState, { status, err }: { status: boolean; err: string }) => ({
  ...state,
  errorOpen: status,
  appDir: err,
  loading: false
});

export const handleClose = (state: ApplicationState, status: string) => ({
  ...state,
  errorOpen: status,
  successOpen: status
});

export const addProp = (
  state: ApplicationState,
  { key, value = null, required, type }: { key: string; value: string; required: boolean; type: string },
) => {
  if (!state.focusComponent.id) {
    console.log('Add prop error. no focused component ');
    return state;
  }

  const selectedComponent = state.components.find(
    (comp) => comp.id === state.focusComponent.id
  );

  const newProp: Prop = {
    id: selectedComponent.nextPropId,
    key,
    value: value || key,
    required,
    type
  };
  const newProps = [...selectedComponent.props, newProp];

  const modifiedComponent: ComponentState = {
    ...selectedComponent,
    props: newProps,
    nextPropId: selectedComponent.nextPropId + 1
  };

  const newComponents: ComponentState[] = state.components.filter(comp => comp.id !== selectedComponent.id);
  newComponents.push(modifiedComponent);
  return {
    ...state,
    components: newComponents,
    focusComponent: modifiedComponent
  };
};

export const deleteProp = (state: ApplicationState, propId: number) => {
  if (!state.focusComponent.id) {
    console.log('Delete prop error. no focused component ');
    return state;
  }

  const modifiedComponent: any = cloneDeep(
    state.components.find((comp) => comp.id === state.focusComponent.id)
  );

  const indexToDelete = modifiedComponent.props.findIndex((prop: Prop) => prop.id === propId);
  if (indexToDelete === -1) {
    console.log(
      `Delete prop Error. Prop id:${propId} not found in ${modifiedComponent.title}`
    );
    return state;
  }

  modifiedComponent.props.splice(indexToDelete, 1);

  const newComponentsArray = state.components.filter(
    (comp) => comp.id !== modifiedComponent.id
  );
  newComponentsArray.push(modifiedComponent);

  return {
    ...state,
    components: newComponentsArray,
    focusComponent: modifiedComponent
  };
};

export const updateHtmlAttr = (state: ApplicationState, { attr, value }: { attr: string; value: string }) => {
  if (!state.focusChild.childId) {
    console.log('Update HTML error. no focused child ');
    return state;
  }

  const modifiedChild: any = cloneDeep(state.focusChild);
  modifiedChild.HTMLInfo[attr] = value;

  const modifiedComponent: ComponentState = JSON.parse(
    JSON.stringify(state.components.find(comp => comp.id === state.focusComponent.id)),
  );

  modifiedComponent.children = modifiedComponent.children.filter(
    child => child.childId !== modifiedChild.childId,
  );
  modifiedComponent.children.push(modifiedChild);

  const newComponentsArray = state.components.filter(
    (comp) => comp.id !== modifiedComponent.id
  );
  newComponentsArray.push(modifiedComponent);

  return {
    ...state,
    components: newComponentsArray,
    focusComponent: modifiedComponent,
    focusChild: modifiedChild
  };
};

export const updateChildrenSort = (state: ApplicationState, { newSortValues }: { newSortValues: any }) => {
  const modifiedchildren = cloneDeep(state.focusComponent.children);

  for (let i = 0; i < modifiedchildren.length; i += 1) {
    const currChild = modifiedchildren[i];
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

  const modifiedComponent = state.components.find(comp => comp.id === state.focusComponent.id);
  modifiedComponent.children = modifiedchildren;

  const modifiedComponentsArray = state.components.filter(
    (comp) => comp.id !== state.focusComponent.id
  );
  modifiedComponentsArray.push(modifiedComponent);

  return {
    ...state,
    components: modifiedComponentsArray,
    focusComponent: modifiedComponent
  };
};