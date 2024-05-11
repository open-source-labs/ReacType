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
import Box from '@mui/material/Box';
import { Component } from '../../interfaces/Interfaces';
import ReactDOMServer from 'react-dom/server';
import { RootState } from '../../redux/store';
import { changeFocus } from '../../redux/reducers/slice/appStateSlice';
// import { blue } from '@mui/material/colors';
import serverConfig from '../../serverConfig';
import componentBuilder from '../../helperFunctions/componentBuilder';
import html from '../../helperFunctions/DemoRenderHTML';

/**
 * DemoRender is a React component that renders a sandbox demo of custom-built React components.
 * It constructs real React components based on design specifications stored in state and uses hot module reloading to depict the user's prototype application.
 * @returns {JSX.Element} JSX Element
 */
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

  /**
   * Handles messages received from the iframe.
   * Parses the data to identify the component and updates the focus accordingly.
   * @param {MessageEvent} event - The event containing the message data.
   * @returns {void}
   */
  window.onmessage = (event: MessageEvent): void => {
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

  /**
   * Listens for messages from the iframe and logs them if they're of type 'log'.
   * @param {MessageEvent} event - The event containing the message data.
   * @returns {void}
   */
  window.addEventListener('message', function (event: MessageEvent): void {
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

  /**
   * Initializes the code variable which represents the content to be displayed in the iframe.
   */
  let code = '';

  // Find the current component in focus
  const currComponent = state.components.find(
    (element) => element.id === state.canvasFocus.componentId
  );
  console.log('currComponent', currComponent);

  /**
   * Builds the code variable based on the current component's children.
   */
  componentBuilder(currComponent.children).forEach((element) => {
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

  // writes our stylesheet from state to the code
  code += `<style>${stylesheet}</style>`;

  /**
   * Loads the code into the iframe when it is loaded or when the code changes.
   */
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
