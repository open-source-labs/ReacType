import { State } from '../interfaces/Interfaces';
import HTMLTypes from './HTMLTypes';

// This is the state that will be set for a new project or when the user resets the state of their project
const initialState: State = {
  name: '',
  isLoggedIn: false,
  components: [
    {
      id: 1,
      name: 'index',
      style: {},
      code: '<div>Drag in a component or HTML element into the canvas!</div>',
      children: [],
      isPage: true
    },
  ],
  // separator: {
  //   type: 'HTML type',
  //   typeId: 1000,
  //   name: 'separator',
  //   childId: 1000,
  //   style: {backgroundColor: 'red', height: '30px', width: 'default'},
  //   children: [],
  //   },
  projectType: 'Next.js',
  rootComponents: [1],
  canvasFocus: { componentId: 1, childId: null },
  nextComponentId: 2,
  nextChildId: 1,
  HTMLTypes
};

export default initialState;
