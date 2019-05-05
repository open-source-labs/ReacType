function getSelectable(newFocusComponent, components) {
  const focusComponentId = newFocusComponent.id;
  const componentsToCheck = components
    .map(comp => comp.id)
    .filter(id => id !== focusComponentId);
  return findAncestors(components, [focusComponentId], componentsToCheck);
}

function findAncestors(
  components,
  currentCompArr,
  componentsToCheck,
  ancestors = []
) {
  if (!currentCompArr.length) {
    return {
      ancestors,
      selectableChildren: componentsToCheck
    };
  }

  const newAncestors = [];

  for (let i = 0; i < components.length; i++) {
    if (componentsToCheck.includes(components[i].id)) {
      const myChildren = components[i].childrenArray.map(
        child => child.childComponentId
      );

      const found = currentCompArr.filter(comp => myChildren.includes(comp));

      if (found.length) {
        ancestors.push(components[i].id);
        newAncestors.push(components[i].id);

        const indexToDelete = componentsToCheck.findIndex(
          c => c === components[i].id
        );

        componentsToCheck.splice(indexToDelete, 1);
      }
    }
  }
  return findAncestors(components, newAncestors, componentsToCheck, ancestors);
}

export default getSelectable;
