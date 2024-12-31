/* eslint-disable max-len */
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import CloseIcon from '@mui/icons-material/Close';
import Checkbox from '@mui/material/Checkbox';
import Fab from '@mui/material/Fab';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import makeStyles from '@mui/styles/makeStyles';
import { addComponent } from '../../redux/reducers/slice/appStateSlice';
import { RootState } from '../../redux/store';
import { emitEvent } from '../../helperFunctions/socket';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
/**
 * `ComponentPanel` is a React component that facilitates the creation and management of component entities
 * within a user interface design tool. It allows users to add new components with specific characteristics,
 * such as determining if the component is a root component, which affects its behavior and placement within the project.
 *
 * @param {Object} props - Properties passed to the component.
 * @param {boolean} props.isThemeLight - Indicates if the light theme is currently active, influencing the visual styling of the panel.
 *
 * @returns {JSX.Element} A panel that allows users to input details for a new component, such as name and root status, and adds it to the project.
 */

const ComponentPanel = ({ setIsCreatingModule, isThemeLight }): JSX.Element => {
  const classes = useStyles();

  const state = useSelector((store: RootState) => store.appState);
  const contextParam = useSelector((store: RootState) => store.contextSlice);
  const roomCode = useSelector((store: RootState) => store.roomSlice.roomCode);

  const dispatch = useDispatch();

  // state hooks for inputted component name, component id and array of components
  const [errorStatus, setErrorStatus] = useState(false);
  // errorMsg refers to the error message on the new component text field
  const [errorMsg, setErrorMsg] = useState('');
  const [compName, setCompName] = useState('');
  const [isRoot, setIsRoot] = useState(false);
  const [alertOpen, setAlertOpen] = React.useState<boolean>(false);

  // function to create error message for component name input
  const triggerError = (type: string) => {
    setErrorStatus(true);
    if (type === 'empty') {
      setErrorMsg('Component name cannot be blank.');
    } else if (type === 'dupe') {
      setErrorMsg('Component name already exists.');
    } else if (type === 'letters') {
      setErrorMsg('Component name must start with a letter.');
    } else if (type === 'symbolsDetected') {
      setErrorMsg('Component name must not contain symbols.');
    } else if (type === 'rootDupe') {
      setErrorMsg('Component name cannot be root component name.');
    }
  };

  const handleCreateElement = useCallback((e) => {
    if (
      e.key === 'Enter' &&
      e.target.tagName !== 'TEXTAREA' &&
      e.target.id !== 'filled-hidden-label-small'
    ) {
      e.preventDefault();
      document.getElementById('submitButton').click();
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleCreateElement);
    return () => {
      document.removeEventListener('keydown', handleCreateElement);
    };
  }, []);

  const handleNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorStatus(false);
    setCompName(e.target.value);
  };

  // "Root" components are not draggable into the main canvas
  // If next.js or Gatsby.js mode is on, root components will be separate pages
  const toggleRootStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsRoot(isRoot ? false : true);
  };

  // Add a new component
  const createOption = (inputName: string) => {
    // format name so first letter is capitalized and there are no white spaces
    let inputNameClean = inputName.replace(/\s+/g, ''); // removes spaces
    const formattedName =
      state.projectType === 'Classic React'
        ? inputNameClean.charAt(0).toUpperCase() + inputNameClean.slice(1) // capitalizes first letter
        : inputNameClean;
    // add new component to state
    dispatch(
      addComponent({
        componentName: formattedName,
        root: isRoot,
        contextParam: contextParam
      })
    );

    if (roomCode) {
      emitEvent('addComponentAction', roomCode, {
        componentName: formattedName,
        root: isRoot,
        contextParam: contextParam
      });
    }

    // reset root toggle back to default position
    setIsRoot(false);
    // reset name field
    setCompName('');
  };

  const handleNameSubmit = () => {
    // creates a component if no error conditions triggered
    let letters = /[a-zA-Z]/;
    let error;
    if (compName.trim() === '') {
      error = 'empty';
    } else if (!compName.charAt(0).match(letters)) {
      error = 'letters';
    } else if (!compName.match(/^[0-9a-zA-Z]+$/)) {
      error = 'symbolsDetected';
    } else if (
      state.components.some(
        (comp) => comp.name.toLowerCase() === compName.toLowerCase()
      )
    ) {
      error = 'dupe';
    } else if (
      compName.toLowerCase() === 'index' ||
      compName.toLowerCase() === 'app'
    ) {
      error = 'rootDupe';
    } else {
      createOption(compName);
      setErrorStatus(false);
      setAlertOpen(true);
      setIsCreatingModule(false);
      return;
    }
    triggerError(error);
  };

  const keyBindCreateComponent = useCallback((e) => {
    if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
      e.preventDefault();
      document.getElementById('addComponentButton').click();
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', keyBindCreateComponent);
    return () => {
      document.removeEventListener('keydown', keyBindCreateComponent);
    };
  }, []);

  const handleAlertClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertOpen(false);
  };

  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  return (
    <>
      <form className="customForm" className={classes.customForm}>
        <div className={classes.inputWrapper}>
          <TextField
            id="AddModule"
            label="Module Name"
            variant="outlined"
            value={compName}
            autoComplete="off"
            inputProps={{ className: classes.input }}
            error={errorStatus}
            helperText={errorStatus ? errorMsg : ''}
            onChange={handleNameInput}
            size="small"
            sx={{ width: '80%' }}
          />
          <Fab
            id="submitButton"
            type="submit"
            color="primary"
            aria-label="add"
            value="Add Component or Modules"
            size="small"
            onClick={handleNameSubmit}
            sx={{ width: '15%', height: 40, borderRadius: 1 }}
          >
            <AddIcon />
          </Fab>
        </div>
        <FormControlLabel
          value="top"
          control={
            <Checkbox
              color="primary"
              checked={isRoot}
              onChange={() => setIsRoot(!isRoot)}
            />
          }
          // name varies depending on mode
          label={
            state.projectType === 'Next.js' || state.projectType === 'Gatsby.js'
              ? 'page'
              : 'root'
          }
          labelPlacement="end"
          sx={{ color: '#d3d3d3' }}
        />
      </form>
      <Snackbar
        open={alertOpen}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={handleAlertClose}
      >
        <Alert
          onClose={handleAlertClose}
          severity="success"
          sx={{ width: '100%', color: '#d3d3d3', backgroundColor: '#f88e16' }}
        >
          Module Created!
        </Alert>
      </Snackbar>
    </>
  );
};

const useStyles = makeStyles({
  customForm: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start'
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    cursor: 'pointer',
    color: 'white',
    '&:hover': {
      color: 'black'
    }
  },
  inputWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'start'
  },
  btnGroup: {
    display: 'flex',
    flexDirection: 'column'
  },
  lightThemeFontColor: {
    color: 'white',
    '& .MuiInputBase-root': {
      color: 'rgba (0, 0, 0, 0.54)'
    }
  },
  darkThemeFontColor: {
    color: '#fff',
    '& .MuiInputBase-root': {
      color: '#fff'
    }
  }
});

export default ComponentPanel;
