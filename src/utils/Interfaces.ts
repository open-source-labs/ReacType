//This itnerface seems to be very specific to the prop argument passed into the reducer function 'addProp'.
//It actually might not make too muich sense being in this file.
export interface PropInt {
  id?: number;
  key: string;
  // value: string;
  // required: boolean;
  type: string;
}

export interface PropsInt {
  focusChild?: ChildInt;
  components: ComponentsInt;
  focusComponent?: ComponentInt;
  imageSource?: string;
  changeFocusChild?: (arg: { childId: number }) => void;
}

//This is the interface for the position and size for the Rect components from Konva.
export interface PositionInt {
  x: number;
  y: number;
  width: number;
  height: number;
}

//This is the interface for each child that belongs to a parent component.
//Stores as values of a an array called 'childrenArray'
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

//I converted this type form an interface because before it was just assigned
//to be an empty array type. Still doesn't type the target variable 'modifiedChildrenArray'
//in componentReducer.util.ts though.
export type ChildrenInt = Array<ChildInt>;

export interface ComponentInt {
  id: number;
  stateful: boolean;
  classBased: boolean;
  title: string;
  color: string;
  props: PropInt[];
  nextPropId: number;
  position: PositionInt;
  childrenArray: ChildInt[];
  nextChildId: number;
  focusChildId: number;
  childrenArrayChildInt?: any;
  code: string;
  changed: boolean;
}

export interface ComponentsInt extends Array<ComponentInt> {}

//Important interface for the global state of the app. \
export interface ApplicationStateInt {
  tutorial: number;
  imageSource: string;
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
  editMode: number;
  loading: boolean;
  history: ApplicationStateInt[];
  historyIndex: number;
  future: ApplicationStateInt[];
}

//Global Action interface \
export interface Action {
  type: string;
  payload?: any;
}

//I'm commenting these interfaces out because the global 'Action' interface should suffice for now.
//Writing interfaces like these would make the typing really specific, but seems unecessary.

// export interface LoadInitData {
//   type: string;
//   payload: { data: ApplicationStateInt | object };
// }

// export interface AddComponent {
//   type: string;
//   payload: { title: string };
// }
