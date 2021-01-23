import { shallow, mount } from 'enzyme';
import React, { useState, useContext } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import StateContext from '../app/src/context/context';
import initialState from '../app/src/context/initialState';
import MainContainer from '../app/src/containers/MainContainer';
import BottomPanel from '../app/src/components/bottom/BottomPanel';
import BottomTabs from '../app/src/components/bottom/BottomTabs';
import CodePreview from '../app/src/components/bottom/CodePreview';
import CanvasContainer from '../app/src/components/main/CanvasContainer';
import Canvas from '../app/src/components/main/Canvas';
import HTMLPanel from '../app/src/components/left/HTMLPanel';
import HTMLItem from '../app/src/components/left/HTMLItem';
import LeftContainer from '../app/src/containers/LeftContainer';
import AppContainer from '../app/src/containers/AppContainer';
import NavBar from '../app/src/components/top/NavBar';

// npm test -- -u

describe('Test the CanvasContainer component', () => {
  const target = shallow(<CanvasContainer />);
  it('Matches snapshot', () => {
    expect(target).toMatchSnapshot();
  });
  it('Contains Canvas component', () => {
    expect(target.contains(<Canvas />)).toBe(true);
  });
});

describe('Test the MainContainer component', () => {
  const target = shallow(<MainContainer />);
  it('Contains CanvasContainer component', () => {
    expect(target.contains(<CanvasContainer />)).toBe(true);
  });
  it('Contains BottomPanel component', () => {
    expect(target.contains(<BottomPanel />)).toBe(true);
  });
});

describe('Test the BottomTabs component', () => {
  const target = shallow(<BottomTabs />);
  it('Matches snapshot', () => {
    expect(target).toMatchSnapshot();
  });
});

describe('Test All 10 default HTML elements have rendered', () => {
  const target = shallow(
    <DndProvider backend={HTML5Backend}>
      <StateContext.Provider value={initialState}>
        <HTMLPanel />
      </StateContext.Provider>
    </DndProvider>
  );

  it('Matches snapshot', () => {
    expect(target).toMatchSnapshot();
  });
});

// testing for AppContainer
describe('Test AppContainer container', () => {
  const target = shallow(<AppContainer />);

  const props = {
    setTheme: jest.fn(),
    isThemeLight: jest.fn()
  };

  // testing for a NavBar
  it('Should render NavBar', () => {
    expect(
      target.find(
        <NavBar setTheme={props.setTheme} isThemeLight={props.isThemeLight} />
      )
    ).toBeDefined();
  });
});
// testing for NavBar component
describe('Test NavBar component', () => {
  const props = {
    setTheme: jest.fn(),
    isThemeLight: jest.fn()
  };
  const target = shallow(
    <NavBar setTheme={props.setTheme} isThemeLight={props.isThemeLight} />
  );
  console.log('array', target.find('.navbarButton'));
  // testing for 4 generic buttons in NavBar
  it('Should render 4 buttons: "Clear Canvas", "Export", "Dark Mode", "Login"', () => {
    expect(target.find('.navbarButton')).toHaveLength(4);
    expect(
      target
        .find('.navbarButton')
        .at(0)
        .text()
    ).toEqual('Clear Canvas');
     expect(
       target
         .find('.navbarButton')
         .at(1)
         .text()
     ).toEqual('Export');
      expect(
      target
        .find('.navbarButton')
        .at(2)
        .text()
    ).toEqual('Dark Mode');
     expect(
       target
         .find('.navbarButton')
         .at(3)
         .text()
     ).toEqual('Login');
  });
});
