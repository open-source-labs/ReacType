import React from 'react';
import { Context, ComponentBlueprint } from '../interfaces/InterfacesNew';

export const initialState: Context = {
  components: [],
  pages: [
    {
      pageId: 1,
      children: []
    }
  ]
};

export const CustomOptions: ComponentBlueprint[] = [
  {
    id: 0,
    category: 'CustomComponent',
    name: 'Tyler'
  },
  {
    id: 1,
    category: 'CustomComponent',
    name: 'Fredo'
  }
];

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
