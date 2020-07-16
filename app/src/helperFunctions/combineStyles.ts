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
