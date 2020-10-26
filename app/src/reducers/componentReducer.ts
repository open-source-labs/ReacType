import {
  State,
  Action,
  Component,
  ChildElement
} from '../interfaces/Interfaces';
import initialState from '../context/initialState';
import generateCode from '../helperFunctions/generateCode';
import cloneDeep from '../helperFunctions/cloneDeep';
import HTMLTypes from '../context/HTMLTypes';

const reducer = (state: State, action: Action) => {
  // if the project type is set as Next.js, next component code should be generated
  // otherwise generate classic react code

  // find top-level component given a component id
  const findComponent = (components: Component[], componentId: number) => {
    return components.find(elem => elem.id === componentId);
  };

  // Finds a parent
  // returns object with parent object and index value of child
  const findParent = (component: Component, childId: number) => {
    // using a breadth first search to search through instance tree
    // We're going to keep track of the nodes we need to search through with an Array
    //  Initialize this array with the top level node
    const nodeArr: (Component | ChildElement)[] = [component];
    nodeArr.forEach(node => console.log('node', node));
    // iterate through each node in the array as long as there are elements in the array
    while (nodeArr.length > 0) {
      // shift off the first value and assign to an element
      const currentNode = nodeArr.shift();
      // try to find id of childnode in children
      for (let i = 0; i <= currentNode.children.length - 1; i++) {
        // if match is found return object with both the parent and the index value of the child
        if (currentNode.children[i].childId === childId) {
          return { directParent: currentNode, childIndexValue: i };
        }
      }
      // if child node isn't found add each of the current node's children to the search array
      currentNode.children.forEach((node: ChildElement) => nodeArr.push(node));
    }
    // if no search is found return -1
    return { directParent: null, childIndexValue: null };
  };

  const deleteChild = (component: Component, currentChildId: number) => {
    const { directParent, childIndexValue } = findParent(
      component,
      currentChildId
    );
    directParent.children.splice(childIndexValue, 1);
  };

  // determine if there's child of a given type in a component
  const childTypeExists = (
    type: string,
    typeId: number,
    component: Component
  ) => {
    const nodeArr = [...component.children];
    // breadth first search through component tree to see if a child exists
    while (nodeArr.length > 0) {
      // shift off the first value and assign to an element
      const currentNode = nodeArr.shift();
      if (currentNode.type === type && currentNode.typeId === typeId)
        return true;
      // if child node isn't found add each of the current node's children to the search array
      currentNode.children.forEach(node => nodeArr.push(node));
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
      currentNode.children.forEach(node => nodeArr.push(node));
    }
    // if no match is found return false
    return;
  };

  // const isChildOfPage = (id: number): boolean => {
  //   // TODO: refactor
  //   // TODO: output parent name and id to refocus canvas on parent
  //   let isChild: boolean = false;
  //   state.components.forEach(comp => {
  //     comp.children.forEach(child => {
  //       if (child.type === 'Component' && child.typeId === id) {
  //         isChild = true;
  //       }
  //     });
  //   });
  //   return isChild;
  // }

  const updateIds = (components: Component[]) => {
    components.forEach((comp, i) => comp.id = i + 1);
  }

  const deleteById = (id: number): Component[] => [...state.components].filter(comp => comp.id != id);

  switch (action.type) {
    // Add a new component type
    // add component to the component array and increment our counter for the componentId
    // TODO: parse through name to any white spaces and camel case the name
    case 'ADD COMPONENT': {
      // if nonString value or empty string is passed in, then don't modify the original state
      if (
        typeof action.payload.componentName !== 'string' ||
        action.payload.componentName === ''
      )
        return state;
      const newComponent = {
        id: state.nextComponentId,
        name: action.payload.componentName,
        nextChildId: 1,
        style: {},
        code: '',
        children: [],
        isPage: action.payload.root
      };

      const components = [...state.components];
      components.push(newComponent);

      const rootComponents = [...state.rootComponents];
      if (action.payload.root) rootComponents.push(newComponent.id);

      // update the focus to the new component
      const canvasFocus = {
        ...state.canvasFocus,
        componentId: newComponent.id,
        childId: null
      };

      const nextComponentId = state.nextComponentId + 1;
      return {
        ...state,
        components,
        rootComponents,
        nextComponentId,
        canvasFocus
      };
    }
    // Add child to a given root component
    case 'ADD CHILD': {
      const {
        type,
        typeId,
        childId
      }: { type: string; typeId: number; childId: any } = action.payload;

      const parentComponentId: number = state.canvasFocus.componentId;
      const components = [...state.components]; 

      // find component that we're adding a child to
      const parentComponent = findComponent(components, parentComponentId);

      let componentName = '';
      let componentChildren = [];

      if (type === 'Component') {
        components.forEach(comp => {
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

      let newName = HTMLTypes.reduce((name, el) => {
        if (typeId === el.id) {
          name = (type === 'Component') ? componentName : el.tag; 
        }
        return name;
      },'');

      const newChild: ChildElement = {
        type,
        typeId,
        name: newName,
        childId: state.nextChildId,
        style: {},
        children: componentChildren
      };      

      // if the childId is null, this signifies that we are adding a child to the top level component rather than another child element

      if (childId === null) {
        parentComponent.children.push(newChild);
      }
      // if there is a childId (childId here references the direct parent of the new child) find that child and a new child to its children array

      else {
        const directParent = findChild(parentComponent, childId);
        directParent.children.push(newChild);
      }

      parentComponent.code = generateCode(
        components,
        parentComponentId,
        [...state.rootComponents],
        state.projectType,
        state.HTMLTypes
      );    

      const canvasFocus = {
        ...state.canvasFocus,
        componentId: state.canvasFocus.componentId,
        childId: newChild.childId
      };
      const nextChildId = state.nextChildId + 1;
      return { ...state, components, nextChildId, canvasFocus };
    }
    // move an instance from one position in a component to another position in a component
    case 'CHANGE POSITION': {
      const { currentChildId, newParentChildId } = action.payload;

      // if the currentChild Id is the same as the newParentId (i.e. a component is trying to drop itself into itself), don't update sate
      if (currentChildId === newParentChildId) return state;

      // find the current component in focus
      const components = [...state.components];
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

      component.code = generateCode(
        components,
        state.canvasFocus.componentId,
        [...state.rootComponents],
        state.projectType,
        state.HTMLTypes
      );

      return { ...state, components };
    }
    // Change the focus component and child
    case 'CHANGE FOCUS': {
      const {
        componentId,
        childId
      }: { componentId: number; childId: number | null } = action.payload;

      const canvasFocus = { ...state.canvasFocus, componentId, childId };
      return { ...state, canvasFocus };
    }
    case 'UPDATE CSS': {
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
        state.HTMLTypes
      );

      return { ...state, components };
    }
    case 'DELETE CHILD': {
      // if in-focus instance is a top-level component and not a child, don't delete anything
      if (!state.canvasFocus.childId) return state;

      // find the current component in focus
      const components = [...state.components];
      const component = findComponent(
        components,
        state.canvasFocus.componentId
      );
      // find the moved element's former parent
      // delete the element from its former parent's children array
      const { directParent, childIndexValue } = findParent(
        component,
        state.canvasFocus.childId
      );
      const child = { ...directParent.children[childIndexValue] };
      directParent.children.splice(childIndexValue, 1);
      component.code = generateCode(
        components,
        state.canvasFocus.componentId,
        [...state.rootComponents],
        state.projectType,
        state.HTMLTypes
      );
      const canvasFocus = { ...state.canvasFocus, childId: null };
      return { ...state, components, canvasFocus };
    }

    case 'DELETE PAGE': {
      const id: number = state.canvasFocus.componentId;
      const components: Component[] = deleteById(id);
      updateIds(components);

      // rebuild rootComponents with correct page IDs
      const rootComponents: number[] = []; 
      components.forEach(comp => {
        if (comp.isPage) rootComponents.push(comp.id);
      });

      const canvasFocus = { componentId: 1, childId: null }
      return {...state, rootComponents, components, canvasFocus}
    }
    case 'DELETE REUSABLE COMPONENT' : {
      const id: number = state.canvasFocus.componentId;
      const components: Component[] = deleteById(id);
      updateIds(components);
      const canvasFocus = { componentId: 1, childId: null };
      return {...state, components, canvasFocus, nextComponentId: id };
    }

    case 'SET INITIAL STATE': {
      // set the canvas focus to be the first component
      const canvasFocus = {
        ...action.payload.canvasFocus,
        componentId: 1,
        childId: null
      };

      return { ...action.payload, canvasFocus };
    }
    case 'SET PROJECT NAME': {
      return {
        ...state,
        name: action.payload
      };
    }
    case 'CHANGE PROJECT TYPE': {
      // when a project type is changed, both change the project type in state and also regenerate the code for each component
      const { projectType } = action.payload;

      const components = [...state.components];
      components.forEach(component => {
        component.code = generateCode(
          components,
          component.id,
          [...state.rootComponents],
          projectType,
          state.HTMLTypes
        );
      });

      // also update the name of the root component of the application to fit classic React and next.js conventions
      if (projectType === 'Next.js') components[0]['name'] = 'index';
      else components[0]['name'] = 'App';

      return { ...state, components, projectType };
    }
    // Reset all component data back to their initial state but maintain the user's project name and log-in status
    case 'RESET STATE': {
      const nextChildId = 1;
      const rootComponents = [1];
      const nextComponentId = 2;
      const canvasFocus = {
        ...state.canvasFocus,
        componentId: 1,
        childId: null
      };
      const rootComponent = {
        ...state.components[0],
        code: '',
        children: [],
        style: {}
      };
      const components = [rootComponent];
      return {
        ...state,
        nextChildId,
        rootComponents,
        nextComponentId,
        components,
        canvasFocus
      };
      // return { ...initialState };
    }

    case 'UPDATE PROJECT NAME': {
      const projectName = action.payload;
      return {
        ...state,
        name: projectName
      };
    }

    case 'OPEN PROJECT': {
      return {
        ...action.payload
      };
    }

    case 'ADD ELEMENT': {
      const HTMLTypes = [...state.HTMLTypes];
      HTMLTypes.push(action.payload);
      return {
        ...state,
        HTMLTypes
      }
    }
    default:
      return state;
  }
};

export default reducer;
