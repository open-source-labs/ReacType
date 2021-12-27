import React, { useContext } from 'react';
import BottomTabs from './BottomTabs';
import { Resizable } from 're-resizable';


const BottomPanel = (props): JSX.Element => {
  return (
    <Resizable
      enable={{
        top: true
      }}
      minHeight={'50%'}
    >
      <div className="bottom-panel" >
        <BottomTabs isThemeLight={props.isThemeLight}/>
      </div>
    </Resizable>
  );
};


export default BottomPanel;
