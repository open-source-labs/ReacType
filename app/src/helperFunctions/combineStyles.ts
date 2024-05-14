/**
 * Combines default styles with priority styles, prioritizing the properties from the priority styles.
 * @param {Object} defaultStyle - The default styles.
 * @param {Object} priorityStyle - The priority styles.
 * @returns {Object} Returns the combined styles object.
 */
export const combineStyles = (
  defaultStyle: Object,
  priorityStyle: Object
): Object => {
  // initialize output object that's a copy of priority styles
  const combinedStyle = { ...priorityStyle };
  // iterate through each style in default style
  // if property is not in the output object, add it to the output object
  for (let i in defaultStyle) {
    if (!combinedStyle.hasOwnProperty(i)) {
      combinedStyle[i] = defaultStyle[i];
    }
  }
  return combinedStyle;
};
