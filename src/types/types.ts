export type Prop = {
  id: number;
  key: string;
  value: string;
  required: boolean;
  type: string;
}

export type Position = {
  x: number;
  y: number;
  width: number;
  height: number;
}

export type Child = {
  childId: number;
  childSort: number;
  childType: string;
  childComponentId: number;
  componentName: string;
  position: Position;
  color: string | null; // maybe optional instead, look up null vs undefined
  htmlElement: string | null; // maybe should be optional instead
  HTMLInfo: { [index: string]: string }; // replace with HTMLinfo specifics
}

export type ApplicationState = {
  totalComponents: number;
  successOpen: boolean;
  errorOpen: boolean;
  focusComponent: ComponentState | {};
  selectableChildren: number[];
  ancestors: number[];
  initialApplicationFocusChild: Child;
  focusChild: Child;
  components: ComponentState;
  appDir: string;
  loading: boolean;
}

export type ComponentState = {
  id: number;
  stateful: boolean;
  title: string;
  expanded: boolean;
  color: string;
  props: Prop[];
  parentId: number[];
  nextPropId: number;
  position: Position;
  childrenArray: Child[];
  nextChildId: number;
  focusChildId: number;
}

// export interface ComponentsInt extends Array<ComponentInt> {}

// export interface ChildrenInt extends Array<ChildInt> {}