import { shallow, mount } from 'enzyme';
import React from 'react';

import MainContainer from '../app/src/containers/MainContainer';
import BottomPanel from '../app/src/components/bottom/BottomPanel';
import BottomTabs from '../app/src/components/bottom/BottomTabs';
import CodePreview from '../app/src/components/bottom/CodePreview';
import CanvasContainer from '../app/src/components/main/CanvasContainer';
import Canvas from '../app/src/components/main/Canvas';

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
  it('Contains a CodePreview component', () => {
    expect(target.contains(<CodePreview />)).toBe(true);
  });
});
