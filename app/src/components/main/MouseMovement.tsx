import { hasClientExports } from '@apollo/client/utilities';
import { MouseState, MouseProps } from '../../interfaces/Interfaces';
import React, { Component } from 'react';
import { render } from 'react-dom';

const width = '200px';

const AppStyle: React.CSSProperties = {
  width,
  height: width,
  backgroundColor: 'lightcoral'
};

const textStyle: React.CSSProperties = {
  color: '#a5ead6'
};

class MouseMovement extends Component<MouseProps, MouseState> {
  state = {
    clientX: 0,
    clientY: 0
  };
  setclient = (clientX, clientY) => {
    this.setState({ clientX, clientY });
    // console.log('clientX', clientX);
    // console.log('clientY', clientY);
  };

  render() {
    const {
      state: { clientX, clientY }
    } = this;
    return [
      <div
        style={AppStyle}
        onMouseMove={({ clientX, clientY }) => this.setclient(clientX, clientY)}
      ></div>,
      <p style={textStyle}>clientX: {clientX} </p>,
      <p style={textStyle}>clientY: {clientY} </p>
    ];
  }
}

export default MouseMovement;
