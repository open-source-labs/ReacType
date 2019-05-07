import getSelectable from "./getSelectable.util";
import getColor from "./colors.util";
import { getSize } from "./htmlElements.util.ts";
import cloneDeep from "./cloneDeep";
import {
  ComponentInt,
  ApplicationStateInt,
  ChildrenInt,
  ChildInt
} from "./interfaces";

const initialComponentState: ComponentInt = {
  id: null,
  stateful: false,
  title: "",
  color: getColor(),
  props: [],
  nextPropId: 1,
  position: {
    x: 25,
    y: 25,
    width: 600,
    height: 400
  },
  childrenArray: [],
  nextChildId: 1,
  focusChildId: 0
};

export const addComponent = (
  state: ApplicationStateInt,
  { title }: { title: string }
) => {
  // remove whitespace and digits, capitalize first char
  const strippedTitle = title
    .replace(/[a-z]+/gi, word => word[0].toUpperCase() + word.slice(1))
    .replace(/[-_\s0-9\W]+/gi, "");

  // duplicate component names not allowed
  if (state.components.find(comp => comp.title === strippedTitle)) {
    window.alert(
      `A component with the name: "${strippedTitle}" already exists.\n Please think of another name.`
    );
    return {
      ...state
    };
  }

  // empty component name not allowed
  if (strippedTitle === "") {
    return {
      ...state
    };
  }

  const componentColor = getColor();
  const componentId = state.nextId;

  const newComponent: ComponentInt = {
    ...initialComponentState,
    title: strippedTitle,
    id: componentId,
    color: componentColor,
    childrenArray: []
  };

  const components = [...state.components, newComponent];

  const totalComponents = state.totalComponents + 1;
  const nextId = state.nextId + 1;

  const selectableChildren = state.components
    .map(comp => comp.id)
    .filter(id => id !== newComponent.id);

  let ancestors: Array<number> = [];

  // reset focused child
  const newFocusChild = cloneDeep(state.initialApplicationFocusChild);
  return {
    ...state,
    totalComponents,
    nextId,
    components,
    focusComponent: newComponent,
    focusChild: newFocusChild,
    ancestors,
    selectableChildren // new component so everyone except yourself is available
  };
};

// get title (aka the class associated with the new child)
// get the focus component (aka the component were adding the child to)

export const addChild = (
  state: ApplicationStateInt,
  {
    title,
    childType = "",
    HTMLInfo = {}
  }: { title: string; childType: string; HTMLInfo: object }
) => {
  const strippedTitle = title;

  if (!childType) {
    window.alert("addChild Error! no type specified");
  }

  const htmlElement = childType !== "COMP" ? childType : null;
  if (childType !== "COMP") {
    childType = "HTML";
  }

  // view represents the curretn FOCUSED COMPONENT - this is the component where the child is being added to
  // we only add childrent (or do any action) to the focused omconent
  const view = state.components.find(
    comp => comp.title === state.focusComponent.title
  );

  // parentComponent is the component this child is generated from (ex. instance of Box has comp of Box)
  let parentComponent;

  // conditional if adding an HTML component
  if (childType === "COMP") {
    parentComponent = state.components.find(comp => comp.title === title);
  }

  let htmlElemPosition;
  if (childType === "HTML") {
    htmlElemPosition = getSize(htmlElement);
    // if above function doesnt reutn anything, it means html element is not in our database
    if (!htmlElemPosition.width) {
      console.log(
        `Did not add html child: ${htmlElement} the GetSize function indicated that it isnt in our DB`
      );
      return;
    }
    console.log(`htmlElemPosition: ${JSON.stringify(htmlElemPosition)}`);
  }

  const newPosition =
    childType === "COMP"
      ? {
          x: view.position.x + view.nextChildId * 16, // new children are offset by 5px, x and y
          y: view.position.y + view.nextChildId * 16,
          width: parentComponent.position.width * 0.9, // new children have an initial position of their CLASS (maybe don't need 90%)
          height: parentComponent.position.height * 0.9
        }
      : {
          x: view.position.x + view.nextChildId * 16,
          y: view.position.y + view.nextChildId * 16,
          width: htmlElemPosition.width,
          height: htmlElemPosition.height
        };

  const newChild: ChildInt = {
    childId: view.nextChildId,
    childType,
    childComponentId: childType === "COMP" ? parentComponent.id : null, // only relevant fot children of type COMPONENT
    componentName: strippedTitle,
    position: newPosition,
    color: null, // parentComponent.color, // only relevant fot children of type COMPONENT
    htmlElement, // only relevant fot children of type HTML
    HTMLInfo
  };

  const compsChildrenArr = [...view.childrenArray, newChild];

  const component = {
    ...view,
    childrenArray: compsChildrenArr,
    focusChildId: newChild.childId,
    nextChildId: view.nextChildId + 1
  };

  const components = [
    ...state.components.filter(comp => {
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

export const deleteChild = (
  state: ApplicationStateInt,
  {
    parentId = state.focusComponent.id,
    childId = state.focusChild.childId,
    calledFromDeleteComponent = false
  }
) => {
  console.log(`delete child here. state.focusChild.childId = ${
    state.focusChild.childId
  }  
   state.focusComponent.id=${
     state.focusComponent.id
   }  myPrms: parentId:${parentId} childId${childId} calledFromDeleteComponent:${calledFromDeleteComponent}`);
  /** ************************************************
  if no parameters are provided we default to delete the FOCUSED CHILD of the FOCUSED COMPONENTS
  however when deleting  component we wnt to delete ALL the places where it's used, so we call this function
  Also when calling from DELETE components , we do not touch focusCOmponent.
 ************************************************************************************ */
  if (!parentId) {
    window.alert("Cannot delete root child of a component");
    return state;
  }
  if (!childId) {
    window.alert("No child selected");
    return state;
  }
  if (!calledFromDeleteComponent && childId === -1) {
    window.alert("Cannot delete root child of a component");
    return state;
  }
  // make a DEEP copy of the parent component (the one thats about to loose a child)
  const parentComponentCopy: any = cloneDeep(
    state.components.find(c => c.id === parentId)
  );

  // delete the  CHILD from the copied array
  const indexToDelete = parentComponentCopy.childrenArray.findIndex(
    elem => elem.childId === childId
  );
  if (indexToDelete < 0) {
    return window.alert("No such child component found");
  }
  parentComponentCopy.childrenArray.splice(indexToDelete, 1);

  // if deleted child is selected, reset it
  if (parentComponentCopy.focusChildId === childId) {
    parentComponentCopy.focusChildId = 0;
  }

  const modifiedComponentArray = [
    ...state.components.filter(c => c.id !== parentId), // all elements besides the one just changed
    parentComponentCopy
  ];

  // RETURN - update state...
  return {
    ...state,
    components: modifiedComponentArray,
    focusComponent: calledFromDeleteComponent
      ? state.focusComponent
      : parentComponentCopy, // when called from delete component we dont need want to touch the focus
    focusChild: cloneDeep(state.initialApplicationFocusChild) // reset
  };
};

export const handleTransform = (
  state,
  { componentId, childId, x, y, width, height }
) => {
  if (childId === -1) {
    // the pseudochild has been transformed, its position is stored in the component
    const component = state.components.find(comp => comp.id === componentId);
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
      ...state.components.filter(comp => {
        if (comp.id !== componentId) return comp;
      }),
      transformedComponent
    ];
    return { ...state, components };
  }

  // else, a normal child has been transformed, its position lives in the children array
  const child = state.components
    .find(comp => comp.id === componentId)
    .childrenArray.find(child => child.childId === childId);

  // console.log(
  //   `handleTransform here. componentId=${componentId} childId=${childId}`
  // );

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
      .find(comp => comp.id === componentId)
      .childrenArray.filter(child => {
        if (child.childId !== childId) return child;
      }),
    transformedChild
  ];

  let newFocusChild = state.focusChild;
  if (state.focusChild.childId == childId) {
    newFocusChild = transformedChild;
  }

  const component = {
    ...state.components.find(comp => comp.id === componentId),
    childrenArray: children,
    focusCHild: newFocusChild
  };

  const components = [
    ...state.components.filter(comp => {
      if (comp.id !== componentId) return comp;
    }),
    component
  ];

  return {
    ...state,
    components
  };
};

export const deleteComponent = (state, { componentId }) => {
  if (componentId === 1) {
    return {
      ...state
    };
  }

  const indexToDelete = state.components.findIndex(
    comp => comp.id == componentId
  );
  console.log("index to delete: ", indexToDelete);

  const componentsCopy = cloneDeep(state.components);
  componentsCopy.splice(indexToDelete, 1);
  const totalComponents = state.totalComponents - 1;

  console.log(`Real delete component action here : id:${componentId}`);
  return {
    ...state,
    totalComponents,
    components: componentsCopy
  };
};

export const changeFocusComponent = (
  state,
  { title = state.focusComponent.title }
) => {
  /** ****************
   * if the prm TITLE is a blank Object it means REFRESH focusd Components.
   * sometimes we update state  like adding Children/Props etc and we want those changes to be reflected in focus component
   ************************************************* */
  const newFocusComp = state.components.find(comp => comp.title === title);
  // set the "focus child" to the focus child of this particular component .
  // const newFocusChildId = newFocusComp.focusChildId;

  let newFocusChild; // check if the components has a child saved as a Focus child
  if (newFocusComp.focusChildId > 0) {
    newFocusChild = newFocusComp.childrenArray.find(
      child => child.childId === newFocusComp.focusChildId
    );
  }

  if (!newFocusChild) {
    newFocusChild = cloneDeep(state.initialApplicationFocusChild);
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

export const changeFocusChild = (state, { childId }) => {
  const focComp = state.components.find(
    comp => comp.title === state.focusComponent.title
  );
  let newFocusChild = focComp.childrenArray.find(
    child => child.childId === childId
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
      draggable: true,
      color: focComp.color
    };
  }

  return {
    ...state,
    focusChild: newFocusChild
  };
};

export const changeComponentFocusChild = (state, { componentId, childId }) => {
  const component = state.components.find(comp => comp.id === componentId);
  const modifiedComponent = cloneDeep(component);
  modifiedComponent.focusChildId = childId;
  const components = state.components.filter(comp => comp.id !== componentId);
  return {
    ...state,
    components: [modifiedComponent, ...components]
  };
};

export const exportFilesSuccess = (state, { status, dir }) => ({
  ...state,
  successOpen: status,
  appDir: dir,
  loading: false
});

export const exportFilesError = (state, { status, err }) => ({
  ...state,
  errorOpen: status,
  appDir: err,
  loading: false
});

export const handleClose = (state, status) => ({
  ...state,
  errorOpen: status,
  successOpen: status
});

export const openExpansionPanel = (state, { component }) => ({
  ...state
});

export const addProp = (state, { key, value = null, required, type }) => {
  if (!state.focusComponent.id) {
    console.log("Add prop error. no focused component ");
    return state;
  }

  const selectedComponent = state.components.find(
    comp => comp.id === state.focusComponent.id
  );

  const newProp = {
    id: selectedComponent.nextPropId,
    key,
    value: value || key,
    required,
    type
  };
  const newProps = [...selectedComponent.props, newProp];

  const modifiedComponent = {
    ...selectedComponent,
    props: newProps,
    nextPropId: selectedComponent.nextPropId + 1
  };

  const newComponents = state.components.filter(
    comp => comp.id !== selectedComponent.id
  );
  newComponents.push(modifiedComponent);
  return {
    ...state,
    components: newComponents,
    focusComponent: modifiedComponent
  };
};

export const deleteProp = (state, propId) => {
  if (!state.focusComponent.id) {
    console.log("Delete prop error. no focused component ");
    return state;
  }

  const modifiedComponent = cloneDeep(
    state.components.find(comp => comp.id === state.focusComponent.id)
  );

  const indexToDelete = modifiedComponent.props.findIndex(
    prop => prop.id === propId
  );
  if (indexToDelete === -1) {
    console.log(
      `Delete prop Error. Prop id:${propId} not found in ${
        modifiedComponent.title
      }`
    );
    return state;
  }

  modifiedComponent.props.splice(indexToDelete, 1);

  const newComponentsArray = state.components.filter(
    comp => comp.id !== modifiedComponent.id
  );
  newComponentsArray.push(modifiedComponent);

  return {
    ...state,
    components: newComponentsArray,
    focusComponent: modifiedComponent
  };
};

export const updateHtmlAttr = (state, { attr, value }) => {
  if (!state.focusChild.childId) {
    console.log("Update HTML error. no focused child ");
    return state;
  }

  const modifiedChild = cloneDeep(state.focusChild);
  modifiedChild.HTMLInfo[attr] = value;

  const modifiedComponent = cloneDeep(
    state.components.find(comp => comp.id === state.focusComponent.id)
  );

  modifiedComponent.childrenArray = modifiedComponent.childrenArray.filter(
    child => child.childId !== modifiedChild.childId
  );
  modifiedComponent.childrenArray.push(modifiedChild);

  const newComponentsArray = state.components.filter(
    comp => comp.id !== modifiedComponent.id
  );
  newComponentsArray.push(modifiedComponent);

  return {
    ...state,
    components: newComponentsArray,
    focusComponent: modifiedComponent,
    focusChild: modifiedChild
  };
};
