import setSelectableParents from "./setSelectableParents.util";
import getSelectable from "./getSelectable.util";
import getColor from "./colors.util";

const initialComponentState = {
  id: null,
  stateful: false,
  title: "",
  parentIds: [],
  color: getColor(),
  draggable: true,
  childrenIds: [],
  selectableParents: [],
  expanded: true,
  props: [],
  nextPropId: 0,
  position: {
    x: 110,
    y: 120,
    width: 50,
    height: 50
  },

  childrenArray: [],
  nextChildId: 1,
  focusChild: null
};

export const addComponent = (state, { title }) => {
  const strippedTitle = title
    .replace(/[a-z]+/gi, word => word[0].toUpperCase() + word.slice(1))
    .replace(/[-_\s0-9\W]+/gi, "");

  if (state.components.find(comp => comp.title === strippedTitle)) {
    window.alert(`a component with the name: "${strippedTitle}" already exists.\n Please think of another name.`);
    return {
      ...state
    };
  }
  const newComponent = {
    ...initialComponentState,
    title: strippedTitle,
    id: state.nextId.toString(),
    color: getColor()
  };

  const components = [...state.components, newComponent];

  const totalComponents = state.totalComponents + 1;
  const nextId = state.nextId + 1;

  let selectableChildren = state.components
    .map(comp => comp.id)
    .filter(id => id !== newComponent.id);

  return {
    ...state,
    totalComponents,
    nextId,
    components,
    focusComponent: newComponent,
    ancestors: [],
    selectableChildren: selectableChildren // new component so you everyone except yourself is available
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
  const view = state.components.find(
    comp => comp.title === state.focusComponent.title
  );

  // parentComponent is the component this child is generated from (ex. instance of Box has comp of Box)
  const parentComponent = state.components.find(comp => comp.title === title);

  // console.log("view from addChild: ", view);

  const newChild = {
    childId: view.nextChildId.toString(),
    childComponentId: parentComponent.id,
    componentName: strippedTitle,
    position: {
      x: 110,
      y: 120,
      width: 50,
      height: 50
    },
    draggable: true,
    color: parentComponent.color
    // ancestors: [focusComponent]
  };

  const compsChildrenArr = [...view.childrenArray, newChild];

  const component = {
    ...view,
    childrenArray: compsChildrenArr,
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
    focusChild: newChild
  };
};

export const deleteChild = (state, {} )=>{
 // The child to delete is the FOCUSED child 
 // THE parent is the FOCUSED component 

  console.log((`Focused Component (parent) id:${state.focusComponent.id} title:${state.focusComponent.title}
 Focused Child (the one 2 be deleted) ChildID:${state.focusChild.childId}`)
)
 
 if (!state.focusComponent.id) return window.alert(`Cannot delete Child if Focused component id = ZERO`)
 if (!state.focusChild.childId) return window.alert(`Cannot delete Child if Focused Child id = ZERO`)
 // I'm not sure what the "focused component" is (a reference, a copy or ? 
 // So, let's  get a reference to the focused component .. 
 const currFocusedComponent = state.components.find( c => c.id == state.focusComponent.id) ; 
 console.log('currFocusedComponent: ' ,currFocusedComponent )
 // copy the Children Array of the foxused component 
 
 console.log('Wtf ?')
 const copyOfChildrenArray = [...currFocusedComponent.childrenArray]
console.log('copyOfChildrenArray',copyOfChildrenArray)
console.log('after copy : state.focusChild.childId:',state.focusChild.childId)
 // delete the SELECTED CHILD from the copied array 
  const indexToDelete = copyOfChildrenArray.findIndex( elem => elem.childId == state.focusChild.childId)
  console.log(`Index to delete : ${indexToDelete}`)

  if (indexToDelete < 0 ) return  window.alert(`DeleteChild speaking here. The chils u r trying to delete was not found`);

  copyOfChildrenArray.splice(indexToDelete,1)

  //Make a copy of the focused component - this is the one we will modify 
  const copyOfFocusedComponent = {
    ...currFocusedComponent,
    childrenArray: copyOfChildrenArray
  }

  console.log(`copyOfFocusedComponent:`)
  console.log(copyOfFocusedComponent)
  // copy the entire compoenents array from state 
  const modifiedComponentArray = [
    ...state.components.filter( c => c.id !== currFocusedComponent.id ) , // all elements besides the one just changed 
    copyOfFocusedComponent
  ]
console.log('modifiedComponentArray')
console.log(modifiedComponentArray)

  // RETURN - update state...
  return {
    ...state,
    components: modifiedComponentArray,
    focusComponent: copyOfFocusedComponent, // problem! the delete works on State.components, but not on FOcus component.. starnge.. 
    focusChild: {} // reset to blank. 

  }  
}

export const handleTransform = (
  state,
  { componentId, childId, x, y, width, height }
) => {
  // console.log('componentId and childId: ', componentId, childId);
  // console.log('state.focuscomponent: ', state.focusComponent);
  console.log("incoming x and y: ", x, y);
  const child = state.components
    .find(comp => comp.id === componentId)
    .childrenArray.find(child => child.childId === childId);

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

  const component = {
    ...state.components.find(comp => comp.id === componentId),
    childrenArray: children
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

// export const updateComponent = (
//   state,
// ) => {

//   // lives on the state
//   let currentAncestors = [state.focusChild];

//   for (let i=0; i<currentAncestors; i++) {

//   }

// };

export const updateComponent = (
  state,
  { id, newParentId = null, color = null, stateful = null, props = null }
) => {
  let component;
  const components = state.components.map(comp => {
    if (comp.id === id) {
      component = { ...comp };
      if (newParentId) {
        const parentIdsSet = new Set(component.parentIds);
        if (parentIdsSet.has(newParentId)) {
          parentIdsSet.delete(newParentId);
        } else {
          parentIdsSet.add(newParentId);
        }
        component.parentIds = [...parentIdsSet];
      }
      if (props) {
        component.props = props;
        component.nextPropId += 1;
      }
      component.color = color || component.color;
      component.stateful = stateful === null ? component.stateful : stateful;
      return component;
    }
    return comp;
  });

  return {
    ...state,
    components,
    focusComponent: component
  };
};

// Delete component with the index for now, but will be adjusted to use id
export const deleteComponent = (state, { index, id }) => {
  const { focusComponent } = state;
  const components = [
    ...state.components.slice(0, index),
    ...state.components.slice(index + 1)
  ];

  const totalComponents = state.totalComponents - 1;

  return {
    ...state,
    totalComponents,
    components,
    focusComponent: focusComponent.id === id ? {} : focusComponent
  };
};

export const changeFocusComponent = (state, { title }) => {
  const newFocusComp = state.components.find(comp => comp.title === title);

  let result = getSelectable(newFocusComp, state.components);

  return {
    ...state,
    focusComponent: newFocusComp,
    selectableChildren: result.selectableChildren,
    ancestors: result.ancestors
  };
};

export const changeFocusChild = (state, { title, childId }) => {
  // just finds first child with given title, need to pass in specific childId somehow
  // maybe default to title if childId is unknown
  const focComp = state.components.find(
    comp => comp.title === state.focusComponent.title
  );
  const newFocusChild =
    focComp.childrenArray.find(child => child.childId === childId) ||
    state.focusChild;
  return {
    ...state,
    focusChild: newFocusChild
  };
};

// Add or remove children
export const updateChildren = (state, { parentIds, childId }) => {
  const components = state.components.map(component => {
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
    components
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
    components
  };
};

/**
 * Updates the current image path with the newly provided path
 * @param {object} state - The current state of the application
 * @param {string} imagePath - The new path for the updated image
 */

export const changeImagePath = (state, imagePath) => ({
  ...state,
  imagePath
});

// Assign comp's children to comp's parent
export const reassignParent = (state, { index, id, parentIds = [] }) => {
  // Get all childrenIds of the component to be deleted
  const { childrenIds } = state.components[index];
  const components = state.components.map(comp => {
    // Give each child their previous parent's parent
    if (childrenIds.includes(comp.id)) {
      const prevParentIds = comp.parentIds.filter(parentId => parentId !== id);
      return {
        ...comp,
        parentIds: [...new Set(prevParentIds.concat(parentIds))]
      };
    }
    // Give the parent all children of it's to be deleted child
    if (parentIds.includes(comp.id)) {
      const prevChildrenIds = comp.childrenIds;
      return {
        ...comp,
        childrenIds: [...new Set(prevChildrenIds.concat(childrenIds))]
      };
    }
    return comp;
  });

  return {
    ...state,
    components
  };
};

export const setSelectableP = state => ({
  ...state,
  components: setSelectableParents(state.components)
});

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

/**
 * Applies the new x and y coordinates, as well as, the new width
 * and height the of components to the component with the provided id.
 * The transformation is calculated on component drags, as well as, whe the
 * component is resized
 * @param {object} state - The current state of the application
 * @param {object} transform - Object containing new transformation
 * @param {string} id - id of the component we want to apply the transformation to
 * @param {number} x - updated x coordinate
 * @param {number} y - updated y coordinate
 * @param {number} width - updated width
 * @param {number} height - updated height
 */

// handleTransform used to be here

/**
 * Toggles the drag of the group, as well as all components. If the group is draggable the
 * rectangles need to be undraggable so the user can drag the group from anywhere
 * @param {object} state - The current state of the application
 * @param {boolean} status - The boolean value to apply to all draggable components
 */

export const toggleDragging = (state, status) => {
  const components = state.components.map(component => ({
    ...component,
    draggable: status
  }));
  return {
    ...state,
    components
  };
};

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
    components
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
  ...state
  // focusComponent: component,
});

export const addProp = (state, { key, value = null, required, type }) => {
  const { props, nextPropId, id } = state.focusComponent;
  const newProp = {
    id: nextPropId.toString(),
    key,
    value: value || key,
    required,
    type
  };
  const newProps = [...props, newProp];
  return updateComponent(state, { id, props: newProps });
};

export const deleteProp = (state, { index }) => {
  const { props, id } = state.focusComponent;
  const newProps = [...props.slice(0, index), ...props.slice(index + 1)];
  return updateComponent(state, { id, props: newProps });
};

export const getSelectableParents = state => {
  let result = getSelectable();
};
