import React, { Component } from 'react';
import { format } from 'prettier';
import componentRender from '../utils/componentRender.util.ts';
import { ComponentInt, ComponentsInt } from '../utils/Interfaces.ts';
/** **   SortCHildren will be fixed , dont XXX the file  *** */
// import SortChildren from './SortChildren.jsx';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { hybrid } from 'react-syntax-highlighter/dist/styles/hljs/';

type Props = {
  focusComponent: ComponentInt;
  components: ComponentsInt;
};

class CodePreview extends Component<Props> {
  render(): JSX.Element {
    const focusComponent: ComponentInt = this.props.focusComponent;
    const components: ComponentsInt = this.props.components;

    return (
      <div
        style={{
          height: '290px',
          paddingLeft: '30px',
          overflow: 'auto'
        }}
      >
        <SyntaxHighlighter style={hybrid}>
          {componentRender(focusComponent, components)}
        </SyntaxHighlighter>
      </div>
    );
  }
}

export default CodePreview;
