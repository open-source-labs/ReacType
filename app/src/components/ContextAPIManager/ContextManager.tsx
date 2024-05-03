import React, { useContext } from 'react';
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
import { RootState } from '../../redux/store';

const useStyles = makeStyles({
  contextContainer: {
    height: 'fit-content'
  }
});

const ContextManager = (props): JSX.Element => {
  const style = useSelector((store: RootState) => store.styleSlice);
  const classes = useStyles();
  const [value, setValue] = React.useState<string>('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const color = 'white';

  return (
    <React.Fragment>
      <div className={classes.contextContainer} style={style.style}>
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList
                onChange={handleChange}
                centered={true}
                sx={{ color: color }}
              >
                <Tab style={{ color: color }} label="Create/Edit" value="1" />
                <Tab style={{ color: color }} label="Assign" value="2" />
                <Tab style={{ color: color }} label="Display" value="3" />
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
