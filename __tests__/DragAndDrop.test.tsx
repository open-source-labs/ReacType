import React from 'react';
import '@testing-library/jest-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { fireEvent, render, screen } from '@testing-library/react';
import DragDropPanel from '../app/src/components/left/DragDropPanel';
import ComponentDrag from '../app/src/components/right/ComponentDrag';
import { Provider } from 'react-redux';
import store from '../app/src/redux/store';

function TestContext(component) {
  return(
  <Provider store={store}>
    <DndProvider backend={HTML5Backend}>
      {component}
      </DnDProvider>
    </Provider>
  )
}

describe('Drag and Drop Side Panel', () => {
  
  test('Renders all HTML Element choices', () => {
    render(
      TestContext(<DragDropPanel/>)
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
      TestContext(<DragDropPanel />)
    );

    expect(screen.getByText('Switch')).toBeInTheDocument();
    expect(screen.getByText('Route')).toBeInTheDocument();
    expect(screen.getByText('LinkTo')).toBeInTheDocument();
  });

  test('Should render Roots Components and Reusbale components', () => {
    render(
      TestContext(<ComponentDrag/>)
    );
    
    expect(screen.getByText('Root Components')).toBeInTheDocument();
    expect(screen.getByText('Reusable Components')).toBeInTheDocument();
  });

});
