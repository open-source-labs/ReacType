import React, { useCallback, useMemo } from 'react';
import { Button, TextField } from '@mui/material';
import { Send } from '@mui/icons-material';
import MUITypes from '../../redux/MUITypes';
import { MUIType } from '../../interfaces/Interfaces';
import { emitEvent } from '../../helperFunctions/socket';
import { RootState } from '../../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import makeStyles from '@mui/styles/makeStyles';
import FormSelector from '../../components/form/Selector';
import MUIPropsSlice, {
  initialState
} from '../../redux/reducers/slice/MUIpropsSlice';
import { setSize, setColor } from '../../redux/reducers/slice/MUIpropsSlice';
import FormControl from '@mui/material/FormControl';

const MUIProps = ({ isThemeLight }): JSX.Element => {
  const classes = useStyles(isThemeLight);
  const dispatch = useDispatch();
  const propState = useSelector((store: RootState) => store.MUIpropsSlice);
  const state = useSelector((store: RootState) => store.appState);
  const currFocus = getFocus().child;
  const style = useSelector((store: RootState) => store.styleSlice);

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
        // if type is MUI Component, search through MUI types to find matching component's name
      } else if (focusChild.type === 'MUI Component') {
        focusTarget.child.type = 'MUI Component';
        focusTarget.child.name = state.MUITypes.find(
          (elem) => elem.id === focusChild.typeId
        ).name;
      }
    }
    return focusTarget;
  }

  // let configTarget;

  let configTarget = useMemo(
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

  const arrayOfState = Object.keys(initialState);
  console.log('arrayofstate', arrayOfState);

  const handleMUIChange = (selectedValue: string) => {
    // Dispatch an action to set the size state
    dispatch(setSize(selectedValue));
  };

  // null or undefined when no focus, render this:
  if (!currFocus) {
    return (
      <div className="column right" id="rightContainer" style={style.style}>
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
                Parent MUI Component:
                <br />
                <br />
                <span className={classes.rootCompName}>
                  {configTarget.name}
                </span>
                <p style={{ fontSize: '16px' }}>
                  Drag or click an MUI Component to the canvas to see what
                  happens!
                </p>
              </h4>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const propsIndex = MUITypes.findIndex(
    (item) => item.name === configTarget.child.name
  );
  // focused on customize tab
  return (
    <div>
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
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {MUITypes[propsIndex].propOptions
          .filter((propOption) => arrayOfState.includes(propOption)) // Add this filter method
          .map((propOption) => {
            if (propOption === 'size') {
              return (
                <FormSelector
                  key={propOption}
                  classes={classes}
                  selectValue={setSize}
                  onSelect={handleMUIChange}
                  title="Size:"
                  name="size"
                  items={[
                    { value: '', text: 'default' },
                    { value: 'small', text: 'small' },
                    { value: 'medium', text: 'medium' },
                    { value: 'large', text: 'large' }
                  ]}
                />
              );
            } else if (propOption === 'color') {
              return (
                <FormSelector
                  key={propOption}
                  classes={classes}
                  selectValue={setColor}
                  onSelect={handleMUIChange}
                  title="Color:"
                  name="color"
                  items={[
                    { value: '', text: 'default' },
                    { value: 'primary', text: 'primary' },
                    { value: 'secondary', text: 'secondary' },
                    { value: 'error', text: 'error' },
                    { value: 'info', text: 'info' },
                    { value: 'success', text: 'success' },
                    { value: 'warning', text: 'warning' }
                  ]}
                />
              );
            } else if (propOption === 'disabled') {
              return (
                <FormSelector
                  key={propOption}
                  classes={classes}
                  selectValue={setColor}
                  onSelect={handleMUIChange}
                  title="Disabled:"
                  name="disabled"
                  items={[
                    { value: 'false', text: 'false' },
                    { value: 'true', text: 'true' }
                  ]}
                />
              );
            } else if (propOption === 'disableElevation') {
              return (
                <FormSelector
                  key={propOption}
                  classes={classes}
                  selectValue={setColor}
                  onSelect={handleMUIChange}
                  title="Disabled Elevation:"
                  name="disableElevation"
                  items={[
                    { value: 'false', text: 'false' },
                    { value: 'true', text: 'true' }
                  ]}
                />
              );
            } else if (propOption === 'disableFocusRipple') {
              return (
                <FormSelector
                  key={propOption}
                  classes={classes}
                  selectValue={setColor}
                  onSelect={handleMUIChange}
                  title="Disabled Focus Ripple:"
                  name="disableFocusRipple"
                  items={[
                    { value: 'false', text: 'false' },
                    { value: 'true', text: 'true' }
                  ]}
                />
              );
            } else if (propOption === 'disableRipple') {
              return (
                <FormSelector
                  key={propOption}
                  classes={classes}
                  selectValue={setColor}
                  onSelect={handleMUIChange}
                  title="Disabled Ripple:"
                  name="disableRipple"
                  items={[
                    { value: 'false', text: 'false' },
                    { value: 'true', text: 'true' }
                  ]}
                />
              );
            } else if (propOption === 'fullWidth') {
              return (
                <FormSelector
                  key={propOption}
                  classes={classes}
                  selectValue={setColor}
                  onSelect={handleMUIChange}
                  title="Full Width:"
                  name="fullWidth"
                  items={[
                    { value: 'false', text: 'false' },
                    { value: 'true', text: 'true' }
                  ]}
                />
              );
            } else if (propOption === 'href') {
              return (
                <div className={classes.configRow}>
                <div
                  className={
                    isThemeLight
                      ? `${classes.configType} ${classes.lightThemeFontColor}`
                      : `${classes.configType} ${classes.darkThemeFontColor}`
                  }
                >
                  <h3>href:</h3>
                </div>
                <div className={classes.configValue}>
                  <FormControl className={classes.formControl}>
                    <TextField
                      name="href"
                      className={classes.select}
                      inputProps={{
                        className: isThemeLight
                          ? `${classes.selectInput} ${classes.lightThemeFontColor}`
                          : `${classes.selectInput} ${classes.darkThemeFontColor}`
                      }}
                      // value={BGColor}
                      // onChange={handleChange}
                      placeholder="www.reactype.dev"
                    />
                  </FormControl>
                </div>
              </div>
              );
            } else if (propOption === 'variant') {
              return (
                <FormSelector
                  key={propOption}
                  classes={classes}
                  selectValue={setColor}
                  onSelect={handleMUIChange}
                  title="Variant:"
                  name="variant"
                  items={[
                    { value: 'false', text: 'false' },
                    { value: 'true', text: 'true' }
                  ]}
                />
              );
            } else {
              return (
                <Button
                // key={propOption}
                // onClick={() => console.log('Save button clicked')}
                // variant="contained"
                // endIcon={<Send />}
                // sx={{ marginTop: '1rem' }}
                >
                  {propOption}
                </Button>
              );
            }
          })}
      </div>
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
  selectFieldWidth: {
    width: '200px',
    paddingLeft: '100px', 
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
    marginLeft: '15px',
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

export default MUIProps;

// console.log(configTarget.child.name);
// console.log(configTarget.child);
// console.log('config whatever', )
// console.log('configTarget', configTarget);
// console.log('muiComponent?', configTarget.children[1].typeId); // give the ID of the MUI component
// set a variable to equal the index value of the component in the MUITypes array
// const propsIndex = MUITypes.findIndex(
//   (item) => item.name === configTarget.child.name
// );
// const childInstanceId = useSelector(state => state.canvasFocus.childId);
// console.log(arrayOfState)
// const matchedState = arrayOfState.filter((state) => MUITypes[propsIndex].propOptions.includes(state));

// console.log(arrayOfState);
// const arrayOfState = ['color'];
