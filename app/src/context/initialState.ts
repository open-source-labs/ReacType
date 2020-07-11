import { State } from '../interfaces/InterfacesNew';

// This is the state that will be set for a new project or when the user resets the state of their project
export const initialState: State = {
  components: [
    {
      id: 1,
      name: 'App',
      style: {},
      code: '<div>This is the CODE!!!!</div>',
      children: []
    }
  ],
  projectType: 'Next.js',
  rootComponents: [1],
  canvasFocus: { componentId: 1, childId: null },
  nextComponentId: 2,
  nextChildId: 1
};

export default initialState;
