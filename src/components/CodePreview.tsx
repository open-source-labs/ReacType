import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { format } from 'prettier';
import componentRender from '../utils/componentRender.util';

class CodePreview extends Component {
  render(): JSX.Element {
    const { focusComponent, components } = this.props;
    return (
      <div>
        {/* <p> */}
        <pre>{format(componentRender(focusComponent, components))}</pre>
        {/* </p> */}
      </div>
    );
  }
}

export default CodePreview;
