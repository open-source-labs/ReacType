import React, { useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import ComponentDrag from '../components/right/ComponentDrag';
import DragDropPanel from '../components/left/DragDropPanel';
import { styleContext } from './AppContainer';

// Left-hand portion of the app, where component options are displayed
const LeftContainer = (props): JSX.Element => {
  const { style } = useContext(styleContext);

// --------------------------COMPONENT PANEL MOVED TO RIGHTCONTAINER----------------------------

  return (
    <div className="column left" style={style}>
      <Grid container direction="column" alignItems="center">
        <h4>Drag & Drop</h4>
        <DragDropPanel isThemeLight={props.isThemeLight}/>
        <div id={'CompBottomHalf'}>
          <ComponentDrag isThemeLight={props.isThemeLight}/>
        </div>
      </Grid>
    </div>
  );
};

export default LeftContainer;
