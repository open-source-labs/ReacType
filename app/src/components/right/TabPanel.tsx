
import React, { ReactNode, useState, useContext } from 'react';

import { useTheme } from '@material-ui/core/styles';

import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { styleContext } from '../../containers/AppContainer';
import StatePropsPanel from './StatePropsPanel';
import ComponentPanel from './ComponentPanel';

interface TabPanelProps {
  children?: ReactNode;
  index: any;
  value: any;
}

const TabPanelItem = (props: TabPanelProps): JSX.Element => {
  const theme = useTheme();
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
        <Box component={'div'}>
          {children}
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
      onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
}));

const TabPanel = (): JSX.Element => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
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
