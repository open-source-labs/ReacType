import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { StateContext } from '../../context/context';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
// import Tree from 'react-d3-tree';
import CodePreview from './CodePreview';
import Box from '@material-ui/core/Box';
import Tree from '../../tree/TreeChart';
import { emitKeypressEvents } from 'readline';

const BottomTabs = () => {
  // state that controls which tab the user is on
  const [state, dispatch] = useContext(StateContext);
  const [tab, setTab] = useState(0);
  const classes = useStyles();
  treeWrapper: HTMLDivElement;

  // method changes the
  const handleChange = (event: React.ChangeEvent, value: number) => {
    setTab(value);
  };

  const { components, HTMLTypes } = state;

  return (
    <div className={classes.root}>
      <Box display="flex" justifyContent="space-between">
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
            label="Code Preview"
          />
          <Tab
            disableRipple
            classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            label="Component Tree"
          />
        </Tabs>
      </Box>
      {tab === 0 && <CodePreview />}
      {tab === 1 && <Tree data={components} />}
    </div>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#333333',
    height: '100%',
    color: '#fff',
    boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)'
  },
  bottomHeader: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    Width: '200px'
  },
  tabsRoot: {
    borderBottom: '0.5px solid #424242'
  },
  tabsIndicator: {
    backgroundColor: '#1de9b6'
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
      color: '#1de9b6',
      opacity: 1
    },
    '&$tabSelected': {
      color: '#33eb91',
      fontWeight: theme.typography.fontWeightMedium
    },
    '&:focus': {
      color: '#4aedc4'
    }
  },
  tabSelected: {},
  typography: {
    padding: theme.spacing(3) // JZ: updated syntax as per deprecation warning
  },
  padding: {
    padding: `0 ${theme.spacing(2)}px` // JZ: updated syntax as per deprecation warning
  },
  switch: {
    marginRight: '10px',
    marginTop: '2px'
  }
}));

export default BottomTabs;
