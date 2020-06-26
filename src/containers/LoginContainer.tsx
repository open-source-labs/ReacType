// THIS FILE NOT CURRENTLY IN USE, DELETE
import React, { useState } from 'react';

interface State {
  username: string,
  password: string
};

class LoginContainer extends React.Component<State> {

  state: State = {
    username: 'test',
    password: 'pass'
  }

  render() {
    return (
      <p>Hello</p>
    )
  }
}

export default LoginContainer