import React, { useState, useContext, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import BottomPanel from '../components/bottom/BottomPanel';
import CanvasContainer from '../components/main/CanvasContainer';
import { styleContext } from './AppContainer';
import StateContext from '../context/context';
import DemoRender from '../components/main/DemoRender';

const MainContainer = () => {
  const { style } = useContext(styleContext);
  // Caret Start
  const [state, dispatch] = useContext(StateContext);
  const componentsToRender = [];
  useEffect(() => {
    const childrenArray = state.components[0].children;
    console.log('Refrenced Children in State!!!', childrenArray);
    const codePreviewView = state.components[0].code;
    console.log('This is the framework for CodePreview', codePreviewView);
    let key = 0;
    for (const element of childrenArray) {
      if (element.name !== 'separator') {
        console.log('detail from children array', element);
        const elementType = element.name;
        const childId = element.childId;
        const elementStyle = element.style;
        const innerText = element.attributes.compText;
        if (elementType !== 'button') {
          componentsToRender.push(<Box component={elementType} key={key} id={childId}>{innerText}</Box>);
        } else componentsToRender.push(<Button key={key} id={childId} color={'primary'}>{innerText}</Button>);
        key += 1;
      }
    }
  }, [state.components]);
  // Caret End

  return (
    <div className="main-container" style={style} >
      <div className="main">
        <CanvasContainer />
        {/* Caret Component Render */}
        {console.log('Completed Components to Render', componentsToRender)}
        <DemoRender demo={componentsToRender}/>
      </div>
      <BottomPanel />
    </div>
  );
};

export default MainContainer;
