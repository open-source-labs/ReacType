import React, { useContext } from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import StateContext from '../../context/context';

import CreateContainer from './CreateTab/CreateContainer';
import DisplayContainer from './DisplayTab/DisplayContainer';
import { useSelector } from 'react-redux'


const useStyles = makeStyles({
  contextContainer: {
    backgroundColor: 'white',
    height: 'fit-content',
    width: 'fit-content',
    minWidth: '100%'
  }
});

const StateManager = (props): JSX.Element => {
  const isDarkMode = useSelector(state => state.darkMode.isDarkMode);
  const [state, dispatch] = useContext(StateContext);
  const { components, HTMLTypes } = state;
  const classes = useStyles();
  const [value, setValue] = React.useState<string>('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  // add hook here to access which component has been clicked 
    // then this will re-render the dataTable 

  const background_Color = isDarkMode ? '#21262b' : 'white'

  return (
    <React.Fragment>
      <div className={classes.contextContainer} style={{backgroundColor: background_Color}}>
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} centered={true}>
                <Tab label="Create/Edit" value="1"/>
                <Tab label="Display" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <CreateContainer data={components} isThemeLight={props.isThemeLight } />
            </TabPanel>
            <TabPanel value="2">
              <DisplayContainer data={components} props={props.props}  />
            </TabPanel>
          </TabContext>
        </Box>
      </div>
    </React.Fragment>
  );
};

export default StateManager;