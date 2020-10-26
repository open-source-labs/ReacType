import React, { useContext } from 'react';
import { stateContext } from '../../context/context';
import BottomTabs from './BottomTabs';
// import BottomTabs from './BottomTabs';
import { Resizable } from 're-resizable';


// const IPC = require('electron').ipcRenderer;

const BottomPanel = () => {

  // const [height, setHeight] = useState('25%');
 
  return (
    <Resizable
      enable={{
        top: true,
      }} 
      minHeight={'25%'}
    >
      <div className="bottom-panel">
        <BottomTabs />
      </div>
    </Resizable>
  );
};

export default BottomPanel;