import { Link, Route, BrowserRouter as Router, Switch, useHistory } from 'react-router-dom';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import { Component } from '../../interfaces/Interfaces';
import ReactDOMServer from 'react-dom/server';
import { RootState } from '../../redux/store';
import { changeFocus } from '../../redux/reducers/slice/appStateSlice';

// DemoRender is the full sandbox demo of our user's custom built React components. DemoRender references the design specifications stored in state to construct
// real react components that utilize hot module reloading to depict the user's prototype application.
const DemoRender = (): JSX.Element => {
  const state = useSelector((store: RootState) => store.appState);
  const stylesheet = useSelector(
    (store: RootState) => store.appState.stylesheet
  );
  const backHome = useHistory();
  const dispatch = useDispatch();

  // Create React ref to inject transpiled code in inframe
  const iframe = useRef<any>();
  const demoContainerStyle = {
    width: '100%',
    backgroundColor: '#FBFBFB',
    borderBottom: 'none',
    overflow: 'auto',
 
  };

  const html = `
    <html>
      <head>
      </head>
      <body>
        <div id="app">
        </div>
        <script>
          window.addEventListener('message', (event) => {
            try {
              app.innerHTML = event.data;
              document.querySelectorAll('a').forEach(element => {
                element.addEventListener('click', (event) => {
                  event.preventDefault();
                  window.top.postMessage(event.currentTarget.href, '*');
                }, true)
              });
            } catch (err) {
              const app = document.querySelector('#app');
              app.innerHTML = '<div style="color: red;"><h4>Syntax Error</h4>' + err + '</div>';
            }
          }, false);
          const handleClickInsideIframe = () => {
            window.parent.postMessage('iframeClicked', '*');
          };
          const handleMouseUpInsideIframe = () => {
            window.parent.postMessage('iframeMouseUp', '*');
          };
          const handleMouseMoveInsideIframe = (e) => {
            const msgData = {
              type: 'iframeMouseMove',
              clientY: e.clientY + 70 //change the 70 to the value of the height of the navbar
            }
            window.parent.postMessage(msgData, '*');
          };
          window.addEventListener('click', handleClickInsideIframe);
          window.addEventListener('mouseup', handleMouseUpInsideIframe);
          window.addEventListener('mousemove', handleMouseMoveInsideIframe);
         
          
        </script>
      </body>
    </html>
  `;

  window.onmessage = (event) => {
    // If event.data or event.data.data is undefined, return early
    if (!event.data || typeof event.data.data !== 'string') return;

    const component: string = event.data.data.split('/').at(-1);

    // If components aren't defined or component isn't a string, return early
    if (!state.components || !component) return;

    const matchedComponent = state.components.find(
      (el) => el.name.toLowerCase() === component.toLowerCase()
    );

    // If matchedComponent is undefined or doesn't have an id, return early
    if (!matchedComponent || matchedComponent.id === undefined) return;

    dispatch(changeFocus({ componentId: matchedComponent.id, childId: null }));
  };

  //  This function is the heart of DemoRender it will take the array of components stored in state and dynamically construct the desired React component for the live demo
  //   Material UI is utilized to incorporate the apporpriate tags with specific configuration designs as necessitated by HTML standards.
  const componentBuilder = (array: any, key: number = 0) => {
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
        if (
          elementType !== 'input' &&
          elementType !== 'img' &&
          elementType !== 'Image' &&
          element.children.length > 0
        ) {
          renderedChildren = componentBuilder(element.children);
        }
        if (elementType === 'input')
          componentsToRender.push(
            <Box
              component={elementType}
              className={classRender}
              style={elementStyle}
              key={key}
              id={`rend${childId}`}
            ></Box>
          );
        else if (elementType === 'img')
          componentsToRender.push(
            <Box
              component={elementType}
              src={activeLink}
              className={classRender}
              style={elementStyle}
              key={key}
              id={`rend${childId}`}
            ></Box>
          );
        else if (elementType === 'Image')
          componentsToRender.push(
            <Box
              component="img"
              src={activeLink}
              className={classRender}
              style={elementStyle}
              key={key}
              id={`rend${childId}`}
            ></Box>
          );
        else if (elementType === 'a' || elementType === 'Link')
          componentsToRender.push(
            <Box
              component="a"
              href={activeLink}
              className={classRender}
              style={elementStyle}
              key={key}
              id={`rend${childId}`}
            >
              {innerText}
              {renderedChildren}
            </Box>
          );
        else if (elementType === 'Switch')
          componentsToRender.push(<Switch>{renderedChildren}</Switch>);
        else if (elementType === 'Route')
          componentsToRender.push(
            <Route exact path={activeLink}>
              {renderedChildren}
            </Route>
          );
        else
          componentsToRender.push(
            <Box
              component={elementType}
              className={classRender}
              style={elementStyle}
              key={key}
              id={`rend${childId}`}
            >
              {innerText}
              {renderedChildren}
            </Box>
          );
        key += 1;
      }
    }
    return componentsToRender;
  };

  //initializes our 'code' which will be whats actually in the iframe in the demo render
  //this will reset every time we make a change
  let code = '';

  const currComponent = state.components.find(
    (element) => element.id === state.canvasFocus.componentId
  );

  //writes each component to the code
  componentBuilder(currComponent.children).forEach((element) => {
    try {
      code += ReactDOMServer.renderToString(element);
    } catch {
      return;
    }
  });

  //writes our stylesheet from state to the code
  code += `<style>${stylesheet}</style>`;

  //adds the code into the iframe
  useEffect(() => {
    //load the current state code when the iframe is loaded and when code changes
    iframe.current.addEventListener('load', ()=>{
      iframe.current.contentWindow.postMessage(code, '*');
    })
    iframe.current.contentWindow.postMessage(code, '*');

  }, [code]);

  return (
    <>
      <div id={'renderFocus'} style={demoContainerStyle}>
        <iframe
          ref={iframe}
          sandbox="allow-scripts"
          srcDoc={html}
          width="100%"
          height="100%"
          style = {{zIndex: -30}}
        />
      </div>
    </>
  );
};

export default DemoRender;
