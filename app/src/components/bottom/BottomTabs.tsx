import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
// import Tree from 'react-d3-tree';
import CodePreview from './CodePreview';
import Box from '@material-ui/core/Box';
import { emitKeypressEvents } from 'readline';

const BottomTabs = () => {
  // state that controls which tab the user is on
  const [tab, setTab] = useState(0);
  const classes = useStyles();
  treeWrapper: HTMLDivElement;

  // const el = document.querySelector('resizer');
  // console.log(el);
  // el.addEventListener('mousedown', mousedown);

  // function mousedown(e) {
  //   window.addEventListener('mousemove', mousemove);
  //   window.addEventListener('mouseup', mouseup);

  //   let prevX = e.clientX;
  //   let prevY = e.clientY;

  //   function mousemove(e) {
  //     let newX = prevX - e.clientX;
  //     let newY = prevY - e.clientY;

  //     const rect = el.getBoundingClientRect();

  //     el.style.left = rect.left - newX + 'px';
  //     el.style.top = rect.top - newY + 'px';

  //     prevX = e.clientX;
  //     prevY = e.clientY;
  //   }
  //   function mouseup() {
  //     window.removeEventListener('mousemove', mousemove);
  //     window.removeEventListener('mouseup', mouseup);
  //   }
  // }

  // method changes the
  const handleChange = (event: React.ChangeEvent, value: number) => {
    setTab(value);
  };

  return (
    <div className={classes.root}>
      {/* <div id="resizeMe" className="resizable"> */}
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
            classes={{
              root: classes.tabsRoot,
              selected: classes.tabSelected
            }}
            label="Tree Diagram"
          />
        </Tabs>
      </Box>
      {tab === 0 && <CodePreview />}
      {/* </div> */}
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
