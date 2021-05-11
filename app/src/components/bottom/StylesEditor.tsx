import React, { useContext, useState, useRef, useEffect } from 'react';
import StateContext from '../../context/context';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-css';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/theme-solarized_dark';
import 'ace-builds/src-noconflict/theme-solarized_light';
import 'ace-builds/src-noconflict/theme-terminal';
import 'ace-builds/src-min-noconflict/ext-searchbox';
import { Component } from '../../interfaces/Interfaces';
import useResizeObserver from '../../tree/useResizeObserver';
import { string } from 'prop-types';
import Fab from '@material-ui/core/Fab';
import SaveIcon from '@material-ui/icons/Save';
import cssRefresher from '../../helperFunctions/cssRefresh';

const StylesEditor: React.FC<{
  theme: string | null;
  setTheme: any | null;
}> = ({ theme, setTheme }) => {
  const wrapper = useRef();
  const [css, setCss] = useState();

  useEffect(() => {
    loadFile();  
  }, []);

  const loadFile = () => {
    const myHeaders = new Headers({
      'Content-Type': 'text/css',
      Accept: 'text/css',
    });
    fetch('/demoRender', {
      headers: myHeaders,
    })
      .then(response => response.text())
      .then((data) => {
        setCss(data);
      });
  }

  const saveFile = () => {
    console.log('saveFile: ', css);
    // const myHeaders = new Headers({
    //   headers: { 'Content-Type': 'application/json' },
    // });
    fetch('/user-styles/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: css }),
    })
      .then(response => response.text())
      .then((data) => {
        // Removes old link to css and creates a new stylesheet link on demo render
        cssRefresher();
      });
  }
  const saveCss = (e) => {
    e.preventDefault();
    saveFile();
  }

  const handleChange = (text) => {
    setCss(text);
  }

  return (
    <div
      className='text-editor'
      ref={wrapper}
      style={{
        height: '100%',
        maxWidth: '100%',
        justifyContent: 'center',
      }}
    >
      <AceEditor
        mode="css"
        theme={'solarized_dark'}
        width="100%"
        height="100%"
        onChange={handleChange}
        value={css}
        name="Css_div"
        // readOnly={false}
        fontSize={16}
        tabSize={2}
        enableBasicAutocompletion={true}
        enableLiveAutocompletion={true}
      />
      <Fab className='bttn' onClick={saveCss} color="secondary" aria-label="add">
        <SaveIcon />
      </Fab>
    </div>
  );
};

export default StylesEditor;
