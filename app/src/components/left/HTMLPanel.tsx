/* eslint-disable max-len */
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import TextField from '@mui/material/TextField';
import makeStyles from '@mui/styles/makeStyles';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { addElement } from '../../redux/reducers/slice/appStateSlice';
import { emitEvent } from '../../helperFunctions/socket';
import { RootState } from '../../redux/store';
import HelpIcon from '@mui/icons-material/Help';
import Popover, { PopoverProps } from '@mui/material/Popover';

/**
 * Provides a user interface for creating custom HTML elements in the application. It includes
 * input fields for the HTML tag and element name, validations for these inputs, and submission handling
 * to add new elements to the Redux store. It also handles error messages and displays a snackbar for success notifications.
 * @component
 * @param {Object} props - Component props.
 * @param {boolean} props.isThemeLight - Indicates if the theme is light or dark for styling purposes.
 * @returns {JSX.Element} The HTMLPanel component.
 * @example
 * ```jsx
 * <HTMLPanel isThemeLight={true} />
 * ```
 */
const HTMLPanel = (props): JSX.Element => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] =
    React.useState<PopoverProps['anchorEl']>(null);

  const [tag, setTag] = useState('');
  const [name, setName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [errorStatus, setErrorStatus] = useState(false);
  const [alertOpen, setAlertOpen] = React.useState<boolean>(false);
  const state = useSelector((store: RootState) => store.appState);
  const roomCode = useSelector((store: RootState) => store.roomSlice.roomCode);
  const currentID = useSelector(
    (store: RootState) => store.appState.customElementId
  );

  const dispatch = useDispatch();

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    resetError();
    setTag(e.target.value);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    resetError();
    setName(e.target.value);
  };

  const checkNameDupe = (inputName: string): boolean => {
    const checkList = state.HTMLTypes.slice();
    // checks to see if inputted comp name already exists
    let dupe = false;
    checkList.forEach((HTMLTag) => {
      if (
        HTMLTag.name.toLowerCase() === inputName.toLowerCase() ||
        HTMLTag.tag.toLowerCase() === inputName.toLowerCase()
      ) {
        dupe = true;
      }
    });
    return dupe;
  };

  const triggerError = (type: string) => {
    setErrorStatus(true);
    if (type === 'empty') setErrorMsg('Input cannot be blank.');
    if (type === 'dupe') setErrorMsg('Input already exists.');
    if (type === 'letters') setErrorMsg('Input must start with a letter.');
    if (type === 'symbolsDetected')
      setErrorMsg('Input must not contain symbols.');
    if (type === 'length') setErrorMsg('Input cannot exceed 10 characters.');
  };

  const resetError = () => {
    setErrorStatus(false);
    setErrorMsg('');
  };

  const createOption = (inputTag: string, inputName: string) => {
    // format name so first letter is capitalized and there are no whitespaces
    const inputNameClean = inputName.replace(/\s+/g, '');
    const formattedName =
      inputNameClean.charAt(0).toUpperCase() + inputNameClean.slice(1);
    // add new component to state
    const newElement = {
      id: currentID,
      tag: inputTag,
      name: formattedName,
      style: {},
      placeHolderShort: name,
      placeHolderLong: '',
      icon: null
    };

    dispatch(addElement(newElement));

    if (roomCode) emitEvent('addElementAction', roomCode, newElement);

    // setCurrentID(currentID + 1);
    setTag('');
    setName('');
  };

  const alphanumeric = (input: string): boolean => {
    let letterNumber = /^[0-9a-zA-Z]+$/;
    if (input.match(letterNumber)) return true;
    return false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('did submit');
    if (tag.trim() === '' || name.trim() === '') return triggerError('empty');
    if (!tag.charAt(0).match(/[a-zA-Z]/) || !name.charAt(0).match(/[a-zA-Z]/))
      return triggerError('letters');
    if (!alphanumeric(tag) || !alphanumeric(name))
      return triggerError('symbolsDetected');
    if (checkNameDupe(tag) || checkNameDupe(name)) return triggerError('dupe');
    if (name.length > 10) return triggerError('length');
    setAlertOpen(true);
    createOption(tag, name);
    resetError();
  };

  const handleCreateElement = useCallback((e) => {
    if (
      e.key === 'Enter' &&
      (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')
    ) {
      if (e.target.id === 'outlined-basic') {
        e.preventDefault();
        document.getElementById('submitButton').click();
      } else if (e.target.id === 'outlined-basic') {
        e.preventDefault();
        document.getElementById('submitButton').click();
      }
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleCreateElement);
    return () => {
      document.removeEventListener('keydown', handleCreateElement);
    };
  }, []);
  const handleClickPopover = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? open : undefined;
  const handleAlertClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') return;
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
      <form onSubmit={handleSubmit} className={classes.customForm}>
        <div className={classes.inputWrapper}>
          <TextField
            id="outlined-basic"
            label="Element Name"
            variant="outlined"
            size="small"
            value={name}
            autoComplete="off"
            sx={{ width: '80%' }}
            onChange={handleNameChange}
            helperText={errorMsg}
          />
          <HelpIcon
            id={'helpicon'}
            size="medium"
            sx={{ alignSelf: 'center', marginLeft: '12px' }}
            onClick={handleClickPopover}
          />
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'left'
            }}
          >
            <div className={classes.popover}>
              <div className={classes.popoverIcon}>
                <HelpIcon id={id} size="small" />
              </div>
              <div>
                Each HTML element created will become part of the DOM, the
                document model for displaying the page in the browser. The tag
                will begin or end the element in source code. For example, you
                could create an HTML element named 'paragraph' and it will
                appear in its tag 'p' in your HTML markup -- as {`<p> </p>`}.
              </div>
            </div>
          </Popover>
        </div>
        <div className={classes.inputWrapper}>
          <TextField
            id="outlined-basic"
            label="HTML Tag"
            variant="outlined"
            size="small"
            value={tag}
            autoComplete="off"
            sx={{ width: '80%' }}
            onChange={handleTagChange}
            helperText={errorMsg}
          />
          <Fab
            id="submitButton"
            type="submit"
            color="primary"
            aria-label="add"
            size="small"
            value="Add Element"
            sx={{ width: '15%', height: 40, borderRadius: 1 }}
            onClick={handleSubmit}
          >
            <AddIcon />
          </Fab>
        </div>
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
          sx={{ width: '100%', color: 'white', backgroundColor: '#f88e16' }}
        >
          HTML Tag Created!
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
  inputWrapper: {
    display: 'flex',
    width: '100%',
    marginBottom: '10px', // was originally 10px, decreased to 0 to decrease overall menu height
    justifyContent: 'start'
  },
  errorMessage: {
    display: 'flex',
    alignSelf: 'start',
    fontSize: '11px',
    marginTop: '10px',
    width: '150px',
    borderRadius: '5px'
  },
  popover: {
    backgroundColor: '#ffdbbb',
    display: 'flex',
    color: 'black',
    fontSize: '0.8rem',
    padding: '8px',
    width: '300px'
  },
  popoverIcon: {
    paddingRight: '10px',
    paddingLeft: '8px',
    paddingTop: '10px'
  }
});

export default HTMLPanel;
