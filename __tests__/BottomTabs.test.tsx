import React, { useReducer } from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import BottomTabs from '../app/src/components/bottom/BottomTabs';
import StateContext from '../app/src/context/context'; //does not exist
import initialState from '../app/src/context/initialState'; //does not exist
import reducer from '../app/src/reducers/componentReducer'; //does not exist
function Test() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={[state, dispatch]}>
      <BottomTabs />
    </StateContext.Provider>
  );
}
xtest('Bottom Panel Contains Two Tabs: Code Preview and Component Tree', () => {
  render(<Test />);
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
});
