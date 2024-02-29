import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  List,
  ListItem,
  ListItemText,
  TextField
} from '@mui/material';
import { Redo, Undo } from '@mui/icons-material';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  changeTailwind,
  deleteChild,
  deleteEventAction,
  deletePage,
  deleteReusableComponent,
  redo,
  undo,
  updateAttributes,
  updateCss,
  updateEvents,
  updateStateUsed,
  updateUseContext
} from '../redux/reducers/slice/appStateSlice';
import { useDispatch, useSelector } from 'react-redux';

import ClearIcon from '@mui/icons-material/Clear';
import { DataGrid } from '@mui/x-data-grid';
import ErrorMessages from '../constants/ErrorMessages';
import FormSelector from '../components/form/Selector';
import ProjectManager from '../components/right/ProjectManager';
import UseStateModal from '../components/bottom/UseStateModal';
import createModal from '../components/right/createModal';
import makeStyles from '@mui/styles/makeStyles';
import { ColumnTab } from '../interfaces/Interfaces';
import { RootState } from '../redux/store';
import { emitEvent } from '../helperFunctions/socket';
import { Number } from 'mongoose';

// Previously named rightContainer, Renamed to Customizationpanel this now hangs on BottomTabs
// need to pass in props to use the useHistory feature of react router
const CustomizationPanel = ({ isThemeLight }): JSX.Element => {
  const classes = useStyles(isThemeLight);
  const dispatch = useDispatch();
  const state = useSelector((store: RootState) => store.appState);
  const contextParam = useSelector((store: RootState) => store.contextSlice);
  const roomCode = useSelector((store: RootState) => store.roomSlice.roomCode);
  const style = useSelector((store: RootState) => store.styleSlice);

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
  const [modal, setModal] = useState(null);
  const [useContextObj, setUseContextObj] = useState({});
  const [stateUsedObj, setStateUsedObj] = useState({});
  const [eventAll, setEventAll] = useState(['', '']);
  const [eventRow, setEventRow] = useState([]);

  const currFocus = getFocus().child;

  useEffect(() => {
    currFocus?.attributes?.compLink &&
      setCompLink(currFocus.attributes.compLink);
    setEventAll(['', '']);
    if (currFocus) {
      const addedEvent: { id: string; funcName: any }[] = [];
      for (const [event, funcName] of Object.entries(currFocus?.events)) {
        addedEvent.push({ id: event, funcName });
      }
      setEventRow(addedEvent);
    }
  }, [state]);

  //this function allows properties to persist and appear in nested divs
  function deepIterate(arr) {
    const output = [];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].typeId === 1000) continue;
      output.push(arr[i]);
      if (arr[i].children.length) {
        output.push(...deepIterate(arr[i].children));
      }
    }
    return output;
  }

  const resetFields = () => {
    const childrenArray = deepIterate(configTarget.children);
    for (const element of childrenArray) {
      if (configTarget.child && element.childId === configTarget.child.id) {
        const attributes = element.attributes;
        const style = element.style;
        setCompText(attributes.compText ? attributes.compText : '');
        setCompLink(attributes.compLink ? attributes.compLink : '');
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
    setEventAll(['', '']);
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
      case 'event':
        setEventAll(
          inputVal ? [inputVal, `handle${inputVal.slice(2)}`] : ['', '']
        );
        break;
      case 'funcName':
        setEventAll([eventAll[0], inputVal]);
        break;
      default:
        break;
    }
  };
  // returns the current component referenced in canvasFocus
  // along with its child instance, if it exists
  function getFocus() {
    // find and store component's name based on canvasFocus.componentId
    // note: deep clone here to make sure we don't end up altering state
    const focusTarget = JSON.parse(
      JSON.stringify(
        state.components.find(
          (comp) => comp.id === state.canvasFocus.componentId
        )
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
          focusTarget.child.events = focusChild.events;
          focusTarget.child.attributes = focusChild.attributes;
          break;
        }
        if (currentChild.name !== 'input' && currentChild.name !== 'img')
          currentChild.children.forEach((child) => searchArray.push(child));
      }

      // if type is Component, use child's typeId to search through state components and find matching component's name
      if (focusChild.type === 'Component') {
        focusTarget.child.type = 'component';
        focusTarget.child.name = state.components.find(
          (comp) => comp.id === focusChild.typeId
        ).name;
        // if type is HTML Element, search through HTML types to find matching element's name
      } else if (focusChild.type === 'HTML Element') {
        focusTarget.child.type = 'HTML element';
        focusTarget.child.name = state.HTMLTypes.find(
          (elem) => elem.id === focusChild.typeId
        ).name;
      }
    }
    return focusTarget;
  }
  // since determining the details of the focused component/child is an expensive operation, only perform this operation if the child/component have changed
  configTarget = useMemo(
    () => getFocus(),
    [state.canvasFocus.childId, state.canvasFocus.componentId]
  );
  const isPage = (configTarget): boolean => {
    const { components, rootComponents } = state;
    return components
      .filter((component) => rootComponents.includes(component.id))
      .some((el) => el.id === configTarget.id);
  };
  const isIndex = (): boolean => configTarget.id === 1;
  const isLinkedTo = (): boolean => {
    const { id } = configTarget;
    const pageName = state.components[id - 1].name;
    let isLinked = false;
    const searchNestedChildren = (comps) => {
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

  const updateAttributeWithState = (
    attributeName: string,
    componentProviderId,
    statePropsId,
    statePropsRow,
    stateKey = ''
  ) => {
    const newInput = statePropsRow.value;
    // get the stateProps of the componentProvider
    const currentComponent =
      state.components[state.canvasFocus.componentId - 1];
    let newContextObj = { ...currentComponent.useContext };
    if (!newContextObj) {
      newContextObj = {};
    }
    if (!newContextObj[componentProviderId]) {
      newContextObj[componentProviderId] = { statesFromProvider: new Set() };
    }
    newContextObj[componentProviderId].statesFromProvider.add(statePropsId);
    if (attributeName === 'compText') {
      newContextObj[componentProviderId].compText = statePropsId;
      setStateUsedObj({
        ...stateUsedObj,
        compText: stateKey,
        compTextProviderId: componentProviderId,
        compTextPropsId: statePropsId
      });
      setCompText(newInput);
      setUseContextObj(newContextObj);
    }

    if (attributeName === 'compLink') {
      newContextObj[componentProviderId].compLink = statePropsId;
      setStateUsedObj({
        ...stateUsedObj,
        compLink: stateKey,
        compLinkProviderId: componentProviderId,
        compLinkPropsId: statePropsId
      });
      setCompLink(newInput);
      setUseContextObj(newContextObj);
    }
  };

  const eventColumnTabs: ColumnTab[] = [
    {
      field: 'id',
      headerName: 'Event',
      width: '40%',
      editable: false,
      flex: 1,
      disableColumnMenu: true
    },
    {
      field: 'funcName',
      headerName: 'Function Name',
      width: '50%',
      editable: false,
      flex: 1,
      disableColumnMenu: true
    },
    {
      field: 'delete',
      headerName: 'Delete',
      width: '10%',
      editable: false,
      flex: 1,
      sortable: false,
      disableColumnMenu: true,
      renderCell: function renderCell(params: any) {
        return (
          <Button
            style={{ width: `${3}px`, color: 'black' }}
            onClick={() => {
              deleteEvent(params.id);
            }}
          >
            <ClearIcon style={{ width: `${15}px` }} />
          </Button>
        );
      }
    }
  ];

  const deleteEvent = (selectedEvent) => {
    dispatch(
      deleteEventAction({ event: selectedEvent, contextParam: contextParam })
    );
  };

  const handleSave = (): Object => {
    dispatch(changeTailwind(false));
    dispatch(
      updateStateUsed({
        stateUsedObj: stateUsedObj,
        contextParam: contextParam
      })
    );

    dispatch(
      updateUseContext({
        useContextObj: useContextObj,
        contextParam: contextParam
      })
    );

    const styleObj: any = {};
    if (displayMode !== '') styleObj.display = displayMode;
    if (flexDir !== '') styleObj.flexDirection = flexDir;
    if (flexJustify !== '') styleObj.justifyContent = flexJustify;
    if (flexAlign !== '') styleObj.alignItems = flexAlign;
    if (compWidth !== '') styleObj.width = compWidth;
    if (compHeight !== '') styleObj.height = compHeight;
    if (BGColor !== '') styleObj.backgroundColor = BGColor;
    dispatch(updateCss({ style: styleObj, contextParam: contextParam }));

    const attributesObj: any = {};
    if (compText !== '') attributesObj.compText = compText;
    if (compLink !== '') attributesObj.compLink = compLink;
    if (cssClasses !== '') attributesObj.cssClasses = cssClasses;
    dispatch(
      updateAttributes({
        attributes: attributesObj,
        contextParam: contextParam
      })
    );

    const eventsObj: any = {};
    if (eventAll[0] !== '') eventsObj[eventAll[0]] = eventAll[1];
    dispatch(updateEvents({ events: eventsObj, contextParam: contextParam }));

    if (roomCode) {
      emitEvent('updateChildAction', roomCode, {
        stateUsedObj: stateUsedObj,
        contextParam: contextParam,
        useContextObj: useContextObj,
        attributes: attributesObj,
        style: styleObj,
        events: eventsObj
      });
      // console.log(
      //   'emit updateChildAction event is triggered in CustomizationPanel.tsx'
      // );
    }

    return styleObj;
  };
  const handleTailwind = (): void => {
    dispatch(changeTailwind(true));
    handleSave();
  };

  // const clickToUpdate = () => {
  //   handleSave();
  //   saveEmitter();
  // }

  // UNDO/REDO functionality--onClick these functions will be invoked.
  const handleUndo = () => {
    dispatch(undo({ contextParam }));
  };
  const handleRedo = () => {
    dispatch(redo({ contextParam }));
  };
  // placeholder for handling deleting instance
  const handleDelete = () => {
    dispatch(deleteChild({ id: {}, contextParam: contextParam }));
    if (roomCode) {
      emitEvent('deleteChildAction', roomCode, {
        id: {},
        contextParam: contextParam
      });
      // console.log(
      //   'emit deleteChildAction event is triggered in CustomizationPanel.tsx'
      // );
    }
  };

  const handlePageDelete = (id) => () => {
    // TODO: return modal
    if (isLinkedTo()) return setDeleteLinkedPageError(true);
    isIndex() ? handleDialogError('index') : dispatch(deletePage({ id }));
  };
  const handleDialogError = (err) => {
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
      dispatch(deleteReusableComponent({ contextParam: contextParam }));
    };
    // set modal options
    const children = (
      <List className="export-preference">
        <ListItem
          key={'delete'}
          button
          onClick={handleDeleteReusableComponent}
          style={{
            border: '1px solid #3c59ba',
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
            border: '1px solid #3c59ba',
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
    // Undo
    (e.key === 'z' && e.metaKey && !e.shiftKey) ||
    (e.key === 'z' && e.ctrlKey && !e.shiftKey)
      ? handleUndo()
      : // Redo
      (e.shiftKey && e.metaKey && e.key === 'z') ||
        (e.shiftKey && e.ctrlKey && e.key === 'z')
      ? handleRedo()
      : // Delete HTML tag off canvas
      e.key === 'Backspace' &&
        e.target.tagName !== 'TEXTAREA' &&
        e.target.tagName !== 'INPUT'
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

  if (state.canvasFocus.childId === null) {
    return (
      <div className="column right" id="rightContainer" style={style.style}>
        <ProjectManager />
        <div className="rightPanelWrapper">
          <div>
            <div className={classes.rootConfigHeader}>
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
                <span className={classes.rootCompName}>
                  {configTarget.name}
                </span>
                <p style={{ fontSize: '16px' }}>
                  Drag or click an html element to the canvas to see what
                  happens!
                </p>
              </h4>
            </div>
          </div>
        </div>
        <ProjectManager />
      </div>
    );
  }
  return (
    <div
      className="column right"
      id="rightContainer"
      style={style.style}
      data-testid="customization"
    >
      <ProjectManager />
      {/* -----------------------------MOVED PROJECT MANAGER-------------------------------------- */}
      <div className="rightPanelWrapper">
        <div style={{ height: '300px' }}>
          <div className={classes.configHeader}>
            <h4
              className={
                isThemeLight
                  ? classes.lightThemeFontColor
                  : classes.darkThemeFontColor
              }
            >
              Instance of
              {configTarget.child.type === 'component'
                ? ' component:'
                : ' element:'}{' '}
              {configTarget.child.name}
            </h4>
          </div>
          <section className={'customization-section'}>
            <div style={{ marginRight: '150px' }}>
              <FormSelector
                classes={classes}
                isThemeLight={isThemeLight}
                selectValue={displayMode}
                handleChange={handleChange}
                title="Display:"
                name="display"
                items={[
                  { value: '', text: 'default' },
                  { value: 'none', text: 'none' },
                  { value: 'block', text: 'block' },
                  { value: 'inline-block', text: 'inline-block' },
                  { value: 'flex', text: 'flex' }
                ]}
              />
              {displayMode === 'flex' && (
                <div>
                  <FormSelector
                    classes={classes}
                    isThemeLight={isThemeLight}
                    selectValue={flexDir}
                    handleChange={handleChange}
                    title="Flex direction:"
                    name="flexdir"
                    items={[
                      { value: '', text: 'default' },
                      { value: 'row', text: 'row' },
                      { value: 'column', text: 'column' }
                    ]}
                  />
                  <FormSelector
                    classes={classes}
                    isThemeLight={isThemeLight}
                    selectValue={flexJustify}
                    handleChange={handleChange}
                    title="Justify content:"
                    name="flexjust"
                    items={[
                      { value: '', text: 'default' },
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
                      { value: '', text: 'default' },
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
                  { value: '', text: 'default' },
                  { value: 'auto', text: 'auto' },
                  { value: '100%', text: '100%' },
                  { value: '50%', text: '50%' },
                  { value: '25%', text: '25%' }
                ]}
              />
              <FormSelector
                classes={classes}
                isThemeLight={isThemeLight}
                selectValue={compHeight}
                handleChange={handleChange}
                title="Height:"
                name="height"
                items={[
                  { value: '', text: 'default' },
                  { value: 'auto', text: 'auto' },
                  { value: '100%', text: '100%' },
                  { value: '50%', text: '50%' },
                  { value: '25%', text: '25%' }
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
                  <h3>Background Color:</h3>
                </div>
                <div className={classes.configValue}>
                  <FormControl className={classes.formControl}>
                    <TextField
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
                  <FormControl className={classes.formControl}>
                    <TextField
                      name="compText"
                      className={classes.select}
                      inputProps={{
                        className: isThemeLight
                          ? `${classes.selectInput} ${classes.lightThemeFontColor}`
                          : `${classes.selectInput} ${classes.darkThemeFontColor}`
                      }}
                      value={compText}
                      onChange={handleChange}
                      placeholder="text"
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
                  <FormControl className={classes.formControl}>
                    <TextField
                      name="compLink"
                      className={classes.select}
                      inputProps={{
                        className: isThemeLight
                          ? `${classes.selectInput} ${classes.lightThemeFontColor}`
                          : `${classes.selectInput} ${classes.darkThemeFontColor}`
                      }}
                      value={compLink}
                      onChange={handleChange}
                      placeholder="example.com"
                    />
                  </FormControl>
                </div>
                <div>
                  <UseStateModal
                    updateAttributeWithState={updateAttributeWithState}
                    attributeToChange="compLink"
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
                  <h3>CSS Classes:</h3>
                </div>
                <div className={classes.configValue}>
                  <FormControl className={classes.formControl}>
                    <TextField
                      name="cssClasses"
                      className={classes.select}
                      inputProps={{
                        className: isThemeLight
                          ? `${classes.selectInput} ${classes.lightThemeFontColor}`
                          : `${classes.selectInput} ${classes.darkThemeFontColor}`
                      }}
                      value={cssClasses}
                      onChange={handleChange}
                      placeholder="class"
                    />
                  </FormControl>
                </div>
              </div>
              <div>
                <FormSelector
                  classes={classes}
                  isThemeLight={isThemeLight}
                  selectValue={eventAll[0]}
                  handleChange={handleChange}
                  title="Event:"
                  name="event"
                  items={[
                    { value: '', text: 'default' },
                    { value: 'onClick', text: 'onClick' },
                    { value: 'onChange', text: 'onChange' },
                    { value: 'onMouseOver', text: 'onMouseOver' },
                    { value: 'onKeyDown', text: 'onKeyDown' }
                  ]}
                />
              </div>
              {eventAll[0] && (
                <div className={classes.configRow}>
                  <div
                    className={
                      isThemeLight
                        ? `${classes.configType} ${classes.lightThemeFontColor}`
                        : `${classes.configType} ${classes.darkThemeFontColor}`
                    }
                  >
                    <h3>Function Name:</h3>
                  </div>
                  <FormControl>
                    <TextField
                      name="funcName"
                      inputProps={{
                        className: isThemeLight
                          ? `${classes.selectInput} ${classes.lightThemeFontColor}`
                          : `${classes.selectInput} ${classes.darkThemeFontColor}`
                      }}
                      value={eventAll[1]}
                      onChange={handleChange}
                      placeholder="Function Name"
                    />
                  </FormControl>
                </div>
              )}
              {currFocus && Object.keys(currFocus.events).length !== 0 && (
                <div className={'event-table'}>
                  <DataGrid
                    rows={eventRow}
                    columns={eventColumnTabs}
                    pageSize={5}
                  />
                </div>
              )}
            </div>
          </section>
          <div className={classes.buttonRow}>
            <div>
              <Button
                variant="contained"
                color="primary"
                className={
                  isThemeLight
                    ? `${classes.button} ${classes.saveButtonLight}`
                    : `${classes.button} ${classes.saveButtonDark}`
                }
                onClick={handleSave}
                id="saveButton"
                sx={{ textTransform: 'capitalize' }}
              >
                Save
              </Button>
            </div>
            {/* <div className={classes.buttonRow}>
                <Button
                  variant="contained"
                  color="primary"
                  className={
                    isThemeLight
                      ? `${classes.button} ${classes.saveButtonLight}`
                      : `${classes.button} ${classes.saveButtonDark}`
                  }
                  onClick={handleSave}
                  id="saveButton"
                >
                  CSS
                </Button>
              </div>

              <div>
                <Button
                  variant="contained"
                  color="primary"
                  className={
                    isThemeLight
                      ? `${classes.button} ${classes.saveButtonLight}`
                      : `${classes.button} ${classes.saveButtonDark}`
                  }
                  onClick={handleTailwind}
                  id="tailwind"
                  style={{
                    marginTop: '20px',
                    position: 'relative',
                    left: '32px'
                  }}
                >
                  Tailwind
                </Button>
              </div> */}
            {configTarget.child ? (
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  className={
                    isThemeLight
                      ? `${classes.button} ${classes.saveButtonLight}`
                      : `${classes.button} ${classes.saveButtonDark}`
                  }
                  onClick={handleDelete}
                  sx={{ textTransform: 'capitalize' }}
                >
                  Delete Instance
                </Button>
              </div>
            ) : isPage(configTarget) ? (
              <div>
                <Button
                  variant="outlined"
                  color="secondary"
                  className={classes.button}
                  onClick={handlePageDelete(configTarget.id)}
                  sx={{ textTransform: 'capitalize' }}
                >
                  Delete Page
                </Button>
              </div>
            ) : (
              <div>
                <Button
                  variant="outlined"
                  color="secondary"
                  className={classes.button}
                  onClick={clearComps}
                  id="deleteComp"
                  sx={{ textTransform: 'capitalize' }}
                >
                  Delete Reuseable Component
                </Button>
              </div>
            )}
            <div style={{marginLeft: '17px'}}>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={handleUndo}
              >
                <Undo />
              </Button>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={handleRedo}
              >
                <Redo />
              </Button>
            </div>
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
    borderRadius: '10px',
    '> .MuiSelect-icon': {
      color: '#C6C6C6'
    }
  },
  selectInput: {
    paddingTop: '15px',
    paddingLeft: '15px'
  },
  formControl: {
    minWidth: '125px'
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
  buttonRow: (isThemeLight) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    '& > .MuiButton-textSecondary': {
      color: isThemeLight ? '#808080' : '#ECECEA', // color for delete page
      border: isThemeLight ? '1px solid #808080' : '1px solid #ECECEA'
    }
  }),
  button: {
    fontSize: '1rem',
    padding: '9px 35px',
    margin: '10px 15px 0 0',
    borderRadius: '8px'
  },
  saveButtonLight: {
    border: '1px solid #0671e3',
    backgroundColor: 'rgba(0, 0, 0, 0.2)'
  },
  saveButtonDark: {
    border: '1px solid #3c59ba'
  },
  compName: {
    fontSize: '1rem'
  },
  rootCompName: {
    fontSize: '1.75rem'
  },
  // 'Parent Component' font size
  configHeader: {
    '& > h4': {
      fontSize: '1rem',
      letterSpacing: '0.5px',
      marginBottom: '10px',
      marginTop: '10px'
    }
  },
  rootConfigHeader: {
    height: '70px',
    '& > h4': {
      fontSize: '1.75rem',
      letterSpacing: '0.5px',
      marginBottom: '0',
      marginTop: '30px'
    }
  },
  lightThemeFontColor: {
    color: 'white'
  },
  darkThemeFontColor: {
    color: '#fff'
  }
});

export default CustomizationPanel;
