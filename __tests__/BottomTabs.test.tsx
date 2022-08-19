import React, { useReducer} from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import BottomTabs from '../app/src/components/bottom/BottomTabs';
import StateContext from '../app/src/context/context';
import initialState from '../app/src/context/initialState';
import reducer from '../app/src/reducers/componentReducer';
function Test() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={[state, dispatch]} >
      <BottomTabs />
    </StateContext.Provider>
  )
}
test('Bottom Panel Contains Two Tabs: Code Preview and Component Tree', () => {
  render(<Test/>);
  expect(screen.getAllByRole('tab')).toHaveLength(7);
  expect(screen.getByText('Code Preview')).toBeInTheDocument();
  expect(screen.getByText('Component Tree')).toBeInTheDocument();
  expect(screen.getByText('Creation Panel')).toBeInTheDocument();
  expect(screen.getByText('Customization')).toBeInTheDocument();
  expect(screen.getByText('CSS Editor')).toBeInTheDocument();
  expect(screen.getByText('Code Preview')).toBeInTheDocument();
  expect(screen.getByText('Component Tree')).toBeInTheDocument();
  expect(screen.getByText('Context Manager')).toBeInTheDocument();
  expect(screen.getByText('State Manager')).toBeInTheDocument();
})
