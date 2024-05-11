// @viit-enviroment jsdom
// import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

import ComponentDrag from '../app/src/components/left/ComponentDrag';
import { DndProvider } from 'react-dnd';
import DragDropPanel from '../app/src/components/left/DragDropPanel';
import { HTML5Backend } from 'react-dnd-html5-backend';
import MainContainer from '../app/src/containers/MainContainer';
import { Provider } from 'react-redux';
import React from 'react';
import store from '../app/src/redux/store';
import { within } from '@testing-library/react';

function TestContext(component) {
  return (
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>{component}</DndProvider>
    </Provider>
  );
}

describe('Drag and Drop Side Panel', () => {
  it('Renders all HTML Element choices', () => {
    render(TestContext(<DragDropPanel />));
    expect(screen.getByText('Div')).toBeDefined();
    expect(screen.getByText('Img')).toBeDefined();
    expect(screen.getByText('Form')).toBeDefined();
    expect(screen.getByText('Button')).toBeDefined();
    expect(screen.getByText('Link')).toBeDefined();
    expect(screen.getByText('Paragraph')).toBeDefined();
    expect(screen.getByText('Header 1')).toBeDefined();
    expect(screen.getByText('Header 2')).toBeDefined();
    expect(screen.getByText('Span')).toBeDefined();
    expect(screen.getByText('Input')).toBeDefined();
    expect(screen.getByText('Label')).toBeDefined();
    expect(screen.getByText('Ordered List')).toBeDefined();
    expect(screen.getByText('Unordered List')).toBeDefined();
    expect(screen.getByText('Menu')).toBeDefined();
    expect(screen.getByText('List')).toBeDefined();
    expect(screen.queryByText('separator')).toBe(null);
  });

  it('Renders all React Router Component choices', () => {
    render(TestContext(<DragDropPanel />));

    expect(screen.getAllByText('Switch')[0]).toBeDefined();
    expect(screen.getAllByText('Route')[0]).toBeDefined();
    expect(screen.getAllByText('LinkTo')[0]).toBeDefined();
  });

  it.skip('Should render Roots Components and Reusbale components', () => {
    render(TestContext(<ComponentDrag isThemeLight={true} isVisible={true} />));

    expect(screen.getByText('Root Components')).toBeDefined();
    expect(screen.getByText('Reusable Components')).toBeDefined();
  });

  it('test drag and drop', () => {
    render(
      TestContext(
        <>
          <DragDropPanel />
          <MainContainer />
        </>
      )
    );
    const drop = screen.getByTestId('drop');
    const div = screen.getAllByText('Div')[0];
    expect(drop).toBeDefined();
    expect(div).toBeDefined();
    fireEvent.dragStart(div);
    fireEvent.dragEnter(drop);
    fireEvent.dragOver(drop);
    fireEvent.drop(drop);
    expect(within(drop).getByText('div')).toBeDefined();
  });
});
