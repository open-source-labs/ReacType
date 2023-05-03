import React from 'react';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import BottomTabs from '../app/src/components/bottom/BottomTabs';
import ContextManager from '../app/src/components/ContextAPIManager/ContextManager';
import store from '../app/src/redux/store';
import ComponentPanel from '../app/src/components/right/ComponentPanel';
import HTMLPanel from '../app/src/components/left/HTMLPanel';

describe('Bottom Panel Render Test', () => {
  test('should render all seven tabs', () => {
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
});

describe('Creation Panel', () => {
  test('should invalidate empty field in New Component name', async () => {
    render(
      <Provider store={store}>
        <ComponentPanel isThemeLight={null} />
      </Provider>
    );

    fireEvent.click(screen.getByText('Create'));

    await waitFor(() => {
      expect(
        screen.getByText('Component name cannot be blank.')
      ).toBeInTheDocument();
    });
  });

  test('should invalidate New Component name containing symbols', async () => {
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

  test('should invalidate empty field in HTML Tag tag', async () => {
    render(
      <Provider store={store}>
        <HTMLPanel isThemeLight={null} />
      </Provider>
    );

    fireEvent.click(screen.getByText('Add Element'));

    await waitFor(() => {
      expect(screen.getAllByText('* Input cannot be blank. *')).toHaveLength(2);
    });
  });

  test('should invalidate HTML Element name containing symbols', async () => {
    render(
      <Provider store={store}>
        <HTMLPanel isThemeLight={null} />
      </Provider>
    );

    fireEvent.change(screen.getByLabelText('Element Name:'), {
      target: {
        value: '!@#'
      }
    });

    fireEvent.change(screen.getByLabelText('Tag:'), {
      target: {
        value: '!@#'
      }
    });

    fireEvent.click(screen.getByText('Add Element'));

    await waitFor(() => {
      expect(
        screen.getAllByText('* Input must start with a letter. *')
      ).toHaveLength(2);
    });
  });
});

describe('Context Manager', () => {
  test('should contain all buttons and input fields', () => {
    render(
      <Provider store={store}>
        <ContextManager />
      </Provider>
    );
    expect(screen.getAllByRole('textbox')).toHaveLength(2);
    expect(screen.getAllByRole('button')).toHaveLength(3);
  });
});
