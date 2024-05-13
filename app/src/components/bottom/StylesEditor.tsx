import 'ace-builds/src-noconflict/ace';
import 'ace-builds/src-noconflict/mode-css';
import 'ace-builds/src-noconflict/theme-dracula';
import 'ace-builds/src-min-noconflict/ext-searchbox';
import 'ace-builds/src-noconflict/ext-language_tools';

import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AceEditor from 'react-ace';
import Fab from '@mui/material/Fab';
import { RootState } from '../../redux/store';
import SaveIcon from '@mui/icons-material/Save';
import { updateStylesheet } from '../../redux/reducers/slice/appStateSlice';
import { emitEvent } from '../../helperFunctions/socket';

/**
 * A component that provides a CSS editing interface using the Ace Editor. It is styled with a specific theme and
 * allows for the live editing and saving of CSS styles. Changes are saved to the Redux state and can be broadcasted
 * to other users in a collaborative environment using sockets.
 *
 * @param {Object} props - Component props.
 * @param {string|null} props.theme - The theme for the Ace Editor; can be null indicating no specific theme set.
 * @param {Function|null} props.setTheme - Function to change the theme of the Ace Editor; can be null if theme adjustment is not required.
 *
 * Redux State Dependencies:
 * - `appState.stylesheet`: Holds the current CSS content being edited.
 * - `roomSlice.roomCode`: The room identifier used for socket communications to broadcast CSS updates.
 *
 * @returns {JSX.Element} A styled div containing the Ace Editor configured for CSS editing and a floating action button to save changes.
 *
 * Functionalities:
 * - Edits CSS within a fully featured text editor with syntax highlighting and autocompletion.
 * - Saves the CSS to the Redux state and broadcasts changes to other users in the same room via socket events.
 */
const StylesEditor: React.FC<{
  theme: string | null;
  setTheme: any | null;
}> = ({ theme, setTheme }): JSX.Element => {
  const wrapper = useRef();
  const stylesheet = useSelector(
    (state: RootState) => state.appState.stylesheet
  );
  const roomCode = useSelector((store: RootState) => store.roomSlice.roomCode);

  //sets state for what text is currently in the csseditor
  const [css, setCss] = useState(stylesheet);

  const dispatch = useDispatch();

  //on save, updates the state based on above hook and rerenders the demo
  const saveCss = (e) => {
    e.preventDefault();
    dispatch(updateStylesheet(css));
    if (roomCode) {
      emitEvent('updateCSSAction', roomCode, css);
    }
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
        theme="dracula"
        width="100%"
        height="100%"
        onChange={handleChange}
        value={css}
        name="Css_div"
        fontSize={14}
        tabSize={2}
        setOptions={{
          useWorker: false,
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true
        }}
      />
      <Fab
        className="cssSaveBtn"
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
