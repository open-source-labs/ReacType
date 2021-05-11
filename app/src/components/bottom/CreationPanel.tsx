import React, { useContext } from 'react';
import ComponentPanel from '../right/ComponentPanel'
import StatePropsPanel from '../right/StatePropsPanel'
import HTMLPanel from '../left/HTMLPanel'

const CreationPanel = (props): JSX.Element => {
  return (
    <div className="creation-panel" >
      <ComponentPanel isThemeLight={props.isThemeLight}/>
      <HTMLPanel isThemeLight={props.isThemeLight}/>
      <StatePropsPanel isThemeLight={props.isThemeLight}/>
    </div>
  );
};

export default CreationPanel;
