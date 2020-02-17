import getSelectable from './getSelectable.util';
import { cloneDeep, getColor, updateState } from './index.util';
import { ComponentState } from '../types/types';
import * as types from '../types/actionTypes';

// ** initial state for components
const initialComponentState: ComponentState = {
  id: 0,
  stateful: false,
  title: '',
  expanded: false,
  color: null,
  props: [],
  parentId: [],
  nextPropId: 0,
  position: {
    x: 25,
    y: 25,
    width: 800,
    height: 550,
  },
  childrenArray: [],
  nextChildId: 1,
  focusChildId: 0,
};

// ** Redux thunk action
export const createComponent = (id: number, title: string, state = initialComponentState) => {
  // ** Redux thunk returns a function rather than an action creator object
  // ** Thunks allow us to do async activity. In our example we don't need access to our dispatch function so we're return a function which will create an updated component and create a Promise to be resolved when we add the component to our application array
  return () => {
    const createdComponent = updateState(state, {
      id: id + 1,
      title,
      color: getColor(),
      expanded: true,
    });
    return Promise.resolve(createdComponent); // creating a thenable promise that passes the created component to be passed down to the next then chain
  }
};

export const updateCurrentComponent = (component: ComponentState, { title, stateful, parentId, props }: ComponentState) => {
  // ** setting the next four values to be either the truth value of what was destructured from the object or whatver value it had to begin with
  const componentTitle = title || component.title;
  const componentStateful = stateful !== null ? stateful : component.stateful;
  const componentParentId = parentId || component.parentId;
  const componentProps = props || component.props;
  // ** using our updateState utility method to return and merge the old component state with the new value to be updated
  return updateState(component, { 
    title: componentTitle,
    stateful: componentStateful,
    parentId: componentParentId, 
    props: componentProps
  });
}