// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Provider } from 'react-redux';
import React from 'react';
import BottomTabs from '../app/src/components/bottom/BottomTabs';
import ComponentPanel from '../app/src/components/right/ComponentPanel';
import ContextManager from '../app/src/components/ContextAPIManager/ContextManager';
import CustomizationPanel from '../app/src/containers/CustomizationPanel';
import DragDropPanel from '../app/src/components/left/DragDropPanel';
import HTMLPanel from '../app/src/components/left/HTMLPanel';
import MainContainer from '../app/src/containers/MainContainer';
import StateManager from '../app/src/components/StateManagement/StateManagement';
import store from '../app/src/redux/store';

describe('Bottom Panel Render test', () => {
  it('should render all six tabs', () => {
    const { unmount } = render(
      <Provider store={store}>
        <BottomTabs />
      </Provider>,
    );
    expect(screen.getAllByRole('tab')).toHaveLength(7);
    expect(screen.getByText('Component Tree')).toBeDefined();
    expect(screen.getByText('Creation Panel')).toBeDefined();
    expect(screen.getByText('Customization')).toBeDefined();
    expect(screen.getByText('CSS Editor')).toBeDefined();
    expect(screen.getByText('Context Manager')).toBeDefined();
    expect(screen.getByText('State Manager')).toBeDefined();
    unmount();
  });
});

describe('Creation Panel', () => {
  it('should invalidate empty field in New Component name', async () => {
    const { unmount } = render(
      <Provider store={store}>
        <ComponentPanel isThemeLight={null} />
      </Provider>,
    );

    fireEvent.click(screen.getByText('Create'));

    await waitFor(() => {
      expect(screen.getByText('Component name cannot be blank.')).toBeDefined();
    });
    unmount();
  });

  it('should invalidate New Component name containing symbols', async () => {
    const { unmount } = render(
      <Provider store={store}>
        <ComponentPanel isThemeLight={null} />
      </Provider>,
    );

    fireEvent.change(screen.getByLabelText('Name'), {
      target: {
        value: '!@#',
      },
    });

    fireEvent.click(screen.getByText('Create'));

    await waitFor(() => {
      expect(
        screen.getByText('Component name must start with a letter.'),
      ).toBeDefined();
    });
    unmount();
  });
});

describe('HTML Panel', () => {
  it('should invalidate empty field in HTML Tag tag', async () => {
    const { unmount } = render(
      <Provider store={store}>
        <HTMLPanel isThemeLight={null} />
      </Provider>,
    );

    fireEvent.click(screen.getByText('Add Element'));

    await waitFor(() => {
      expect(screen.getAllByText('* Input cannot be blank. *')).toHaveLength(2);
    });
    unmount();
  });

  it('should invalidate HTML Element name containing symbols', async () => {
    const { unmount } = render(
      <Provider store={store}>
        <HTMLPanel isThemeLight={null} />
      </Provider>,
    );

    fireEvent.change(screen.getByLabelText('Element Name'), {
      target: {
        value: '!@#',
      },
    });

    fireEvent.change(screen.getByLabelText('Tag'), {
      target: {
        value: '!@#',
      },
    });

    fireEvent.click(screen.getByText('Add Element'));

    await waitFor(() => {
      expect(
        screen.getAllByText('* Input must start with a letter. *'),
      ).toHaveLength(2);
    });
    unmount();
  });
});

describe('Context Manager', () => {
  it('should render Create/Edit, Assign, and Display tabs', () => {
    const { unmount } = render(
      <Provider store={store}>
        <ContextManager />
      </Provider>,
    );
    expect(screen.getAllByRole('tab')).toHaveLength(3);
    unmount();
  });
  it('Create/Edit Tab should contain all buttons, inputs field, and a data table', () => {
    const { unmount } = render(
      <Provider store={store}>
        <ContextManager />
      </Provider>,
    );
    expect(screen.getAllByRole('textbox')).toHaveLength(3);
    expect(screen.getAllByRole('button')).toHaveLength(3);
    expect(screen.getByText('Context Name')).toBeDefined();
    expect(screen.getByRole('table')).toBeDefined();
    unmount();
  });
  it('Assign Tab should contain all buttons and input fields', () => {
    const { unmount } = render(
      <Provider store={store}>
        <ContextManager />
      </Provider>,
    );

    fireEvent.click(screen.getByText('Assign'));
    expect(screen.getByText('Contexts Consumed')).toBeDefined();
    const dropdown = screen.getByLabelText('Select Component');
    expect(dropdown).toBeDefined();
    expect(screen.getAllByRole('button')).toHaveLength(1);
    expect(screen.getAllByRole('combobox')).toHaveLength(2);
    expect(screen.getAllByRole('table')).toHaveLength(2);
    unmount();
  });
});

describe('State Manager', () => {
  it('Should render all containers', () => {
    const { unmount } = render(
      <Provider store={store}>
        <StateManager isThemeLight={null} />
      </Provider>,
    );
    expect(screen.getAllByRole('heading')).toHaveLength(4);
    expect(screen.getAllByRole('textbox')).toHaveLength(2);
    expect(screen.getAllByRole('grid')).toHaveLength(3);
    expect(screen.getAllByRole('columnheader')).toHaveLength(9);
    unmount();
  });

  it('Display tab should render correct elements', () => {
    const { unmount } = render(
      <Provider store={store}>
        <StateManager isThemeLight={null} />
      </Provider>,
    );
    fireEvent.click(screen.getByText('Display'));
    expect(screen.getByRole('table')).toBeDefined();
    expect(
      screen.getByText('State Initialized in Current Component:'),
    ).toBeDefined();
    unmount();
  });
});

describe('Customization Panel', () => {
  it('Should render customization container with no elements in Canvas', () => {
    const { unmount } = render(
      <Provider store={store}>
        <BrowserRouter>
          <CustomizationPanel isThemeLight={true} />
        </BrowserRouter>
      </Provider>,
    );
    expect(screen.getByText('Parent Component:')).toBeDefined();
    expect(screen.getByText('App')).toBeDefined();
    expect(
      screen.getByText(
        'Drag or click an html element to the canvas to see what happens!',
      ),
    ).toBeDefined();
    unmount();
  });
});

describe('Canvas', () => {
  it('Should render all buttons and inputs when Canvas has element', async () => {
    const { unmount } = render(
      <Provider store={store}>
        <BrowserRouter>
          <DndProvider backend={HTML5Backend}>
            <DragDropPanel />
            <MainContainer />
            <CustomizationPanel isThemeLight={true} />
          </DndProvider>
        </BrowserRouter>
      </Provider>,
    );
    const drop = screen.getByTestId('drop');
    const div = screen.getAllByText('Div')[0];
    expect(drop).toBeDefined();
    expect(div).toBeDefined();
    fireEvent.dragStart(div);
    fireEvent.dragEnter(drop);
    fireEvent.dragOver(drop);
    fireEvent.drop(drop);
    // check if customization panel elements are rendering correctly
    const panel = screen.getAllByTestId('customization')[0];
    expect(within(panel).getAllByRole('textbox')).toHaveLength(4);
    // check dropdowns
    expect(within(panel).getAllByRole('button')).toHaveLength(6);
    unmount();
  });
});
