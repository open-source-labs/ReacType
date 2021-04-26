<<<<<<< HEAD
import React, { ReactNode, useState, useContext } from 'react';

import { useTheme } from '@material-ui/core/styles';
=======
import React, { ReactNode, useState } from 'react';

import { makeStyles, Theme } from '@material-ui/core/styles';
>>>>>>> 7bbdd47fbd43f0c8ab841bf8583ed10c22aa89f7
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
<<<<<<< HEAD
import { styleContext } from '../../containers/AppContainer';
=======

>>>>>>> 7bbdd47fbd43f0c8ab841bf8583ed10c22aa89f7
import StatePropsPanel from './StatePropsPanel';
import ComponentPanel from './ComponentPanel';

interface TabPanelProps {
  children?: ReactNode;
  index: any;
  value: any;
}

const TabPanelItem = (props: TabPanelProps) => {
<<<<<<< HEAD
  const theme = useTheme();
=======
>>>>>>> 7bbdd47fbd43f0c8ab841bf8583ed10c22aa89f7
  const { children, index, value, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={0}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const a11yProps = (index: any) => {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`
  };
};

interface LinkTabProps {
  label?: string;
  href?: string;
}

const LinkTab = (props: LinkTabProps) => {
  return (
    <Tab
      component="a"
      onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
};

<<<<<<< HEAD
// const useStyles = makeStyles((theme: Theme) => ({
//   root: {
//     flexGrow: 1,
//   }
// }));

const TabPanel = () => {
  const theme = useTheme();
  // const classes = useStyles();
=======
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
}));

const TabPanel = () => {
  const classes = useStyles();
>>>>>>> 7bbdd47fbd43f0c8ab841bf8583ed10c22aa89f7
  const [value, setValue] = useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

<<<<<<< HEAD
  console.log("Theme: ", theme);

  return (
    <div>
=======
  return (
    <div className={classes.root}>
>>>>>>> 7bbdd47fbd43f0c8ab841bf8583ed10c22aa89f7
      <AppBar position="static">
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="nav tabs example"
        >
          <LinkTab label="default" {...a11yProps(0)} />
          <LinkTab label="create new state" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanelItem value={value} index={0}>
        {/* <ComponentPanel/> */}
      </TabPanelItem>
      <TabPanelItem value={value} index={1}>
        <StatePropsPanel />
      </TabPanelItem>
    </div>
  );
};

export default TabPanel;
