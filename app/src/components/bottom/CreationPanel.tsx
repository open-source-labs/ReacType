import React from 'react';
import ComponentPanel from '../right/ComponentPanel'
import HTMLPanel from '../left/HTMLPanel'
import { useSelector } from 'react-redux';

// Creation panel holds all of the creation functionality of the application. ComponentPanel, HTMLPanel, and StatePropsPanel are all hanged here.
// This allows users to create all aspects of this application in one place.
const CreationPanel = (props): JSX.Element => {
  const style = useSelector((store) => store.styleSlice);
  return (
    <div className="creation-panel" style={style.style}>
      <ComponentPanel isThemeLight={props.isThemeLight}/>
      <HTMLPanel isThemeLight={props.isThemeLight}/>
    </div>
  );
};

export default CreationPanel;
