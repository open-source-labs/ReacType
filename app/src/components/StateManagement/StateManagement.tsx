import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/styles';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import StateContext from '../../context/context';

import CreateContainer from './CreateTab/CreateContainer';
// import AssignContainer from './AssignTab/AssignContainer';
import DisplayContainer from './DisplayTab/DisplayContainer';
import { blue } from '@material-ui/core/colors';


const useStyles = makeStyles({
  contextContainer: {
    backgroundColor: 'white',
    height: '100%'
  }
});

const StateManager = (props): JSX.Element => {
  const [state, dispatch] = useContext(StateContext);
  const { components, HTMLTypes } = state;
  console.log('props from statemanger', props)
  const classes = useStyles();
  const [value, setValue] = React.useState<string>('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  // add hook here to access which component has been clicked 
    // then this will re-render the dataTable 

  return (
    <React.Fragment>
      <div className={classes.contextContainer}>
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} centered={true}>
                <Tab label="Create/Edit" value="1" />
                {/* <Tab label="Assign" value="2" /> */}
                {/* LegacyPD changed the value below */}
                <Tab label="Display" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <CreateContainer isThemeLight={props.isThemeLight} />
            </TabPanel>
            {/* LegacyPD made changes below to change the value from 3 to 2 */}
            {/* <TabPanel value="2">
              <AssignContainer />
            </TabPanel> */}
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