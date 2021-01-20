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

const ProjectManager = () => {
  // state to keep track of whether a modal should display
  const [modal, setModal] = useState(null);
  const [state, dispatch] = useContext(StateContext);

  const classes = useStyles();

  const { style, setStyle } = useContext(styleContext);

  // Allows users to toggle project between "next.js" and "Classic React"
  // When a user changes the project type, the code of all components is rerendered
  const handleProjectChange = event => {
    const projectType = event.target.value;
    dispatch({ type: 'CHANGE PROJECT TYPE', payload: { projectType } });
  };

  // state to keep track of how the user wants their components to be exported
  // genOption = 0 --> export only components
  // genOption = 1 --> export an entire project w/ webpack, server, etc.
  const genOptions: string[] = [
    'Export components',
    'Export components with application files'
  ];
  let genOption = 0;

  // closes out the open modal
  const closeModal = () => setModal('');

  // creates modal that asks if user wants to clear workspace
  // if user clears their workspace, then their components are removed from state and the modal is closed
  const clearWorkspace = () => {
    // Reset state for project to initial state
    const resetState = () => {
      dispatch({ type: 'RESET STATE', payload: {} });
    };

    // set modal options
    const children = (
      <List className="export-preference">
        <ListItem
          key={'clear'}
          button
          onClick={resetState}
          style={{
            border: '1px solid #3f51b5',
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
        message: 'Are you sure want to delete all data?',
        primBtnLabel: null,
        primBtnAction: null,
        secBtnAction: null,
        secBtnLabel: null,
        open: true
      })
    );
  };

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
        color="primary"
        style={{ ...style.button, marginLeft: '15%' }}
        variant="outlined"
        className={classes.button}
        onClick={() => {
          !style.backgroundColor
            ? setStyle({ backgroundColor: '#00001a' })
            : setStyle({});
        }}
      >
        Change Lighting
      </Button>

      <div className={classes.projectManagerWrapper}>
        {state.name && state.isLoggedIn ? (
          <p style={{ color: 'white' }}>
            Your current project is <strong>{state.name}</strong>
          </p>
        ) : null}
        {!state.name && state.isLoggedIn ? (
          <p style={{ color: 'white' }}>
            Select "Save project as" to create and save a project
          </p>
        ) : null}

        <div className={classes.projectTypeWrapper}>
          <FormControl>
            <Select
              variant="outlined"
              labelId="project-type-label"
              id="demo-simple-select"
              className={classes.projectSelector}
              value={state.projectType}
              onChange={handleProjectChange}
            >
              <MenuItem value={'Classic React'}>Classic React</MenuItem>
              <MenuItem value={'Gatsby.js'}>Gatsby.js</MenuItem>
              <MenuItem value={'Next.js'}>Next.js</MenuItem>
            </Select>
          </FormControl>
        </div>
        {state.isLoggedIn ? <SaveProjectButton /> : ''}
        {state.isLoggedIn ? <ProjectsFolder /> : ''}
        {state.isLoggedIn ? <DeleteProjects /> : ''}
        {/* <div className={classes.btnGroup}> */}
        <Button
          className={classes.button}
          variant="outlined"
          color="primary"
          onClick={showGenerateAppModal}
          endIcon={<PublishIcon />}
        >
          EXPORT PROJECT
        </Button>

        <Button
          className={classes.button}
          variant="outlined"
          color="primary"
          onClick={clearWorkspace}
          endIcon={<WarningIcon />}
        >
          CLEAR WORKSPACE
        </Button>
        <br />
        <br />
        <LoginButton />
        {/* </div> */}
        {modal}
      </div>
    </div>
  );
};

const useStyles = makeStyles({
  projectManagerWrapper: {
    border: '1px solid rgba(70,131,83)',
    padding: '20px',
    margin: '40px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifySelf: 'flex-end'
  },

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
  },
  projectTypeWrapper: {
    width: '300px',
    marginTop: '10px',
    marginBotton: '10px'
  },
  projectSelector: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    width: '300px',
    color: '#fff'
  }
});

export default withRouter(ProjectManager);
