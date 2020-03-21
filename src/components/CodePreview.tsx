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
  updateCode(arg: { componentId: number; code: string }): void;
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

  //checking if the code has been asigned yet or not
  //if no then generate code and asign to a focus component
  componentDidMount() {
    if (this.props.focusComponent.code == '') {
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

      this.props.updateCode({
        componentId: this.props.focusComponent.id,
        code: text
      });
    }
  }
  componentDidUpdate(prevProp: CodePreviewProps) {
    if(prevProp.focusComponent.code )
  }
  generateNewCode() {
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
    this.props.updateCode({
      componentId: this.props.focusComponent.id,
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

    return (
      <div
        style={{
          height: '330px',
          paddingLeft: '30px',
          paddingTop: '10px',
          overflow: 'auto',
          maxWidth: '70%',
          border: '2px solid #33eb91',
          borderRadius: '5px'
        }}
      >
        <Editor
          value={this.props.focusComponent.code}
          highlight={code => highlight(code, languages.jsx)}
          padding={10}
          onValueChange={code =>
            this.props.updateCode({
              componentId: this.props.focusComponent.id,
              code
            })
          }
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
