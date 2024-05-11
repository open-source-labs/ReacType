import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import componentBuilder from '../app/src/helperFunctions/componentBuilder';
import { ChildElement, MUIComponent } from '../app/src/interfaces/Interfaces';

// Mock MUITypes data
const MUITypes = [
  {
    tag: 'Button',
    componentData: {
      name: 'button',
      props: { children: 'Click me' }
    }
  }
];
vi.mock('../redux/MUITypes', () => MUITypes);

describe('componentBuilder', () => {
  it('renders a simple input component', () => {
    const elements: Array<ChildElement> = [
      {
        type: 'HTML Element',
        typeId: 1,
        name: 'input',
        childId: 1,
        style: {},
        attributes: { cssClasses: 'test-class' },
        events: {},
        stateProps: [],
        passedInProps: [],
        children: []
      }
    ];
    const result = componentBuilder(elements, 1);
    render(<>{result}</>);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('handles MUI components', () => {
    const elements: Array<MUIComponent> = [
      {
        type: 'MUI Component',
        typeId: 2,
        name: 'Button',
        childId: 2,
        style: {},
        attributes: {},
        events: {},
        stateProps: [],
        passedInProps: [],
        children: []
      }
    ];
    const result = componentBuilder(elements, 2);
    render(<>{result}</>);
    expect(screen.getByText('Click me')).toBeInTheDocument(); // Assuming 'Click me' is rendered text for Button
  });

  it('skips separators and continues rendering', () => {
    const elements: Array<ChildElement> = [
      {
        type: 'HTML Element',
        typeId: 1,
        name: 'separator',
        childId: 1,
        style: {},
        attributes: {},
        events: {},
        stateProps: [],
        passedInProps: [],
        children: []
      },
      {
        type: 'HTML Element',
        typeId: 1,
        name: 'img',
        childId: 2,
        style: {},
        attributes: { compLink: 'http://example.com/image.png' },
        events: {},
        stateProps: [],
        passedInProps: [],
        children: []
      }
    ];
    const result = componentBuilder(elements, 3);
    render(<>{result}</>);
    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      'http://example.com/image.png'
    );
  });

  it('renders nested components', () => {
    const elements: Array<ChildElement> = [
      {
        type: 'HTML Element',
        typeId: 1,
        name: 'div',
        childId: 3,
        style: {},
        attributes: { cssClasses: 'container' },
        events: {},
        stateProps: [],
        passedInProps: [],
        children: [
          {
            type: 'HTML Element',
            typeId: 1,
            name: 'p',
            childId: 4,
            style: {},
            attributes: { compText: 'Hello, world!' },
            events: {},
            stateProps: [],
            passedInProps: [],
            children: []
          }
        ]
      }
    ];
    const result = componentBuilder(elements, 4);
    render(<>{result}</>);
    expect(screen.getByText('Hello, world!')).toBeInTheDocument();
    expect(screen.getByText('Hello, world!').parentNode).toHaveClass(
      'container'
    );
  });
});
