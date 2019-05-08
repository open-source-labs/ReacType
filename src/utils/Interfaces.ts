export interface PropInt {
  id: number;
  key: string;
  value: string;
  required: boolean;
  type: string;
}

interface Position {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ChildInt {
  childId: number;
  childType: string;
  childComponentId: number;
  componentName: string;
  position: Position;
  color: string | null; // maybe optional instead, look up null vs undefined
  htmlElement: string | null; // maybe should be optional instead
  HTMLInfo: object; // replace with HTMLinfo specifics
}

export interface ChildrenInt extends Array<ChildInt> {}

export interface ComponentInt {
  id: number;
  stateful: boolean;
  title: string;
  color: string;
  // draggable: boolean;
  props: PropInt[];
  nextPropId: number;
  position: Position;
  childrenArray: ChildInt[];
  nextChildId: number;
  focusChildId: number;
}

export interface ComponentsInt extends Array<ComponentInt> {}

export interface ApplicationStateInt {
  totalComponents: number;
  nextId: number;
  successOpen: boolean;
  errorOpen: boolean;
  focusComponent: ComponentInt;
  selectableChildren: Array<number>;
  ancestors: Array<number>;
  initialApplicationFocusChild: ChildInt;
  focusChild: ChildInt;
  components: ComponentsInt;
  appDir: string;
  loading: boolean;
  componentTree: object;
}

function findComponentById(id: number, components: ComponentInt[]) {
  return components.find(comp => comp.id === id);
}

export default findComponentById;
