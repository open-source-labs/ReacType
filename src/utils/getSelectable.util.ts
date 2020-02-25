import { ComponentState, ChildState } from '../types/types';

type getSelectableInt =  {
  [key: string]: number[];
}

const findAncestors = (
  components: ComponentState[],
  currentCompArr: number[],
  componentsToCheck: number[],
  ancestors: Array<number> = []
): getSelectableInt => {
  if (!currentCompArr.length) {
    return {
      ancestors,
      selectableChildren: componentsToCheck
    };
  }

  const newAncestors: number[] = [];

  for (let i = 0; i < components.length; i++) {
    if (componentsToCheck.includes(components[i].id)) {
      const myChildren = components[i].children.map(
        (child: ChildState) => child.childComponentId,
      );

      const found = currentCompArr.filter((comp: ComponentState) =>
        myChildren.includes(comp)
      );

      if (found.length) {
        ancestors.push(components[i].id);
        newAncestors.push(components[i].id);

        const indexToDelete = componentsToCheck.findIndex(
          (c: Number) => c === components[i].id
        );

        componentsToCheck.splice(indexToDelete, 1);
      }
    }
  }
  return findAncestors(components, newAncestors, componentsToCheck, ancestors);
}

const getSelectable = (
  newFocusComponent: ComponentState,
  components: ComponentState[]
) => {
  const focusComponentId = newFocusComponent.id;
  const componentsToCheck = components
    .map((comp: ComponentState) => comp.id)
    .filter((id: number) => id !== focusComponentId);
  return findAncestors(components, [focusComponentId], componentsToCheck);
}

export default getSelectable;
