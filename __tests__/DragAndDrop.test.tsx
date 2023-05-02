import React from 'react';
import '@testing-library/jest-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { fireEvent, render, screen } from '@testing-library/react';
import DragDropPanel from '../app/src/components/left/DragDropPanel';
import { Provider } from 'react-redux';
import store from '../app/src/redux/store';

describe('Drag and Drop Side Panel', () => {
  test('Renders all HTML Element choices', () => {
    render(
      <Provider store={store}>
        <DndProvider backend={HTML5Backend}>
          <DragDropPanel />
        </DndProvider>
      </Provider>
    );
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
    render(
      <Provider store={store}>
        <DndProvider backend={HTML5Backend}>
          <DragDropPanel />
        </DndProvider>
      </Provider>
    );

    expect(screen.getByText('Switch')).toBeInTheDocument();
    expect(screen.getByText('Route')).toBeInTheDocument();
    expect(screen.getByText('LinkTo')).toBeInTheDocument();
  });

  // test('Adds new custom element', () => {
  //   render(<Test />);
  //   fireEvent.change(screen.getAllByRole('textbox')[0], {
  //     target: { value: 'Testing' }
  //   });
  //   fireEvent.change(screen.getAllByRole('textbox')[1], {
  //     target: { value: 'Testing' }
  //   });
  //   fireEvent.click(screen.getByDisplayValue('Add Element'));
  //   expect(screen.getByText('Testing')).toBeInTheDocument();
  // });
});
