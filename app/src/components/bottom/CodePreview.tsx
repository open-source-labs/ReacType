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
import { string } from 'prop-types';
import { unpkgPathPlugin } from '../../plugins/unpkg-path-plugin';
import { fetchPlugin } from '../../plugins/fetch-plugin';
import * as esbuild from 'esbuild-wasm';
import { useSelector, useDispatch } from 'react-redux';
import { store } from './../../index';

const CodePreview: React.FC<{
  theme: string | null;
  setTheme: any | null;
  }> = ({ theme, setTheme }) => {


 

  const ref = useRef<any>();
  const iframe = useRef<any>();
  const [input, setInput] = useState('');



  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm',
    })
  }

  const wrapper = useRef();
  const dimensions = useResizeObserver(wrapper);
  const { width, height } =
    dimensions || 0;

  const [state, dispatch] = useContext(StateContext);
  const [divHeight, setDivHeight] = useState(0);
  const currentComponent = state.components.find(
    (elem: Component) => elem.id === state.canvasFocus.componentId
  );


  const handleCodeSnipChange = (val) => {
    currentComponent.code = val;
  };

  useEffect(() => {
    startService();
  }, []);

  useEffect(() => {
    setDivHeight(height);
  }, [height])

  useEffect(() => {
    console.log('hello')
  }, [currentComponent.code])


  const handleChange = (data) => {
   setInput(data)
   console.log('line 69',input)
  };

  const handleClick = async () => {
    // setInput(currentComponent.code)  
    // console.log('currentComponent.code', currentComponent.code)
    if(!ref.current) {
      return;
    }
    const result = await ref.current.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [
        unpkgPathPlugin(),
        fetchPlugin(input)
      ],
      define: {
        'process.env.NODE_ENV': '"development"',
        global: 'window'
      }
    })
    console.log('this is input',input)
    store.dispatch({type: "SAVE", payload: result.outputFiles[0].text});
  }


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
        theme="monokai"
        width="100%"
        height="70%"
        onChange={handleChange}
        // value={currentComponent.code}
        value={input}
        name="Code_div"
        readOnly={false}
        fontSize={16}
        tabSize={2}
      />
      <button onClick={() => handleClick()}>Fetch</button>
    </div>
  );
};

export default CodePreview;



