import React, { useContext } from 'react';
import { stateContext } from '../../context/context';
import BottomTabs from './BottomTabsNew';
// import BottomTabs from './BottomTabs';

// const IPC = require('electron').ipcRenderer;

const BottomPanel = () => {
  return (
    <div className="bottom-panel" style={{ width: '100%' }}>
      <BottomTabs />
    </div>
  );
};

export default BottomPanel;
