function getSelectable(newFocusComponent, components) {
  let focusComponentId = newFocusComponent.id;
  let componentsToCheck = components
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

<<<<<<< HEAD
      // console.log(components[i].id, components[i].title);
      // console.log("myChildren", myChilren);

=======
>>>>>>> fb1f985158be18ca3fc94b8978b45292fa8b1d28
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
<<<<<<< HEAD
  
  // console.log("newancestors", newAncestors);
  // console.log("comptocheck", componentsToCheck);
  // console.log("cumulativeancestors", ancestors);

=======
>>>>>>> fb1f985158be18ca3fc94b8978b45292fa8b1d28
  return findAncestors(components, newAncestors, componentsToCheck, ancestors);
}

export default getSelectable;
