import React, {
  useState,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import StateContext from '../context/context';
import ProjectManager from '../components/right/ProjectManager';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ErrorMessages from '../constants/ErrorMessages';
import { styleContext } from './AppContainer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import createModal from '../components/right/createModal';
import ComponentPanel from '../components/right/ComponentPanel';

// need to pass in props to use the useHistory feature of react router
const RightContainer = ({isThemeLight}): JSX.Element => {
  const classes = useStyles(isThemeLight);
  const [state, dispatch] = useContext(StateContext);
  const [displayMode, setDisplayMode] = useState('');
  const [flexDir, setFlexDir] = useState('');
  const [flexJustify, setFlexJustify] = useState('');
  const [flexAlign, setFlexAlign] = useState('');
  const [BGColor, setBGColor] = useState('');
  const [compWidth, setCompWidth] = useState('');
  const [compHeight, setCompHeight] = useState('');
  const [deleteLinkedPageError, setDeleteLinkedPageError] = useState(false);
  const [deleteIndexError, setDeleteIndexError] = useState(false);
  const [deleteComponentError, setDeleteComponentError] = useState(false);
  const { style } = useContext(styleContext);
  const [modal, setModal] = useState(null);

  const resetFields = () => {
    const style = configTarget.child
      ? configTarget.child.style
      : configTarget.style;
    setDisplayMode(style.display ? style.display : '');
    setFlexDir(style.flexDirection ? style.flexDirection : '');
    setFlexJustify(style.justifyContent ? style.justifyContent : '');
    setFlexAlign(style.alignItems ? style.alignItems : '');
    setCompWidth(style.width ? style.width : '');
    setCompHeight(style.height ? style.height : '');
    setBGColor(style.backgroundColor ? style.backgroundColor : '');
  };
  let configTarget;

  // after component renders, reset the input fields with the current styles of the selected child
  useEffect(() => {
    resetFields();
  }, [state.canvasFocus.componentId, state.canvasFocus.childId]);

  // handles all input field changes, with specific updates called based on input's name
  const handleChange = (e: React.ChangeEvent<{ value: any }>) => {
    let inputVal = e.target.value;

    switch (e.target.name) {
      case 'display':
        setDisplayMode(inputVal);
        break;
      case 'flexdir':
        setFlexDir(inputVal);
        break;
      case 'flexjust':
        setFlexJustify(inputVal);
        break;
      case 'flexalign':
        setFlexAlign(inputVal);
        break;
      case 'width':
        setCompWidth(inputVal);
        break;
      case 'height':
        setCompHeight(inputVal);
        break;
      case 'bgcolor':
        setBGColor(inputVal);
        break;
    }
  };

  // returns the current component referenced in canvasFocus
  // along with its child instance, if it exists
  const getFocus = () => {
    // find and store component's name based on canvasFocus.componentId
    // note: deep clone here to make sure we don't end up altering state
    let focusTarget = JSON.parse(
      JSON.stringify(
        state.components.find(comp => comp.id === state.canvasFocus.componentId)
      )
    );
    delete focusTarget.child;

    // checks if canvasFocus references a childId
    const childInstanceId = state.canvasFocus.childId;
    let focusChild;

    // if so, breadth-first search through focusTarget's descendants to find matching child
    if (childInstanceId) {
      focusTarget.child = {};
      focusTarget.child.id = childInstanceId;
      focusChild = {}; //child instance being referenced in canvasFocus
      const searchArray = [...focusTarget.children];
      while (searchArray.length > 0) {
        const currentChild = searchArray.shift();
        // if a match is found, set focusChild to the matched child and break out of the loop
        if (currentChild.childId === childInstanceId) {
          focusChild = currentChild;
          focusTarget.child.style = focusChild.style;
          break;
        }
        currentChild.children.forEach(child => searchArray.push(child));
      }

      // if type is Component, use child's typeId to search through state components and find matching component's name
      if (focusChild.type === 'Component') {
        focusTarget.child.type = 'component';
        focusTarget.child.name = state.components.find(
          comp => comp.id === focusChild.typeId
        ).name;
        // if type is HTML Element, search through HTML types to find matching element's name
      } else if (focusChild.type === 'HTML Element') {
        focusTarget.child.type = 'HTML element';
        focusTarget.child.name = state.HTMLTypes.find(
          elem => elem.id === focusChild.typeId
        ).name;
      }
    }

    return focusTarget;
  };

  // since determining the details of the focused component/child is an expensive operation, only perform this operation if the child/component have changed
  configTarget = useMemo(() => getFocus(), [
    state.canvasFocus.childId,
    state.canvasFocus.componentId
  ]);

  const isPage = (configTarget): boolean => {
    const { components, rootComponents } = state;
    return components
      .filter(component => rootComponents.includes(component.id))
      .some(el => el.id === configTarget.id);
  };

  const isIndex = (): boolean => configTarget.id === 1;

  const isLinkedTo = (): boolean => {
    const { id } = configTarget;
    const pageName = state.components[id - 1].name;
    let isLinked = false;
    const searchNestedChildren = comps => {
      if (comps.length === 0) return;
      comps.forEach((comp, i) => {
        if (comp.type === 'Route Link' && comp.name === pageName) {
          isLinked = true;
        }
        if (comp.children.length > 0) searchNestedChildren(comp.children);
      });
    };
    searchNestedChildren(state.components);
    return isLinked;
  };

  // dispatch to 'UPDATE CSS' called when save button is clicked,
  // passing in style object constructed from all changed input values
  const handleSave = (): Object => {
    const styleObj: any = {};
    if (displayMode !== '') styleObj.display = displayMode;
    if (flexDir !== '') styleObj.flexDirection = flexDir;
    if (flexJustify !== '') styleObj.justifyContent = flexJustify;
    if (flexAlign !== '') styleObj.alignItems = flexAlign;
    if (compWidth !== '') styleObj.width = compWidth;
    if (compHeight !== '') styleObj.height = compHeight;
    if (BGColor !== '') styleObj.backgroundColor = BGColor;
    
    dispatch({
      type: 'UPDATE CSS',
      payload: { style: styleObj }
    });
   
    return styleObj;
  };

// UNDO/REDO functionality--onClick these functions will be invoked.
  const handleUndo = () => {
    dispatch({ type: 'UNDO', payload: {} });
  };

  const handleRedo = () => {
    dispatch({ type: 'REDO', payload: {} });
  };

  // placeholder for handling deleting instance
  const handleDelete = () => {
    dispatch({ type: 'DELETE CHILD', payload: {} });
  };

  const handlePageDelete = id => () => {
    // TODO: return modal
    if (isLinkedTo()) return setDeleteLinkedPageError(true);
    isIndex()
      ? handleDialogError('index')
      : dispatch({ type: 'DELETE PAGE', payload: { id } });
  };

  const handleDialogError = err => {
    if (err === 'index') setDeleteIndexError(true);
    else setDeleteComponentError(true);
  };

  const handleCloseDialogError = () => {
    setDeleteIndexError(false);
    setDeleteComponentError(false);
    setDeleteLinkedPageError(false);
  };

  // closes out the open modal
  const closeModal = (): void => setModal('');

  // creates modal that asks if user wants to clear all components
  // if user clears their components, then their components are removed from state and the modal is closed
  const clearComps = (): void => {
    // Reset state for project to initial state
    const handleDeleteReusableComponent = (): void => {
      closeModal();
      dispatch({ type: 'DELETE REUSABLE COMPONENT', payload: {} });
    };

    // set modal options
    const children = (
      <List className="export-preference">
        <ListItem
          key={'delete'}
          button
          onClick={handleDeleteReusableComponent}
          style={{
            border: '1px solid #3f51b5',
            marginBottom: '2%',
            marginTop: '5%'
          }}
        >
        <ListItemText primary={'Yes'} style={{ textAlign: 'center' }} />
        </ListItem>

        <ListItem
          key={'not delete'}
          button
          onClick={closeModal}
          style={{
            border: '1px solid #3f51b5',
            marginBottom: '2%',
            marginTop: '5%'
          }}
        >
          <ListItemText primary={'No'} style={{ textAlign: 'center' }} />
        </ListItem>
      </List>
    );

    // create modal
    setModal(
      createModal({
        closeModal,
        children,
        message:
          'Deleting this component will delete all instances of this component within the application. Do you still wish to proceed?',
        primBtnLabel: null,
        primBtnAction: null,
        secBtnAction: null,
        secBtnLabel: null,
        open: true
      })
    );
  };

  const keyBindedFunc = useCallback((e) => {
    // the || is for either Mac or Windows OS
      //Undo
    (e.key === 'z' && e.metaKey && !e.shiftKey || e.key === 'z' && e.ctrlKey && !e.shiftKey) ? handleUndo() :
      //Redo
    (e.shiftKey && e.metaKey && e.key === 'z' || e.shiftKey && e.ctrlKey && e.key === 'z') ? handleRedo() : 
      //Delete HTML tag off canvas 
    (e.key === 'Backspace') ? handleDelete() :
      //Save
    (e.key === 's' && e.ctrlKey && e.shiftKey || e.key === 's' && e.metaKey && e.shiftKey) ? handleSave() : '';
  }, []);
  
  useEffect(() => {
    document.addEventListener('keydown', keyBindedFunc);
    return () => {
      document.removeEventListener('keydown', keyBindedFunc)
    }
  }, []);


  return (
    <div className="column right" id="rightContainer" style={style}>
      <ComponentPanel isThemeLight={isThemeLight}/>
      <ProjectManager />
  {/* -----------------------------MOVED PROJECT MANAGER------------------------------------     */}
      <div className="rightPanelWrapper">
        <div>
          <div className={classes.configHeader}>
            {configTarget.child ? (
              <h4>
                Instance of
                {configTarget.child.type === 'component'
                  ? ' component'
                  : ' element'}{' '}
                <br />
                <br />
                <span className={isThemeLight ? `${classes.compName} ${classes.lightThemeFontColor}` : `${classes.compName} ${classes.darkThemeFontColor}`}>
                  {configTarget.child.name}
                </span>
              </h4>
            ) : (
              <h4 className={ isThemeLight ? classes.lightThemeFontColor : classes.darkThemeFontColor} >
                Parent Component:
                <br />
                <br />
                <span className={classes.compName}>{configTarget.name}</span>
              </h4>
            )}
          </div>
          <div className={classes.configRow}>
            <div className={isThemeLight ? `${classes.configType} ${classes.lightThemeFontColor}` : `${classes.configType} ${classes.darkThemeFontColor}`}>
              <h3>Display:</h3>
            </div>
            <div className={classes.configValue}>
              <FormControl variant="filled" className={classes.formControl}>
                <Select
                  value={displayMode}
                  name="display"
                  onChange={handleChange}
                  displayEmpty
                  className={classes.select}
                  inputProps={{ className: isThemeLight ? `${classes.selectInput} ${classes.lightThemeFontColor}` : `${classes.selectInput} ${classes.darkThemeFontColor}` }}
                >
                  <MenuItem value="">none</MenuItem>
                  <MenuItem value={'block'}>block</MenuItem>
                  <MenuItem value={'inline-block'}>inline-block</MenuItem>
                  <MenuItem value={'flex'}>flex</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          {/* flex options are hidden until display flex is chosen */}
          {displayMode === 'flex' && (
            <div>
              <div className={classes.configRow}>
                <div className={classes.configType}>
                  <h3>Flex direction:</h3>
                </div>
                <div className={classes.configValue}>
                  <FormControl variant="filled" className={classes.formControl}>
                    <Select
                      value={flexDir}
                      name="flexdir"
                      onChange={handleChange}
                      displayEmpty
                      className={classes.select}
                      inputProps={{ className: isThemeLight ? `${classes.selectInput} ${classes.lightThemeFontColor}` : `${classes.selectInput} ${classes.darkThemeFontColor}` }}
                    >
                      <MenuItem value="">none</MenuItem>
                      <MenuItem value={'row'}>row</MenuItem>
                      <MenuItem value={'column'}>column</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
              <div className={classes.configRow}>
                <div className={classes.configType}>
                  <h3>Justify content:</h3>
                </div>
                <div className={classes.configValue}>
                  <FormControl variant="filled" className={classes.formControl}>
                    <Select
                      value={flexJustify}
                      name="flexjust"
                      onChange={handleChange}
                      displayEmpty
                      className={classes.select}
                      inputProps={{ className: isThemeLight ? `${classes.selectInput} ${classes.lightThemeFontColor}` : `${classes.selectInput} ${classes.darkThemeFontColor}` }}
                    >
                      <MenuItem value="">none</MenuItem>
                      <MenuItem value={'flex-start'}>flex-start</MenuItem>
                      <MenuItem value={'flex-end'}>flex-end</MenuItem>
                      <MenuItem value={'center'}>center</MenuItem>
                      <MenuItem value={'space-between'}>space-between</MenuItem>
                      <MenuItem value={'space-around'}>space-around</MenuItem>
                      <MenuItem value={'space-evenly'}>space-evenly</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
              <div className={classes.configRow}>
                <div className={classes.configType}>
                  <h3>Align items:</h3>
                </div>
                <div className={classes.configValue}>
                  <FormControl variant="filled" className={classes.formControl}>
                    <Select
                      value={flexAlign}
                      onChange={handleChange}
                      name="flexalign"
                      displayEmpty
                      className={classes.select}
                      inputProps={{ className: isThemeLight ? `${classes.selectInput} ${classes.lightThemeFontColor}` : `${classes.selectInput} ${classes.darkThemeFontColor}` }}
                    >
                      <MenuItem value="">none</MenuItem>
                      <MenuItem value={'stretch'}>stretch</MenuItem>
                      <MenuItem value={'flex-start'}>flex-start</MenuItem>
                      <MenuItem value={'flex-end'}>flex-end</MenuItem>
                      <MenuItem value={'center'}>center</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
            </div>
          )}
          <div className={classes.configRow}>
            <div className={isThemeLight ? `${classes.configType} ${classes.lightThemeFontColor}` : `${classes.configType} ${classes.darkThemeFontColor}`}>
              <h3>Width:</h3>
            </div>
            <div className={classes.configValue}>
              <FormControl variant="filled" className={classes.formControl}>
                <Select
                  value={compWidth}
                  name="width"
                  onChange={handleChange}
                  displayEmpty
                  className={classes.select}
                  inputProps={{ className: isThemeLight ? `${classes.selectInput} ${classes.lightThemeFontColor}` : `${classes.selectInput} ${classes.darkThemeFontColor}`  }}
                >
                  <MenuItem value="">none</MenuItem>
                  <MenuItem value={'auto'}>auto</MenuItem>
                  <MenuItem value={'50%'}>50%</MenuItem>
                  <MenuItem value={'25%'}>25%</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <div className={classes.configRow}>
            <div className={isThemeLight ? `${classes.configType} ${classes.lightThemeFontColor}` : `${classes.configType} ${classes.darkThemeFontColor}`}>
              <h3>Height:</h3>
            </div>
            <div className={classes.configValue}>
              <FormControl variant="filled" className={classes.formControl}>
                <Select
                  value={compHeight}
                  name="height"
                  onChange={handleChange}
                  displayEmpty
                  className={classes.select}
                  inputProps={{ className: isThemeLight ? `${classes.selectInput} ${classes.lightThemeFontColor}` : `${classes.selectInput} ${classes.darkThemeFontColor}`  }}
                >
                  <MenuItem value="">none</MenuItem>
                  <MenuItem value={'auto'}>auto</MenuItem>
                  <MenuItem value={'100%'}>100%</MenuItem>
                  <MenuItem value={'50%'}>50%</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <div className={classes.configRow}>
            <div className={isThemeLight ? `${classes.configType} ${classes.lightThemeFontColor}` : `${classes.configType} ${classes.darkThemeFontColor}`}>
              <h3>Background color:</h3>
            </div>
            <div className={classes.configValue}>
              <FormControl variant="filled" className={classes.formControl}>
                <TextField
                  variant="filled"
                  name="bgcolor"
                  className={classes.select}
                  inputProps={{ className: isThemeLight ? `${classes.selectInput} ${classes.lightThemeFontColor}` : `${classes.selectInput} ${classes.darkThemeFontColor}`  }}
                  value={BGColor}
                  onChange={handleChange}
                  placeholder="#B6B8B7"
                />
              </FormControl>
            </div>
          </div>
          <div className={classes.buttonRow}>
            <Button
              color="primary"
              className={isThemeLight ? `${classes.button} ${classes.saveButtonLight}` : `${classes.button} ${classes.saveButtonDark}`}
              onClick={handleSave}
              id="saveButton"
            >
              SAVE
            </Button>
          </div>
          {configTarget.child ? (
            <div className={classes.buttonRow}>
              <Button
                color="primary"
                className={classes.button}
                onClick={handleDelete}
              >
                DELETE INSTANCE
              </Button>
            </div>
          ) : isPage(configTarget) ? (
            <div className={classes.buttonRow}>
              <Button
                color="secondary"
                className={classes.button}
                onClick={handlePageDelete(configTarget.id)}
              >
                DELETE PAGE
              </Button>
            </div>
          ) : (
            <div className={classes.buttonRow}>
              <Button
                color="secondary"
                className={classes.button}
                onClick={clearComps}
                id="deleteComp"
              >
                DELETE REUSABLE COMPONENT
              </Button>
            </div>
          )}
          <div className = {classes.buttonRow}>
            <Button
            color="primary"
            className={classes.button}
            onClick={handleUndo}
            >
              <i className="fas fa-undo"></i>
            </Button>
            <Button
            color="primary"
            className={classes.button}
            onClick={handleRedo}
            >
              <i className="fas fa-redo"></i>
            </Button>
        </div>
        </div>
       
      </div>
      <Dialog
        open={deleteIndexError || deleteLinkedPageError || deleteComponentError}
        onClose={handleCloseDialogError}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {deleteIndexError ? ErrorMessages.deleteIndexTitle : ''}
          {deleteComponentError ? ErrorMessages.deleteComponentTitle : ''}
          {deleteLinkedPageError ? ErrorMessages.deleteLinkedPageTitle : ''}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {deleteIndexError ? ErrorMessages.deleteIndexMessage : ''}
            {deleteComponentError ? ErrorMessages.deleteComponentMessage : ''}
            {deleteLinkedPageError ? ErrorMessages.deleteLinkedPageMessage : ''}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialogError} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
      {modal}
    </div>
  );
};

const useStyles = makeStyles({
  select: {
    fontSize: '1em',
    '> .MuiSelect-icon': {
      color: '#186BB4'
    }
  },
  selectInput: {
    paddingTop: '15px',
    paddingLeft: '15px'
  },
  formControl: {
    minWidth: '125px',
    backgroundColor: 'rgba(255,255,255,0.15)'
  },
  configRow: {
    display: 'flex',
    paddingLeft: '25px',
    paddingRight: '25px',
    marginTop: '20px'
  },
  configType: {
    minWidth: '185px',
    fontSize: '85%'
  },
  configValue: {
    marginLeft: '20px'
  },
  buttonRow: isThemeLight => ({
    textAlign: 'center',
    marginTop: '25px',
    '& > .MuiButton-textSecondary': {
      color: isThemeLight ? '#808080' : '#ECECEA', // color for delete page
      border: isThemeLight ? '1px solid #808080' : '1px solid #ECECEA'
    }
  }),
  button: {
    fontSize: '1rem',
    paddingLeft: '20px',
    paddingRight: '20px',
  },
  saveButtonLight: {
    border: '1px solid #186BB4'
  },
  saveButtonDark: {
    border: '1px solid #3F51B5'
  },
  compName: {
    fontSize: '1rem'
  },
  // 'Parent Component' font size
  configHeader: {
    height: '70px',
    '& > h4': {
      fontSize: '1rem',
      letterSpacing: '0.5px',
      marginBottom: '0',
      marginTop: '10px'
    }
  },
   lightThemeFontColor: {
    color: '#186BB4'
  },
  darkThemeFontColor: {
    color: '#fff'
  }
});

export default RightContainer;
