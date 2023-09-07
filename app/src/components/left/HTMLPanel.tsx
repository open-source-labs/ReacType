import { Button, InputLabel } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { BorderColor } from '@mui/icons-material';
import { RootState } from '../../redux/store';
import TextField from '@mui/material/TextField';
import { addElement } from '../../redux/reducers/slice/appStateSlice';
import makeStyles from '@mui/styles/makeStyles';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

/*
DESCRIPTION: This is the bottom half of the left panel, starting from the 'HTML
  Elements' header. The boxes containing each HTML element are rendered in
  HTMLItem, which itself is rendered by this component.
 
  !!! TO NAME HTML ELEMENTS in the LEFT panel !!!

Central state contains all available HTML elements (stored in the HTMLTypes property).
  The data for HTMLTypes is stored in HTMLTypes.tsx and is added to central state in
  initialState.tsx.

Hook state:
  -tag: 
*/

const HTMLPanel = (props): JSX.Element => {
  const classes = useStyles();
  const [tag, setTag] = useState('');
  const [name, setName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [errorStatus, setErrorStatus] = useState(false);
  const [alertOpen, setAlertOpen] = React.useState<boolean>(false)
  const isDarkMode = useSelector(
    (store: RootState) => store.darkMode.isDarkMode
  );
  const state = useSelector((store: RootState) => store.appState);
  const dispatch = useDispatch();
  let startingID = 0;
  state.HTMLTypes.forEach((element) => {
    if (element.id >= startingID) startingID = element.id;
  });
  startingID += 1;

  const [currentID, setCurrentID] = useState(startingID);

  const buttonClasses =
    'MuiButtonBase-root MuiButton-root MuiButton-text makeStyles-button-12 MuiButton-textPrimary';

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    resetError();
    setTag(e.target.value);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    resetError();
    setName(e.target.value);
  };

  const checkNameDupe = (inputName: String): boolean => {
    let checkList = state.HTMLTypes.slice();

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

  const triggerError = (type: String) => {
    setErrorStatus(true);
    if (type === 'empty') {
      setErrorMsg('* Input cannot be blank. *');
    } else if (type === 'dupe') {
      setErrorMsg('* Input already exists. *');
    } else if (type === 'letters') {
      setErrorMsg('* Input must start with a letter. *');
    } else if (type === 'symbolsDetected') {
      setErrorMsg('* Input must not contain symbols. *');
    } else if (type === 'length') {
      setErrorMsg('* Input cannot exceed 10 characters. *');
    }
  };

  const resetError = () => {
    setErrorStatus(false);
  };

  const createOption = (inputTag: String, inputName: String) => {
    // format name so first letter is capitalized and there are no whitespaces
    let inputNameClean = inputName.replace(/\s+/g, '');
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
    setCurrentID(currentID + 1);
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

    if (tag.trim() === '' || name.trim() === '') {
      triggerError('empty');
      return;
    } else if (
      !tag.charAt(0).match(/[a-zA-Z]/) ||
      !name.charAt(0).match(/[a-zA-Z]/)
    ) {
      triggerError('letters');
      return;
    } else if (!alphanumeric(tag) || !alphanumeric(name)) {
      triggerError('symbolsDetected');
      return;
    } else if (checkNameDupe(tag) || checkNameDupe(name)) {
      triggerError('dupe');
      return;
    } else if (name.length > 10) {
      triggerError('length');
      return;
    }
    createOption(tag, name);
    resetError();
  };

  const handleCreateElement = useCallback((e) => {
    if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
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

  const handleAlertOpen = () => {
    setAlertOpen(true)
  }

  const handleAlertClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
    ) => {
      if (reason === 'clickaway') {
        return;
      }
      setAlertOpen(false);
    }

  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  return (
  <>
    <div className="HTMLItemCreate">
      <div className={classes.addComponentWrapper}>
        <div className={classes.inputWrapper}>
          <form onSubmit={handleSubmit} className="customForm">
            <h4
              className={
                !isDarkMode
                  ? classes.lightThemeFontColor
                  : classes.darkThemeFontColor
              }
            >
              New HTML Tag:{' '}
            </h4>
            <InputLabel
              htmlFor="tag"
              className={
                !isDarkMode
                  ? `${classes.inputLabel} ${classes.lightThemeFontColor}`
                  : `${classes.inputLabel} ${classes.darkThemeFontColor}`
              }
            >
              Tag:
            </InputLabel>
            <TextField
              id="tag"
              color="primary"
              variant="outlined"
              type="text"
              name="Tag"
              value={tag}
              autoComplete="off"
              onChange={handleTagChange}
              className={
                !isDarkMode
                  ? `${classes.input} ${classes.lightThemeFontColor}`
                  : `${classes.input} ${classes.darkThemeFontColor}`
              }
              style={{ margin: '10px' }}
              InputProps={{
                style: {
                  color: !isDarkMode ? 'white' : 'white'
                }
              }}
            />

            {(!tag.charAt(0).match(/[A-Za-z]/) ||
              !alphanumeric(tag) ||
              tag.trim() === '' ||
              checkNameDupe(tag)) && (
              <span
                className={
                  !isDarkMode
                    ? `${classes.errorMessage} ${classes.errorMessageLight}`
                    : `${classes.errorMessage} ${classes.errorMessageDark}`
                }
              >
                <em>{errorMsg}</em>
              </span>
            )}

            <br></br>
            <InputLabel
              htmlFor="elementName"
              className={
                !isDarkMode
                  ? `${classes.inputLabel} ${classes.lightThemeFontColor}`
                  : `${classes.inputLabel} ${classes.darkThemeFontColor}`
              }
            >
              Element Name:
            </InputLabel>
            <TextField
              id="elementName"
              color="primary"
              variant="outlined"
              type="text"
              name="Tag Name"
              value={name}
              onChange={handleNameChange}
              autoComplete="off"
              className={
                !isDarkMode
                  ? `${classes.input} ${classes.lightThemeFontColor}`
                  : `${classes.input} ${classes.darkThemeFontColor}`
              }
              style={{}}
              InputProps={{
                style: {
                  color: !isDarkMode ? 'white' : 'white'
                }
              }}
            />
            {(!name.charAt(0).match(/[A-Za-z]/) ||
              !alphanumeric(name) ||
              name.trim() === '' ||
              name.length > 10 ||
              checkNameDupe(name)) && (
              <span
                className={
                  !isDarkMode
                    ? `${classes.errorMessage} ${classes.errorMessageLight}`
                    : `${classes.errorMessage} ${classes.errorMessageDark}`
                }
              >
                <em>{errorMsg}</em>
              </span>
            )}
            <br></br>
            <Button
              onClick={handleAlertOpen}
              className={
                !isDarkMode
                  ? `${classes.addElementButton} ${classes.lightThemeFontColor}`
                  : `${classes.addElementButton} ${classes.darkThemeFontColor}`
              }
              id="submitButton"
              type="submit"
              color="primary"
              variant="contained"
              value="Add Element"
            >
              Add Element
            </Button>
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
      <Alert
        onClose={handleAlertClose}
        severity="success"
        sx={{ width: '100%', color: 'white' }}
      >
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
    width: '140px',
    height: '30px'
  },
  inputWrapper: {
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginBottom: '15px',
    width: '100%'
  },
  addComponentWrapper: {
    width: '100%',
    margin: '5px 0px 0px 0px'
  },
  input: {
    borderRadius: '5px',
    whiteSpace: 'nowrap',
    overflowX: 'hidden',
    textOverflow: 'ellipsis',
    backgroundColor: 'rgba(255,255,255,0.15)',
    margin: '0px 0px 0px 0px',
    alignSelf: 'center',
    border: '2px solid grey'
  },
  inputLabel: {
    fontSize: '1em',
    marginLeft: '10px'
  },
  addElementButton: {
    backgroundColor: 'transparent',
    height: '40px',
    width: '200px',
    fontFamily: 'Roboto, Raleway, sans-serif',
    fontSize: '85%',
    textAlign: 'center',
    transition: '0.3s',
    borderRadius: '4px',
    alignSelf: 'center',
    border: '1px solid #186BB4'
  },
  lightThemeFontColor: {
    color: 'white',
    '& .MuiInputBase-root': {
      color: 'rgba (0, 0, 0, 0.54)'
    }
  },
  darkThemeFontColor: {
    color: '#ffffff',
    '& .MuiInputBase-root': {
      color: '#fff'
    }
  },
  errorMessage: {
    display: 'flex',
    alignSelf: 'center',
    fontSize: '11px',
    marginTop: '10px',
    width: '150px'
  },
  errorMessageLight: {
    color: '#6B6B6B'
  },
  errorMessageDark: {
    color: 'white'
  }
});

export default HTMLPanel;
