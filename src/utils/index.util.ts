// ** Helper utility functions (updateState, updateArray) 
// Utitily function to properly update state object (immuatably)
export const updateState = (prevState, newState) => {
  // ** prevState will be what current;y is state and new state will be the updated values merged into state
  return Object.assign({}, prevState, newState);
}

// Utitily function to properly update any arrays (immuatably)
export const updateArray = (array: any[], itemId: number, callback: any, update?: object): any[] => {
  const updatedArray = array.map((item) => {
    // ** map returns a new array. each pass through map makes of an array requires that you return a specific element to the new array map creates. if the current item.id doesn't match the itemId passed in then we just want to return that item to continue the map iteration.
    if (item.id !== itemId) {
      return item;
    }

    // ** if the id block isn't hit above that means that the item.id does match the itemId we passed in. Now we can do whatever specific operation we need to do with the current item before we return it for the next iteration
    const updatedItem = callback(item, update);
    return updatedItem;
  });
  return updatedArray;
}

export const removeFromArray = (array, itemId) => {
  const updatedArray = array.filter((item) => {
    return item.id !== itemId;
  });
  return updatedArray;
}

export const cloneDeep = (value) => {
  // ** creates a deep clone of either an array or an object
  // ** if the value is an array then it hits this if block
  if (Array.isArray(value)) {
    const result: any[] = [];
    value.forEach((el) => {
      if (typeof el === 'object') {
        result.push(cloneDeep(el));
      } else {
        result.push(el);
      }
    });
    return result;
  }
  // ** if the value is an object then it hits this if block
  if (typeof value === 'object' && value !== null) {
    const result: { [key: string]: any } = {};
    Object.keys(value).forEach((key) => {
      if (typeof value[key] === 'object') {
        result[key] = cloneDeep(value[key]);
      } else {
        result[key] = value[key];
      }
    });
    return result;
  }
  return value;
}

export const getColor = (): string => {
  // ** generates a random color within this color array
  const colors: string[] = ['#E27D60', '#E3AFBC', '#E8A87C', '#C38D9E', '#41B3A3', '#D12FA2', '#F64C72', '#DAAD86', '#8EE4AF', '#5CDB95','#7395AE', '#b90061','#AFD275', '#45A29E', '#D79922', '#C5CBE3', '#FFCB9A', '#E98074', '#8860D0', '#5AB9EA', '#5860E9', '#84CEEB', '#61892F'];
  return colors[Math.floor(Math.random() * colors.length)];
}
// state: ApplicationStateInt,
  // { title, childType = '', HTMLInfo = {} }: { title: string; childType: string; HTMLInfo: object }

export const addChild = (state, { title, childType = '', HTMLInfo = {} }) => {
  const strippedTitle = title;

  if (!childType) window.alert('addChild Error! no type specified');

  const htmlElement = childType !== 'COMP' ? childType : null;
  if (childType !== 'COMP') {
    childType = 'HTML';
  }

  // view represents the curretn FOCUSED COMPONENT - this is the component where the child is being added to
  // we only add childrent (or do any action) to the focused omconent
  const view: ComponentInt = state.components.find(comp => comp.title === state.focusComponent.title);

  // parentComponent is the component this child is generated from (ex. instance of Box has comp of Box)
  let parentComponent;

  // conditional if adding an HTML component
  if (childType === 'COMP') {
    parentComponent = state.components.find(comp => comp.title === title);
  }

  interface htmlElemPositionInt {
    width: number;
    height: number;
  }

  let htmlElemPosition: htmlElemPositionInt = { width: null, height: null };
  if (childType === 'HTML') {
    htmlElemPosition = getSize(htmlElement);
    // if above function doesnt reutn anything, it means html element is not in our database
    if (!htmlElemPosition.width) {
      console.log(`Did not add html child: ${htmlElement} the GetSize function indicated that it isnt in our DB`);
      return;
    }
  }

  const newPosition =
    childType === 'COMP'
      ? {
          x: view.position.x + ((view.nextChildId * 16) % 150), // new children are offset by some amount, map of 150px
          y: view.position.y + ((view.nextChildId * 16) % 150),
          width: parentComponent.position.width - 1, // new children have an initial position of their CLASS (maybe don't need 90%)
          height: parentComponent.position.height - 1,
        }
      : {
          x: view.position.x + view.nextChildId * 16,
          y: view.position.y + view.nextChildId * 16,
          width: htmlElemPosition.width,
          height: htmlElemPosition.height,
        };

  const newChild: ChildInt = {
    childId: view.nextChildId,
    childSort: view.nextChildId,
    childType,
    childComponentId: childType === 'COMP' ? parentComponent.id : null, // only relevant fot children of type COMPONENT
    componentName: strippedTitle,
    position: newPosition,
    color: null, // parentComponent.color, // only relevant fot children of type COMPONENT
    htmlElement, // only relevant fot children of type HTML
    HTMLInfo,
  };

  const compsChildrenArr = [...view.childrenArray, newChild];

  const component = {
    ...view,
    childrenArray: compsChildrenArr,
    focusChildId: newChild.childId,
    nextChildId: view.nextChildId + 1,
  };

  const components = [
    ...state.components.filter(comp => {
      if (comp.title !== view.title) return comp;
    }),
    component,
  ];

  return {
    ...state,
    components,
    focusChild: newChild,
    focusComponent: component, // refresh the focus component so we have the new child
  };
};


