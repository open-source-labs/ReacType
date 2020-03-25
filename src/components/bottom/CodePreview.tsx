import React, { Component } from 'react';
import { format } from 'prettier';
import componentRender from '../../utils/componentRender.util';
import { ComponentInt, ComponentsInt } from '../../interfaces/Interfaces';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

type CodePreviewProps = {
  focusComponent: ComponentInt;
  components: ComponentsInt;
  updateCode(arg: { componentId: number; code: string }): void;
  changeFocusComponent(arg: { title: string }): void;
  classes: any;
  toggleCodeEdit(): void;
  codeReadOnly: boolean;
};

class CodePreview extends Component<CodePreviewProps> {
  //checking if the code has been asigned yet or not
  //if no then generate code and asign to a focus component
  componentDidMount() {
    if (this.props.focusComponent.changed) {
      this.generateNewCode();
    }
  }

  componentDidUpdate(prevProp: CodePreviewProps) {
    if (this.props.focusComponent.changed !== prevProp.focusComponent.changed) {
      this.generateNewCode();
    }
  }
  generateNewCode() {
    const text = format(
      componentRender(this.props.focusComponent, this.props.components),
      {
        singleQuote: true,
        trailingComma: 'es5',
        bracketSpacing: true,
        jsxBracketSameLine: true,
        parser: 'babel'
      }
    );
    // console.log('code  prev>>>>>>>>>>>>>>>>>>>', text);
    this.props.updateCode({
      componentId: this.props.focusComponent.id,
      code: text
    });
    this.props.changeFocusComponent({ title: this.props.focusComponent.title });
  }

  render(): JSX.Element {
    return (
      <div
        style={{
          height: '90%',
          paddingLeft: '0px',
          paddingTop: '1rem',
          paddingBottom: '1rem',
          overflow: 'auto',
          maxWidth: '60%',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <AceEditor
          mode='javascript'
          theme='monokai'
          width='100%'
          height='100%'
          style={{
            border: '2px solid #33eb91',
            borderRadius: '8px'
          }}
          onChange={code =>
            this.props.updateCode({
              componentId: this.props.focusComponent.id,
              code
            })
          }
          value={this.props.focusComponent.code}
          name='Code_div'
          readOnly={this.props.codeReadOnly}
          editorProps={{ $blockScrolling: true }}
          fontSize={16}
        />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Button
            color='primary'
            aria-label='Add'
            type='submit'
            // disabled={!this.state.propKey || !this.state.propType}
            variant='contained'
            size='large'
            style={{ justifySelf: 'center' }}
            className={this.props.classes.startEdit}
            onClick={e => {
              this.props.toggleCodeEdit();
            }}
          >
            {this.props.codeReadOnly ? 'Enter Edit Mode' : 'Exit Edit Mode'}
          </Button>
          <div
            style={{
              width: '25rem',
              marginLeft: '3rem',
              marginTop: '1rem',
              color: '##fff'
            }}
          >
            <p>
              <strong>
                <u>Warning</u>:
              </strong>
              <span>
                {' '}
                all of the changes added in the "Edit Mode" will be overridden
                if:
              </span>
            </p>
            <ul>
              <li>Class or State toggles are changed</li>
              <li>
                HTML Elements, Props, or Children are added/removed to/from the
                current component
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

const styles = () => ({
  startEdit: {
    width: '25rem',
    marginLeft: '3rem',
    marginRight: '3rem',
    height: '4rem',
    transition: 'all 0.1s ease-out',
    border: '2px solid #33eb91',
    background: 'transparent',
    color: '#fff',
    '&:hover': {
      transform: 'scale(1.1)',
      fontSize: '1.2rem',
      backgroundColor: '#33eb91',
      color: '#006400'
    }
  }
});
export default withStyles(styles)(CodePreview);
