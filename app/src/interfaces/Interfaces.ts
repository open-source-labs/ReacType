import { DragObjectWithType } from 'react-dnd';

export interface State {
  name: string;
  _id: string;
  forked: boolean;
  published: boolean;
  isLoggedIn: boolean;
  components: Component[];
  rootComponents: number[];
  projectType: string;
  config?: { saveTimer: boolean; saveFlag: boolean };
  separator?: ChildElement;
  canvasFocus: { componentId: number; childId: number | null };
  nextComponentId: number;
  nextTopSeparatorId: number;
  nextBottomSeparatorId?: number;
  nextChildId: number;
  HTMLTypes: HTMLType[];
  tailwind: boolean;
  stylesheet: string;
  codePreview: boolean;
  screenshotTrigger: boolean;
  customElementId: number;
}

export interface ChildElement {
  type: string;
  typeId: number;
  name: string;
  childId: number;
  style: ChildStyle;
  attributes: Attributes;
  events: object;
  children?: ChildElement[];
  stateProps: StateProp[]; // state: [ { id, key, value, type }, ...]
  stateUsed?: StateUsed;
  passedInProps: StateProp[];
  tag?: string;
}

export interface ChildStyle {
  height?: string;
  alignItems?: string;
  backgroundColor?: string;
  display?: string;
  flexDirection?: string;
  width?: string;
  justifyContent?: string;
}

export interface Component {
  id: number;
  name: string;
  style: {};
  icon?: any;
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
  placeHolderShort: string | React.JSX.Element;
  placeHolderLong: string;
  // ? == optional type part of icon, cant comment out icon and it works
  // Icon?: any;
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
  mergeSeparator: (arg1: ChildElement[], arg2?: number) => any; // update specificity
  handleSeparators: (arg1: ChildElement[], arg2?: string) => number;
  nextTopSeparatorId: number;
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
  cssClasses?: string;
}

// interface PublishResponse {
//   success: boolean;
//   error?: string;
// }

export interface Arrow {
  renderArrow: (id: number) => any;
  deleteLines: () => void;
  lineDraw: (x1: number, y1: number, x2: number, y2: number) => void;
  createHeadElement: (
    x: number,
    y: number,
    length: number,
    angle: number
  ) => HTMLDivElement;
  createLineElement: (
    x: number,
    y: number,
    length: number,
    angle: number
  ) => HTMLDivElement;
}

export interface ColumnTab {
  //table state props
  field: string;
  headerName: string;
  width: string | number;
  editable: boolean;
  align?: string;
  valueGetter?: (param: any) => string | undefined;
  renderCell?: (params: any) => React.ReactNode;
  flex?: string | number;
  sortable?: boolean;
  disableColumnMenu?: boolean;
}

// Exports for Mouse tracking

export interface MouseProps {}
export interface MouseState {
  //canvas mouseTracking props.
  clientX: number;
  clientY: number;
}

export interface BottomPanelObj {
  stateUsedObj: object;
  contextParam: object;
  useContextObj: object;
  attributes: object;
  style: object;
  events: object;
}
