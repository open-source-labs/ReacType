export interface State {
  components: Component[];
  rootComponents: number[];
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
  children: ChildElement[];
}

export interface Action {
  type: string;
  payload: object;
}

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
