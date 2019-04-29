import setSelectableParents from './setSelectableParents.util';
import getSelectable from './getSelectable.util';
import getColor from './colors.util';

const initialComponentState = {
  id: null,
  stateful: false,
  title: '',
  parentIds: [],
  color: getColor(),
  draggable: true,
  childrenIds: [],
  selectableParents: [],
  expanded: true,
  props: [],
  nextPropId: 1,
  position: {
    x: 25,
    y: 25,
    width: 600,
    height: 400,
  },
  childrenArray: [],
  nextChildId: 1,
  focusChildId: 0,
};

export const addComponent = (state, { title }) => {
  const strippedTitle = title
    .replace(/[a-z]+/gi, word => word[0].toUpperCase() + word.slice(1))
    .replace(/[-_\s0-9\W]+/gi, '');

  if (state.components.find(comp => comp.title === strippedTitle)) {
    window.alert(
      `a component with the name: "${strippedTitle}" already exists.\n Please think of another name.`,
    );
    return {
      ...state,
    };
  }
  const componentColor = getColor();
  const componentId = state.nextId.toString();

  const pseudoChild = {
    childId: '-1',
    childComponentId: componentId,
    componentName: strippedTitle,
    position: {
      x: 25,
      y: 25,
      width: 600,
      height: 400,
    },
    draggable: true,
    color: componentColor,
  };

  const newComponent = {
    ...initialComponentState,
    title: strippedTitle,
    id: componentId,
    color: componentColor,
    childrenArray: [pseudoChild],
  };

  const components = [...state.components, newComponent];

  const totalComponents = state.totalComponents + 1;
  const nextId = state.nextId + 1;

  const selectableChildren = state.components
    .map(comp => comp.id)
    .filter(id => id !== newComponent.id);

  return {
    ...state,
    totalComponents,
    nextId,
    components,
    focusComponent: newComponent,
    ancestors: [],
    selectableChildren, // new component so you everyone except yourself is available
  };
};

// get title (aka the class associated with the new child)
// get the focus component (aka the component were adding the child to)

export const addChild = (state, { title }) => {
  const strippedTitle = title;
  // .replace(/[a-z]+/gi, word => word[0].toUpperCase() + word.slice(1))
  // .replace(/[-_\s0-9\W]+/gi, "");

  // view represents the curretn FOCUSED COMPONENT - this is the component where the child is being added to
  // we only add childrent (or do any action) to the focused omconent
  const view = state.components.find(comp => comp.title === state.focusComponent.title);

  // parentComponent is the component this child is generated from (ex. instance of Box has comp of Box)
  const parentComponent = state.components.find(comp => comp.title === title);

  const newChild = {
    childId: view.nextChildId.toString(),
    childComponentId: parentComponent.id,
    componentName: strippedTitle,
    position: {
      x: 110 + view.nextChildId * 5,
      y: 120 + view.nextChildId * 5,
      width: 50,
      height: 50,
    },
    draggable: true,
    color: parentComponent.color,
    // ancestors: [focusComponent]
  };

  const compsChildrenArr = [...view.childrenArray, newChild];

  const component = {
    ...view,
    childrenArray: compsChildrenArr,
    focusChildId: newChild.childId,
    nextChildId: view.nextChildId + 1,
  };

  const components = [
    ...state.components.filter((comp) => {
      if (comp.title !== view.title) return comp;
    }),
    component,
  ];
  console.log(components, newChild);

  return {
    ...state,
    components,
    focusChild: newChild,
  };
};

export const deleteChild = (
  state,
  {
    parentId = state.focusComponent.id,
    childId = state.focusChild.childId,
    calledFromDeleteComponent = false,
  },
) => {
  // console.log(`delete child here. state.focusChild.childId = ${state.focusChild.childId}  state.focusComponent.id=${state.focusComponent.id}`)
  /** ************************************************
  if no parameters are provided we default to delete the FOCUSED CHILD of the FOCUSED COMPONENTS
  however when deleting  component we wnt to delete ALL the places where it's used, so we call this function
  Also when calling from DELETE components , we do not touch focusCOmponent.
 ************************************************************************************ */
  if (!parentId) {
    window.alert('Cannot delete Child if parent id = ZERO ');
    return state;
  }
  if (!childId) {
    window.alert('Cannot delete Child if Child id = ZERO');
    return state;
  }
  if (childId === '-1') {
    window.alert('Cannot delete component border (pseudochild)');
    return state;
  }
  console.log(`delete child parentid: ${parentId} cildId: ${childId}`);
  // make a DEEP copy of the parent component (the one thats about to loose a child)
  const parentComponentCopy = JSON.parse(
    JSON.stringify(state.components.find(c => c.id == parentId)),
  );

  // delete the  CHILD from the copied array
  const indexToDelete = parentComponentCopy.childrenArray.findIndex(
    elem => elem.childId == childId,
  );
  if (indexToDelete < 0) return window.alert('DeleteChild speaking here. The child u r trying to delete was not found');
  parentComponentCopy.childrenArray.splice(indexToDelete, 1);

  const modifiedComponentArray = [
    ...state.components.filter(c => c.id !== parentId), // all elements besides the one just changed
    parentComponentCopy,
  ];

  // RETURN - update state...
  return {
    ...state,
    components: modifiedComponentArray,
    focusComponent: calledFromDeleteComponent ? state.focusComponent : parentComponentCopy, // when called from delete component we dont need want to touch the focus
    focusChild: {}, // reset to blank.
  };
};

export const handleTransform = (state, {
  componentId, childId, x, y, width, height,
}) => {
  const child = state.components
    .find(comp => comp.id === componentId)
    .childrenArray.find(child => child.childId === childId);

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
    ...state.components.find(comp => comp.id === componentId).childrenArray.filter((child) => {
      if (child.childId !== childId) return child;
    }),
    transformedChild,
  ];

  const component = {
    ...state.components.find(comp => comp.id === componentId),
    childrenArray: children,
  };

  const components = [
    ...state.components.filter((comp) => {
      if (comp.id !== componentId) return comp;
    }),
    component,
  ];

  return {
    ...state,
    components,
  };
};

// export const updateComponent = (
//   state,
// ) => {

//   // lives on the state
//   let currentAncestors = [state.focusChild];

//   for (let i=0; i<currentAncestors; i++) {

//   }

// };

// export const updateComponent = (
//   state,
//   { id, newParentId = null, color = null, stateful = null, props = null }
// ) => {
//   let component;
//   const components = state.components.map(comp => {
//     if (comp.id === id) {
//       component = { ...comp };
//       if (newParentId) {
//         const parentIdsSet = new Set(component.parentIds);
//         if (parentIdsSet.has(newParentId)) {
//           parentIdsSet.delete(newParentId);
//         } else {
//           parentIdsSet.add(newParentId);
//         }
//         component.parentIds = [...parentIdsSet];
//       }
//       if (props) {
//         component.props = props;
//         component.nextPropId += 1;
//       }
//       component.color = color || component.color;
//       component.stateful = stateful === null ? component.stateful : stateful;
//       return component;
//     }
//     return comp;
//   });

//   return {
//     ...state,
//     components,
//     focusComponent: component
//   };
// };

// Delete component with the index for now, but will be adjusted to use id

export const deleteComponent = (state, { componentId }) => {
  // const { focusComponent } = state;
  // const components = [
  //   ...state.components.slice(0, index),
  //   ...state.components.slice(index + 1)
  // ];
  if (componentId == 1) {
    return {
      ...state,
    };
  }

  const indexToDelete = state.components.findIndex(comp => comp.id == componentId);
  console.log('index to delete: ', indexToDelete);

  const componentsCopy = JSON.parse(JSON.stringify(state.components));
  componentsCopy.splice(indexToDelete, 1);
  const totalComponents = state.totalComponents - 1;

  console.log(`Real delete component action here : id:${componentId}`);
  return {
    ...state,
    totalComponents,
    components: componentsCopy,
  };
};

export const changeFocusComponent = (state, { title }) => {
  const newFocusComp = state.components.find(comp => comp.title === title);
  // set the "focus child" to the focus child of this particular component .
  const newFocusChildId = newFocusComp.focusChildId;

  const newFocusChild = newFocusComp.childrenArray.find(child => child.childId == newFocusChildId);

  const result = getSelectable(newFocusComp, state.components);

  return {
    ...state,
    focusComponent: newFocusComp,
    selectableChildren: result.selectableChildren,
    ancestors: result.ancestors,
    focusChild: newFocusChild,
  };
};

export const changeFocusChild = (state, { title, childId }) => {
  // just finds first child with given title, need to pass in specific childId somehow
  // maybe default to title if childId is unknown
  const focComp = state.components.find(comp => comp.title === state.focusComponent.title);
  const newFocusChild = focComp.childrenArray.find(child => child.childId === childId) || state.focusChild;
  return {
    ...state,
    focusChild: newFocusChild,
  };
};

export const changeComponentFocusChild = (state, { componentId, childId }) => {
  const component = state.components.find(comp => comp.id == componentId);
  component.focusChildId = childId;
  const components = state.components.filter(comp => comp.id != componentId);
  return {
    ...state,
    components: [component, ...components],
  };
};

// Add or remove children
export const updateChildren = (state, { parentIds, childId }) => {
  const components = state.components.map((component) => {
    if (parentIds.includes(component.id)) {
      const parentComp = { ...component };
      const childrenIdsSet = new Set(parentComp.childrenIds);
      if (childrenIdsSet.has(childId)) {
        childrenIdsSet.delete(childId);
      } else {
        childrenIdsSet.add(childId);
      }

      parentComp.childrenIds = [...childrenIdsSet];
      return parentComp;
    }
    return component;
  });

  return {
    ...state,
    components,
  };
};

/**
 * Moves component to the end of the components effectively giving it the highest z-index
 * @param {object} state - The current state of the application
 * @param {string} componentId - The id of the component that is to be moved
 */

export const moveToTop = (state, componentId) => {
  const components = state.components.concat();
  const index = components.findIndex(component => component.id === componentId);
  const removedComponent = components.splice(index, 1);
  components.push(removedComponent[0]);

  return {
    ...state,
    components,
  };
};

/**
 * Updates the current image path with the newly provided path
 * @param {object} state - The current state of the application
 * @param {string} imagePath - The new path for the updated image
 */

export const changeImagePath = (state, imagePath) => ({
  ...state,
  imagePath,
});

// Assign comp's children to comp's parent
export const reassignParent = (state, { index, id, parentIds = [] }) => {
  // Get all childrenIds of the component to be deleted
  const { childrenIds } = state.components[index];
  const components = state.components.map((comp) => {
    // Give each child their previous parent's parent
    if (childrenIds.includes(comp.id)) {
      const prevParentIds = comp.parentIds.filter(parentId => parentId !== id);
      return {
        ...comp,
        parentIds: [...new Set(prevParentIds.concat(parentIds))],
      };
    }
    // Give the parent all children of it's to be deleted child
    if (parentIds.includes(comp.id)) {
      const prevChildrenIds = comp.childrenIds;
      return {
        ...comp,
        childrenIds: [...new Set(prevChildrenIds.concat(childrenIds))],
      };
    }
    return comp;
  });

  return {
    ...state,
    components,
  };
};

export const setSelectableP = state => ({
  ...state,
  components: setSelectableParents(state.components),
});

export const exportFilesSuccess = (state, { status, dir }) => ({
  ...state,
  successOpen: status,
  appDir: dir,
  loading: false,
});

export const exportFilesError = (state, { status, err }) => ({
  ...state,
  errorOpen: status,
  appDir: err,
  loading: false,
});

export const handleClose = (state, status) => ({
  ...state,
  errorOpen: status,
  successOpen: status,
});

// export const updatePosition = (state, { id, x, y }) => {
//   const components = state.components.map(component => {
//     if (component.id === id) {
//       return {
//         ...component,
//         position: {
//           x,
//           y,
//           width: component.position.width,
//           height: component.position.height
//         }
//       };
//     }
//     return component;
//   });
//   return {
//     ...state,
//     components
//   };
// };

// handleTransform used to be here

/**
 * Moves component to the front of the components effectively giving it the lowest z-index
 * @param {object} state - The current state of the application
 * @param {string} componentId - The id of the component that is to be moved
 */

export const moveToBottom = (state, componentId) => {
  const components = state.components.concat();
  const index = components.findIndex(component => component.id === componentId);
  const removedComponent = components.splice(index, 1);
  components.unshift(removedComponent[0]);

  return {
    ...state,
    components,
  };
};

/**
 * Selects a component and sets it as the focusComponent. The focus component is used to
 * sync up expanding the panel, adding the transformer, and showing the components
 * corresponding props.
 * @param {object} state - The current state of the application
 * @param {object} component - The component we want to assign as the currently focused component
 */

export const openExpansionPanel = (state, { component }) => ({
  ...state,
  // focusComponent: component,
});

export const addProp = (state, {
  key, value = null, required, type,
}) => {
  if (!state.focusComponent.id) {
    console.log('Add prop error. no focused component ');
    return state;
  }

  const selectedComponent = state.components.find(comp => comp.id == state.focusComponent.id);

  const newProp = {
    id: selectedComponent.nextPropId.toString(),
    key,
    value: value || key,
    required,
    type,
  };
  const newProps = [...selectedComponent.props, newProp];

  const modifiedComponent = {
    ...selectedComponent,
    props: newProps,
    nextPropId: selectedComponent.nextPropId + 1,
  };
  // const { props, nextPropId, id } = state.focusComponent;

  // const newProps = [...props, newProp];
  // return updateComponent(state, { id, props: newProps });
  const newComponents = state.components.filter(comp => comp.id != selectedComponent.id);
  newComponents.push(modifiedComponent);
  return {
    ...state,
    components: newComponents,
  };
};

export const deleteProp = (state, { index }) => {
  const { props, id } = state.focusComponent;
  const newProps = [...props.slice(0, index), ...props.slice(index + 1)];
  return updateComponent(state, { id, props: newProps });
};

export const getSelectableParents = (state) => {
  const result = getSelectable();
};
