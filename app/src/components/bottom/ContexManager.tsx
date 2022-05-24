import React, { useContext } from 'react';
import ComponentPanel from '../right/ComponentPanel'
import ComponentDropDown from '../right/ComponentDropDown'
import HTMLPanel from '../left/HTMLPanel'
import { styleContext } from '../../containers/AppContainer';


const ContextManager= (props): JSX.Element => {
  const {style} = useContext(styleContext);
  return (
    <div className="creation-panel" style={style}>
      {/* <HTMLPanel isThemeLight={props.isThemeLight}/> */}
      {/* <ComponentDropDown isThemeLight={props.isThemeLight}/> */}
      <ComponentDropDown/>
    </div>
  );
};

export default ContextManager;