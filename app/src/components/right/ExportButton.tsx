// import React, { useState, useContext } from 'react';
// import Button from '@material-ui/core/Button';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';
// import { makeStyles } from '@material-ui/core/styles';
// import createModal from '../right/createModal';
// import exportProject from '../../utils/exportProject.util';
// import { styleContext } from '../../containers/AppContainer';
// import StateContext from '../../context/context';

import React, { useState, useContext } from 'react';
import StateContext from '../../context/context';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import WarningIcon from '@material-ui/icons/Warning';
import PublishIcon from '@material-ui/icons/Publish';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import { useHistory, withRouter, Link as RouteLink } from 'react-router-dom';

import exportProject from '../../utils/exportProject.util';

import ProjectsFolder from './OpenProjects';
import createModal from './createModal';
import LoginButton from './LoginButton';
import SaveProjectButton from './SaveProjectButton';
import DeleteProjects from './DeleteProjects';

// import { useStyles } from '../left/ComponentPanel';
import { styleContext } from '../../containers/AppContainer';


export default function ExportButton() {

  const [modal, setModal] = useState(null);
  const [state, dispatch] = useContext(StateContext);

  const { style, setStyle } = useContext(styleContext);

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
    window.api.addAppDirChosenListener(path => {
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

  return (
    <div>
       <Button
          // className={classes.button}
          variant="contained"
          color="primary"
          onClick={showGenerateAppModal}
          // endIcon={<PublishIcon />}
          id="navbarButton"
        >
          EXPORT
        </Button>
    </div>
  );
};