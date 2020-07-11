import { State } from '../interfaces/InterfacesNew';

export const initialState: State = {
  name: '',
  isLoggedIn: false,
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
