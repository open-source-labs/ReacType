import React, { useState, useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import StateContext from '../../context/context';
import HTMLItem from './HTMLItem';
import { makeStyles } from '@material-ui/core/styles';

const HTMLPanel = (): JSX.Element => {
  const classes = useStyles();
  const [tag, setTag] = useState('');
  const [name, setName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [errorStatus, setErrorStatus] = useState(false);
  const [state, dispatch] = useContext(StateContext);

  let startingID = 0;
  state.HTMLTypes.forEach(element => {
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
    checkList.forEach(HTMLTag => {
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
      setErrorMsg('Tag/ Tag name cannot be blank.');
    } else if (type === 'dupe') {
      setErrorMsg('Tag/ Tag name already exists.');
    } else if (type === 'letters') {
      setErrorMsg('Tag/ Tag name must start with a letter.');
    } else if (type === 'symbolsDetected') {
      setErrorMsg('Tag/ Tag name must not contain symbols.');
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
    dispatch({
      type: 'ADD ELEMENT',
      payload: newElement
    });
    setCurrentID(currentID + 1);
    setTag('');
    setName('');
  };

  const alphanumeric = (input: string): boolean => {
    let letterNumber = /^[0-9a-zA-Z]+$/;
    if (input.match(letterNumber)) return true;
    return false;
  };

  const handleSubmit = e => {
    e.preventDefault();
    let letters = /[a-zA-Z]/;
    if (!tag.charAt(0).match(letters) || !name.charAt(0).match(letters)) {
      triggerError('letters');
      return;
    } else if (!alphanumeric(tag) || !alphanumeric(name)) {
      triggerError('symbolsDetected');
      return;
    } else if (tag.trim() === '' || name.trim() === '') {
      triggerError('empty');
      return;
    } else if (checkNameDupe(tag) || checkNameDupe(name)) {
      triggerError('dupe');
      return;
    }
    createOption(tag, name);
    resetError();
  };

  const handleDelete = (id: number): void => {
    dispatch({
      type: 'DELETE ELEMENT',
      payload: id
    });
  };

  return (
    <div className="HTMLItems">
      <div className="HTMLElements">
        {state.HTMLTypes.map(option => (
            <HTMLItem
              name={option.name}
              key={`html-${option.name}`}
              id={option.id}
              Icon={option.icon}
              handleDelete={handleDelete}
            />
          ))}
      </div> 
      <div className="lineDiv">
        <hr
          style={{
            borderColor: '#f5f5f5',
            borderStyle: 'solid',
            color: '#f5f5f5',
            backgroundColor: 'white',
            height: '0.5px',
            width: '100%',
            marginLeft: '0px'
          }}
        />
      </div>
      <div className={classes.addComponentWrapper}>
        <div className={classes.inputWrapper}>
          <form onSubmit={handleSubmit} className="customForm">
            <h5>New Element: </h5>
            <label className={classes.inputLabel}>
              Tag:
              <input
                color={'primary'}
                type="text"
                name="Tag"
                value={tag}
                onChange={handleTagChange}
                className={classes.input}
                style={{ marginBottom: '10px' }}
              />
              {errorStatus && <span>{errorMsg}</span>}
            </label>
            <br></br>
            <label className={classes.inputLabel}>
              Element Name:
              <input
                color={'primary'}
                type="text"
                name="Tag Name"
                value={name}
                onChange={handleNameChange}
                className={classes.input}
              />
              {errorStatus && <span>{errorMsg}</span>}
            </label>
            <input
              className={buttonClasses}
              id="submitButton"
              color="primary"
              type="submit"
              value="Add Element"
              style={{ marginLeft: '-5px', borderRadius: 25, width: '110px', textAlign: 'center', fontSize: '80%' }}
            />
          </form>
        </div>
      </div>
        <div className="lineDiv">
          <hr
            style={{
              borderColor: '#f5f5f5',
              borderStyle: 'solid',
              color: '#f5f5f5',
              backgroundColor: 'white',
              height: '0.5px',
              width: '100%',
              marginLeft: '0px'
            }}
          />
        </div>
    </div>
  );
};

const useStyles = makeStyles({
  inputWrapper: {
    // height: '115px',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    // paddingLeft: '35px',
    marginBottom: '15px',
    width: '100%'
  },
  addComponentWrapper: {
    // border: '1px solid rgba(70,131,83)',
    //----------------------------------CHANGED---------------------------------------
    // border: '1px solid rgba(247, 167, 62, 0.45)',
    // padding: '20px',
    // margin: '20px',
    width: '100%',
    marginBottom: '0px'
  },
  input: {
    color: '#fff',
    borderRadius: '5px',
    // paddingLeft: '15px',
    // paddingRight: '10px',
    whiteSpace: 'nowrap',
    overflowX: 'hidden',
    textOverflow: 'ellipsis',
    // border: '1px solid rgba(51,235,145,0.75)',
    backgroundColor: 'rgba(255,255,255,0.15)',
    marginLeft: '10px',
    width: '100px',
    height: '30px'
  },
  inputLabel: {
    fontSize: '16px',
    zIndex: 20,
    color: '#fff',
    marginTop: '-10px'
  }
});

export default HTMLPanel;
