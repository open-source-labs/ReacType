import { hasClientExports } from '@apollo/client/utilities';
import { MouseState, MouseProps } from '../../interfaces/Interfaces';
import React, { Component } from 'react';
import { render } from 'react-dom';

class MouseMovement extends Component<MouseProps, MouseState> {
  state = {
    clientX: 0,
    clientY: 0
  };
  setclient = (clientX, clientY) => {
    this.setState({ clientX, clientY });
    console.log('clientX', clientX);
    console.log('clientY', clientY);
  };

  render() {
    const {
      state: { clientX, clientY }
    } = this;
    return [
      <div
        onMouseMove={({ clientX, clientY }) => this.setclient(clientX, clientY)}
      ></div>,
      <p>clientX: {clientX} </p>,
      <p>clientY: {clientY} </p>
    ];
  }
}

export default MouseMovement;
