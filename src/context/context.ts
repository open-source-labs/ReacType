import React from 'react';
import { State } from '../interfaces/InterfacesNew';

export const initialState: State = {
  components: [
    {
      id: 1,
      name: 'index',
      style: {},
      nextChildId: 4,
      children: [
        {
          type: 'Component',
          typeId: 2,
          childId: 1,
          style: {}
        },
        {
          type: 'Component',
          typeId: 2,
          childId: 2,
          style: {}
        },
        {
          type: 'HTML Element',
          typeId: 10,
          childId: 3,
          style: {}
        }
      ]
    },
    {
      id: 2,
      name: 'Article',
      style: {},
      nextChildId: 1,
      children: []
    },
    {
      id: 3,
      name: 'Section',
      style: {},
      nextChildId: 1,
      children: []
    }
  ],
  rootComponents: [1],
  canvasFocus: { componentId: 1, childId: null },
  nextComponentId: 4
};

export const HTMLOptions = [
  {
    id: 0,
    category: 'HTMLComponent',
    name: 'p'
  },
  {
    id: 1,
    category: 'HTMLComponent',
    name: 'h1'
  }
];

export const stateContext = React.createContext([{}, () => {}]);
