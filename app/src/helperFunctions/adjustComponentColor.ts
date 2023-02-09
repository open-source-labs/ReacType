// This function iterates over the children array of component[0] on the state (aka APP) and checks if the childId matches any of the childIds in the array. If so it changes the background color rendered in the canvas window.s
// WHAT THE CHILDREN ARRAY LOOKS LIKE
//  ARRAY OF OBJS
// {type: 'HTML Element', typeId: 1000, name: 'separator', childId: 1000, style: {…}, …}

const adjustComponentColor = (children: array, childId: number, state: object) => {
  state.components[0].children?.forEach(obj => {
  console.log('childId : ', obj['childId'], 'childId : ', childId);
  if (obj['childId'] === childId) combinedStyle['backgroundColor'] = 'light grey';
  });
}

export default adjustComponentColor;