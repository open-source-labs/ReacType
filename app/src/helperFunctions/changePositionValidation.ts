// This function will evaluate the target destination when moving an element on the canvas
// If the target destination is actually a nested component within its own children array
// the new target parent is not a valid parent to change position
const validateNewParent = (state: object, currentChildId: number, toTargetParentId: number) => {
  const focusIndex = state.canvasFocus.componentId - 1;
  const childrenArray = state.components[focusIndex].children;
  // Checks to see if a Parent is trying to nest inside one of its children
  const selfNestingCheck = (array, nestedChild = false, nestedParent = false) => {
    for (const element of array) {
      if (element.childId === toTargetParentId && nestedChild === true) return nestedParent = true;
      else if (element.childId === currentChildId && element.children.length > 0 && nestedChild === false) nestedParent = selfNestingCheck(element.children, nestedChild = true, nestedParent);
      else if (element.children.length > 0 && nestedChild === false) nestedParent = selfNestingCheck(element.children, nestedChild, nestedParent);
    }
    return nestedParent;
  }
  const parentNestingIntoChild = selfNestingCheck(childrenArray);
  if (parentNestingIntoChild === true) return false;
  return true;
};
export default validateNewParent;