/* eslint-disable max-len */
import React from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useSelector } from 'react-redux';
import CreateContainer from './CreateTab/CreateContainer';
import DisplayContainer from './DisplayTab/DisplayContainer';
import { RootState } from '../../redux/store';

const useStyles = makeStyles({
  contextContainer: {
    backgroundColor: 'white',
    height: 'fit-content',
    width: 'fit-content',
    minWidth: '100%',
  },
});

/**
 * `StateManager` is a React component that provides an interface for managing and displaying
 * application components' state within a tabbed layout. This component utilizes Material-UI's
 * tabs to offer two main functionalities: creating/editing components and displaying them.
 *
 * The component integrates with Redux to access the global application state, particularly focusing
 * on the components' data to manage and render the state of individual components appropriately.
 *
 * @param {Object} props - Properties passed to the component.
 * @returns {JSX.Element} A fragment containing a container with two tabs: one for creating/editing
 *                        components and another for displaying them.
 *
 * The `StateManager` component uses `TabContext`, `TabList`, and `TabPanel` from Material-UI to
 * render a tabbed interface where users can switch between different views:
 * - **Create/Edit:** Allows users to modify the state or properties of components.
 * - **Display:** Shows how components appear based on the current state or configuration.
 *
 * This setup is ideal for applications where components need to be dynamically created, configured,
 * and previewed by the user, providing an intuitive interface for interaction with complex data structures.
 */
const StateManager = (props): JSX.Element => {
  const state = useSelector((store: RootState) => store.appState);

  const { components } = state;
  const classes = useStyles();
  const [value, setValue] = React.useState<string>('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  // add hook here to access which component has been clicked
  // then this will re-render the dataTable

  return (
    <React.Fragment>
      <div
        className={classes.contextContainer}
        style={{ backgroundColor: '#1e2024' }}
      >
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} centered={true}>
                <Tab label="Create/Edit" value="1" style={{ color: 'white' }} />
                <Tab label="Display" value="2" style={{ color: 'white' }} />
              </TabList>
            </Box>
            <TabPanel value="1">
              <CreateContainer
                data={components}
                isThemeLight={props.isThemeLight}
              />
            </TabPanel>
            <TabPanel value="2">
              <DisplayContainer data={components} props={props.props} />
            </TabPanel>
          </TabContext>
        </Box>
      </div>
    </React.Fragment>
  );
};

export default StateManager;
