import React, { Component } from 'react';
import { format } from 'prettier';
import componentRender from '../utils/componentRender.util';
import { ComponentInt, ComponentsInt } from '../utils/Interfaces';
/** **   SortCHildren will be fixed , dont XXX the file  *** */
// import SortChildren from './SortChildren.tsx';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { hybrid } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-markup';
require('prismjs/components/prism-jsx');
import '../public/styles/prism.css';

type CodePreviewProps = {
  focusComponent: ComponentInt;
  components: ComponentsInt;
};
interface StateInt {
  code: string;
}
class CodePreview extends Component<CodePreviewProps, StateInt> {
  constructor(props: CodePreviewProps) {
    super(props);
    this.state = {
      code: ''
    };
  }
  componentDidMount() {
    const text = format(
      componentRender(this.props.focusComponent, this.props.components),
      {
        singleQuote: true,
        trailingComma: 'es5',
        bracketSpacing: true,
        jsxBracketSameLine: true,
        parser: 'typescript'
      }
    );
    this.setState({
      code: text
    });
  }
  render(): JSX.Element {
    // const focusComponent: ComponentInt = this.props.focusComponent;
    // const components: ComponentsInt = this.props.components;
    // const text = format(componentRender(focusComponent, components), {
    //   singleQuote: true,
    //   trailingComma: 'es5',
    //   bracketSpacing: true,
    //   jsxBracketSameLine: true,
    //   parser: 'typescript'
    // });
    console.log('lang', languages);
    return (
      <div
        style={{
          height: '330px',
          paddingLeft: '30px',
          overflow: 'auto'
        }}
      >
        <Editor
          value={this.state.code}
          highlight={code => highlight(code, languages.jsx)}
          padding={10}
          onValueChange={code => this.setState({ code })}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 12
          }}
        ></Editor>
      </div>
    );
  }
}

export default CodePreview;
