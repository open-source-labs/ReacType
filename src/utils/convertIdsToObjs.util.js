let convertChildAndParentIds;

// converts an array of objects to an object containing all of the component objects
// with keys equal to their ids
const convertComponentsArrToObj = components => components.reduce((obj, comp) => {
  const compsObj = obj;
  compsObj[comp.id] = comp;
  return compsObj;
}, {});

// helper function for converting children/parent id arrays to arrays of components
const convertCompIdToObj = (id, compsObj) => {
  const comp = compsObj[id];
  if (!comp.children || comp.childrenIds.length !== comp.children.length) {
    return convertChildAndParentIds(compsObj, comp);
  }
  if (!comp.parents || comp.parentIds.length !== comp.parents.length) {
    return convertChildAndParentIds(compsObj, comp);
  }
  return comp;
};

// for a given component, replaces childrenIds array and parentsId array (containing numbers)
// with corresponding arrays containing component objects (recursively)
convertChildAndParentIds = (compsObj, component) => {
  const childrenAsObj = component.childrenIds.map(id => convertCompIdToObj(id, compsObj));

  const parentsAsObj = component.parentIds.map(id => compsObj[id]);

  return { ...component, children: childrenAsObj, parents: parentsAsObj };
};

const convertIdsToObjs = (components) => {
  const compsObj = convertComponentsArrToObj(components);
  return components.map(component => convertChildAndParentIds(compsObj, component));
};

export default convertIdsToObjs;
