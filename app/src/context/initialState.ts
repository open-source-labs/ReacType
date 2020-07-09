import { State } from '../interfaces/InterfacesNew';

export const initialState: State = {
  components: [
    {
      id: 1,
      name: 'App',
      style: {},
      code:'<div>This is the CODE!!!!</div>',
      children: []
    }
  ],
  rootComponents: [1],
  canvasFocus: { componentId: 1, childId: null },
  nextComponentId: 2,
  nextChildId: 1
};

export default initialState;
