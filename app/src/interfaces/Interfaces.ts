import { DragObjectWithType } from 'react-dnd';

export interface State {
  name: string;
  isLoggedIn: boolean;
  components: Component[];
  rootComponents: number[];
  projectType: string;
  separator: ChildElement;
  canvasFocus: { componentId: number; childId: number | null };
  nextComponentId: number;
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
}

export interface Component {
  id: number;
  name: string;
  style: object;
  code: string;
  children: ChildElement[];
  isPage: boolean;
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
