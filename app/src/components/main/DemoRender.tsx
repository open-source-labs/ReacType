import {
  Link,
  Route,
  BrowserRouter as Router,
  Switch,
  useHistory
} from 'react-router-dom';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MUITypes from '../../redux/MUITypes';
// import Box from '@mui/material/Box';
// import { Component } from '../../interfaces/Interfaces';
import ReactDOMServer from 'react-dom/server';
import { RootState } from '../../redux/store';
import { changeFocus } from '../../redux/reducers/slice/appStateSlice';
// import { blue } from '@mui/material/colors';
import serverConfig from '../../serverConfig';

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
    overflow: 'auto'
  };

  const html = `
    <html>
    <head>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      <script defer src="https://unpkg.com/react@17.0.2/umd/react.production.min.js"></script>
      <script defer src="https://unpkg.com/react-dom@17.0.2/umd/react-dom.production.min.js"></script>
      <script defer src="https://unpkg.com/react-router-dom@5/umd/react-router-dom.min.js"></script>
      <script defer src="https://unpkg.com/@mui/material@5.15.15/umd/material-ui.production.min.js"></script>
      </script>
      <style id="mui-styles"></style> 
    </head>
    <body>
      <div id="app"></div>
      <script>
      document.addEventListener('DOMContentLoaded', function() {

        function logToParentConsole(...args) {
        const cache = new Set(); // Set to keep track of all objects being stringified
            
        const payload = args.map(arg => {
          if (typeof arg === 'object' && arg !== null) {
            return JSON.stringify(arg, (key, value) => {
              if (typeof value === 'object' && value !== null) {
                if (cache.has(value)) {
                  // Duplicate reference found, discard key
                  return;
                }
                // Store value in our collection
                cache.add(value);
              }
              return value;
            });
          }
          return arg;
        });
      
        window.parent.postMessage({ type: 'log', data: payload }, '*');
        cache.clear(); // Clear cache after serialization
      }
      console.log = logToParentConsole;
    
        const MaterialUI = window.MaterialUI;
        const ReactRouterDOM = window.ReactRouterDOM;
        const React = window.React;

        if (!MaterialUI || !ReactRouterDOM || !React) {
          console.log('Dependency loading failed: MaterialUI, React, or ReactDOM is undefined.')
          return;
        }
    
        console.log('MaterialUI:', MaterialUI);
        console.log('ReactRouterDOM:', ReactRouterDOM);
        const componentMap = {
          Box: MaterialUI?.Box,
          Button: MaterialUI?.Button,
          Link: ReactRouterDOM?.Link,
          TextField: MaterialUI?.TextField,
          Card: MaterialUI?.Card,
          CardContent: MaterialUI?.CardContent,
          Typography: MaterialUI?.Typography,
          CardActions: MaterialUI?.CardActions
        };
        const specialComponents = {
          'br': React.createElement('br', {})
        };
        const createComponentFromData = (data) => {
          console.log('data', data);
          const { type, props, children } = data;
          const Component = componentMap[type] || 'div';
          const processChildren = (child) => {
            if (typeof child === 'string') {
              if (specialComponents[child]) {
                return specialComponents[child];
              } else {
                return child;
              }
            } else if (typeof child === 'object' && child !== null) {
              return createComponentFromData(child);
            } else {
              return null;
            }
          };
        
          if (typeof children === 'string' || children === null) {
            return React.createElement(Component, props, children);
          } else if (Array.isArray(children)) {
            const processedChildren = children.map(processChildren);
            return React.createElement(Component, props, ...processedChildren);
          } else if (typeof children === 'object') {
            return React.createElement(Component, props, createComponentFromData(children));
          }
          return React.createElement(Component, props);
        };
        window.addEventListener('message', (event) => {
          console.log('event', event);
          const dataArr = event.data.replace(/}{/g, '},,{').replace(/}</g, '},,<').replace(/>{/g, '>,,{').split(',,');
          console.log('dataArr', dataArr);
          const container = document.getElementById('app');
          container.innerHTML = '';
          dataArr.forEach(segment => {
            if(segment.trim().startsWith('{') && segment.trim().endsWith('}')) {
              try {
                const jsonData = JSON.parse(segment);
                console.log('jsonData', jsonData);
                const componentContainer = document.createElement('div');
                container.appendChild(componentContainer);
                const component = createComponentFromData(jsonData);
                console.log('component', component);
                ReactDOM.render(component, componentContainer);
              } catch (err) {
                console.error("Error parsing JSON:", err);
              }
            } else {
              container.insertAdjacentHTML('beforeend', segment);
              container.querySelectorAll('a').forEach(element => {
                element.addEventListener('click', (event) => {
                  event.preventDefault();
                  window.top.postMessage(event.currentTarget.href, '*');
                });
              });
            }
          });
        });
    
        const handleClickInsideIframe = () => {
          window.parent.postMessage('iframeClicked', '*');
        };
        const handleMouseUpInsideIframe = () => {
          window.parent.postMessage('iframeMouseUp', '*');
        };
        const handleMouseMoveInsideIframe = (e) => {
          const msgData = {
            type: 'iframeMouseMove',
            clientY: e.clientY + 70 // Adjust according to your needs
          };
          window.parent.postMessage(msgData, '*');
        };
    
        window.addEventListener('click', handleClickInsideIframe);
        window.addEventListener('mouseup', handleMouseUpInsideIframe);
        window.addEventListener('mousemove', handleMouseMoveInsideIframe);
      });

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

  window.addEventListener('message', function (event) {
    if (event.origin !== serverConfig.API_BASE_URL2) return; // Ensure you replace this with your actual iframe origin

    if (event.data.type === 'log') {
      console.log(
        'Iframe log:',
        event.data.data.map((item) => {
          try {
            return JSON.parse(item); // Try to parse each item in case it is a JSON string
          } catch {
            return item; // If not a JSON string, return the original item
          }
        })
      );
    }
  });

  const componentBuilder2 = (array, key = 0) => {
    const componentsToRender = [];
    for (const element of array) {
      if (element.name === 'separator') continue;
      const elementType = element.name;
      const childId = element.childId;
      const elementStyle = element.style;
      const innerText = element.attributes.compText;
      const classRender = element.attributes.cssClasses;
      const activeLink = element.attributes.compLink;
      let renderedChildren =
        element.children && element.children.length > 0
          ? componentBuilder2(element.children, ++key)
          : undefined;
      const shouldSerialize = element.type === 'MUI Component' ? true : false;
      if (shouldSerialize) {
        renderedChildren =
          element.componentData && element.componentData.children
            ? componentBuilder2([element.componentData], key + 1) // If children are in componentData
            : element.children && element.children.length > 0
            ? componentBuilder2(element.children, key + 1) // Standard children handling
            : undefined; // No children to render
        const baseData = MUITypes.find(
          (m) => m.tag === elementType
        ).componentData;
        console.log('baseData', baseData);
        if (!baseData) return null;
        const componentData = {
          ...baseData,
          props: {
            ...(baseData.props || {}),
            key: ++key
          }
        };
        componentsToRender.push(JSON.stringify(componentData));

        // const serializedHtmlContent = JSON.stringify(htmlContent);
      } else {
        let Component;
        switch (elementType) {
          case 'input':
            Component = 'input';
            break;
          case 'img':
          case 'Image':
            Component = 'img';
            break;
          case 'a':
            Component = 'a';
            break;
          case 'Switch':
            Component = 'Switch';
            break;
          case 'Route':
            Component = 'Route';
            break;
          default:
            Component = elementType;
            break;
        }
        const childrenContent = [];
        if (innerText) childrenContent.push(innerText);
        if (renderedChildren) childrenContent.push(...renderedChildren);
        const props = {
          ...element.attributes,
          className: classRender,
          style: elementStyle,
          key: ++key,
          id: `rend${childId}`,
          ...(elementType === 'img' || elementType === 'Image'
            ? { src: activeLink }
            : {}),
          ...(elementType === 'a' || elementType === 'Link'
            ? { href: activeLink }
            : {})
        };

        componentsToRender.push(
          <Component {...props}>
            {childrenContent.length > 0
              ? childrenContent.map((child, index) => (
                  <React.Fragment key={index}>{child}</React.Fragment>
                ))
              : null}
          </Component>
        );
      }
      key++;
    }
    return componentsToRender;
  };
  //initializes our 'code' which will be whats actually in the iframe in the demo render
  //this will reset every time we make a change
  let code = '';

  const currComponent = state.components.find(
    (element) => element.id === state.canvasFocus.componentId
  );
  console.log('currComponent', currComponent);

  componentBuilder2(currComponent.children).forEach((element) => {
    if (typeof element === 'string') {
      console.log('element', element);
      code += element;
    } else if (React.isValidElement(element)) {
      console.log('valid react element', element);
      try {
        const reactDomStringRender = ReactDOMServer.renderToString(element);
        code += reactDomStringRender;
      } catch {
        return;
      }
    }
  });

  //writes our stylesheet from state to the code
  // code += `<style>${stylesheet}</style>`;
  //adds the code into the iframe
  useEffect(() => {
    //load the current state code when the iframe is loaded and when code changes
    iframe.current.addEventListener('load', () => {
      iframe.current.contentWindow.postMessage(code, '*');
    });
    iframe.current.contentWindow.postMessage(code, '*');
  }, [code]);

  return (
    <>
      <div id={'renderFocus'} style={demoContainerStyle}>
        <iframe
          ref={iframe}
          sandbox="allow-scripts allow-forms allow-same-origin"
          srcDoc={html}
          width="100%"
          height="100%"
          style={{ zIndex: -30 }}
        />
      </div>
    </>
  );
};

export default DemoRender;
