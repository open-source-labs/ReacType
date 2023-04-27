import React, { useState, useRef, useEffect } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-css';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/theme-solarized_dark';
import 'ace-builds/src-noconflict/theme-solarized_light';
import 'ace-builds/src-noconflict/theme-terminal';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-min-noconflict/ext-searchbox';
import Fab from '@mui/material/Fab';
import SaveIcon from '@mui/icons-material/Save';
import cssRefresher from '../../helperFunctions/cssRefresh';

//This was being used for the demo
// const serverURL = 'https://reactype-caret.herokuapp.com';

const StylesEditor: React.FC<{
  theme: string | null;
  setTheme: any | null;
}> = ({ theme, setTheme }) => {
  const wrapper = useRef();
  const [css, setCss] = useState();
  //now using variable and storing CSS in localStorage to retain CSS upon dismount of the component
  let currentCss = localStorage.getItem('css');
  
  //This was being used for the demo

  // useEffect(() => {
  //   loadFile();  
  // }, []);

  // const loadFile = () => {
  //   const myHeaders = new Headers({
  //     'Content-Type': 'text/css',
  //     Accept: 'text/css',
  //   });
  //   fetch(`${serverURL}/demoRender`, {
  //     headers: myHeaders,
  //   })
  //     .then(response => response.text())
  //     .then((data) => {
  //       setCss(data);
  //     });
  // }

  // const saveFile = () => {
  //   fetch(`${serverURL}/user-styles/save`, {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ data: css }),
  //   })
  //     .then(response => response.text())
  //     .then((data) => {
  //       // Removes old link to css and creates a new stylesheet link on demo render
  //       cssRefresher();
  //     });
  // }

  //refactored this function to store the css on local storage rather than invoke saveFile()
  const saveCss = (e) => {
    e.preventDefault();
    localStorage.setItem('css', currentCss)
  }

  const handleChange = (text) => {
    currentCss = text;
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
        theme={'monokai'}
        width="100%"
        height="100%"
        onChange={handleChange}
        value={currentCss}
        name="Css_div"
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
