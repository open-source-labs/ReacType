export interface PropInt {
  id: number;
  key: string;
  value: string;
  required: boolean;
  type: string;
}

export interface PositionInt {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ApplicationStateInt {
  totalComponents: number;
  nextId: number;
  successOpen: boolean;
  errorOpen: boolean;
  focusComponent: ComponentInt;
  selectableChildren: number[];
  ancestors: number[];
  initialApplicationFocusChild: ChildInt;
  focusChild: ChildInt;
  components: ComponentsInt;
  appDir: string;
  loading: boolean;
}
