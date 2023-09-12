import '@testing-library/jest-dom';

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
  test('Renders all HTML Element choices', () => {
    render(TestContext(<DragDropPanel />));
    expect(screen.getByText('Div')).toBeInTheDocument();
    expect(screen.getByText('Img')).toBeInTheDocument();
    expect(screen.getByText('Form')).toBeInTheDocument();
    expect(screen.getByText('Button')).toBeInTheDocument();
    expect(screen.getByText('Link')).toBeInTheDocument();
    expect(screen.getByText('Paragraph')).toBeInTheDocument();
    expect(screen.getByText('Header 1')).toBeInTheDocument();
    expect(screen.getByText('Header 2')).toBeInTheDocument();
    expect(screen.getByText('Span')).toBeInTheDocument();
    expect(screen.getByText('Input')).toBeInTheDocument();
    expect(screen.getByText('Label')).toBeInTheDocument();
    expect(screen.getByText('Ordered List')).toBeInTheDocument();
    expect(screen.getByText('Unordered List')).toBeInTheDocument();
    expect(screen.getByText('Menu')).toBeInTheDocument();
    expect(screen.getByText('List')).toBeInTheDocument();
    expect(screen.queryByText('separator')).toBe(null);
  });

  test('Renders all React Router Component choices', () => {
    render(TestContext(<DragDropPanel />));

    expect(screen.getByText('Switch')).toBeInTheDocument();
    expect(screen.getByText('Route')).toBeInTheDocument();
    expect(screen.getByText('LinkTo')).toBeInTheDocument();
  });

  test.skip('Should render Roots Components and Reusbale components', () => {
    render(TestContext(<ComponentDrag />));

    expect(screen.getByText('Root Components')).toBeInTheDocument();
    expect(screen.getByText('Reusable Components')).toBeInTheDocument();
  });
  test('test drag and drop', () => {
    render(
      TestContext(
        <>
          <DragDropPanel />
          <MainContainer />
        </>
      )
    );
    const drop = screen.getByTestId('drop');
    const div = screen.getByText('Div');
    expect(drop).toBeInTheDocument();
    expect(div).toBeInTheDocument();
    fireEvent.dragStart(div);
    fireEvent.dragEnter(drop);
    fireEvent.dragOver(drop);
    fireEvent.drop(drop);
    expect(within(drop).getByText('div')).toBeInTheDocument();
  });
});
