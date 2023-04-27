import React from 'react';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import BottomTabs from '../app/src/components/bottom/BottomTabs';
import store from '../app/src/redux/store';
import ComponentPanel from '../app/src/components/right/ComponentPanel';

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

test('empty name field for new component', async () => {
  render(
    <Provider store={store}>
      <ComponentPanel isThemeLight={null} />
    </Provider>
  );

  fireEvent.click(screen.getByText('Create'), {
    target: {
      value: 'fasdfasd'
    }
  });

  expect(screen.getByText('New Component')).toBeInTheDocument();

  await waitFor(() => {
    expect(
      screen.getByText('Component name must start with a letter.')
    ).toBeInTheDocument();
  });
});

test('symbols in name of new component', async () => {
  render(
    <Provider store={store}>
      <ComponentPanel isThemeLight={null} />
    </Provider>
  );

  fireEvent.change(screen.getByLabelText('Name:'), {
    target: {
      value: '!@#'
    }
  });

  fireEvent.click(screen.getByText('Create'));

  await waitFor(() => {
    expect(
      screen.getByText('Component name must start with a letter.')
    ).toBeInTheDocument();
  });
});
//test for edge cases
//trigger an event for each input
//value being empty string
//grab error message
//check if it matches what is expected
