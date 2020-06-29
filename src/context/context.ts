import React from 'react';
import { State } from '../interfaces/InterfacesNew';
import { lightGreen } from '@material-ui/core/colors';

export const initialState: State = {
  components: [
    {
      id: 1,
      name: 'index',
      style: {},
      nextChildId: 6,
      children: [
        {
          type: 'Component',
          typeId: 2,
          childId: 1,
          style: {}
        },
        {
          type: 'Component',
          typeId: 3,
          childId: 2,
          style: {}
        },
        {
          type: 'HTML Element',
          typeId: 3,
          childId: 3,
          style: {}
        },
        {
          type: 'HTML Element',
          typeId: 11,
          childId: 4,
          nextChildId: 2,
          style: {},
          children: [
            {
              type: 'HTML Element',
              typeId: 11,
              childId: 4,
              nextChildId: 2,
              style: {},
              children: [
                {
                  type: 'Component',
                  typeId: 3,
                  childId: 1,
                  style: {}
                }
              ]
            }
          ]
        },
        {
          type: 'HTML Element',
          typeId: 11,
          childId: 5,
          nextChildId: 1,
          style: {},
          children: []
        }
      ]
    },
    {
      id: 2,
      name: 'Article',
      style: {
        display: 'flex',
        justifyContent: 'space-around',
        backgroundColor: 'lightGreen'
      },
      nextChildId: 3,
      children: [
        {
          type: 'Component',
          typeId: 3,
          childId: 1,
          style: { backgroundColor: 'yellow' }
        },
        {
          type: 'Component',
          typeId: 3,
          childId: 2,
          style: { backgroundColor: 'yellow' }
        }
      ]
    },
    {
      id: 3,
      name: 'Section',
      style: { backgroundColor: 'lightBlue' },
      nextChildId: 1,
      children: [
        {
          type: 'HTML Element',
          typeId: 3,
          childId: 1,
          style: {}
        }
      ]
    },
    {
      id: 4,
      name: 'Like',
      style: { backgroundColor: 'lightPurple' },
      nextChildId: 1,
      children: []
    }
  ],
  rootComponents: [1],
  canvasFocus: { componentId: 1, childId: null },
  nextComponentId: 5
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
