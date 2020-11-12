import TreeChart from '../app/src/tree/TreeChart';
import React, { useReducer } from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, cleanup, screen } from '@testing-library/react';
import StateContext from '../app/src/context/context';
import { State, Action, Component, ChildElement } from '../app/src/interfaces/Interfaces';
import initialState from '../app/src/context/initialState';
import reducer from '../app/src/reducers/componentReducer';
import 'd3';

const tester = [  
    {
      id: 1,
      name: 'index',
      style: {},
      code: `import React, { useState } from 'react';
      import A from '../components/A';
      import B from '../components/B';
      import Head from 'next/head';
      const index = (props): JSX.Element => {
        const [value, setValue] = useState<any | undefined>('INITIAL VALUE');
        return (
          <>
            <Head>
              <title>index</title>
            </Head>
            <div className="index" style={props.style}>
              <div>
                <A />
              </div>
              <div>
                <B />
              </div>
            </div>
          </>
        );
      };
      export default index;
      `,
      children: [
        {
          childId: 1,
          children: [
            {
              childId: 2,
              children: [],
              name: 'A',
              style: {},
              type: "Component",
              typeId: 2
            }
          ],
          name: 'div',
          style: {},
          type: "HTML Element",
          typeId: 11
        },
        {
          childId: 3,
          children: [
            {
              childId: 4,
              children: [],
              name: 'B',
              style: {},
              type: "Component",
              typeId: 3
            }
          ],
          name: 'div',
          style: {},
          type: "HTML Element",
          typeId: 11
        }
      ],
      isPage: true
    },
  {    
      id: 2, 
      nextChildId: 1,   
      name: 'A',    
      style: {},    
      code: '',    
      children: [],    
      isPage: false  
  },  
  {    
      id: 3, 
      nextChildId: 1,   
      name: 'B',    
      style: {},    
      code: '',    
      children: [],    
      isPage: false  
  }
  ]

function Test() {
  const [state, dispatch] = useReducer(reducer, initialState);
  state.components = tester;
  return (
    <StateContext.Provider value={[state, dispatch]} >
      <TreeChart data={state.components} />
    </StateContext.Provider>
  );
}

test('Test the tree functionality', function () {
  render(<Test/>);

  expect(screen.getByText('index')).toBeInTheDocument();
  expect(screen.getByText('A')).toBeInTheDocument();
  expect(screen.getByText('B')).toBeInTheDocument();

})