import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { format } from 'prettier';
import componentRender from '../utils/componentRender.util';
import {ComponentInt,ComponentsInt} from '../utils/interfaces'
import SortChildren from './SortChildren.jsx'

type Props = {
  focusComponent: ComponentInt;
  components: ComponentsInt;
};

class CodePreview extends Component<Props> {
  render(): JSX.Element {
   //const {focusComponent, components } : {focusComponent:ComponentInt, components:ComponentsInt }  = this.props;
   const focusComponent : ComponentInt  = this.props.focusComponent;
   const components : ComponentsInt  = this.props.components;
 
   return (
      <div
        style={{
          width: '500px',
          height: '290px',
          direction: 'rtl',
          paddingLeft: '20px',
          color: '#D3D3D3',
          fontSize: 16,
          overflow: 'auto',
        }}
      >
        <pre style={{ direction: 'ltr' }}>
          {format(componentRender(focusComponent, components), {
            singleQuote: true,
            trailingComma: 'es5',
            bracketSpacing: true,
            jsxBracketSameLine: true,
            parser: 'typescript',
          })}
        </pre>
      </div>
    );
  }
}

export default CodePreview;
