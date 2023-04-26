import TreeChart from '../app/src/tree/TreeChart';
import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { initialState } from '../app/src/redux/reducers/slice/appStateSlice';
import { Provider } from 'react-redux';
import store from '../app/src/redux/store';
import 'd3';

let state = JSON.parse(JSON.stringify(initialState));
state.components = [
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
            type: 'Component',
            typeId: 2
          }
        ],
        name: 'div',
        style: {},
        type: 'HTML Element',
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
            type: 'Component',
            typeId: 3
          }
        ],
        name: 'div',
        style: {},
        type: 'HTML Element',
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
];

// renders a tree of the components in tester
test('Test the tree functionality', () => {
  render(
    <Provider store={store}>
      <TreeChart data={state.components} />
    </Provider>
  );
  // elements that are not separators should appear in the tree
  expect(screen.getByText('index')).toBeInTheDocument();
  expect(screen.getByText('A')).toBeInTheDocument();
  expect(screen.getByText('B')).toBeInTheDocument();
  // tree should not include separators
  expect(screen.queryByText('separator')).toBe(null);
});
