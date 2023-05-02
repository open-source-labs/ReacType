import { DragObjectWithType } from 'react-dnd';

export interface State {
  name: string;
  isLoggedIn: boolean;
  components: Component[];
  rootComponents: number[];
  projectType: string;
  config?: {};
  separator?: ChildElement;
  canvasFocus: { componentId: number; childId: number | null };
  nextComponentId: number;
  nextTopSeparatorId: number;
  nextBottomSeparatorId?: number;
  nextChildId: number;
  HTMLTypes: HTMLType[];
  tailwind: boolean;
}

export interface ChildElement {
  type: string;
  typeId: number;
  name: string;
  childId: number;
  style: object;
  attributes: Attributes;
  events: object;
  children?: ChildElement[];
  stateProps: StateProp[]; // state: [ { id, key, value, type }, ...]
  stateUsed?: StateUsed;
  passedInProps: StateProp[];
}

export interface Component {
  id: number;
  name: string;
  style: {};
  attributes?: object;
  events: object;
  code: string;
  children: ChildElement[];
  isPage: boolean;
  past: any[];
  future: any[];
  stateProps: StateProp[]; // state: [ { id, key, value, type }, ...]
  useStateCodes: string[];
  useContext?: object;
  passedInProps: StateProp[];
  stateUsed?: StateUsed;
}
export interface StateProp {
  id: string;
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
  style: any;
  placeHolderShort: string | JSX.Element;
  placeHolderLong: string;
  // ? == optional type part of icon, cant comment out icon and it works
  icon?: any;
  framework: string;
  nestable: boolean;
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
export interface DeleteButtons {
  id: number;
  name: string;
}
export interface StatePropsPanelProps {
  selectHandler: (table: any) => void;
  deleteHandler: (id: number | any) => void;
}
export interface AddRoutes {
  id: number;
  name: string;
}

export interface ManageSeparators {
  mergeSeparator: (arg1:ChildElement[], arg2?:number) => any;  // update specificity
  handleSeparators: (arg1: ChildElement[], arg2?: string) => number;
  nextTopSeparatorId: number
}

export interface StateUsed {
  compTextProviderId: number;
  compTextPropsId: number;
  compText: string;
  compLinkProviderId: number;
  compLinkPropsId: number;
  compLink: string;
}

export interface Attributes {
  compText?: string;
  compLink?: string;
}

export interface Arrow {
  renderArrow: (id: number) => any;
  deleteLines: () => void;
  lineDraw: (x1:number, y1:number,x2:number,y2:number) => void;
  createHeadElement:(x:number, y:number,length:number,angle:number) => HTMLDivElement;
  createLineElement: (x:number, y:number,length:number,angle:number) => HTMLDivElement;
}