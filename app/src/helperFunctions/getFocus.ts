import { useContext } from 'react';
import StateContext from './../context/context';

const getFocus = () => {
  const [state] = useContext(StateContext);
  // find and store component's name based on canvasFocus.componentId
  // note: deep clone here to make sure we don't end up altering state
  const focusTarget = JSON.parse(
    JSON.stringify(
      state.components.find(comp => comp.id === state.canvasFocus.componentId)
    )
  );
  delete focusTarget.child;
  // checks if canvasFocus references a childId
  const childInstanceId = state.canvasFocus.childId;
  let focusChild;
  // if so, breadth-first search through focusTarget's descendants to find matching child
  if (childInstanceId) {
    focusTarget.child = {};
    focusTarget.child.id = childInstanceId;
    focusChild = {}; // child instance being referenced in canvasFocus
    const searchArray = [...focusTarget.children];
    while (searchArray.length > 0) {
      const currentChild = searchArray.shift();
      // if a match is found, set focusChild to the matched child and break out of the loop
      if (currentChild.childId === childInstanceId) {
        focusChild = currentChild;
        focusTarget.child.style = focusChild.style;
        break;
      }
      if (currentChild.name !== 'input' && currentChild.name !== 'img')
        currentChild.children.forEach(child => searchArray.push(child));
    }

    // if type is Component, use child's typeId to search through state components and find matching component's name
    if (focusChild.type === 'Component') {
      focusTarget.child.type = 'component';
      focusTarget.child.name = state.components.find(
        comp => comp.id === focusChild.typeId
      ).name;
      // if type is HTML Element, search through HTML types to find matching element's name
    } else if (focusChild.type === 'HTML Element') {
      focusTarget.child.type = 'HTML element';
      focusTarget.child.name = state.HTMLTypes.find(
        elem => elem.id === focusChild.typeId
      ).name;
    }
  }
  return focusTarget;
};

export default getFocus;