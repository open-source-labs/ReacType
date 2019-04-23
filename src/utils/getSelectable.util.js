function getSelectable(newFocusComponent, components) {
  let focusComponentId = newFocusComponent.id;

  let componentsToCheck = components
    .map(comp => comp.id)
    .filter(id => id !== focusComponentId);

  console.log(componentsToCheck);

  return findAncestors(components, [focusComponentId], componentsToCheck);
}

function findAncestors(
  components,
  currentCompArr,
  componentsToCheck,
  ancestors = []
) {
  if (!currentCompArr.length)
    return {
      ancestors: ancestors,
      selectableChildren: componentsToCheck
    };

  let newAncestors = [];

  for (let i = 0; i < components.length; i++) {
    if (componentsToCheck.includes(components[i].id)) {
      const myChilren = components[i].childrenArray.map(
        child => child.childComponentId
      );

      // console.log(components[i].id, components[i].title);
      // console.log("myChildren", myChilren);

      let found = currentCompArr.filter(comp => myChilren.includes(comp));

      if (found.length) {
        ancestors.push(components[i].id);
        newAncestors.push(components[i].id);

        let indexToDelete = componentsToCheck.findIndex(
          c => c === components[i].id
        );

        componentsToCheck.splice(indexToDelete, 1);
      }
    }
  }
  
  // console.log("newancestors", newAncestors);
  // console.log("comptocheck", componentsToCheck);
  // console.log("cumulativeancestors", ancestors);

  return findAncestors(components, newAncestors, componentsToCheck, ancestors);
}

export default getSelectable;
