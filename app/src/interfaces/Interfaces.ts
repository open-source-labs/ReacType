import { DragObjectWithType } from 'react-dnd';

export interface State {
  name: string;
  isLoggedIn: boolean;
  components: Component[];
  rootComponents: number[];
  projectType: string;
  // Caret
  config?: {};
  separator: ChildElement;
  canvasFocus: { componentId: number; childId: number | null };
  nextComponentId: number;
  nextTopSeparatorId: number;
  nextBottomSeparatorId: number;
  nextChildId: number;
  HTMLTypes: HTMLType[];
}

export interface ChildElement {
  type: string;
  typeId: number;
  name: string;
  childId: number;
  style: object;
  attributes?: object;
  children?: ChildElement[];
  // Caret
  annotations?: string;
}
export interface Component {
  id: number;
  name: string;
  style: object;
  // Caret
  attributes?: object;
  code: string;
  children: ChildElement[];
  isPage: boolean;
  past: any[];
  future: any[];
  stateProps: StateProp[]; // state: [ { key: value, type }, {key: value, type}, {key: value, type} ]
  // Caret
  annotations?: string;
  useStateCodes: string[];

}

export interface StateProp {
  key: string;
  value: any;
  type: unknown;
}

export interface Action {
  type: string;
  payload: any;
}

export interface Payload {}

export interface Reduce {
  state: Context;
  action: Action;
}

export interface Context {
  state: State;
  dispatch: State;
}

export interface HTMLType {
  id: number;
  tag: string;
  name: string;
  style: object;
  placeHolderShort: string | JSX.Element;
  placeHolderLong: string;
  icon: any;
}

export interface DragItem extends DragObjectWithType {
  newInstance: boolean;
  instanceType: string;
  instanceTypeId: number;
  childId: number;
}

export interface DragItemType {
  INSTANCE: string;
}

export interface LoginInt {
  isLoggedIn: boolean;
}

// Caret start
export interface Annotations {
  id: number;
  name: string;
  annotations: string;
}

export interface StatePropsPanelProps {
  selectHandler: (table: any) => void;
  deleteHandler: (id: number | any) => void;
}

// Caret end
