import React, { useContext } from 'react';
import { stateContext } from '../../context/context';
import AceEditor from 'react-ace';
import { makeStyles } from '@material-ui/core/styles';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';
import Button from '@material-ui/core/Button';
import { Component } from '../../interfaces/Interfaces';

const CodePreview = () => {
  const [state, dispatch] = useContext(stateContext);
  const currentComponent = state.components.find(
    (elem: Component) => elem.id === state.canvasFocus.componentId
  );

  return (
    <div
      style={{
        height: '90%',
        paddingLeft: '0px',
        paddingTop: '1rem',
        paddingBottom: '1rem',
        overflow: 'auto',
        maxWidth: '100%',
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      
      <AceEditor
        mode="javascript"
        theme="monokai"
        width="100%"
        height="100%"
        style={{
          border: '2px solid #33eb91',
          borderRadius: '8px'
        }}
        // onChange={code =>
        //   this.props.updateCode({
        //     componentId: this.props.focusComponent.id,
        //     code
        //   })
        // }
        value={currentComponent.code}
        name="Code_div"
        // readOnly={this.props.codeReadOnly}
        readOnly={true}
        editorProps={{ $blockScrolling: true }}
        fontSize={16}
        tabSize={2}
      />
    </div>
  );
};

const useStyles = makeStyles(theme => ({}));

export default CodePreview;
