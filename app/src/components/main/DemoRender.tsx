import React, { useState, useEffect, useRef, useContext } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Box from '@material-ui/core/Box';
import cssRefresher from '../../helperFunctions/cssRefresh';
import { useSelector } from 'react-redux';
import StateContext from '../../context/context';
import { Component } from '../../interfaces/Interfaces';

// DemoRender is the full sandbox demo of our user's custom built React components. DemoRender references the design specifications stored in state to construct
// real react components that utilize hot module reloading to depict the user's prototype application.
const DemoRender = (): JSX.Element => {
  const [state,] = useContext(StateContext);
  console.log('state line 14', state);
  let currentComponent = state.components.find(
    (elem: Component) => elem.id === state.canvasFocus.componentId
  );

  // const iframe = useRef<any>(); --> we already have this on line 36
  // const [components, setComponents] = useState([]);
  // const [state, dispatch] = useContext(StateContext);
  // const [codeRender, setCodeRender] = useState('') --> not sure about what this does
  // const demoContainerStyle = {
  //   width: '100%',
  //   backgroundColor: '#FBFBFB',
  //   border: '2px Solid grey',
  // };





  console.log('state in DemoRender', state);
  console.log('currentComponent.code', currentComponent.code);
  
  // Create React ref to inject transpiled code in inframe 
  const iframe = useRef<any>();
  const demoContainerStyle = {
    width: '100%',
    backgroundColor: '#FBFBFB',
    border: '2px Solid grey',
  };

  let code = useSelector((state) => state.code);

  const html = `
    <html>
      <head>
      </head>
      <body>
        <div id="app">
          <h1>HELLO WORLD</h1>
        </div>
        <script>
          window.addEventListener('message', (event) => {
            try {
              eval(event.data);
            } catch (err) {
              const app = document.querySelector('#app');
              app.innerHTML = '<div style="color: red;"><h4>Syntax Error</h4>' + err + '</div>';
            }
          }, false);
        </script>
      </body>
    </html>
  `;

//  This function is the heart of DemoRender it will take the array of components stored in state and dynamically construct the desired React component for the live demo
//   Material UI is utilized to incorporate the apporpriate tags with specific configuration designs as necessitated by HTML standards.
  const componentBuilder = (array: object, key: number = 0) => {
    const componentsToRender = [];
    for (const element of array) {
      if (element.name !== 'separator') {
        const elementType = element.name;
        const childId = element.childId;
        const elementStyle = element.style;
        const innerText = element.attributes.compText;
        const classRender = element.attributes.cssClasses;
        const activeLink = element.attributes.compLink;
        let renderedChildren;
        if (elementType !== 'input' && elementType !== 'img' && element.children.length > 0) {
          renderedChildren = componentBuilder(element.children);
        }
        if (elementType === 'input') componentsToRender.push(<Box component={elementType} className={classRender} style={elementStyle} key={key} id={`rend${childId}`}></Box>);
        else if (elementType === 'img') componentsToRender.push(<Box component={elementType} src={activeLink} className={classRender} style={elementStyle} key={key} id={`rend${childId}`}></Box>);
        else if (elementType === 'a') componentsToRender.push(<Box component={elementType} href={activeLink} className={classRender} style={elementStyle} key={key} id={`rend${childId}`}>{innerText}</Box>);
        else if (elementType === 'Switch') componentsToRender.push(<Switch>{renderedChildren}</Switch>);
        else if (elementType === 'Route') componentsToRender.push(<Route exact path={activeLink}>{renderedChildren}</Route>);
        else if (elementType === 'LinkTo') componentsToRender.push(<Link to={activeLink}>{innerText}</Link>);
        else componentsToRender.push(<Box component={elementType} className={classRender} style={elementStyle} key={key} id={`rend${childId}`}>{innerText}{renderedChildren}</Box>);
        key += 1;
      }
    }
    return componentsToRender;
  };


  useEffect(() => {
    cssRefresher();
  }, [])

  useEffect(() => {
    console.log('code', code);
    iframe.current.contentWindow.postMessage(code, '*');
  }, [code])

  return (
      <div id={'renderFocus'} style={demoContainerStyle}>   
        <iframe ref={iframe} sandbox='allow-scripts' srcDoc={html} width='100%' height='100%'/>
      </div>
  );
};

export default DemoRender;