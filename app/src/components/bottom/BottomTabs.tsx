import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import StateContext from '../../context/context';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import CodePreview from './CodePreview';
import StylesEditor from './StylesEditor';
import CustomizationPanel from '../../containers/CustomizationPanel'
import CreationPanel from './CreationPanel'
import Box from '@material-ui/core/Box';
import Tree from '../../tree/TreeChart';
import { emitKeypressEvents } from 'readline';
import NativeSelect from '@material-ui/core/NativeSelect';
import FormControl from '@material-ui/core/FormControl';
import { styleContext } from '../../containers/AppContainer';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Arrow from '../main/Arrow';

const BottomTabs = (props): JSX.Element => {
  // state that controls which tab the user is on
  const [state, dispatch] = useContext(StateContext);
  const [tab, setTab] = useState(0);
  const classes = useStyles();
  treeWrapper: HTMLDivElement;
  const [theme, setTheme] = useState('solarized_light');
  const { style } = useContext(styleContext);

  // breaks if handleChange is commented out
  const handleChange = (event: React.ChangeEvent, value: number) => {
    setTab(value);
  };
  // Allows users to toggle project between "next.js" and "Classic React"
  // When a user changes the project type, the code of all components is rerendered
  const handleProjectChange = event => {
    const projectType = event.target.value;
    dispatch({ type: 'CHANGE PROJECT TYPE', payload: { projectType } });
  };
  const { components, HTMLTypes } = state;

  const changeTheme = e => {
    setTheme(e.target.value);
  };

  // Render's the highliting arrow feature that draws an arrow from the Canvas to the DemoRender
  Arrow.renderArrow(state.canvasFocus.childId);

  return (
    <div className={`${classes.root} ${classes.rootLight}`} style={style}>
      <Box display="flex" justifyContent="space-between" alignItems="center" paddingBottom="10px" paddingRight="10px">
        <Tabs
          value={tab}
          onChange={handleChange}
          classes={{
            root: classes.tabsRoot,
            indicator: classes.tabsIndicator
          }}
        >
          <Tab
            disableRipple
            classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            label="Creation Panel"
          />
          <Tab
            disableRipple
            classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            label="Customization"
          />
          <Tab
            disableRipple
            classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            label="CSS Editor"
          />
          <Tab
            disableRipple
            classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            label="Code Preview"
          />
          <Tab
            disableRipple
            classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            label="Component Tree"
          />
        </Tabs>
        <div className={classes.projectTypeWrapper}> 
         <FormControl size='small'>
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
      </Box>
      {tab === 0 && <CreationPanel isThemeLight={props.isThemeLight} />}
      {tab === 1 && <CustomizationPanel isThemeLight={props.isThemeLight} />}
      {tab === 2 && <StylesEditor theme={theme} setTheme={setTheme} />}
      {tab === 3 && <CodePreview theme={theme} setTheme={setTheme} />}
      {tab === 4 && <Tree data={components} />}
    </div>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    height: '100%',
    color: '#E8E8E8',
    boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
    
  },
  rootLight: isThemeLight => ({
    backgroundColor: isThemeLight ? 'blue': 'red'
  }),
  bottomHeader: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    Width: '200px'
  },
  tabsRoot: {
    minHeight: '50%'
  },
  tabsIndicator: {
    backgroundColor: 'white',
  },
  tabRoot: {
    textTransform: 'initial',
    minWidth: 40,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(4), // JZ: updated syntax as per deprecation warning

    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(','),
    '&:hover': {
      color: 'white',
      opacity: 1
    },
    '&$tabSelected': {
      color: 'white',
      fontWeight: theme.typography.fontWeightMedium
    },
    '&:focus': {
      color: 'white',
    }
  },
  tabSelected: {},
  typography: {
    padding: theme.spacing(3)
  },
  padding: {
    padding: `0 ${theme.spacing(2)}px`
  },
  switch: {
    marginRight: '10px',
    marginTop: '2px'
  }, 
  projectTypeWrapper: {
    marginTop: '10px',
    marginBotton: '10px'
  },
  projectSelector: {
    backgroundColor: '#0099E6',
    color: 'white'
  }
}));

export default BottomTabs;

