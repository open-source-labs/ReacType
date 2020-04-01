import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// Newer Enzyme versions require an adapter to a particular version of React
configure({ adapter: new Adapter() });

describe('ReacType tests', () => {
  describe('LabeledText', () => {
    let wrapper;
    const props = {
      label: 'Mega',
      text: 'Markets'
    };

    beforeAll(() => {
      wrapper = shallow(<LabeledText {...props} />);
    });

    it('Renders a <p> tag with the label in bold', () => {
      expect(wrapper.type()).toEqual('p');
      expect(wrapper.text()).toEqual('Mega: Markets');
      expect(wrapper.find('strong').text()).toMatch('Mega');
    });
  });
});
