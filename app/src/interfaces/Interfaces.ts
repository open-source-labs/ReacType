import { DragObjectWithType } from 'react-dnd';

export interface State {
  name: String;
  isLoggedIn: Boolean;
  components: Component[];
  rootComponents: number[];
  projectType: string;
  canvasFocus: { componentId: number; childId: number | null };
  nextComponentId: number;
  nextChildId: number;
}

export interface ChildElement {
  type: string;
  typeId: number;
  childId: number;
  //   update this interface later so that we enforce that each value of style object is a string
  style: object;
  attributes?: object;
  children?: ChildElement[];
}

export interface Component {
  id: number;
  name: string;
  style: object;
  code: string;
  children: ChildElement[];
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
