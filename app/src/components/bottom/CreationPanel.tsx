import React, { useContext } from 'react';
import ComponentPanel from '../right/ComponentPanel'
import StatePropsPanel from '../right/StatePropsPanel'
import HTMLPanel from '../left/HTMLPanel'

// Creation panel holds all of the creation functionality of the application. ComponentPanel, HTMLPanel, and StatePropsPanel are all hanged here.
// This allows users to create all aspects of this application in one place.
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
