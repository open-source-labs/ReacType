import React, { useState, useCallback, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import GetAppIcon from '@mui/icons-material/GetApp';
import Button from '@mui/material/Button';
import exportProject from '../../utils/exportProject.util';
import createModal from './createModal';
import { useSelector } from 'react-redux';
export default function ExportButton() {
  const [modal, setModal] = useState(null);
  const state = useSelector(store => store.appState)

  const genOptions: string[] = [
    'Export components',
    'Export components with application files'
  ];
  let genOption = 0;

  // Closes out the open modal
  const closeModal = () => setModal('');

  const showGenerateAppModal = () => {
    const children = (
      <List className="export-preference">
        {genOptions.map((option: string, i: number) => (
          <ListItem
            key={i}
            button
            onClick={() => chooseGenOptions(i)}
            style={{
              border: '1px solid #3f51b5',
              marginBottom: '2%',
              marginTop: '5%'
            }}
          >
            <ListItemText primary={option} style={{ textAlign: 'center' }} />
          </ListItem>
        ))}
        <ListItem>
          <input type="checkbox" id="tests" name="tests"></input>
          <label for="tests">Include Tests</label>
        </ListItem>
      </List>
    );
    let testchecked = 0;
    // helper function called by showGenerateAppModal
    // this function will prompt the user to choose an app directory once they've chosen their export option
    const chooseGenOptions = (genOpt: number) => {
      // set export option: 0 --> export only components, 1 --> export full project
      genOption = genOpt;
      window.api.chooseAppDir();
      testchecked = document.getElementById('tests').checked;
      closeModal();
    };

    // removes all listeners for the app_dir_selected event
    // this is important because otherwise listeners will pile up and events will trigger multiple events
    window.api.removeAllAppDirChosenListeners();

    // add listener for when an app directory is chosen
    // when a directory is chosen, the callback will export the project to the chosen folder
    // Note: this listener is imported from the main process via preload.js
    window.api.addAppDirChosenListener(path => {
      exportProject(
        path,
        state.name
          ? state.name
          : 'New_ReacType_Project_' + Math.ceil(Math.random() * 99).toString(),
        genOption,
        testchecked,
        state.projectType,
        state.components,
        state.rootComponents
      );
    });

    setModal(
      createModal({
        closeModal,
        children,
        message: 'Choose export preference:',
        primBtnLabel: null,
        primBtnAction: null,
        secBtnAction: null,
        secBtnLabel: null,
        open: true
      })
    );
  };

  const exportKeyBind = useCallback(e => {
    //Export Project
    (e.key === 'e' && e.metaKey) || (e.key === 'e' && e.ctrlKey)
      ? showGenerateAppModal()
      : '';
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', exportKeyBind);
    return () => {
      document.removeEventListener('keydown', exportKeyBind);
    };
  }, []);
  return (
    <div>
      <Button
        variant="contained"
        color="secondary"
        onClick={showGenerateAppModal}
        id="navbarButton"
        endIcon={<GetAppIcon />}
      >
        EXPORT
      </Button>
      {modal}
    </div>
  );
}
