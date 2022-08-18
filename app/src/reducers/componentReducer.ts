import {
  State,
  Action,
  Component,
  ChildElement,
  HTMLType
} from '../interfaces/Interfaces';
import initialState from '../context/initialState';
import generateCode from '../helperFunctions/generateCode';
import manageSeparators from '../helperFunctions/manageSeparators';

let separator = initialState.HTMLTypes[1];
const reducer = (state: State, action: Action) => {
  // if the project type is set as Next.js or Gatsby.js, next/gatsby component code should be generated
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
      if (currentNode.name !== 'input' && currentNode.name !== 'img')
        currentNode.children.forEach(node => nodeArr.push(node));
    }
    // if no match is found return false
    return;
  };
  // update all ids and typeIds to match one another
  const updateAllIds = (comp: Component[] | ChildElement[]) => {
    // put components' names and ids into an obj
    const obj = {};
    comp.forEach(el => {
      obj[el.name] = el.id;
    });
    // for each of the components, if it has children, iterate through that children array
    comp.forEach(el => {
      if (el.children.length > 0) {
        for (let i = 0; i < el.children.length; i++) {
          // update each child's childId
          el.children[i].childId = i + 1;
          // if the child's name and id exists in the object
          if (obj[el.children[i].name]) {
            // set the child's typeId to be the value in the object of the child's name key
            el.children[i].typeId = obj[el.children[i].name];
          }
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
    components.forEach(component => {
      if (!component.isPage) componentIds[component.name] = component.id;
    });
    // assign correct ID to components that are children inside of remaining pages
    components.forEach(page => {
      if (page.isPage) {
        page.children.forEach(child => {
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
    components.forEach(comp => {
      if (comp.isPage) roots.push(comp.id);
    });
    return roots;
  };
  const deleteById = (id: number, name: string): Component[] => {
    // name of the component we want to delete
    const checkChildren = (child: Component[] | ChildElement[]) => {
      // for each of the components in the passed in components array, if the child
      // component has a children array, iterate through the array of children
      child.forEach(el => {
        if (el.children.length) {
          const arr = [];
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
    const filteredArr = [...copyComp].filter(comp => comp.id != id);
    return updateIds(filteredArr);
  };
  const convertToJSX = arrayOfElements => {
    // if id exists in state.HTMLTypes
    for (let i = 0; i < initialState.HTMLTypes.length; i += 1) {
      arrayOfElements[i] = initialState.HTMLTypes[i];
    }
  };
  const updateUseStateCodes = (currentComponent) => {
    // array of snippets of state prop codes
    const localStateCode = [];
    currentComponent.stateProps.filter((n,i)=>i%2===0).forEach((stateProp) => {
      
      const useStateCode = `const [${stateProp.key}, set${
        stateProp.key.charAt(0).toUpperCase() + stateProp.key.slice(1)
      }] = useState<${stateProp.type} | undefined>(${JSON.stringify(stateProp.value)})`;
      localStateCode.push(useStateCode);
    });
    if (currentComponent.name !== 'App' && currentComponent.name !== 'Index') {
      currentComponent.passedInProps.forEach((passedInProp) => {
        const prop = `const ${passedInProp.key} = props.${passedInProp.key}`
        localStateCode.push(prop);
      })
    }
    // store localStateCodes in global state context
    return localStateCode;
  };
  switch (action.type) {
    case 'ADD COMPONENT': {
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
      const canvasFocus = {
        ...state.canvasFocus,
        componentId: newComponent.id,
        childId: null
      };
      const nextComponentId = state.nextComponentId + 1;
      newComponent.code = generateCode(
        components,
        newComponent.id,
        [...state.rootComponents],
        state.projectType,
        state.HTMLTypes
      );
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
      // find component (an object) that we're adding a child to
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
      let newName = state.HTMLTypes.reduce((name, el) => {
        if (typeId === el.id) {
          name = type === 'Component' ? componentName : el.tag;
        }
        return name;
      }, '');

      if (type === 'Route Link') {
        components.find(comp => {
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
        directParent.children.push(topSeparator);
        directParent.children.push(newChild);
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
        state.HTMLTypes
      );

      return {
        ...state,
        components,
        nextChildId,
        canvasFocus,
        nextTopSeparatorId
      };
    }
    // move an instance from one position in a component to another position in a component
    case 'CHANGE POSITION': {
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
      components[
        state.canvasFocus.componentId - 1
      ].children = manageSeparators.mergeSeparator(
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
        state.HTMLTypes
      );
      return { ...state, components, nextTopSeparatorId };
    }
    // Change the focus component and child
    case 'CHANGE FOCUS': {
      const {
        componentId,
        childId
      }: { componentId: number; childId: number | null } = action.payload;

      if (childId < 1000) {
        // makes separators not selectable
        const canvasFocus = { ...state.canvasFocus, componentId, childId };
        //makes it so the code preview will update when clicking on a new component
        const components = state.components.map(element => {
          console.log({element})
          return Object.assign({}, element);
        });
        return { ...state, components, canvasFocus };
      }
      return { ...state };
    }
    case 'UPDATE STATE USED': {
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
        state.HTMLTypes
      );
      return { ...state, components };
    }
    case 'UPDATE USE CONTEXT': {
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
        state.HTMLTypes
      );
      return {...state, components }
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
    case 'UPDATE ATTRIBUTES': {
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
      const { directParent, childIndexValue } = findParent(
        component,
        state.canvasFocus.childId
      );
      // delete the element from its former parent's children array
      directParent.children.splice(childIndexValue, 1);
      const canvasFocus = { ...state.canvasFocus, childId: null };
      let nextTopSeparatorId = manageSeparators.handleSeparators(
        components[canvasFocus.componentId - 1].children,
        'delete'
      );
      component.code = generateCode(
        components,
        state.canvasFocus.componentId,
        [...state.rootComponents],
        state.projectType,
        state.HTMLTypes
      );
      return { ...state, components, canvasFocus, nextTopSeparatorId };
    }
    case 'DELETE PAGE': {
      const id: number = state.canvasFocus.componentId;
      const name: string = state.components[id - 1].name;
      const components: Component[] = deleteById(id, name);
      // rebuild rootComponents with correct page IDs
      const rootComponents = updateRoots(components);
      const canvasFocus = { componentId: 1, childId: null };
      return { ...state, rootComponents, components, canvasFocus };
    }
    case 'DELETE REUSABLE COMPONENT': {
      const id: number = state.canvasFocus.componentId;
      const name: string = state.components[id - 1].name;
      // updated list of components after deleting a component
      const components: Component[] = deleteById(id, name);
      const rootComponents: number[] = updateRoots(components);
      // iterate over the length of the components array
      for (let i = 0; i < components.length; i++) {
        //if the component uses context from component being deleted
        if(components[i].useContext && components[i].useContext[id]) {
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
          state.HTMLTypes
        );
      }
      const canvasFocus = { componentId: 1, childId: null };
      return {
        ...state,
        rootComponents,
        components,
        canvasFocus,
        nextComponentId: id
      };
    }

    case 'SET INITIAL STATE': {
      // set the canvas focus to be the first component
      const canvasFocus = {
        ...action.payload.canvasFocus,
        componentId: 1,
        childId: null
      };
      convertToJSX(action.payload.HTMLTypes);
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
      // also update the name of the root component of the application to fit classic React and next.js/gatsby conventions
      if (projectType === 'Next.js' || projectType === 'Gatsby.js')
        components[0]['name'] = 'index';
      else components[0]['name'] = 'App';
      components.forEach(component => {
        component.code = generateCode(
          components,
          component.id,
          [...state.rootComponents],
          projectType,
          state.HTMLTypes
        );
      });
      return { ...state, components, projectType };
    }
    // Reset all component data back to their initial state but maintain the user's project name and log-in status
    case 'RESET STATE': {
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
    }
    case 'UPDATE PROJECT NAME': {
      const projectName = action.payload;
      return {
        ...state,
        name: projectName
      };
    }
    case 'OPEN PROJECT': {
      convertToJSX(action.payload.HTMLTypes);
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
      };
    }
    case 'DELETE ELEMENT': {
      let name: string = '';
      const HTMLTypes: HTMLType[] = [...state.HTMLTypes].filter(el => {
        if (el.id === action.payload) {
          name = el.tag;
        }
        return el.id !== action.payload;
      });
      const components: Component[] = deleteById(action.payload, name);
      const rootComponents: number[] = updateRoots(components);
      components.forEach((el, i) => {
        el.code = generateCode(
          components,
          components[i].id,
          rootComponents,
          state.projectType,
          state.HTMLTypes
        );
      });
      return {
        ...state,
        HTMLTypes
      };
    }
    case 'UNDO': {
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
          state.HTMLTypes
        );
      });
      return {
        ...state
      };
    }
    case 'REDO': {
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
          state.HTMLTypes
        );
      });
      return {
        ...state
      };
    }
    case 'ADD STATE' : {
      // find the current component in focus
      const components = [...state.components];
      const currComponent = findComponent(
        components,
        state.canvasFocus.componentId
      );
      currComponent.stateProps.push(action.payload.newState);
      currComponent.useStateCodes = updateUseStateCodes(currComponent);
      currComponent.stateProps.push(action.payload.setNewState);
      currComponent.code = generateCode(
        components,
        state.canvasFocus.componentId,
        [...state.rootComponents],
        state.projectType,
        state.HTMLTypes
      );
      console.log('action.payload', action.payload)
      return { ...state, components};
    }
    /* 
    When props are passed from a parent to a child in the State Manager tab, it will update the components available
    passedInProps
    */
    case 'ADD PASSEDINPROPS' : {
      // find the current component in focus
      const components = [...state.components];
      const currComponent = findComponent(
        components,
        //legacyPD - tom
        // need to change this to match the id from the tree
        state.canvasFocus.componentId
      ); 
      let parent;
      for (let i = 0; i < components.length; i++){
        let currComponent = components[i]
        for (let j = 0; j < currComponent.children.length; j++) {
          let currChild = currComponent.children[j];
          if (currChild.typeId === state.canvasFocus.componentId) {
             parent = currComponent;
          }
        }
      }

      parent.children.forEach((child) => {
        if (child.name === currComponent.name) {
          child.passedInProps.push(action.payload.passedInProps);
        }
      })


      // do a check if prop already exists in passed in props
      for (let i = 0; i < currComponent.passedInProps.length; i++) {
        let curr = currComponent.passedInProps[i];
        if (curr.id === action.payload.passedInProps.id) {
          return { ...state, components};
        }
      }
      currComponent.passedInProps.push(action.payload.passedInProps);
      currComponent.useStateCodes = updateUseStateCodes(currComponent);
      
      currComponent.code = generateCode(
        components,
        state.canvasFocus.componentId,
        [...state.rootComponents],
        state.projectType,
        state.HTMLTypes
        );
        parent.code = generateCode(
          components,
          parent.id,
          [...state.rootComponents],
          state.projectType,
          state.HTMLTypes
        );

      return { ...state, components};
    }

    case 'DELETE PASSEDINPROPS' : {
      const components = [...state.components];
      let currComponent = findComponent(
        components,
        state.canvasFocus.componentId
      );
      /*
      Check whether the current component selected has passed in props and splices out that 
      piece of state from the array.
      */
      let index;
      for (let i = 0; i < currComponent.passedInProps.length; i++) {
        if (currComponent.passedInProps[i].id === action.payload.rowId) {
          index = i;
          break;
        }
      }
      let parent;
      for (let i = 0; i < components.length; i++){
        let currComponent = components[i]
        for (let j = 0; j < currComponent.children.length; j++) {
          let currChild = currComponent.children[j];
          if (currChild.typeId === state.canvasFocus.componentId) {
             parent = currComponent;
          }
        }
      }
      parent.children.forEach((child) => {
        if (child.name === currComponent.name) {
          child.passedInProps.splice(index, 1);
        }
      })


      currComponent.passedInProps.splice(index, 1);
      currComponent.useStateCodes = updateUseStateCodes(currComponent);
      currComponent.code = generateCode(
        components,
        state.canvasFocus.componentId,
        [...state.rootComponents],
        state.projectType,
        state.HTMLTypes
      );
      parent.code = generateCode(
        components,
        parent.id,
        [...state.rootComponents],
        state.projectType,
        state.HTMLTypes
      );
      return { ...state, components};
    }

    case 'DELETE STATE' : {
      const components = [...state.components];
      let currComponent = findComponent(
        components,
        state.canvasFocus.componentId
      );
      currComponent.stateProps = action.payload.stateProps;
      currComponent.useStateCodes = updateUseStateCodes(currComponent);

      
      components.forEach((component) => {

        //find all instances of state within child elements and delete state
        if (component.name !== 'App') {
          component.passedInProps.forEach((prop, i) => {
            if(prop.id === action.payload.rowId) {
              component.passedInProps.splice(i,1);
            }
          });
        }
          // curr component = where you are deleting from state from, also is the canvas focus
          // curr component id = providerId
          // we then iterate through the rest of the components
          // check if a useContext if created and if the useContext contains the providerId
          // we then delete from the set, statesFromProvider, the row id, and regenerate the code
          // Ex: useContext {1: {statesFromProvider: Set, compLink, compText}, 2 : ..., 3 : ...}
        if(component.useContext && component.useContext[state.canvasFocus.componentId ]) {
          component.useContext[state.canvasFocus.componentId].statesFromProvider.delete(action.payload.rowId);
          // iterate over children to see where it is being used, then reset that compText/compLink/useState
          for (let child of component.children) {
            if (child.stateUsed) {
              if (child.stateUsed.compTextProviderId === currComponent.id && child.stateUsed.compTextPropsId === action.payload.rowId) {
                child.attributes.compText = '';
                delete child.stateUsed.compText;
                delete child.stateUsed.compTextProviderId;
                delete child.stateUsed.compTextPropsId;
              }
              if (child.stateUsed.compLinkProviderId === currComponent.id && child.stateUsed.compLinkPropsId === action.payload.rowId) {
                child.attributes.compLink = '';
                delete child.stateUsed.compLink;
                delete child.stateUsed.compLinkProviderId;
                delete child.stateUsed.compLinkPropsId;
              }
            }
          }
          component.code = generateCode(
            components,
            component.id,
            [...state.rootComponents],
            state.projectType,
            state.HTMLTypes
          );
        }
      });
      currComponent.code = generateCode(
        components,
        state.canvasFocus.componentId,
        [...state.rootComponents],
        state.projectType,
        state.HTMLTypes
      );
      return { ...state, components};
    }
    default:
      return state;
  }
};
export default reducer;
