import React from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import CreateContainer from './CreateTab/CreateContainer';
import AssignContainer from './AssignTab/AssignContainer';
import DisplayContainer from './DisplayTab/DisplayContainer';
import { useSelector } from 'react-redux';

const useStyles = makeStyles({
  contextContainer: {
    backgroundColor: 'white',
    height: 'fit-content'
  }
});

const ContextManager = (props): JSX.Element => {
  const { isDarkMode, style } = useSelector((store) => ({
    isDarkMode: store.darkMode.isDarkMode,
    style: store.styleSlice
  }));
  const classes = useStyles();
  const [value, setValue] = React.useState<string>('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const color = isDarkMode ? 'lightgray' : 'black';

  return (
    <React.Fragment>
      <div className={classes.contextContainer} style={style.style}>
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} centered={true}>
                <Tab label="Create/Edit" value="1" style={{ color }} />
                <Tab label="Assign" value="2" style={{ color }} />
                <Tab label="Display" value="3" style={{ color }} />
              </TabList>
            </Box>
            <TabPanel value="1">
              <CreateContainer />
            </TabPanel>
            <TabPanel value="2">
              <AssignContainer />
            </TabPanel>
            <TabPanel value="3">
              <DisplayContainer />
            </TabPanel>
          </TabContext>
        </Box>
      </div>
    </React.Fragment>
  );
};

export default ContextManager;
