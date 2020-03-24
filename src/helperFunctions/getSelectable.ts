import { ComponentInt, ComponentsInt, ChildInt } from '../interfaces/Interfaces';

interface getSelectableInt {
  [key: string]: Array<number>;
}

function getSelectable(
  newFocusComponent: ComponentInt,
  components: ComponentsInt,
) {
  const focusComponentId = newFocusComponent.id;
  const componentsToCheck = components
    .map((comp: ComponentInt) => comp.id)
    .filter((id: number) => id !== focusComponentId);
  return findAncestors(components, [focusComponentId], componentsToCheck);
}

function findAncestors(
  components: ComponentsInt,
  currentCompArr: ComponentsInt,
  componentsToCheck: ComponentsInt,
  ancestors: Array<number> = [],
): getSelectableInt {
  if (!currentCompArr.length) {
    return {
      ancestors,
      selectableChildren: componentsToCheck,
    };
  }

  const newAncestors: number[] = [];

  for (let i = 0; i < components.length; i++) {
    if (componentsToCheck.includes(components[i].id)) {
      const myChildren = components[i].childrenArray.map(
        (child: ChildInt) => child.childComponentId,
      );

      const found = currentCompArr.filter((comp: ComponentInt) =>
        myChildren.includes(comp),
      );

      if (found.length) {
        ancestors.push(components[i].id);
        newAncestors.push(components[i].id);

        const indexToDelete = componentsToCheck.findIndex(
          (c: Number) => c === components[i].id,
        );

        componentsToCheck.splice(indexToDelete, 1);
      }
    }
  }
  return findAncestors(components, newAncestors, componentsToCheck, ancestors);
}

export default getSelectable;
