import { DragObjectWithType } from 'react-dnd';

export interface State {
  name: string;
  isLoggedIn: boolean;
  components: Component[];
  rootComponents: number[];
  projectType: string;
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
  stateProps: StateProp[]; // state: [ { id, key, value, type }, ...]
  annotations?: string;
  stateUsed?: object; 
}
export interface Component {
  id: number;
  name: string;
  style: object;
  attributes?: object;
  code: string;
  children: ChildElement[];
  isPage: boolean;
  past: any[];
  future: any[];
  stateProps: StateProp[]; // state: [ { id, key, value, type }, ...]
  annotations?: string;
  useStateCodes: string[];
  useContext?: object
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

export interface Payload { }
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
export interface Annotations {
  id: number;
  name: string;
  annotations: string;
}
export interface StatePropsPanelProps {
  selectHandler: (table: any) => void;
  deleteHandler: (id: number | any) => void;
}
export interface AddRoutes {
  id: number;
  name: string;
}

//LegacyPD added this 
export interface StateDisplay {
  parentName: string;
  componentName: string;
  parentStateProps: StateProp[];
  componentStateProps: StateProp[];
}