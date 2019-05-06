interface Prop {
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

interface Child {
  childId: number;
  childType: string;
  childComponentId: number;
  componentName: string;
  position: Position;
  color: string | null; // maybe optional instead, look up null vs undefined
  htmlElement: string | null; // maybe should be optional instead
  HTMLInfo: object; // replace with HTMLinfo specifics
}

interface Component {
  id: number;
  stateful: boolean;
  title: string;
  parentIds: number[];
  color: string;
  draggable: boolean;
  childrenIds: number[];
  selectableParents?: any[]; // unused
  expanded?: boolean; // unused
  props: Prop[];
  nextPropId: number;
  position: Position;
  childrenArray: Child[];
  nextChildId: number;
  focusChildId: number;
}

function findComponentById(id: number, components: Component[]) {
  return components.find(comp => comp.id === id);
}

export default findComponentById;
