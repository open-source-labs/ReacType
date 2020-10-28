import React, { useContext } from 'react';
import { StateContext } from '../../context/context';
import BottomTabs from './BottomTabs';
import { Resizable } from 're-resizable';


// const IPC = require('electron').ipcRenderer;

const BottomPanel = ({ style }) => {

  return (
    <Resizable
      enable={{
        top: true
      }}
      minHeight={'25%'}
    >
      <div className="bottom-panel">
        <BottomTabs style={style} />
      </div>
    </Resizable>
  );
};

export default BottomPanel;
