export interface ComponentInt {
  id: number;
  stateful: boolean;
  title: string;
  color: string;
  props: PropInt[];
  nextPropId: number;
  position: PositionInt;
  childrenArray: ChildInt[];
  nextChildId: number;
  focusChildId: number;
}

export interface ComponentsInt extends Array<ComponentInt> {}

export interface ChildInt {
  childId: number;
  childSort: number;
  childType: string;
  childComponentId: number;
  componentName: string;
  position: PositionInt;
  color: string | null; // maybe optional instead, look up null vs undefined
  htmlElement: string | null; // maybe should be optional instead
  HTMLInfo: { [index: string]: string }; // replace with HTMLinfo specifics
}

export interface ChildrenInt extends Array<ChildInt> {}