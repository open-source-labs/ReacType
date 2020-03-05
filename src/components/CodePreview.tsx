import React, { Component } from 'react';
import { format } from 'prettier';
import componentRender from '../utils/componentRender.util';
import { ComponentState } from '../types/types';
/** **   SortCHildren will be fixed , dont XXX the file  *** */
// import SortChildren from './SortChildren.jsx';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { hybrid } from 'react-syntax-highlighter/dist/styles/hljs/';

type Props = {
  focusComponent: ComponentState;
  components: Array<ComponentState>;
};

class CodePreview extends Component<Props> {
  render(): JSX.Element {
    const focusComponent: ComponentState = this.props.focusComponent;
    const components: Array<ComponentState> = this.props.components;

    return (
      <div
        style={{
          height: '290px',
          paddingLeft: '30px',
          overflow: 'auto'
        }}
      >
        <SyntaxHighlighter style={hybrid}>
          {format(componentRender(focusComponent, components))}
        </SyntaxHighlighter>
      </div>
    );
  }
}

export default CodePreview;
