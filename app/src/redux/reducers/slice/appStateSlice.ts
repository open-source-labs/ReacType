// Main slice for all the component state.
import { createSlice } from '@reduxjs/toolkit';
// Import Interfaces for State, and HTML Types
import {   State,
  Action,
  Component,
  ChildElement,
  HTMLType } from '../../../interfaces/Interfaces';
import HTMLTypes from '../../../context/HTMLTypes';
import generateCode from '../../../helperFunctions/generateCode';
import manageSeparators from '../../../helperFunctions/manageSeparators';
const initialState: State = {
  name: '',
  isLoggedIn: false,
  config: { saveFlag: true, saveTimer: false },
  components: [
    {
      id: 1,
      name: 'App',
      style: {},
      code: '<div>Drag in a component or HTML element into the canvas!</div>',
      children: [],
      isPage: true,
      past: [],
      future: [],
      stateProps: [],
      useStateCodes: [], // array of strings for each useState codes
    }
  ],
  projectType: 'Classic React',
  rootComponents: [1],
  canvasFocus: { componentId: 1, childId: null },
  nextComponentId: 2,
  nextChildId: 1,
  nextTopSeparatorId: 1000,
  HTMLTypes,
  tailwind: false
};

let separator = initialState.HTMLTypes[1];

const findComponent = (components: Component[], componentId: number) => {
  return components.find((elem) => elem.id === componentId);
};

// Finds a parent
// returns object with parent object and index value of child
const findParent = (component: Component, childId: number) => {
  // using a breadth first search to search through instance tree
  // We're going to keep track of the nodes we need to search through with an Array
  //  Initialize this array with the top level node
  const nodeArr: (Component | ChildElement)[] = [component];
  // iterate through each node in the array as long as there are elements in the array
  while (nodeArr.length > 0) {
    // shift off the first value and assign to an element
    const currentNode = nodeArr.shift();
    // try to find id of childNode in children
    if (currentNode.name !== 'input' && currentNode.name !== 'img') {
      for (let i = 0; i <= currentNode.children.length - 1; i++) {
        // if match is found return object with both the parent and the index value of the child
        if (currentNode.children[i].childId === childId) {
          return { directParent: currentNode, childIndexValue: i };
        }
      }
      // if child node isn't found add each of the current node's children to the search array
      currentNode.children.forEach((node: ChildElement) =>
        nodeArr.push(node)
      );
    }
  }
  // if no search is found return -1
  return { directParent: null, childIndexValue: null };
};

// determine if there's a child of a given type in a component
const childTypeExists = (
  type: string,
  typeId: number,
  component: Component
) => {
  const nodeArr = [...component.children];
  // breadth-first search through component tree to see if a child exists
  while (nodeArr.length > 0) {
    // shift off the first value and assign to an element
    const currentNode = nodeArr.shift();
    if (currentNode.type === type && currentNode.typeId === typeId)
      return true;
    // if child node isn't found add each of the current node's children to the search array
    currentNode.children.forEach((node) => nodeArr.push(node));
  }
  // if no match is found return false
  return false;
};
// find child in component and return child object
const findChild = (component: Component, childId: number) => {
  if (childId === null) return component;
  const nodeArr = [...component.children];
  // breadth first search through component tree to see if a child exists
  while (nodeArr.length > 0) {
    // shift off the first value and assign to an element
    const currentNode = nodeArr.shift();
    if (currentNode.childId === childId) return currentNode;
    // if child node isn't found add each of the current node's children to the search array
    if (currentNode.name !== 'input' && currentNode.name !== 'img')
      currentNode.children.forEach((node) => nodeArr.push(node));
  }
  // if no match is found return false
  return;
};
// update all ids and typeIds to match one another
const updateAllIds = (comp: Component[] | ChildElement[]) => {
  // put components' names and ids into an obj
  const obj = { spr: 1000, others: 1 };
  // comp.forEach((el) => {
  //   if (!obj[el.name]) obj[el.name] = el.id;
  // });
  // for each of the components, if it has children, iterate through that children array
  comp.forEach((el) => {
    if (el.children.length > 0) {
      for (let i = 0; i < el.children.length; i++) {
        // update each child's childId
        if (el.children[i].name === 'separator') {
          el.children[i].childId = obj['spr']++;
        } else {
          el.children[i].childId = obj['others']++;
        }
        // // if the child's name and id exists in the object
        // if (obj[el.children[i].name]) {
        //   // set the child's typeId to be the value in the object of the child's name key
        //   el.children[i].typeId = obj[el.children[i].name];
        // }
        // recursively call the updateAllIds function on the child's children array if
        // the child's children array is greater than 0
        if (el.children[i].children.length > 0) {
          updateAllIds(el.children[i].children);
        }
      }
    }
  });
};
const updateIds = (components: Component[]) => {
  // component IDs should be array index + 1
  components.forEach((comp, i) => (comp.id = i + 1));
  updateAllIds(components);
  // create key-value pairs of component names and corresponding IDs
  const componentIds = {};
  components.forEach((component) => {
    if (!component.isPage) componentIds[component.name] = component.id;
  });
  // assign correct ID to components that are children inside of remaining pages
  components.forEach((page) => {
    if (page.isPage) {
      page.children.forEach((child) => {
        if (child.type === 'Component')
          child.typeId = componentIds[child.name];
      });
    }
  });
  return components;
};
const updateRoots = (components: Component[]) => {
  const roots = [];
  // for each of the components in the passed in array of components, if the child component
  // is a page, push its id into the roots array
  components.forEach((comp) => {
    if (comp.isPage) roots.push(comp.id);
  });
  return roots;
};
const deleteById = (id: number, name: string): Component[] => {
  // name of the component we want to delete
  const checkChildren = (child: Component[] | ChildElement[]) => {
    // for each of the components in the passed in components array, if the child
    // component has a children array, iterate through the array of children
    child.forEach((el) => {
      if (el.children.length) {
        const arr: ChildElement[] = [];
        for (let i = 0; i < el.children.length; i++) {
          // check to see if the name variable doesn't match the name of the child
          if (el.children[i].name !== name) {
            // if so, push into the new array the child component
            arr.push(el.children[i]);
          }
        }
        // set the children array to be the new array
        el.children = arr;
        // recursively call the checkChildren function with the updated children array
        checkChildren(el.children);
      }
    });
  };
  // creating a copy of the components array
  const copyComp = [...state.components];
  if (copyComp.length) {
    checkChildren(copyComp);
  }
  const filteredArr = [...copyComp].filter((comp) => comp.id != id);
  return updateIds(filteredArr);
};
const convertToJSX = (arrayOfElements) => {
  // if id exists in state.HTMLTypes
  for (let i = 0; i < initialState.HTMLTypes.length; i += 1) {
    arrayOfElements[i] = initialState.HTMLTypes[i];
  }
};
const updateUseStateCodes = (currentComponent) => {
  // array of snippets of state prop codes
  const localStateCode = [];
  currentComponent.stateProps
    .filter((n, i) => i % 2 === 0)
    .forEach((stateProp) => {
      const useStateCode = `const [${stateProp.key}, set${
        stateProp.key.charAt(0).toUpperCase() + stateProp.key.slice(1)
      }] = useState<${stateProp.type} | undefined>(${JSON.stringify(
        stateProp.value
      )})`;
      localStateCode.push(useStateCode);
    });
  if (currentComponent.name !== 'App' && currentComponent.name !== 'Index') {
    currentComponent.passedInProps.forEach((passedInProp) => {
      const prop = `const ${passedInProp.key} = props.${passedInProp.key}`;
      localStateCode.push(prop);
    });
  }
  // store localStateCodes in global state context
  return localStateCode;
};


// Creates new slice for components with applicable reducers
const appStateSlice = createSlice({
  name: 'appState',
  initialState,
  reducers: {
    addComponent: (state,action) => {
      if (
        typeof action.payload.componentName !== 'string' ||
        action.payload.componentName === ''
      )
        return state;
      const components = [...state.components];
      const newComponent = {
        id: state.components.length + 1,
        name: action.payload.componentName,
        nextChildId: 1,
        style: {},
        attributes: {},
        code: '',
        children: [],
        isPage: action.payload.root,
        past: [],
        future: [],
        stateProps: [],
        useStateCodes: [],
        passedInProps: []
      };
      components.push(newComponent);
      // functionality if the new component will become the root component
      const rootComponents = [...state.rootComponents];
      if (action.payload.root) rootComponents.push(newComponent.id);
      // updates the focus to the new component, which redirects to the new blank canvas of said new component

      // change canvas focus to just created component
      // const canvasFocus = {
      //   ...state.canvasFocus,
      //   componentId: newComponent.id,
      //   childId: null
      // };
      const nextComponentId = state.nextComponentId + 1;
      newComponent.code = generateCode(
        components,
        newComponent.id,
        [...state.rootComponents],
        state.projectType,
        state.HTMLTypes,
        state.tailwind
      );
      // return {
      //   ...state,
      //   components,
      //   rootComponents,
      //   nextComponentId
      //   // canvasFocus
      // };
      state.components = components;
      state.rootComponents = rootComponents;
      state.nextComponentId = nextComponentId

    
    },
    // addChild: (state,action) => {
      
    // }




      changeFocus: (state, action) => {
      const { componentId, childId } = action.payload;
      if (childId < 1000) {
        // makes separators not selectable
        state.canvasFocus = { ...state.canvasFocus, componentId, childId };
        //makes it so the code preview will update when clicking on a new component
        state.components = state.components.map((element) => {
          return Object.assign({}, element);
        });
      }
 
    
    },
    resetAllState: (state) => {
      Object.assign(state, initialState);
    }
  
  }
});

// Exports the action creator function to be used with useDispatch
export const {addComponent, changeFocus, resetAllState } = appStateSlice.actions;
// Exports so we can combine in rootReducer
export default appStateSlice.reducer;
