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

export const removeFromArray = (array, itemId: number) => {
  // ** filter out items that don't match the conditional below
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