import React, { useContext, useState, useRef, useEffect } from 'react';
import StateContext from '../../context/context';
import AceEditor from 'react-ace';
import 'ace-builds/src-min-noconflict/ext-searchbox';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/theme-solarized_dark';
import 'ace-builds/src-noconflict/theme-solarized_light';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/theme-terminal';
import { Component } from '../../interfaces/Interfaces';
import useResizeObserver from '../../tree/useResizeObserver';
import { unpkgPathPlugin } from '../../plugins/unpkg-path-plugin';
import { fetchPlugin } from '../../plugins/fetch-plugin';
import * as esbuild from 'esbuild-wasm';
import store from '../../redux/store';
// import { store } from './../../index';
const CodePreview: React.FC<{
  theme: string | null;
  setTheme: any | null;
}> = ({ theme, setTheme }) => {
  const ref = useRef<any>();

  /**
   * Starts the Web Assembly service.
   */
  const startService = async () => {
    ref.current = await esbuild.initialize({
      worker: true,
      wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm'
    });
  };

  const wrapper = useRef();
  const dimensions = useResizeObserver(wrapper);
  const { height } = dimensions || 0;

  const [state] = useContext(StateContext);
  const [, setDivHeight] = useState(0);
  const compontents = state.components;
  let currentComponent = state.components.find(
    (elem: Component) => elem.id === state.canvasFocus.componentId
  );

  const [input, setInput] = useState();

  useEffect(() => {
    startService();
  }, []);

  useEffect(() => {
    setDivHeight(height);
  }, [height]);

  useEffect(() => {
    setInput(currentComponent.code);
    store.dispatch({
      type: 'CODE_PREVIEW_INPUT',
      payload: currentComponent.code
    });
  }, [currentComponent, compontents]); // Lillian added another dependency here to utilize useEffect

  /**
   * Handler thats listens to changes in code editor
   * @param {string} data - Code entered by the user
   */
  const handleChange = async data => {
    console.log('changed');
    setInput(data);
    store.dispatch({ type: 'CODE_PREVIEW_INPUT', payload: data });
    if (!ref.current) {
      return;
    }
    let result = await ref.current.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      incremental: true,
      minify: true,
      plugins: [unpkgPathPlugin(), fetchPlugin(data)],
      define: {
        'process.env.NODE_ENV': '"production"',
        global: 'window'
      }
    });
    store.dispatch({
      type: 'CODE_PREVIEW_SAVE',
      payload: result.outputFiles[0].text
    });
  };

  return (
    <div
      ref={wrapper}
      style={{
        height: '100%',
        maxWidth: '100%',
        justifyContent: 'center'
      }}
    >
      <AceEditor
        mode="javascript"
        theme="monokai"
        width="100%"
        height="100%"
        onChange={handleChange}
        value={input}
        name="Code_div"
        readOnly={false}
        fontSize={18}
        tabSize={2}
      />
    </div>
  );
};

export default CodePreview;
