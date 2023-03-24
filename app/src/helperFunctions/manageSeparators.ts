import { ChildElement } from '../interfaces/Interfaces';

const separator = {
  id: 1000,
  tag: 'separator',
  name: 'separator',
  style: { border: 'none' },
  placeHolderShort: '',
  placeHolderLong: '',
  icon: '',
  framework: '',
  nestable: true
};
const manageSeparators = {};
manageSeparators.nextTopSeparatorId = 1000;
// this function checks for two separators in a row or missing separators and adds/removes as needed
manageSeparators.handleSeparators = (arr: object[], str: string) => {
  if (
    (str === 'delete' || str === 'change position') &&
    arr.length === 1 &&
    arr[0].name === 'separator'
  ) {
    arr.splice(0, 1);
  }
  for (let index = 0; index < arr.length; index++) {
    if (
      arr[index].name === 'separator' &&
      arr[index + 1].name === 'separator'
    ) {
      arr.splice(index, 1); // removes extra separator from array
    }
    // check for duplicated separator at the end of array and remove it if separator is at the last index
    if (arr[arr.length - 1].name === 'separator') arr.splice(arr.length - 1, 1);
    // check for missing separators
    if (
      arr[index].name !== 'separator' &&
      (index === 0 || arr[index - 1].name !== 'separator')
    ) {
      // initialize topSeparator inside the if condition so that every time this condition evaluated to true,
      // a new topSeparator with incremented id will be created
      const topSeparator: ChildElement = {
        type: 'HTML Element',
        typeId: separator.id,
        name: 'separator',
        childId: manageSeparators.nextTopSeparatorId,
        style: separator.style,
        children: []
      };
      // add a topSeparator before the element that does not have one
      arr.splice(index, 0, topSeparator);
      // update this value in state
      manageSeparators.nextTopSeparatorId += 1;
    }
    // check is length is > 0 or it is a nested element
    if (
      arr[index].name !== 'input' &&
      arr[index].name !== 'img' &&
      arr[index].children.length
    ) {
      // recursive call if children array
      str === 'delete' || str === 'change position'
        ? manageSeparators.handleSeparators(arr[index].children, str)
        : manageSeparators.handleSeparators(arr[index].children);
    }
  }
  return manageSeparators.nextTopSeparatorId;
};
// this function replaces separators onto which an element is dropped with the element itself
manageSeparators.mergeSeparator = (arr: object[], index: number) => {
  return arr.map((child) => {
    // Added additional nested types for lists
    if (
      (child.name === 'div' ||
        child.name === 'form' ||
        child.name === 'ol' ||
        child.name === 'ul') &&
      child.children.length
    ) {
      const divContents = manageSeparators.mergeSeparator(
        child.children,
        index
      );
      return { ...child, children: divContents };
    } else if (child.name === 'separator' && child.children.length) {
      return child.children[index];
    } else return child;
  });
};
export default manageSeparators;
