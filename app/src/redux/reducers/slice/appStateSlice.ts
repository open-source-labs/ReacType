// Main slice for all the component state.///
import { createSlice } from '@reduxjs/toolkit';
// Import Interfaces for State, and HTML Types
import {
  State,
  Action,
  Component,
  ChildElement,
  HTMLType
} from '../../../interfaces/Interfaces';
import HTMLTypes from '../../HTMLTypes';
import generateCode from '../../../helperFunctions/generateCode';
import manageSeparators from '../../../helperFunctions/manageSeparators';
export const initialState: State = {
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
const deleteById = (id: number, name: string, state: object): Component[] => {
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
      const useStateCode = `const [${stateProp.key}, set${stateProp.key.charAt(0).toUpperCase() + stateProp.key.slice(1)
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
    addComponent: (state, action) => {
      if (
        typeof action.payload.componentName !== 'string' ||
        action.payload.componentName === ''
      ) {
        // return state;
        return
      }

      // const components = [...state.components];
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
      state.components.push(newComponent);
      // functionality if the new component will become the root component
      // const rootComponents = [...state.rootComponents];
      if (action.payload.root) state.rootComponents.push(newComponent.id);
      // updates the focus to the new component, which redirects to the new blank canvas of said new component

      // change canvas focus to just created component
      // const canvasFocus = {
      //   ...state.canvasFocus,
      //   componentId: newComponent.id,
      //   childId: null
      // };
      const nextComponentId = state.nextComponentId + 1;
      newComponent.code = generateCode(
        state.components,
        newComponent.id,
        [...state.rootComponents],
        state.projectType,
        state.HTMLTypes,
        state.tailwind,
        action.payload.contextParam

      );

      // return {
      //   ...state,
      //   components,
      //   rootComponents,
      //   nextComponentId
      // canvasFocus
      // },
      // state.components = components;
      // state.rootComponents = rootComponents;
      state.nextComponentId = nextComponentId


    },
    addChild: (state, action) => {
      let parentComponentId: number;
      const {
        type,
        typeId,
        childId
      }: { type: string; typeId: number; childId: any } = action.payload;
      if (action.payload.copyId) {
        parentComponentId = action.payload.copyId;
      } else {
        parentComponentId = state.canvasFocus.componentId;
      }

      const components = [...state.components];

      const parentComponent = findComponent(components, parentComponentId);
      let componentName: string = '';
      let componentChildren: Object[] = [];
      if (type === 'Component') {
        components.forEach((comp) => {
          if (comp.id === typeId) {
            componentName = comp.name;
            componentChildren = comp.children;
          }
        });
      }
      if (type === 'Component') {
        const originalComponent = findComponent(state.components, typeId);
        if (childTypeExists('Component', parentComponentId, originalComponent))
          return state;
      }

      let newName = state.HTMLTypes.reduce((name, el) => {
        if (typeId === el.id) {
          name = type === 'Component' ? componentName : el.tag;
        }
        return name;
      }, '');

      if (type === 'Route Link') {
        components.find((comp) => {
          if (comp.id === typeId) {
            newName = comp.name;
            return;
          }
        });
      }
      const newChild: ChildElement = {
        type,
        typeId,
        name: newName,
        childId: state.nextChildId,
        style: {},
        attributes: {},
        events: {},
        children: componentChildren,
        stateProps: [], //legacy pd: added stateprops and passedinprops
        passedInProps: []
      };
      const topSeparator: ChildElement = {
        type: 'HTML Element',
        typeId: separator.id,
        name: 'separator',
        childId: state.nextTopSeparatorId,
        style: separator.style,
        attributes: {},
        children: []
      };
      // if the childId is null, this signifies that we are adding a child to the top-level component rather than another child element
      // we also add a separator before any new child
      // if the newChild Element is an input or img type, delete the children key/value pair
      if (newChild.name === 'input' && newChild.name === 'img')
        delete newChild.children;
      let directParent;
      if (childId === null) {
        parentComponent.children.push(topSeparator);
        parentComponent.children.push(newChild);
      }
      // if there is a childId (childId here references the direct parent of the new child) find that child and a new child to its children array
      else {
        directParent = findChild(parentComponent, childId);
        //disable nesting a component inside a HTML element
        if (directParent.type === 'HTML Element' && type === 'HTML Element') {
          directParent.children.push(topSeparator);
          directParent.children.push(newChild);
        } else {
          return { ...state };
        }
      }
      const canvasFocus = {
        ...state.canvasFocus,
        componentId: state.canvasFocus.componentId,
        childId: newChild.childId
      };
      const nextChildId = state.nextChildId + 1;
      let nextTopSeparatorId = state.nextTopSeparatorId + 1;
      let addChildArray = components[canvasFocus.componentId - 1].children;
      addChildArray = manageSeparators.mergeSeparator(addChildArray, 1);
      if (directParent && directParent.name === 'separator')
        nextTopSeparatorId = manageSeparators.handleSeparators(
          addChildArray,
          'add'
        );
      components[canvasFocus.componentId - 1].children = addChildArray;


      parentComponent.code = generateCode(
        components,
        parentComponentId,
        [...state.rootComponents],
        state.projectType,
        state.HTMLTypes,
        state.tailwind,
        action.payload.contextParam
      );

      // return {
      //   ...state,
      //   components,
      //   nextChildId,
      //   canvasFocus,
      //   nextTopSeparatorId
      // };
      state.components = components;
      state.nextChildId = nextChildId;
      state.canvasFocus = canvasFocus;
      state.nextTopSeparatorId = nextTopSeparatorId;
    },
    changeTailwind: (state, action) => {
      // return { ...state, tailwind: action.payload }
      state.tailwind = action.payload;
    },
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
    updateStateUsed: (state, action) => {
      const { stateUsedObj } = action.payload;
      const components = [...state.components];
      const component = findComponent(
        components,
        state.canvasFocus.componentId
      );
      const targetChild = findChild(component, state.canvasFocus.childId);
      targetChild.stateUsed = stateUsedObj;
      component.code = generateCode(
        components,
        state.canvasFocus.componentId,
        [...state.rootComponents],
        state.projectType,
        state.HTMLTypes,
        state.tailwind,
        action.payload.contextParam
      );
      // return { ...state, components };
      state.components = components;
    },
    updateUseContext: (state, action) => {
      const { useContextObj } = action.payload;
      const components = [...state.components];
      const component = findComponent(
        components,
        state.canvasFocus.componentId
      );
      component.useContext = useContextObj;
      component.code = generateCode(
        components,
        state.canvasFocus.componentId,
        [...state.rootComponents],
        state.projectType,
        state.HTMLTypes,
        state.tailwind,
        action.payload.contextParam
      );
      // return { ...state, components };
      state.components = components;
    },

    resetAllState: (state) => {
      if(state.isLoggedIn){
        Object.assign(state, initialState);
        state.isLoggedIn = true;
        return;
      }
      Object.assign(state, initialState);
     
     
    },
    changePosition: (state, action) => {
      const { currentChildId, newParentChildId } = action.payload;
      // if the currentChild Id is the same as the newParentId (i.e. a component is trying to drop itself into itself), don't update state
      if (currentChildId === newParentChildId) return state;
      // find the current component in focus
      let components = [...state.components];
      const component = findComponent(
        components,
        state.canvasFocus.componentId
      );
      // find the moved element's former parent
      // delete the element from it's former parent's children array

      const { directParent, childIndexValue } = findParent(
        component,
        currentChildId
      );
      // BREAKING HERE during manipulation of positions. Sometimes get a null value when manipulating positions
      // Only run if the directParent exists
      if (directParent) {
        const child = { ...directParent.children[childIndexValue] };
        directParent.children.splice(childIndexValue, 1);
        // if the childId is null, this signifies that we are adding a child to the top level component rather than another child element
        if (newParentChildId === null) {
          component.children.push(child);
        }
        // if there is a childId (childId here references the direct parent of the new child) find that child and a new child to its children array
        else {
          const directParent = findChild(component, newParentChildId);
          directParent.children.push(child);
        }
      }
      let nextTopSeparatorId = state.nextTopSeparatorId;
      components[state.canvasFocus.componentId - 1].children =
        manageSeparators.mergeSeparator(
          components[state.canvasFocus.componentId - 1].children,
          0
        );
      nextTopSeparatorId = manageSeparators.handleSeparators(
        components[state.canvasFocus.componentId - 1].children,
        'change position'
      );
      component.code = generateCode(
        components,
        state.canvasFocus.componentId,
        [...state.rootComponents],
        state.projectType,
        state.HTMLTypes,
        state.tailwind,
        action.payload.contextParam
      );
      // return { ...state, components, nextTopSeparatorId };
      state.components = components;
      state.nextTopSeparatorId = nextTopSeparatorId;
    },


    updateCss: (state, action) => {

      const { style } = action.payload;
      const components = [...state.components];
      const component = findComponent(
        components,
        state.canvasFocus.componentId
      );
      const targetChild = findChild(component, state.canvasFocus.childId);
      targetChild.style = style;
      component.code = generateCode(
        components,
        state.canvasFocus.componentId,
        [...state.rootComponents],
        state.projectType,
        state.HTMLTypes,
        state.tailwind,
        action.payload.contextParam
      );
      // return { ...state, components };
      state.components = components;
    },

    updateAttributes: (state, action) => {
      const { attributes } = action.payload;

      const components = [...state.components];
      const component = findComponent(
        components,
        state.canvasFocus.componentId
      );
      const targetChild = findChild(component, state.canvasFocus.childId);

      targetChild.attributes = attributes;

      component.code = generateCode(
        components,
        state.canvasFocus.componentId,
        [...state.rootComponents],
        state.projectType,
        state.HTMLTypes,
        state.tailwind,
        action.payload.contextParam
      );
      // return { ...state, components };
      state.components = components;
    },


    updateEvents: (state, action) => {
      const { events } = action.payload;
      if (JSON.stringify(events) === '{}') return state;
      const components = [...state.components];
      const component = findComponent(
        components,
        state.canvasFocus.componentId
      );
      const targetChild = findChild(component, state.canvasFocus.childId);
      const event = Object.keys(events)[0];
      const funcName = events[event];
      targetChild.events[event] = funcName;

      component.code = generateCode(
        components,
        state.canvasFocus.componentId,
        [...state.rootComponents],
        state.projectType,
        state.HTMLTypes,
        state.tailwind,
        action.payload.contextParam
      );
      // return { ...state, components };
      state.components = components;
    },

    deleteEventAction: (state, action) => {
      const { event } = action.payload;
      const components = [...state.components];
      const component = findComponent(
        components,
        state.canvasFocus.componentId
      );
      const targetChild = findChild(component, state.canvasFocus.childId);
      delete targetChild.events[event];

      component.code = generateCode(
        components,
        state.canvasFocus.componentId,
        [...state.rootComponents],
        state.projectType,
        state.HTMLTypes,
        state.tailwind,
        action.payload.contextParam
      );
      // return { ...state, components };
      state.components = components;
    },

    deletePage: (state, action) => {
      const id: number = state.canvasFocus.componentId;
      const name: string = state.components[id - 1].name;
      const components: Component[] = deleteById(id, name, state);
      // rebuild rootComponents with correct page IDs
      const rootComponents = updateRoots(components);
      const canvasFocus = { componentId: 1, childId: null };
      // return { ...state, rootComponents, components, canvasFocus };
      state.rootComponents = rootComponents;
      state.components = components;
      state.canvasFocus = canvasFocus;
    },

    deleteReusableComponent: (state, action) => {
      const id: number = state.canvasFocus.componentId;
      const name: string = state.components[id - 1].name;
      // updated list of components after deleting a component
      const components: Component[] = deleteById(id, name, state);
      const rootComponents: number[] = updateRoots(components);
      // iterate over the length of the components array
      for (let i = 0; i < components.length; i++) {
        //if the component uses context from component being deleted
        if (components[i].useContext && components[i].useContext[id]) {
          // iterate over children to see where it is being used, then reset that compText/compLink/useState
          for (let child of components[i].children) {
            if (child.stateUsed) {
              if (child.stateUsed.compTextProviderId === id) {
                child.attributes.compText = '';
                delete child.stateUsed.compText;
                delete child.stateUsed.compTextProviderId;
                delete child.stateUsed.compTextPropsId;
              }
              if (child.stateUsed.compLinkProviderId === id) {
                child.attributes.compLink = '';
                delete child.stateUsed.compLink;
                delete child.stateUsed.compLinkProviderId;
                delete child.stateUsed.compLinkPropsId;
              }
            }
          }
          delete components[i].useContext[id];
        }

        // for each component's code, run the generateCode function to
        // update the code preview on the app
        components[i].code = generateCode(
          components,
          components[i].id,
          rootComponents,
          state.projectType,
          state.HTMLTypes,
          state.tailwind,
          action.payload.contextParam
        );
      }
      const canvasFocus = { componentId: 1, childId: null };
      // return {
      //   ...state,
      //   rootComponents,
      //   components,
      //   canvasFocus,
      //   nextComponentId: id
      // };
      state.rootComponents = rootComponents;
      state.components = components;
      state.canvasFocus = canvasFocus;
      state.nextComponentId = id;

    },
    setProjectName: (state, action) => {
      // return {
      //   ...state,
      //   name: action.payload
      // };
      state.name = action.payload;
    },
    changeProjectType: (state, action) => {
      // when a project type is changed, both change the project type in state and also regenerate the code for each component
      const { projectType } = action.payload;

      const components = [...state.components];
      // also update the name of the root component of the application to fit classic React and next.js/gatsby conventions
      if (projectType === 'Next.js' || projectType === 'Gatsby.js')
        components[0]['name'] = 'index';
      else components[0]['name'] = 'App';
      components.forEach((component) => {
        component.code = generateCode(
          components,
          component.id,
          [...state.rootComponents],
          projectType,
          state.HTMLTypes,
          state.tailwind,
          action.payload.contextParam
        );
      });
      // return { ...state, components, projectType };
      state.components = components;
      state.projectType = projectType;
    },

    resetState: (state, action) => {
      const nextChildId = 1;
      const nextTopSeparatorId = 1000;
      const rootComponents = [1];
      const nextComponentId = 2;
      const canvasFocus = {
        ...state.canvasFocus,
        componentId: 1,
        childId: null
      };
      const rootComponent = {
        ...state.components[0],
        code: '<div>Drag in a component or HTML element into the canvas!</div>',
        children: [],
        style: {}
      };
      const components = [rootComponent];
      return {
        ...state,
        nextChildId,
        nextTopSeparatorId,
        rootComponents,
        nextComponentId,
        components,
        canvasFocus
      };
    },
    updateProjectName: (state, action) => {
      const projectName = action.payload;
      return {
        ...state,
        name: projectName
      };
    },
    deleteElement: (state, action) => {
      let name: string = '';
      const HTMLTypes: HTMLType[] = [...state.HTMLTypes].filter((el) => {
        if (el.id === action.payload.id) {
          name = el.tag;
        }
        return el.id !== action.payload.id;
      });
      const components: Component[] = deleteById(action.payload.id, name, state);
      const rootComponents: number[] = updateRoots(components);
      const canvasFocus = { ...state.canvasFocus, childId: null };
      components.forEach((el, i) => {
        el.code = generateCode(
          components,
          components[i].id,
          rootComponents,
          state.projectType,
          state.HTMLTypes,
          state.tailwind,
          action.payload.contextParam
        );
      });
      // return {
      //   ...state,
      //   canvasFocus,
      //   HTMLTypes
      // };
      state.canvasFocus = canvasFocus;
      state.HTMLTypes = HTMLTypes;
    },

    deleteChild: (state, action) => {
      // if in-focus instance is a top-level component and not a child, don't delete anything
      if (!state.canvasFocus.childId) return state;
      // find the current component in focus
      const components = [...state.components];
      const component = findComponent(
        components,
        state.canvasFocus.componentId
      );
      // find the moved element's former parent
      const { directParent, childIndexValue } = findParent(
        component,
        state.canvasFocus.childId
      );

      //  ------------------------------------------- ALSO added code below  -------------------------------------------

      let canvasFocus = { ...state.canvasFocus, childId: null }; // ADDED to avoid null error
      let nextTopSeparatorId = 1000; // ADDED to avoid null error
      const childIdDeleteClicked = action.payload.id; // ADDED to ensure no cross-element deletion possible

      // delete the element from its former parent's children array, subject to below conditional to avoid null error
      if (
        directParent &&
        (state.canvasFocus.childId === childIdDeleteClicked ||
          JSON.stringify(action.payload.id) === '{}') // Ensuring deletion works for mouseclick OR using delete key, from 2 different dispatch sources
      ) {
        directParent.children.splice(childIndexValue, 1);
        // const canvasFocus = { ...state.canvasFocus, childId: null };
        let nextTopSeparatorId = manageSeparators.handleSeparators(
          components[canvasFocus.componentId - 1].children,
          'delete'
        );
      }

      //  ------------------------------------------- ALSO added code above  -------------------------------------------
      component.code = generateCode(
        components,
        state.canvasFocus.componentId,
        [...state.rootComponents],
        state.projectType,
        state.HTMLTypes,
        state.tailwind,
        action.payload.contextParam
      );
      // return { ...state, components, canvasFocus, nextTopSeparatorId };
      state.components = components;
      state.canvasFocus = canvasFocus;
      state.nextTopSeparatorId = nextTopSeparatorId;

    },
    setInitialState: (state, action) => {
      // set the canvas focus to be the first component
      const canvasFocus = {
        ...action.payload.canvasFocus,
        componentId: 1,
        childId: null
      };
      convertToJSX(action.payload.HTMLTypes);
      // return { ...action.payload, canvasFocus };
      state.canvasFocus = canvasFocus;
    },
    openProject: (state, action) => {
      convertToJSX(action.payload.HTMLTypes);
      // return {
      //   ...action.payload
      // };
      state = action.payload;

    },
    addElement: (state, action) => {
      const HTMLTypes = [...state.HTMLTypes];
      HTMLTypes.push(action.payload);
      // return {
      //   ...state,
      //   HTMLTypes
      // };
      state.HTMLTypes = HTMLTypes;
    },
    undo: (state, action) => {
      const focusIndex = state.canvasFocus.componentId - 1;
      // if the past array is empty, return state
      if (state.components[focusIndex].past.length === 0) return { ...state };
      // the children array of the focused component will equal the last element of the past array
      state.components[focusIndex].children =
        state.components[focusIndex].past[
        state.components[focusIndex].past.length - 1
        ];
      // the last element of the past array gets popped off
      const poppedEl = state.components[focusIndex].past.pop();
      // the last element of the past array gets popped off and pushed into the future array
      state.components[focusIndex].future.push(poppedEl);
      //generate code for the Code Preview
      state.components.forEach((el, i) => {
        el.code = generateCode(
          state.components,
          state.components[i].id,
          state.rootComponents,
          state.projectType,
          state.HTMLTypes,
          state.tailwind,
          action.payload.contextParam
        );
      });
      // return {
      //   ...state
      // };
      state = state;
    },
    redo: (state, action) => {
      const focusIndex = state.canvasFocus.componentId - 1;
      //if future array is empty, return state
      if (state.components[focusIndex].future.length === 0) return { ...state };
      //the children array of the focused component will equal the last element of the future array
      state.components[focusIndex].children =
        state.components[focusIndex].future[
        state.components[focusIndex].future.length - 1
        ];
      //the last element of the future array gets pushed into the past
      const poppedEl = state.components[focusIndex].future.pop();
      //the last element of the future array gets popped out
      state.components[focusIndex].past.push(poppedEl);
      // generate code for the Code Preview
      state.components.forEach((el, i) => {
        el.code = generateCode(
          state.components,
          state.components[i].id,
          state.rootComponents,
          state.projectType,
          state.HTMLTypes,
          state.tailwind,
          action.payload.contextParam

        );
      });
      // return {
      //   ...state
      // };
      state = state;
    },
    addState: (state, action) => {
      // find the current component in focus
      const components = [...state.components];
      const currComponent = findComponent(
        components,
        state.canvasFocus.componentId
      );
      //will add update StateProps to current components' array
      currComponent.stateProps.push(action.payload.newState);
      currComponent.useStateCodes = updateUseStateCodes(currComponent);
      currComponent.stateProps.push(action.payload.setNewState);
      currComponent.code = generateCode(
        components,
        state.canvasFocus.componentId,
        [...state.rootComponents],
        state.projectType,
        state.HTMLTypes,
        state.tailwind,
        action.payload.contextParam
      );
      // return { ...state, components };
      state.components = components;
    },
    addPassedInProps: (state, action) => {
      //When props are passed from a parent to a child in the State Manager tab, it will update the components available passedinprops
      // find the current component in focus
      const components = [...state.components];
      const currComponent = findComponent(
        components,
        state.canvasFocus.componentId
      );
      //prevents passing in props more than one time to the current component
      for (let i = 0; i < currComponent.passedInProps.length; i++) {
        let curr = currComponent.passedInProps[i];
        if (curr.id === action.payload.passedInProps.id) {
          return { ...state, components };
        }
      }

      //find the parent for deleting instances of where the parent is passing props to children
      let parent;
      for (let i = 0; i < components.length; i++) {
        let currComponent = components[i];
        for (let j = 0; j < currComponent.children.length; j++) {
          let currChild = currComponent.children[j];
          if (currChild.typeId === state.canvasFocus.componentId) {
            parent = currComponent;
          }
        }
      }

      //search for whether the child exists in the parent's children array
      //if so update the passed in props child element with the updates passed in props
      parent.children.forEach((child) => {
        if (child.name === currComponent.name) {
          child.passedInProps.push(action.payload.passedInProps);
        }
      });

      // check each components passedInProps property and updating there as well.
      currComponent.passedInProps.push(action.payload.passedInProps);

      //update the import codes for the current component
      currComponent.useStateCodes = updateUseStateCodes(currComponent);
      //update code preview for current component
      currComponent.code = generateCode(
        components,
        state.canvasFocus.componentId,
        [...state.rootComponents],
        state.projectType,
        state.HTMLTypes,
        state.tailwind,
        action.payload.contextParam
      );
      //update code preview for parent component (since we have added it to the children array)
      parent.code = generateCode(
        components,
        parent.id,
        [...state.rootComponents],
        state.projectType,
        state.HTMLTypes,
        state.tailwind,
        action.payload.contextParam
      );

      // return { ...state, components };
      state.components = components;
    },
    deletePassedInProps: (state, action) => {
      const components = [...state.components];
      let currComponent = findComponent(
        components,
        state.canvasFocus.componentId
      );

      //find the parent of the component that we are deleting from
      let parent;
      for (let i = 0; i < components.length; i++) {
        let currComponent = components[i];
        for (let j = 0; j < currComponent.children.length; j++) {
          let currChild = currComponent.children[j];
          if (currChild.typeId === state.canvasFocus.componentId) {
            parent = currComponent;
          }
        }
      }

      //deletes all instances of passedInProps from the children arrays of the current Component
      const deletePassedInPropsChildren = (currComponent) => {
        const innerFunc = (currChild) => {
          // when there are no children, return up a level
          if (
            currChild.children.filter((el) => el.type === 'Component')
              .length === 0
          )
            return;
          if (currChild.children.length) {
            currChild.children
              .filter((el) => el.type === 'Component')
              .forEach((child, j) => {
                child.passedInProps.forEach((prop, k) => {
                  if (prop.id === action.payload.rowId) {
                    child.passedInProps.splice(k, 1);
                    innerFunc(child);
                  }
                });
              });
          }
        };
        //for every component we update, generate new code
        innerFunc(currComponent);
        currComponent.code = generateCode(
          components,
          currComponent.id,
          [...state.rootComponents],
          state.projectType,
          state.HTMLTypes,
          state.tailwind,
          action.payload.contextParam
        );
      };
      //delete from the components passedInProps array
      const deletePassedInProps = (myComponent) => {
        if (
          myComponent.children.filter((el) => el.type === 'Component')
            .length === 0
        ) {
          if (myComponent.passedInProps.length > 0) {
            myComponent.passedInProps.forEach((prop, index) => {
              if (prop.id === action.payload.rowId) {
                myComponent.passedInProps.splice(index, 1);
              }
            });
          }
          myComponent.useStateCodes = updateUseStateCodes(myComponent);
          myComponent.code = generateCode(
            components,
            myComponent.id,
            [...state.rootComponents],
            state.projectType,
            state.HTMLTypes,
            state.tailwind,
            action.payload.contextParam
          );
          return;
        }
        myComponent.passedInProps.forEach((prop, i) => {
          if (prop.id === action.payload.rowId) {
            myComponent.passedInProps.splice(i, 1);
            myComponent.children
              .filter((el) => el.type === 'Component')
              .forEach((child, i) => {
                let next = components.find((comp) => comp.id === child.typeId);
                deletePassedInProps(next);
              });
          }
        });
        myComponent.useStateCodes = updateUseStateCodes(myComponent);
        myComponent.code = generateCode(
          components,
          myComponent.id,
          [...state.rootComponents],
          state.projectType,
          state.HTMLTypes,
          state.tailwind,
          action.payload.contextParam
        );
      };

      deletePassedInPropsChildren(parent);
      deletePassedInProps(currComponent);

      parent.code = generateCode(
        components,
        parent.id,
        [...state.rootComponents],
        state.projectType,
        state.HTMLTypes,
        state.tailwind,
        action.payload.contextParam
      );
      // return { ...state, components };
      state.components = components;
    },
    deleteState: (state, action) => {
      const components = [...state.components];
      let currComponent = findComponent(
        components,
        state.canvasFocus.componentId
      );
      //updates the stateProps array to reflect total state initialized in component minus the selected state to be deleted
      currComponent.stateProps = action.payload.stateProps;

      //CHILDREN ARRAY LOOP (needed for code preview)
      //iterate through all components, starting from top, and delete ALL instances of deleted state (provided to us
      // in the passedInProps array within the children array of the component
      // using the action.payload.rowId (variable name) and action.payload.otherId (setVariable name))
      components.forEach((component) => {
        //find all instances of state within child elements and delete state

        component.children.forEach((child) => {
          if (child.type === 'Component') {
            for (let i = 0; i < child.passedInProps?.length; i++) {
              if (
                child.passedInProps[i]['id'] === action.payload.rowId ||
                child.passedInProps[i]['id'] === action.payload.otherId
              ) {
                child.passedInProps.splice(i, 1);
                i--;
              }
            }
          }
        });

        // COMPONENT LOOP (needed for tables in State Management Tab)
        //iterate through all components, starting from top, and delete ALL instances of deleted state (provided to us
        // in the passedInProps array within each component
        // using the action.payload.rowId (variable name) and action.payload.otherId (setVariable name))
        for (let i = 0; i < component.passedInProps?.length; i++) {
          if (
            component.passedInProps[i]['id'] === action.payload.rowId ||
            component.passedInProps[i]['id'] === action.payload.otherId
          ) {
            component.passedInProps.splice(i, 1);
            i--;
          }
        }
        // curr component = where you are deleting from state from, also is the canvas focus
        // curr component id = providerId
        // we then iterate through the rest of the components
        // check if a useContext if created and if the useContext contains the providerId
        // we then delete from the set, statesFromProvider, the row id, and regenerate the code
        // Ex: useContext {1: {statesFromProvider: Set, compLink, compText}, 2 : ..., 3 : ...}
        if (
          component.useContext &&
          component.useContext[state.canvasFocus.componentId]
        ) {
          component.useContext[
            state.canvasFocus.componentId
          ].statesFromProvider.delete(action.payload.rowId);
          // iterate over children to see where it is being used, then reset that compText/compLink/useState
          for (let child of component.children) {
            if (child.stateUsed) {
              if (
                child.stateUsed.compTextProviderId === currComponent.id &&
                child.stateUsed.compTextPropsId === action.payload.rowId
              ) {
                child.attributes.compText = '';
                delete child.stateUsed.compText;
                delete child.stateUsed.compTextProviderId;
                delete child.stateUsed.compTextPropsId;
              }
              if (
                child.stateUsed.compLinkProviderId === currComponent.id &&
                child.stateUsed.compLinkPropsId === action.payload.rowId
              ) {
                child.attributes.compLink = '';
                delete child.stateUsed.compLink;
                delete child.stateUsed.compLinkProviderId;
                delete child.stateUsed.compLinkPropsId;
              }
            }
          }
        }

        // find parent
        let parent;
        for (let i = 0; i < components.length; i++) {
          let currComponent = components[i];
          for (let j = 0; j < currComponent.children.length; j++) {
            let currChild = currComponent.children[j];
            if (currChild.typeId === component.id) {
              parent = currComponent;
            }
          }
        }
        if (parent) {
          parent.code = generateCode(
            components,
            parent.id,
            [...state.rootComponents],
            state.projectType,
            state.HTMLTypes,
            state.tailwind,
            action.payload.contextParam
          );
        }

        component.useStateCodes = updateUseStateCodes(component);
        component.code = generateCode(
          components,
          component.id,
          [...state.rootComponents],
          state.projectType,
          state.HTMLTypes,
          state.tailwind,
          action.payload.contextParam
        );
      });
      // return { ...state, components };
      state.components = components;
    },

    toggleLoggedIn: (state) => {
      state.isLoggedIn = !state.isLoggedIn;
    },
    configToggle: (state) => {
      state.config = {
        ...state.config,
        saveFlag: !state.config.saveFlag,
        saveTimer: !state.config.saveTimer
      };
    },
    snapShotAction: (state, action) => {
      state.components[action.payload.focusIndex].past.push(action.payload.deepCopiedState.components[action.payload.focusIndex].children);
    },
    cooperative: (state, action) => {
      console.log(action.payload);
      return {...action.payload};
    }
  }
});

// Exports the action creator function to be used with useDispatch


export const { addComponent, addChild, changeFocus, changeTailwind, changePosition, updateStateUsed, resetAllState, updateUseContext, updateCss, updateEvents, deleteEventAction, deletePage, deleteReusableComponent, setProjectName, changeProjectType, resetState, updateProjectName, deleteElement, updateAttributes, deleteChild, setInitialState, openProject, addElement, undo, redo, addState, addPassedInProps, deletePassedInProps, deleteState, toggleLoggedIn, configToggle, snapShotAction, cooperative } = appStateSlice.actions;


// Exports so we can combine in rootReducer
export default appStateSlice.reducer;
