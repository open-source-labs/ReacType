/* eslint-disable max-len */
import { State, ChildElement } from '../interfaces/Interfaces';

/**
 * Validates whether the new parent is a valid target destination for moving an element on the canvas.
 * This function checks if the target destination is a nested component within its own children array, preventing nesting inside its children.
 * @param {State} state - The state object containing canvas components and focus information.
 * @param {number} currentChildId - The ID of the child element being moved.
 * @param {number} toTargetParentId - The ID of the potential new parent element.
 * @returns {boolean} Returns true if the new parent is a valid target, otherwise false.
 */
const validateNewParent = (
  state: State,
  currentChildId: number,
  toTargetParentId: number,
): boolean => {
  const focusIndex = state.canvasFocus.componentId - 1;
  const childrenArray = state.components[focusIndex].children;
  // Checks to see if a Parent is trying to nest inside one of its children
  const selfNestingCheck = (
    array: ChildElement[],
    nestedChild = false,
    nestedParent = false,
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
          nestedParent,
        );
      else if (element.children.length > 0 && nestedChild === false)
        nestedParent = selfNestingCheck(
          element.children,
          nestedChild,
          nestedParent,
        );
    }
    return nestedParent;
  };
  const parentNestingIntoChild = selfNestingCheck(childrenArray);
  if (parentNestingIntoChild === true) return false;
  return true;
};
export default validateNewParent;
