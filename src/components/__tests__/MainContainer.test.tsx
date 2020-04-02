import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';
import AppContainer from '../../containers/AppContainer';

describe('Test the App Component', () => {
  // wrapped version of react component
  // component comes with additional functionality
  const wrapped: any = shallow(<App />);
  it('Matches snapshot', () => {
    // look inside wrapped component and find every instance of commentBox inside of it
    // expect(wrapped.find(KonvaStage).length).toEqual(1);
    expect(wrapped).toMatchSnapshot();
  });
  it('Should contain the App Container', () => {
    // look inside wrapped component and find every instance of commentBox inside of it
    // expect(wrapped.find(KonvaStage).length).toEqual(1);
    expect(wrapped.contains(<AppContainer />)).toBe(true)

  });
});
