import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import componentBuilder from '../app/src/helperFunctions/componentBuilder';
import { ChildElement, MUIComponent } from '../app/src/interfaces/Interfaces';

// Mock MUITypes data
const MUITypes = [
  {
    tag: 'mui button',
    componentData: {
      name: 'mui button',
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
    // Using vitest's expect function to assert if the input element is rendered
    expect(document.querySelector('input')).toBeTruthy();
  });

  it('handles MUI components', () => {
    const elements: Array<MUIComponent> = [
      {
        type: 'MUI Component',
        typeId: 2,
        name: 'mui button',
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
    // Assuming 'Click me' is rendered text for Button
    expect(result[0]).toEqual(
      JSON.stringify({
        type: 'Button',
        props: {
          variant: 'contained',
          color: 'primary',
          sx: { m: 1 },
          key: 3
        },
        children: 'Click Me'
      })
    );
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
    // Using vitest's expect function to assert if the img element has the correct src attribute
    expect(document.querySelector('img')?.getAttribute('src')).toBe(
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
    // Using vitest's expect function to assert if the text 'Hello, world!' is rendered within the container div
    expect(document.querySelector('.container')).toBeTruthy();
    expect(document.querySelector('.container')?.textContent).toContain(
      'Hello, world!'
    );
  });
});
