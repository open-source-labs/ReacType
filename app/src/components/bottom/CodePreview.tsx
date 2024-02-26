import 'ace-builds/src-noconflict/ace';
import 'ace-builds/src-min-noconflict/ext-searchbox';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-dracula';
import 'ace-builds/src-noconflict/theme-terminal';

import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  codePreviewInput,
  codePreviewSave
} from '../../redux/reducers/slice/codePreviewSlice';
import { useDispatch, useSelector } from 'react-redux';

import AceEditor from 'react-ace';
import { Component } from '../../interfaces/Interfaces';
import { RootState } from '../../redux/store';
import { fetchPlugin } from '../../plugins/fetch-plugin';
import { unpkgPathPlugin } from '../../plugins/unpkg-path-plugin';
import useResizeObserver from '../../tree/useResizeObserver';
import { initializeEsbuild } from '../../helperFunctions/esbuildService';

const CodePreview: React.FC<{
  theme: string | null;
  setTheme: any | null;
  zoom: number;
  containerRef: any;
}> = ({ theme, setTheme, zoom, containerRef }) => {
  const ref = useRef<any>();

  const dispatch = useDispatch();

  const wrapper = useRef();
  const dimensions = useResizeObserver(wrapper);
  const { height } = dimensions || 0;
  const state = useSelector((store: RootState) => store.appState);
  const [, setDivHeight] = useState(0);
  let currentComponent = state.components.find(
    (elem: Component) => elem.id === state.canvasFocus.componentId
  );

  const [input, setInput] = useState('');

  useEffect(() => {
    //Starts the Web Assembly service
    initializeEsbuild();
  }, []);

  useEffect(() => {
    setDivHeight(height);
  }, [height]);

  useEffect(() => {
    setInput(currentComponent.code);
    dispatch(codePreviewInput(currentComponent.code));
  }, [currentComponent, state.components]);

  /**
   * Handler thats listens to changes in code editor
   * @param {string} data - Code entered by the user
   */
  const handleChange = async (data) => {
    setInput(data);
    dispatch(codePreviewInput(data));
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
        'import.meta.env.NODE_ENV': '"production"',
        global: 'window'
      }
    });
    dispatch(codePreviewSave(result.outputFiles[0].text));
  };

  return (
    <div
      ref={wrapper}
      style={{
        top: '1vw',
        height: '100%',
        maxWidth: '100%',
        justifyContent: 'center',
        transform: `scale(${zoom})`
      }}
    >
      <AceEditor
        mode="javascript"
        theme="dracula"
        width="100%"
        height="100%"
        onChange={handleChange}
        value={input}
        name="Code_div"
        readOnly={false}
        fontSize={14}
        tabSize={2}
        wrapEnabled={true}
        setOptions={{
          useWorker: false
        }}
      />
    </div>
  );
};

export default CodePreview;
