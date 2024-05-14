import 'ace-builds/src-noconflict/ace';
import 'ace-builds/src-min-noconflict/ext-searchbox';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-dracula';
import 'ace-builds/src-noconflict/theme-clouds_midnight';

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

/**
 * A React component that provides an interactive code editor using Ace Editor. It integrates a live code preview
 * that updates the Redux store with the latest code. The editor can handle JavaScript code, with themes and plugins
 * to enhance functionality. This component listens to size changes in its container and adjusts its height accordingly.
 * It also integrates with esbuild to bundle the code with custom plugins for handling package imports and fetch operations.
 *
 * @param {Object} props - Component props.
 * @param {string|null} props.theme - The theme for the Ace Editor. Null if no theme is set.
 * @param {Function|null} props.setTheme - Function to set the theme of the Ace Editor. Null if not used.
 * @param {number} [props.zoom] - Zoom level for the editor, affecting its scale.
 * @param {React.RefObject<HTMLDivElement>} props.containerRef - Reference to the editor's container element.
 *
 * @returns {JSX.Element} The CodePreview component, which includes the Ace Editor configured for JavaScript editing.
 *
 * Redux State Dependencies:
 * - `appState`: Uses information about the current component focus to load and manage code.
 *
 * Effects:
 * - Initializes the esbuild service on component mount.
 * - Updates the editor height and internal state when the container's dimensions change.
 * - Updates Redux with the current code whenever the code in the editor changes.
 */
const CodePreview: React.FC<{
  theme: string | null;
  setTheme: any | null;
  // zoom: number; // This is added if you want the Code Editor to zoom in/out
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
      <div
        style={{
          width: '100%',
          height: '80px',
          marginTop: '-70px',
          backgroundColor: '#191919'
        }}
      ></div>
      <AceEditor
        mode="javascript"
        theme="clouds_midnight"
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
