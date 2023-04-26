import React from 'react';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import BottomTabs from '../app/src/components/bottom/BottomTabs';
import store from '../app/src/redux/store';

test('Bottom Panel Contains All Seven Tabs', () => {
  render(
    <Provider store={store}>
      <BottomTabs />
    </Provider>
  );
  expect(screen.getAllByRole('tab')).toHaveLength(7);
  expect(screen.getByText('Code Preview')).toBeInTheDocument();
  expect(screen.getByText('Component Tree')).toBeInTheDocument();
  expect(screen.getByText('Creation Panel')).toBeInTheDocument();
  expect(screen.getByText('Customization')).toBeInTheDocument();
  expect(screen.getByText('CSS Editor')).toBeInTheDocument();
  expect(screen.getByText('Context Manager')).toBeInTheDocument();
  expect(screen.getByText('State Manager')).toBeInTheDocument();
});
