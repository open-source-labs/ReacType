//note for future developers - this may be electron specific - without signin working on the browser it is difficult to test
import React, { useState } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { withRouter } from 'react-router-dom';
import exportProject from '../../utils/exportProject.util';
import createModal from '../right/createModal';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { resetState } from '../../redux/reducers/slice/appStateSlice';
// ProjectManager function moved to NavBar.tsx
const ProjectManager = () => {
  // state to keep track of whether a modal should display
  const [modal, setModal] = useState(null);
  const state = useSelector((store: RootState) => store.appState);
  const dispatch = useDispatch();

  // State to keep track of how the user wants their components to be exported
  // GenOption = 0 --> export only components
  // GenOption = 1 --> export an entire project w/ webpack, server, etc.
  const genOptions: string[] = [
    'Export components',
    'Export components with application files'
  ];
  let genOption: number = 0;

  // Closes out the open modal
  const closeModal = () => setModal('');

  // Creates modal that asks if user wants to clear workspace
  // If user clears their workspace, then their components are removed from state and the modal is closed
  const clearWorkspace = () => {
    // Reset state for project to initial state
    const resetStates = () => {
      dispatch(resetState({}));
    };

    // Set modal options
    const children = (
      <List className="export-preference">
        <ListItem
          key={'clear'}
          button
          onClick={resetStates}
          style={{
            border: '1px solid #3c59ba',
            marginBottom: '2%',
            marginTop: '5%'
          }}
        >
          <ListItemText
            primary={'Yes, delete all project data'}
            style={{ textAlign: 'center' }}
            onClick={closeModal}
          />
        </ListItem>
      </List>
    );

    // create modal
    setModal(
      createModal({
        closeModal,
        children,
        message: 'Are you sure you want to delete all data?',
        primBtnLabel: null,
        primBtnAction: null,
        secBtnAction: null,
        secBtnLabel: null,
        open: true
      })
    );
  };

  // ----------------------------------CREATE MODAL FOR EXPORT OPTIONS (moved to NavBar.tsx)-------------------------------------

  const showGenerateAppModal = () => {
    const children = (
      <List className="export-preference">
        {genOptions.map((option: string, i: number) => (
          <ListItem
            key={i}
            button
            onClick={() => chooseGenOptions(i)}
            style={{
              border: '1px solid #3c59ba',
              marginBottom: '2%',
              marginTop: '5%'
            }}
          >
            <ListItemText primary={option} style={{ textAlign: 'center' }} />
          </ListItem>
        ))}
      </List>
    );

    // helper function called by showGenerateAppModal
    // this function will prompt the user to choose an app directory once they've chosen their export option
    const chooseGenOptions = (genOpt: number) => {
      // set export option: 0 --> export only components, 1 --> export full project
      genOption = genOpt;
      window.api.chooseAppDir();
      closeModal();
    };

    // removes all listeners for the app_dir_selected event
    // this is important because otherwise listeners will pile up and events will trigger multiple events
    window.api.removeAllAppDirChosenListeners();

    // add listener for when an app directory is chosen
    // when a directory is chosen, the callback will export the project to the chosen folder
    // Note: this listener is imported from the main process via preload.js
    window.api.addAppDirChosenListener((path) => {
      exportProject(
        path,
        state.name
          ? state.name
          : 'New_ReacType_Project_' + Math.ceil(Math.random() * 99).toString(),
        genOption,
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

  return <div> {modal} </div>;
};

const useStyles = makeStyles({
  logoutButton: {
    position: 'absolute',
    bottom: '50px',
    right: '150px'
  },
  btnGroup: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    position: 'absolute',
    bottom: '40px',
    left: '0px'
  },

  button: {
    backgroundColor: 'rgba(1,212,109,0.1)',
    fontSize: '1em',
    minWidth: '300px',
    marginTop: '10px',
    marginBotton: '10px'
  }
});

export default withRouter(ProjectManager);
