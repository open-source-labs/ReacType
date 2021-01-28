import React, { useContext, useState, useRef, useEffect } from 'react';
import StateContext from '../../context/context';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/theme-solarized_dark';
import 'ace-builds/src-noconflict/theme-solarized_light';
import 'ace-builds/src-noconflict/theme-terminal';
import { Component } from '../../interfaces/Interfaces';
import useResizeObserver from '../../tree/useResizeObserver';
import { string } from 'prop-types';

const CodePreview: React.FC<{
  theme: string | null;
  setTheme: any | null;
  }> = ({ theme, setTheme }) => {
  const wrapper = useRef();
  const dimensions = useResizeObserver(wrapper);
  const { width, height } =
    dimensions || 0;

  const [state, dispatch] = useContext(StateContext);
  const [divHeight, setDivHeight] = useState(0);
  const currentComponent = state.components.find(
    (elem: Component) => elem.id === state.canvasFocus.componentId
  );

  const handleCodeSnipChange = val => {
    currentComponent.code = val;
  };
  useEffect(() => {
    setDivHeight(height);
  }, [height])

  return (
    <div
    ref={wrapper}
      style={{
        height: '100%',
        maxWidth: '100%',
        justifyContent: 'center',
       
      }}
    >
      <AceEditor
        mode="javascript"
        theme={theme}
        width="100%"
        height="100%"
        onChange={handleCodeSnipChange}
        value={currentComponent.code}
        name="Code_div"
        readOnly={false}
        // editorProps={{ $blockScrolling: false }}
        fontSize={16}
        tabSize={2}
      />
    </div>
  );
};

export default CodePreview;
