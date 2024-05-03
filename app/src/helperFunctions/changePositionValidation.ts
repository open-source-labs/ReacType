// This function will evaluate the target destination when moving an element on the canvas
// If the target destination is actually a nested component within its own children array
// the new target parent is not a valid parent to change position

import { State, ChildElement } from '../interfaces/Interfaces';

const validateNewParent = (
  state: State,
  currentChildId: number,
  toTargetParentId: number
): boolean => {
  const focusIndex = state.canvasFocus.componentId - 1;
  const childrenArray = state.components[focusIndex].children;
  // Checks to see if a Parent is trying to nest inside one of its children
  const selfNestingCheck = (
    array: ChildElement[],
    nestedChild = false,
    nestedParent = false
  ): boolean => {
    for (const element of array) {
      if (
        element.childId === toTargetParentId &&
        nestedChild === true &&
        element.typeId > 1000 // check if not a separator (1000) or previously dragged component (> 1000)
      )
        return (nestedParent = true);
      else if (
        element.childId === currentChildId &&
        element.children.length > 0 &&
        nestedChild === false
      )
        nestedParent = selfNestingCheck(
          element.children,
          (nestedChild = true),
          nestedParent
        );
      else if (element.children.length > 0 && nestedChild === false)
        nestedParent = selfNestingCheck(
          element.children,
          nestedChild,
          nestedParent
        );
    }
    return nestedParent;
  };
  const parentNestingIntoChild = selfNestingCheck(childrenArray);
  if (parentNestingIntoChild === true) return false;
  return true;
};
export default validateNewParent;
