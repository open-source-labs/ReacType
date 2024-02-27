import React, { useState } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import StylesEditor from './StylesEditor';
import CustomizationPanel from '../../containers/CustomizationPanel';
import CreationPanel from './CreationPanel';
import ContextManager from '../ContextAPIManager/ContextManager';
import StateManager from '../StateManagement/StateManagement';
import Chatroom from './ChatRoom';
import Box from '@mui/material/Box';
import Tree from '../../tree/TreeChart';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import arrow from '../main/Arrow';
import { useDispatch, useSelector } from 'react-redux';
import { changeProjectType } from '../../redux/reducers/slice/appStateSlice';
import { RootState } from '../../redux/store';
import { MeetingProvider } from '@videosdk.live/react-sdk';
const videoSDKToken = `${import.meta.env.VITE_VIDEOSDK_TOKEN}`;

const BottomTabs = (props): JSX.Element => {
  const { setBottomShow, isThemeLight } = props;
  const dispatch = useDispatch();
  const state = useSelector((store: RootState) => store.appState);
  const contextParam = useSelector((store: RootState) => store.contextSlice);
  const collaborationRoom = useSelector((store: RootState) => store.roomSlice);

  const [tab, setTab] = useState(0);
  const classes = useStyles();
  const [theme, setTheme] = useState('solarized_light');

  const handleChange = (event: React.ChangeEvent, value: number) => {
    setTab(value);
  };

  const handleProjectChange = (event) => {
    const projectType = event.target.value;
    dispatch(changeProjectType({ projectType, contextParam }));
  };
  const { components } = state;

  arrow.renderArrow(state.canvasFocus?.childId);

  const showBottomPanel = () => {
    setBottomShow(true);
  };

  return (
    <MeetingProvider
      config={{
        meetingId: `${collaborationRoom.meetingId}`,
        micEnabled: false,
        webcamEnabled: false,
        name: `${collaborationRoom.userName}`
      }}
      token={videoSDKToken}
    >
      <div
        className={`${classes.root} ${classes.rootLight}`}
        style={{
          backgroundColor: '#1E2024',
          zIndex: 1
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Tabs
            value={tab}
            onChange={handleChange}
            classes={{
              root: classes.tabsRoot,
              indicator: classes.tabsIndicator
            }}
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab
              disableRipple
              classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
              label="Creation Panel"
              onClick={showBottomPanel}
              sx={{ borderTop: '2px solid #191919' }}
            />
            <Tab
              disableRipple
              classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
              label="Customization"
              onClick={showBottomPanel}
              sx={{ borderTop: '2px solid #191919' }}
            />
            <Tab
              disableRipple
              classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
              label="CSS Editor"
              onClick={showBottomPanel}
              sx={{ borderTop: '2px solid #191919' }}
            />
            <Tab
              disableRipple
              classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
              label="Component Tree"
              onClick={showBottomPanel}
              sx={{ borderTop: '2px solid #191919' }}
            />
            <Tab
              disableRipple
              classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
              label="Context Manager"
              onClick={showBottomPanel}
            />
            <Tab
              disableRipple
              classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
              label="State Manager"
              onClick={showBottomPanel}
            />
            <Tab
              disableRipple
              classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
              label="Live Chat"
              onClick={showBottomPanel}
            />
          </Tabs>

          <div className={classes.projectTypeWrapper}>
            <FormControl size="small">
              <Select
                variant="outlined"
                labelId="project-type-label"
                id="demo-simple-select"
                className={classes.projectSelector}
                value={state.projectType}
                onChange={handleProjectChange}
                MenuProps={{ disablePortal: true }}
                sx={{
                  color: '#131416',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#131416'
                  }
                }}
                style={{ color: '#9C9D9F' }}
              >
                <MenuItem style={{ color: 'white' }} value={'Classic React'}>
                  Classic React
                </MenuItem>
                <MenuItem style={{ color: 'white' }} value={'Gatsby.js'}>
                  Gatsby.js
                </MenuItem>
                <MenuItem style={{ color: 'white' }} value={'Next.js'}>
                  Next.js
                </MenuItem>
              </Select>
            </FormControl>
          </div>
        </Box>
        <div className="tab-content">
          {tab === 0 && <CreationPanel isThemeLight={isThemeLight} />}
          {tab === 1 && <CustomizationPanel isThemeLight={isThemeLight} />}
          {tab === 2 && <StylesEditor theme={theme} setTheme={setTheme} />}
          {tab === 3 && <Tree data={components} />}
          {tab === 4 && <ContextManager theme={theme} setTheme={setTheme} />}
          {tab === 5 && (
            <StateManager
              theme={theme}
              setTheme={setTheme}
              isThemeLight={isThemeLight}
            />
          )}
          {tab === 6 && <Chatroom />}
        </div>
      </div>
    </MeetingProvider>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: '100%',
    color: '#E8E8E8'
  },
  rootLight: {
    backgroundColor: '#0671e3'
  },
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
    backgroundColor: '#0671E3'
  },
  tabRoot: {
    textTransform: 'initial',
    minWidth: 170,
    height: 60,
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
    fontWeight: 300,
    '&$tabSelected': {
      color: 'white',
      backgroundColor: '#2D313A'
    },
    '&:focus': {
      color: 'white'
    }
  },
  tabSelected: {},
  typography: {
    padding: '24px'
  },
  padding: {
    padding: `0 16px`
  },
  switch: {
    marginRight: '10px',
    marginTop: '2px'
  },
  projectTypeWrapper: {
    marginTop: '10px',
    marginBotton: '10px',
    marginLeft: '10px'
  },
  projectSelector: {
    backgroundColor: '#131416',
    color: 'white',
    margin: '0 10px 10px 0'
  }
}));

export default BottomTabs;
