import React, { useReducer} from 'react';
import '@testing-library/jest-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { render, fireEvent, cleanup, screen } from '@testing-library/react';
import StateContext from '../app/src/context/context';
import initialState from '../app/src/context/initialState';
import reducer from '../app/src/reducers/componentReducer';
import HTMLPanel from '../app/src/components/left/HTMLPanel';
function Test() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <DndProvider backend={HTML5Backend}>
      <StateContext.Provider value={[state, dispatch]} >
        <HTMLPanel />
      </StateContext.Provider>
    </DndProvider>
  )
}
test('Renders HTMLPanel component properly', () => {
  render(
    <Test/>
  );
  expect(screen.getAllByRole('textbox')).toHaveLength(2);
  expect(screen.getByText('Div')).toBeInTheDocument();
  expect(screen.getByText('Image')).toBeInTheDocument();
  expect(screen.getByText('Form')).toBeInTheDocument();
  expect(screen.getByText('List')).toBeInTheDocument();
  expect(screen.getByText('Button')).toBeInTheDocument();
  expect(screen.getByText('Link')).toBeInTheDocument();
  expect(screen.getByText('Paragraph')).toBeInTheDocument();
  expect(screen.getByText('Header 1')).toBeInTheDocument();
  expect(screen.getByText('Header 2')).toBeInTheDocument();
  expect(screen.getByText('Span')).toBeInTheDocument();
  expect(screen.queryByText('separator')).toBe(null);
});

test('Adds new custom element', () => {
  render(
    <Test/>
  );
  fireEvent.change(screen.getAllByRole('textbox')[0], {
    target: { value: 'Testing' }
  });
  fireEvent.change(screen.getAllByRole('textbox')[1], {
    target: { value: 'Testing' }
  });
  fireEvent.click(screen.getByDisplayValue('Add Element'));
  expect(screen.getByText('Testing')).toBeInTheDocument();
});
