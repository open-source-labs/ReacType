import React from 'react';
import Grid from '@mui/material/Grid';
import { RootState } from '../../redux/store';
import makeStyles from '@mui/styles/makeStyles';
import { useSelector } from 'react-redux';
import ComponentPanelItem from '../right/ComponentPanelItem';

console.log('line 8 ComponentDrag')

const useStyles = makeStyles({
  panelWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexGrow: 1,
    overflow: 'auto',
  },
  panelWrapperList: {
    minHeight: 'auto'
  },
  lightThemeFontColor: {
    color: '#fff'
  },
  darkThemeFontColor: {
    color: '#00008B,'
  }
});

const ComponentDrag = ({ isVisible, isThemeLight }): JSX.Element | null => {
  const classes = useStyles();
  const state = useSelector((store: RootState) => store.appState);
  console.log("isVisible", isVisible)
  console.log("isThemeLight", isThemeLight)
  console.log("isVisible", isVisible)
  console.log("state", state)
  console.log("stateMUI", state.MUITypes)


  const isFocus = (targetId: Number) => {
    console.log('targetID line 33', targetId)
    console.log('componentID line 34', state.canvasFocus.componentId)
    return state.canvasFocus.componentId === targetId ? true : false;
  };

  if (!isVisible) return null;

  return (
    <div className={classes.panelWrapper}>
      <div className={classes.panelWrapperList}>
        <h4 className={classes.darkThemeFontColor}>
          {state.projectType === 'Next.js' || state.projectType === 'Gatsby.js'
            ? 'Pages'
            : ''}
        </h4>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          {state.components
            .filter((comp) => state.rootComponents.includes(comp.id))
            .map((comp) => {
              return (
                <ComponentPanelItem
                  isFocus={isFocus(comp.id)}
                  key={`comp-${comp.id}`}
                  name={comp.name}
                  id={comp.id}
                  root={true}
                  isThemeLight={isThemeLight}
                />
              );
            })}
        </Grid>
      </div>
    </div>
  );
};

export default ComponentDrag;


const propsArray4 = [
  { Name: "align", 
  Type: "'center' | 'inherit' | 'justify' | 'left' | 'right'", 
  Default: "'inherit'", 
  Description: "Set the text-align on the component." },
  { Name: "children", Type: "node" },
  { Name: "classes", Type: "object" },
  { Name: "component", Type: "elementType", Description: "The component used for the root node." },
  { Name: "gutterBottom", Type: "bool", Default: "false", Description: "If true, the text will have a bottom margin." },
  { Name: "noWrap", Type: "bool", Default: "false", Description: "If true, the text will not wrap, but instead will truncate with a text overflow ellipsis." },
  { Name: "paragraph", Type: "bool", Default: "false", Description: "If true, the element will be a paragraph element." },
  { Name: "sx", Type: "Array<func | object | bool> | func | object" },
  { Name: "variant", Type: "'body1' | 'body2' | 'button' | 'caption' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'inherit' | 'overline' | 'subtitle1' | 'subtitle2' | string", Default: "'body1'", Description: "Applies the theme typography styles." },
  { Name: "variantMapping", Type: "object", Default: "{ h1: 'h1', h2: 'h2', h3: 'h3', h4: 'h4', h5: 'h5', h6: 'h6', subtitle1: 'h6', subtitle2: 'h6', body1: 'p', body2: 'p', inherit: 'p' }", Description: "The component maps the variant prop to a range of different HTML element types." }
];
