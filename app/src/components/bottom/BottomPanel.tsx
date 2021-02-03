import React, { useContext } from 'react';
import BottomTabs from './BottomTabs';
import { Resizable } from 're-resizable';


const BottomPanel = () => {
  return (
    <Resizable
      enable={{
        top: true
      }}
      minHeight={'50%'}
    >
      <div className="bottom-panel" >
        <BottomTabs  />
      </div>
    </Resizable>
  );
};

export default BottomPanel;
