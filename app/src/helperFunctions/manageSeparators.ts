import { ChildElement } from '../interfaces/Interfaces';
import initialState from '../context/initialState';

const separator = initialState.HTMLTypes[1];

const manageSeparators = {};

manageSeparators.nextTopSeparatorId = initialState.nextTopSeparatorId;

manageSeparators.handleSeparators = (arr, str) => {
  if (str === 'delete' && arr.length === 1) {
    arr.splice(0, 1);
  }
  for (let index = 0; index < arr.length; index++) {
    if (arr[index].name === 'separator' && arr[index + 1].name === 'separator') {
      arr.splice(index, 1); // removes extra separator from array
    } 
    // check for duplicaed separator at the end of array and remove it if separator is at the last index
    if (arr[arr.length - 1].name === 'separator') arr.splice(arr.length - 1, 1);
    // check for missing separators
    if (arr[index].name !== 'separator' && (index === 0 || arr[index - 1].name !== 'separator')) {
      // initialize topSeparator inside the if condition so that every time this condition evaluated to true, a new topSeparator with incremented id will be created
      const topSeparator: ChildElement = {
        type: 'HTML Element',
        typeId: separator.id,
        name: 'separator',
        childId: manageSeparators.nextTopSeparatorId,
        style: separator.style,
        children: []
      };
      // add a topSeparator before the element that does not have one
      arr.splice(index, 0, topSeparator)
      // update this value in state
      manageSeparators.nextTopSeparatorId += 1;
    }
    // check is length is > 0 or it is a nested element
    if (arr[index].children.length) {
    // recursive call if children array
      manageSeparators.handleSeparators(arr[index].children);
    }
  }
  return manageSeparators.nextTopSeparatorId;
};

manageSeparators.mergeSeparator = (arr, index) => {
  console.log('mergerSeparator',arr)
  return arr.map((child) => {
    if (child.name === 'div' && child.children.length) {
      const divContents = manageSeparators.mergeSeparator(child.children, index);
      return { ...child, children: divContents }
    }
    else if (child.name === 'separator' && child.children.length) {
      return child.children[index];
    }
    else return child;
  });
};

export default manageSeparators;
