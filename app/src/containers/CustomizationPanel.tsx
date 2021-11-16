import React, {
  useState,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useCallback
} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import createModal from '../components/right/createModal';
import ComponentPanel from '../components/right/ComponentPanel';
import UndoIcon from '@material-ui/icons/Undo';
import RedoIcon from '@material-ui/icons/Redo';
import TabPanel from '../components/right/TabPanel';
import { styleContext } from './AppContainer';
import ErrorMessages from '../constants/ErrorMessages';
import ProjectManager from '../components/right/ProjectManager';
import StateContext from '../context/context';
import FormSelector from '../components/form/Selector';
import { config } from 'ace-builds';
import UseStateModal from '../components/bottom/UseStateModal';
// Previously named rightContainer, Renamed to Customizationpanel this now hangs on BottomTabs
// need to pass in props to use the useHistory feature of react router
const CustomizationPanel = ({ isThemeLight }): JSX.Element => {
  const classes = useStyles(isThemeLight);
  const [state, dispatch] = useContext(StateContext);
  const [displayMode, setDisplayMode] = useState('');
  const [flexDir, setFlexDir] = useState('');
  const [flexJustify, setFlexJustify] = useState('');
  const [flexAlign, setFlexAlign] = useState('');
  const [BGColor, setBGColor] = useState('');
  const [compText, setCompText] = useState('');
  const [compLink, setCompLink] = useState('');
  const [cssClasses, setCssClasses] = useState('');
  const [compWidth, setCompWidth] = useState('');
  const [compHeight, setCompHeight] = useState('');
  const [deleteLinkedPageError, setDeleteLinkedPageError] = useState(false);
  const [deleteIndexError, setDeleteIndexError] = useState(false);
  const [deleteComponentError, setDeleteComponentError] = useState(false);
  const { style } = useContext(styleContext);
  const [modal, setModal] = useState(null);
  const [useContextObj, setUseContextObj] = useState({});

  const resetFields = () => {
    const childrenArray = state.components[0].children;
    let attributes;
    for (const element of childrenArray) {
      if (configTarget.child && element.childId === configTarget.child.id) {
        attributes = element.attributes;
        setCompText(attributes.text ? attributes.text : '');
        setCompLink(attributes.link ? attributes.link : '');
        setCssClasses(attributes.cssClasses ? attributes.cssClasses : '');
      }
    }
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
    const inputVal = e.target.value;

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
      case 'compText':
        setCompText(inputVal);
        break;
      case 'compLink':
        setCompLink(inputVal);
        break;
      case 'cssClasses':
        setCssClasses(inputVal);
        break;
      default:
        break;
    }
  };

  // returns the current component referenced in canvasFocus
  // along with its child instance, if it exists
  const getFocus = () => {
    // find and store component's name based on canvasFocus.componentId
    // note: deep clone here to make sure we don't end up altering state
    const focusTarget = JSON.parse(
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
      focusChild = {}; // child instance being referenced in canvasFocus
      const searchArray = [...focusTarget.children];
      while (searchArray.length > 0) {
        const currentChild = searchArray.shift();
        // if a match is found, set focusChild to the matched child and break out of the loop
        if (currentChild.childId === childInstanceId) {
          focusChild = currentChild;
          focusTarget.child.style = focusChild.style;
          break;
        }
        if (currentChild.name !== 'input' && currentChild.name !== 'img')
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

  // function to pass into UseStateModal to use state to update attribute
  const updateAttributeWithState = (attributeName, componentProviderId, statePropsId) => {
    // get the stateProps of the componentProvider    
    const currentComponent = state.components[componentProviderId - 1];
    const currentComponentProps = currentComponent.stateProps;
    const newInput = currentComponentProps[statePropsId - 1].value;
    console.log("useContext of current component = ", currentComponent); 


    if (attributeName === 'compText') {
      const newContextObj = useContextObj;
      if (!newContextObj[componentProviderId]) {
        newContextObj[componentProviderId] = {statesFromProvider : new Set()};
      }

      newContextObj[componentProviderId].compText = statePropsId;
      newContextObj[componentProviderId].statesFromProvider.add(statePropsId); 
      setCompText(newInput);
      setUseContextObj(newContextObj);
    }
    if (attributeName === 'compLink') {
      const newContextObj = useContextObj;
      if (!newContextObj[componentProviderId]) {
        newContextObj[componentProviderId] = {statesFromProvider : new Set()};
      }
      newContextObj[componentProviderId].compLink = statePropsId;
      newContextObj[componentProviderId].statesFromProvider.add(statePropsId); 
      
      setCompLink(newInput);
      setUseContextObj(newContextObj);
    }

    
    // TODO: set something to signify that state was used
    // so it can be handled in generateCode

    // update use context object

  }

  useEffect(() => {
    console.log(state.components); 
  }, state);  

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

    const attributesObj: any = {};
    if (compText !== '') attributesObj.compText = compText;
    if (compLink !== '') attributesObj.compLink = compLink;
    if (cssClasses !== '') attributesObj.cssClasses = cssClasses;

    // dispatch to update useContext
    // type: 'UPDATE USE CONTEXT'
    // payload: useContext object

    dispatch({
      type: 'UPDATE USE CONTEXT',
      payload: { useContextObj: useContextObj}
    })

    dispatch({
      type: 'UPDATE CSS',
      payload: { style: styleObj }
    });

    dispatch({
      type: 'UPDATE ATTRIBUTES',
      payload: { attributes: attributesObj }
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

  const keyBindedFunc = useCallback(e => {
    // the || is for either Mac or Windows OS
    // Undo
    (e.key === 'z' && e.metaKey && !e.shiftKey) ||
    (e.key === 'z' && e.ctrlKey && !e.shiftKey)
      ? handleUndo()
      : // Redo
      (e.shiftKey && e.metaKey && e.key === 'z') ||
        (e.shiftKey && e.ctrlKey && e.key === 'z')
      ? handleRedo()
      : // Delete HTML tag off canvas
      e.key === 'Backspace' && e.target.tagName !== "TEXTAREA" && e.target.tagName !== "INPUT"
      ? handleDelete()
      : // Save
      (e.key === 's' && e.ctrlKey && e.shiftKey) ||
        (e.key === 's' && e.metaKey && e.shiftKey)
      ? handleSave()
      : '';
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', keyBindedFunc);
    return () => {
      document.removeEventListener('keydown', keyBindedFunc);
    };
  }, []);

  return (
    <div className="column right" id="rightContainer" style={style}>
      <ProjectManager />
      {/* -----------------------------MOVED PROJECT MANAGER-------------------------------------- */}
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
                <span
                  className={
                    isThemeLight
                      ? `${classes.compName} ${classes.lightThemeFontColor}`
                      : `${classes.compName} ${classes.darkThemeFontColor}`
                  }
                >
                  {configTarget.child.name}
                </span>
              </h4>
            ) : (
              <h4
                className={
                  isThemeLight
                    ? classes.lightThemeFontColor
                    : classes.darkThemeFontColor
                }
              >
                Parent Component:
                <br />
                <br />
                <span className={classes.compName}>{configTarget.name}</span>
              </h4>
            )}
          </div>
          <section className={'customization-section'}>
            <div>
              <FormSelector
                classes={classes}
                isThemeLight={isThemeLight}
                selectValue={flexAlign}
                handleChange={handleChange}
                title="Display:"
                name="display"
                items={[
                  { value: '', text: 'none' },
                  { value: 'block', text: 'block' },
                  { value: 'inline-block', text: 'inline-block' },
                  { value: 'flex', text: 'flex' }
                ]}
              />
              {/* flex options are hidden until display flex is chosen */}
              {displayMode === 'flex' && (
                <div>
                  <FormSelector
                    classes={classes}
                    isThemeLight={isThemeLight}
                    selectValue={flexAlign}
                    handleChange={handleChange}
                    title="Flex direction:"
                    name="flexdir"
                    items={[
                      { value: '', text: 'none' },
                      { value: 'row', text: 'row' },
                      { value: 'column', text: 'column' }
                    ]}
                  />
                  <FormSelector
                    classes={classes}
                    isThemeLight={isThemeLight}
                    selectValue={flexAlign}
                    handleChange={handleChange}
                    title="Justify content:"
                    name="flexjust"
                    items={[
                      { value: '', text: 'none' },
                      { value: 'flex-start', text: 'flex-start' },
                      { value: 'flex-end', text: 'flex-end' },
                      { value: 'center', text: 'center' },
                      { value: 'space-between', text: 'space-between' },
                      { value: 'space-around', text: 'space-around' },
                      { value: 'space-evenly', text: 'space-evenly' }
                    ]}
                  />
                  <FormSelector
                    classes={classes}
                    isThemeLight={isThemeLight}
                    selectValue={flexAlign}
                    handleChange={handleChange}
                    title="Align items:"
                    name="flexalign"
                    items={[
                      { value: '', text: 'none' },
                      { value: 'stretch', text: 'stretch' },
                      { value: 'flex-start', text: 'flex-start' },
                      { value: 'flex-end', text: 'flex-end' },
                      { value: 'center', text: 'center' }
                    ]}
                  />
                </div>
              )}
              <FormSelector
                classes={classes}
                isThemeLight={isThemeLight}
                selectValue={compWidth}
                handleChange={handleChange}
                title="Width:"
                name="width"
                items={[
                  { value: '', text: 'none' },
                  { value: 'auto', text: 'auto' },
                  { value: '50%', text: '50%' },
                  { value: '25%', text: '25%' }
                ]}
              />
              <FormSelector
                classes={classes}
                isThemeLight={isThemeLight}
                selectValue={compWidth}
                handleChange={handleChange}
                title="Height:"
                name="height"
                items={[
                  { value: '', text: 'none' },
                  { value: 'auto', text: 'auto' },
                  { value: '100%', text: '100%' },
                  { value: '50%', text: '50%' }
                ]}
              />
              <div className={classes.configRow}>
                <div
                  className={
                    isThemeLight
                      ? `${classes.configType} ${classes.lightThemeFontColor}`
                      : `${classes.configType} ${classes.darkThemeFontColor}`
                  }
                >
                  <h3>Background color:</h3>
                </div>
                <div className={classes.configValue}>
                  <FormControl variant="filled" className={classes.formControl}>
                    <TextField
                      variant="filled"
                      name="bgcolor"
                      className={classes.select}
                      inputProps={{
                        className: isThemeLight
                          ? `${classes.selectInput} ${classes.lightThemeFontColor}`
                          : `${classes.selectInput} ${classes.darkThemeFontColor}`
                      }}
                      value={BGColor}
                      onChange={handleChange}
                      placeholder="#B6B8B7"
                    />
                  </FormControl>
                </div>
              </div>
            </div>
            <div>
              <div className={classes.configRow}>
                <div
                  className={
                    isThemeLight
                      ? `${classes.configType} ${classes.lightThemeFontColor}`
                      : `${classes.configType} ${classes.darkThemeFontColor}`
                  }
                >
                  <h3>Text:</h3>
                </div>
                <div className={classes.configValue}>
                  <FormControl variant="filled" className={classes.formControl}>
                    <TextField
                      variant="filled"
                      name="compText"
                      className={classes.select}
                      inputProps={{
                        className: isThemeLight
                          ? `${classes.selectInput} ${classes.lightThemeFontColor}`
                          : `${classes.selectInput} ${classes.darkThemeFontColor}`
                      }}
                      value={compText}
                      onChange={handleChange}
                      placeholder="Text"
                    />
                  </FormControl>
                </div>
                <div>
                  <UseStateModal 
                  updateAttributeWithState={updateAttributeWithState} 
                  attributeToChange="compText" 
                  childId={state.canvasFocus.childId}
                  />
                </div>
              </div>
              <div className={classes.configRow}>
                <div
                  className={
                    isThemeLight
                      ? `${classes.configType} ${classes.lightThemeFontColor}`
                      : `${classes.configType} ${classes.darkThemeFontColor}`
                  }
                >
                  <h3>Link:</h3>
                </div>
                <div className={classes.configValue}>
                  <FormControl variant="filled" className={classes.formControl}>
                    <TextField
                      variant="filled"
                      name="compLink"
                      className={classes.select}
                      inputProps={{
                        className: isThemeLight
                          ? `${classes.selectInput} ${classes.lightThemeFontColor}`
                          : `${classes.selectInput} ${classes.darkThemeFontColor}`
                      }}
                      value={compLink}
                      onChange={handleChange}
                      placeholder="Text"
                    />
                  </FormControl>
                </div>
                <div>
                  <UseStateModal 
                  updateAttributeWithState={updateAttributeWithState} attributeToChange="compLink" 
                  childId={state.canvasFocus.childId}/>
                </div>
              </div>
              <div className={classes.configRow}>
                <div
                  className={
                    isThemeLight
                      ? `${classes.configType} ${classes.lightThemeFontColor}`
                      : `${classes.configType} ${classes.darkThemeFontColor}`
                  }
                >
                  <h3>Css Classes:</h3>
                </div>
                <div className={classes.configValue}>
                  <FormControl variant="filled" className={classes.formControl}>
                    <TextField
                      variant="filled"
                      name="cssClasses"
                      className={classes.select}
                      inputProps={{
                        className: isThemeLight
                          ? `${classes.selectInput} ${classes.lightThemeFontColor}`
                          : `${classes.selectInput} ${classes.darkThemeFontColor}`
                      }}
                      value={cssClasses}
                      onChange={handleChange}
                      placeholder="Text"
                    />
                  </FormControl>
                </div>
              </div>
            </div>
            <div>
              <div className={classes.buttonRow}>
                <Button
                  color="primary"
                  className={
                    isThemeLight
                      ? `${classes.button} ${classes.saveButtonLight}`
                      : `${classes.button} ${classes.saveButtonDark}`
                  }
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
              <div className={classes.buttonRow}>
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
          </section>
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
      color: '#155084'
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
    paddingRight: '20px'
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
    color: '#155084'
  },
  darkThemeFontColor: {
    color: '#fff'
  }
});

export default CustomizationPanel;
