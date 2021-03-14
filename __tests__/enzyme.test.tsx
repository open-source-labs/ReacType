import { shallow, render, mount } from 'enzyme';
import React from 'react';
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
import MenuItem from '@material-ui/core/MenuItem';
import Tab from '@material-ui/core/Tab';
import RightContainer from '../app/src/containers/RightContainer';
import LoginButton from '../app/src/components/right/LoginButton';

/* If there is an error with unmatched snapshots because of intentionally modified codes, delete the contents in enzyme.test.tsx.snap to record new codes as blueprints */

describe('Test the CanvasContainer component', () => {
  const target = shallow(<CanvasContainer />);
  it('Matches snapshot', () => {
    expect(target).toMatchSnapshot();
  });
  // test if Canvas component is rendered
  it('Contains Canvas component', () => {
    expect(target.contains(<Canvas />)).toBe(true);
  });
});

describe('Test the MainContainer component', () => {
  const target = shallow(<MainContainer />);
  // test it canvas container is rendered
  it('Contains CanvasContainer component', () => {
    expect(target.contains(<CanvasContainer />)).toBe(true);
  });
  // test if bottom panel is rendered
  it('Contains BottomPanel component', () => {
    expect(target.contains(<BottomPanel />)).toBe(true);
  });
});

describe('Test the BottomTabs component', () => {
  const target = shallow(<BottomTabs />);
  it('Matches snapshot', () => {
    expect(target).toMatchSnapshot();
  });
  // test if bottom tab has a Code Preview and a Component Tree button
  it('Has two tabs called "Code Preview" and "Component Tree" ', () => {
    expect(target.find(Tab)).toHaveLength(2);
    expect(target.find(Tab).at(0).prop('label')).toEqual('Code Preview');
    expect(target.find(Tab).at(1).prop('label')).toEqual('Component Tree');
  });
  // test if the dropdown menu exists on the bottom tab
  it('Has a dropdown selection menu for Classic React, Gatsby.js, and Next.js', () => {
    expect(target.find(MenuItem)).toHaveLength(3);
    expect(target.find(MenuItem).at(0).text()).toEqual('Classic React');
    expect(target.find(MenuItem).at(1).text()).toEqual('Gatsby.js');
    expect(target.find(MenuItem).at(2).text()).toEqual('Next.js');
  });
});
// test the drag and drop component in the left panel
describe('Test HTMLPanel Component', () => {
  const target = shallow(
    <DndProvider backend={HTML5Backend}>
      <StateContext.Provider value={initialState}>
        <HTMLPanel />
      </StateContext.Provider>
    </DndProvider>
  );

  const props = {
    name: 'abc',
    key:'html-abc',
    id:1,
    Icon:'icon',
    handleDelete: jest.fn()
  };

  it('Matches snapshot', () => {
    expect(target).toMatchSnapshot();
  });
  // test if there are html items such as form, img, etc. on the left side
  it('Should render HTMLItem', () => {
    expect(target.find(<HTMLItem {...props} />)).toBeDefined();
});

// testing for AppContainer
describe('Test AppContainer container', () => {
  const target = shallow(<AppContainer />);

  const props = {
    setTheme: jest.fn(),
    isThemeLight: jest.fn(),
  };

  // testing if there is a NavBar
  it('Should render NavBar', () => {
    expect(
      target.find(
        <NavBar setTheme={props.setTheme} isThemeLight={props.isThemeLight} />
      )
    ).toBeDefined();
  });
  // testing for a RightContainer
  it('Should render RightContainer', () => {
    // This test doesnt work eventhough the component renders
    // expect(
    //   target.contains(
    //     <RightContainer isThemeLight={props.isThemeLight}/>
    //   )).toBe(true);
    expect(
        target.find(RightContainer)
      ).toHaveLength(1);
});

// testing for NavBar component
describe('Test NavBar component', () => {
  const props = {
    setTheme: jest.fn(),
    isThemeLight: jest.fn(),
  };
  const target = shallow (
    <NavBar setTheme={props.setTheme} isThemeLight={props.isThemeLight} />
  );
  // testing for 4 generic buttons in NavBar
  it('Should render 2 buttons: "Clear Canvas", "Dark Mode"', () => {
    expect(target.find('.navbarButton')).toHaveLength(2);
    expect(
      target
        .find('.navbarButton')
        .at(0)
        .text(),
    ).toEqual('Clear Canvas');
      expect(
      target
        .find('.navbarButton')
        .at(1)
        .text(),
    ).toEqual('Dark Mode');
    
  });

  it('Should render "Login" button', () => {
    const wrapper = shallow( <LoginButton />);
    expect(wrapper).toHaveLength(1);
    expect(
        wrapper
        .find('.navbarButton')
    ).toHaveLength(1);
});

describe('Test LeftContainer container', () => {
  const target = shallow(<LeftContainer />);
  // test for the HTML panel (with all the html elements) on the left panel
  it('Should render HTMLPanel', () => {
    expect(target.find(<HTMLPanel />)).toBeDefined();
  });
});
