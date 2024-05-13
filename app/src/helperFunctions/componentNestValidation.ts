import { ChildElement } from '../interfaces/Interfaces';

/**
 * Used in both DirectChildHTMLNestable and SeparatorChild to ensure that user-created components do not nest within themselves.
 * To allow such nesting would be a certain paradox and locks the application.
 * This check is performed after the drag functionality resolves and releases.
 * @param {ChildElement[]} children - The array of child elements to check.
 * @param {number} nestId - The ID of the component to check against nesting.
 * @returns {boolean} Returns true if the component is not nested within itself, otherwise returns false.
 */
const componentNest = (children: ChildElement[], nestId: Number) => {
  let notNested = true;
  for (const element of children) {
    if (element.childId === nestId) return false;
    else if (element.children.length > 0)
      notNested = componentNest(element.children, nestId);
  }
  return notNested;
};
export default componentNest;
