import React, { useState, useRef } from 'react';
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
import { updateStylesheet } from '../../redux/reducers/slice/appStateSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const StylesEditor: React.FC<{
  theme: string | null;
  setTheme: any | null;
}> = ({ theme, setTheme }) => {
  const wrapper = useRef();
  const stylesheet = useSelector(
    (state: RootState) => state.appState.stylesheet
  );
  //sets state for what text is currently in the csseditor
  const [css, setCss] = useState(stylesheet);

  const dispatch = useDispatch();

  //on save, updates the state based on above hook and rerenders the demo
  const saveCss = (e) => {
    e.preventDefault();
    dispatch(updateStylesheet(css));
  };

  //handles changes in the ace editor
  const handleChange = (text) => {
    setCss(text);
  };

  return (
    <div
      className="text-editor"
      ref={wrapper}
      style={{
        height: '100%',
        maxWidth: '100%',
        justifyContent: 'center'
      }}
    >
      <AceEditor
        mode="css"
        theme={'monokai'}
        width="100%"
        height="100%"
        onChange={handleChange}
        value={css}
        name="Css_div"
        fontSize={16}
        tabSize={2}
        setOptions={{
          useWorker: false,
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true
        }}
      />
      <Fab
        className="bttn"
        onClick={saveCss}
        color="secondary"
        aria-label="add"
      >
        <SaveIcon />
      </Fab>
    </div>
  );
};

export default StylesEditor;
