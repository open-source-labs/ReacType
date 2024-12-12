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
  const [tag, setTag] = useState('');
  const [name, setName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [errorStatus, setErrorStatus] = useState(false);
  const [alertOpen, setAlertOpen] = React.useState<boolean>(false);
  const state = useSelector((store: RootState) => store.appState);
  const roomCode = useSelector((store: RootState) => store.roomSlice.roomCode);
  const currentID = useSelector((store: RootState) => store.appState.customElementId);

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
        HTMLTag.name.toLowerCase() === inputName.toLowerCase()
        || HTMLTag.tag.toLowerCase() === inputName.toLowerCase()
      ) {
        dupe = true;
      }
    });
    return dupe;
  };

  const triggerError = (type: string) => {
    setErrorStatus(true);
    if (type === 'empty') setErrorMsg('* Input cannot be blank. *');
    if (type === 'dupe') setErrorMsg('* Input already exists. *');
    if (type === 'letters') setErrorMsg('* Input must start with a letter. *');
    if (type === 'symbolsDetected') setErrorMsg('* Input must not contain symbols. *');
    if (type === 'length') setErrorMsg('* Input cannot exceed 10 characters. *');
  };

  const resetError = () => setErrorStatus(false);

  const createOption = (inputTag: string, inputName: string) => {
    // format name so first letter is capitalized and there are no whitespaces
    const inputNameClean = inputName.replace(/\s+/g, '');
    const formattedName = inputNameClean.charAt(0).toUpperCase() + inputNameClean.slice(1);
    // add new component to state
    const newElement = {
      id: currentID,
      tag: inputTag,
      name: formattedName,
      style: {},
      placeHolderShort: name,
      placeHolderLong: '',
      icon: null,
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

    if (tag.trim() === '' || name.trim() === '') return triggerError('empty');
    if (!tag.charAt(0).match(/[a-zA-Z]/) || !name.charAt(0).match(/[a-zA-Z]/)) return triggerError('letters');
    if (!alphanumeric(tag) || !alphanumeric(name)) return triggerError('symbolsDetected');
    if (checkNameDupe(tag) || checkNameDupe(name)) return triggerError('dupe');
    if (name.length > 10) return triggerError('length');
    createOption(tag, name);
    resetError();
  };

  const handleCreateElement = useCallback((e) => {
    if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA' && e.target.id !== 'filled-hidden-label-small') {
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

  const handleAlertOpen = () => setAlertOpen(true);

  const handleAlertClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;
    setAlertOpen(false);
  };

  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  return (
    <>
      <div className="HTMLItemCreate">
        <div className={classes.addComponentWrapper}>
          <div className={classes.inputWrapper}>
            <form onSubmit={handleSubmit} className="customForm">
              <br></br>
              <TextField
                id="outlined-basic"
                label="Custom Element Name"
                variant="outlined"
                size="small"
                value={name}
                autoComplete="off"
                placeholder="Custom Element Name"
                sx={{ flex: 1 }}
                // style={{ marginTop: '10px' }}
                onChange={handleNameChange}
              />
              {(!name.charAt(0).match(/[A-Za-z]/)
                || !alphanumeric(name)
                || name.trim() === ''
                || name.length > 10
                || checkNameDupe(name)) && (
                <span className={`${classes.errorMessage}/* ${classes.errorMessageDark} */`}>
                  <em>{errorMsg}</em>
                </span>
              )}
              <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <TextField
                  id="outlined-basic"
                  label="Custom Tag Name"
                  variant="outlined"
                  size="small"
                  value={tag}
                  autoComplete="off"
                  placeholder="Custom Tag Name"
                  sx={{ flex: 1 }}
                  onChange={handleTagChange}
                />
                {(!tag.charAt(0).match(/[A-Za-z]/)
                  || !alphanumeric(tag)
                  || tag.trim() === ''
                  || checkNameDupe(tag)) && (
                  <span className={`${classes.errorMessage}/* ${classes.errorMessageDark} */`}>
                    <em>{errorMsg}</em>
                  </span>
                )}
                <Fab
                  id="submitButton"
                  type="submit"
                  color="primary"
                  aria-label="add"
                  size="small"
                  value="Add Element"
                  sx={{ width: 40, height: 40, borderRadius: 1 }}
                  onClick={handleAlertOpen}
                >
                  <AddIcon />
                </Fab>
              </div>
            </form>
          </div>
        </div>
      </div>
      <>
        <Snackbar
          open={alertOpen}
          autoHideDuration={3000}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          onClose={handleAlertClose}
        >
          <Alert onClose={handleAlertClose} severity="success" sx={{ width: '100%', color: 'white' }}>
            HTML Tag Created!
          </Alert>
        </Snackbar>
      </>
    </>
  );
};

const useStyles = makeStyles({
  inputField: {
    marginTop: '10px',
    borderRadius: '5px',
    whiteSpace: 'nowrap',
    overflowX: 'hidden',
    textOverflow: 'ellipsis',
    backgroundColor: 'rgba(255,255,255,0.15)',
    margin: '0px 0px 0px 10px',
    width: '100%',
    height: '30px',
  },
  inputWrapper: {
    // textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    marginBottom: '10px',
    alignItems: 'center',
    // justifyContent: 'space-evenly',
  },
  addComponentWrapper: {
    width: '100%',
  },
  input: {
    width: '500px',
    whiteSpace: 'nowrap',
    overflowX: 'hidden',
    textOverflow: 'ellipsis',
    margin: '0px 0px 0px 0px',
    alignSelf: 'center',
  },
  inputLabel: {
    fontSize: '1em',
    marginLeft: '10px',
  },
  addElementButton: {
    height: '50px',
    width: '150px',
    fontFamily: 'Roboto, Raleway, sans-serif',
    fontSize: '15.5px',
    textAlign: 'center',
    transition: '0.3s',
    borderRadius: '10px',
    alignSelf: 'end',
    border: '1px solid #0671E3',
  },
  lightThemeFontColor: {
    color: 'white',
    '& .MuiInputBase-root': {
      color: 'rgba (0, 0, 0, 0.54)',
    },
  },
  darkThemeFontColor: {
    color: '#ffffff',
    '& .MuiInputBase-root': {
      color: '#fff',
    },
  },
  errorMessage: {
    display: 'flex',
    alignSelf: 'center',
    fontSize: '11px',
    marginTop: '10px',
    width: '150px',
  },
  errorMessageLight: {
    color: '#6B6B6B',
  },
  errorMessageDark: {
    color: 'white',
  },
});

export default HTMLPanel;
