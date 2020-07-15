import { shallow } from 'enzyme';
import React from 'react';

describe('Enzyme testing suite', () => {

  it('renders snapshots, too', () => {
    const wrapper = shallow(<div>
      <h1>Hello, Enzyme!</h1>
    </div>)
    expect(wrapper).toMatchSnapshot()
  })
})