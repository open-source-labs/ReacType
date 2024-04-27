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
import { blue } from '@mui/material/colors';
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
      <script defer src="https://unpkg.com/@mui/material@5.15.15/umd/material-ui.production.min.js"></script>
      <script defer src="https://unpkg.com/react@17.0.2/umd/react.production.min.js"></script>
      <script defer src="https://unpkg.com/react-dom@17.0.2/umd/react-dom.production.min.js"></script>
      <script defer src="https://unpkg.com/react-router-dom@5/umd/react-router-dom.min.js"></script>
      </script>
      <style id="mui-styles"></style> 
    </head>
    <body>
      <div id="app"></div>
      <script>
      document.addEventListener('DOMContentLoaded', function() {
        function logToParentConsole(...args) {
          const payload = args.map(arg => (typeof arg === 'object' && arg !== null) ? JSON.stringify(arg) : arg);
          window.parent.postMessage({ type: 'log', data: payload }, '*');
        }
        console.log = logToParentConsole;
        console.log('MUI:', window.MaterialUI);
        console.log('All keys in MaterialUI:', Object.keys(window.MaterialUI));
    });

      </script>
    </body>
  </html>
  `;

  // document.addEventListener('DOMContentLoaded', function() {
        
  //   function logToParentConsole(...args) {
  //     const payload = args.map(arg => (typeof arg === 'object' && arg !== null) ? JSON.stringify(arg) : arg);
  //     window.parent.postMessage({ type: 'log', data: payload }, '*');
  //   }
  //   console.log = logToParentConsole;

  //   const MaterialUI = window.MaterialUI;
  //   const ReactRouterDOM = window.ReactRouterDOM;

  //   console.log('MaterialUI:', MaterialUI);
  //   console.log('ReactRouterDOM:', ReactRouterDOM);
  //   const componentMap = {
  //     Box: MaterialUI?.Box,
  //     Button: MaterialUI?.Button,
  //     Link: ReactRouterDOM?.Link,
  //     TextField: MaterialUI?.TextField,
  //     Card: MaterialUI?.Card,
  //     CardContent: MaterialUI?.CardContent,
  //     Typography: MaterialUI?.Typography,
  //     CardActions: MaterialUI?.CardActions
  //   };
  //   const createElementFromData = (data) => {
  //     const { type, props, children } = data;
  //     const Component = componentMap[type] || 'div';
  //     return React.createElement(
  //       Component,
  //       props,
  //       children && (Array.isArray(children) ? children.map(createElementFromData) : createElementFromData(children))
  //     );
  //   };
  //   window.addEventListener('message', (event) => {
  //     console.log('event', event);
  //     const dataArr = event.data.replace(/}{/g, '},,{').replace(/}</g, '},,<').replace(/>{/g, '>,,{').split(',,');
  //     console.log('dataArr', dataArr);
  //     const container = document.getElementById('app');
  //     dataArr.forEach(segment => {
  //       if(segment.trim().startsWith('{') && segment.trim().endsWith('}')) {
  //         try {
  //           const jsonData = JSON.parse(segment);
  //           console.log('jsonData', jsonData);
  //           const component = createElementFromData(jsonData);
  //           console.log('component', component);
  //           ReactDOM.render(component, container);
  //         } catch (err) {
  //           console.error("Error parsing JSON:", err);
  //         }
  //       } else {
  //         container.insertAdjacentHTML('beforeend', segment);
  //         container.querySelectorAll('a').forEach(element => {
  //           element.addEventListener('click', (event) => {
  //             event.preventDefault();
  //             window.top.postMessage(event.currentTarget.href, '*');
  //           });
  //         });
  //       }
  //     });
  //   });

  //   const handleClickInsideIframe = () => {
  //     window.parent.postMessage('iframeClicked', '*');
  //   };
  //   const handleMouseUpInsideIframe = () => {
  //     window.parent.postMessage('iframeMouseUp', '*');
  //   };
  //   const handleMouseMoveInsideIframe = (e) => {
  //     const msgData = {
  //       type: 'iframeMouseMove',
  //       clientY: e.clientY + 70 // Adjust according to your needs
  //     };
  //     window.parent.postMessage(msgData, '*');
  //   };

  //   window.addEventListener('click', handleClickInsideIframe);
  //   window.addEventListener('mouseup', handleMouseUpInsideIframe);
  //   window.addEventListener('mousemove', handleMouseMoveInsideIframe);  
  // });

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
  // const componentBuilder = (array: any, key: number = 0) => {
  //   const componentsToRender = [];
  //   for (const element of array) {
  //     if (element.name !== 'separator') {
  //       const elementType = element.name;
  //       console.log('elementType', elementType)
  //       const childId = element.childId;
  //       const elementStyle = element.style;
  //       const innerText = element.attributes.compText;
  //       const classRender = element.attributes.cssClasses;
  //       const activeLink = element.attributes.compLink;
  //       let renderedChildren;
  //       if (element.type === 'MUI Component') {
  //         collectMUIImports(element, MUITypes, muiImports)
  //       }
  //       if (
  //         elementType !== 'input' &&
  //         elementType !== 'img' &&
  //         elementType !== 'Image' &&
  //         element.children.length > 0
  //       ) {
  //         renderedChildren = componentBuilder(element.children);
  //       }
  //       if (elementType === 'input')
  //         componentsToRender.push(
  //           <Box
  //             component={elementType}
  //             className={classRender}
  //             style={elementStyle}
  //             key={key}
  //             id={`rend${childId}`}
  //           ></Box>
  //         );
  //       else if (elementType === 'img')
  //         componentsToRender.push(
  //           <Box
  //             component={elementType}
  //             src={activeLink}
  //             className={classRender}
  //             style={elementStyle}
  //             key={key}
  //             id={`rend${childId}`}
  //           ></Box>
  //         );
  //       else if (elementType === 'Image')
  //         componentsToRender.push(
  //           <Box
  //             component="img"
  //             src={activeLink}
  //             className={classRender}
  //             style={elementStyle}
  //             key={key}
  //             id={`rend${childId}`}
  //           ></Box>
  //         );
  //       else if (elementType === 'a' || elementType === 'Link')
  //         componentsToRender.push(
  //           <Box
  //             component="a"
  //             href={activeLink}
  //             className={classRender}
  //             style={elementStyle}
  //             key={key}
  //             id={`rend${childId}`}
  //           >
  //             {innerText}
  //             {renderedChildren}
  //           </Box>,
  //         );
  //       else if (elementType === 'Switch')
  //         componentsToRender.push(<Switch>{renderedChildren}</Switch>);
  //       else if (elementType === 'Route')
  //         componentsToRender.push(
  //           <Route exact path={activeLink}>
  //             {renderedChildren}
  //           </Route>
  //         );
  //       else
  //         componentsToRender.push(
  //           <Box
  //             component={elementType}
  //             className={classRender}
  //             style={elementStyle}
  //             key={key}
  //             id={`rend${childId}`}
  //           >
  //             {innerText}
  //             {renderedChildren}
  //           </Box>
  //         );
  //       key += 1;
  //     }
  //   }
  //   console.log('componentstoRender array line 196', componentsToRender)
  //   return componentsToRender;
  // };

  // window.addEventListener("message", receiveMessage, false);

  // function receiveMessage(event) {
  // // Always verify origin
  // if (event.origin !== serverConfig.API_BASE_URL2) return;

  // console.log("Received:", event.data);
  // }

  window.addEventListener('message', function(event) {
    if (event.origin !== serverConfig.API_BASE_URL2) return; // Ensure you replace this with your actual iframe origin

    if (event.data.type === 'log') {
        console.log('Iframe log:', event.data.data.map(item => {
            try {
                return JSON.parse(item);  // Try to parse each item in case it is a JSON string
            } catch {
                return item;  // If not a JSON string, return the original item
            }
        }));
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
        let renderedChildren = element.children && element.children.length > 0 ? componentBuilder2(element.children, ++key) : undefined;
      const shouldSerialize = (element.type === 'MUI Component') ? true : false;
        if (shouldSerialize) {
          const baseData = MUITypes.find((m) => m.tag === elementType).componentData;
          console.log('baseData', baseData)
          if (!baseData) return null;
          const componentData = { ...baseData,
            props: {
              ...(baseData.props || {}), 
              key: key++,
            },
            children: renderedChildren,
          }
          componentsToRender.push(JSON.stringify(componentData));
          
          // const serializedHtmlContent = JSON.stringify(htmlContent);

        } else {
          let Component;
            switch (elementType) {
              case 'input':
                Component = 'input'
                break;
              case 'img':
              case 'Image':
                Component = 'img'
                break;
              case 'a':
                Component = 'a'
                break;
              case 'Switch':
                Component = 'Switch'
                break;
              case 'Route':
                Component = 'Route'
                break;
              default:
                Component = elementType
                break;
            }
          const childrenContent = [];
          if (innerText) childrenContent.push(innerText);
          if (renderedChildren) childrenContent.push(...renderedChildren);
          const props = {
            ...element.attributes,
            className: classRender,
            style: elementStyle,
            key: key,
            id: `rend${childId}`,
            ...(elementType === 'img' || elementType === 'Image' ? { src: activeLink } : {}),
            ...(elementType === 'a' || elementType === 'Link' ? { href: activeLink } : {}),
          }

          componentsToRender.push(
            <Component {...props}>
              {childrenContent.length > 0 ? childrenContent.map((child, index) => (
                <React.Fragment key={index}>{child}</React.Fragment>
              )) : null}
            </Component>
          );
        }
        key++;
    }
    return componentsToRender
  }
  //initializes our 'code' which will be whats actually in the iframe in the demo render
  //this will reset every time we make a change
  let code = '';

  const currComponent = state.components.find(
    (element) => element.id === state.canvasFocus.componentId
  );
  
  componentBuilder2(currComponent.children).forEach((element) => { 
    if (typeof element === 'string') {
      console.log('element', element)
      code += element;
    } else if (React.isValidElement(element)) {
      console.log('valid react element', element)
        try {
          const reactDomStringRender = ReactDOMServer.renderToString(element);
          code += ReactDOMServer.renderToString(element);
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

//   useEffect(() => {
//     const handleLoad = () => {
//         iframe.current.contentWindow.postMessage(code, '*');
//     };

//     const iframeElement = iframe.current;
//     iframeElement.addEventListener('load', handleLoad);

//     // Clean up the event listener when the component unmounts or code changes
//     return () => {
//       iframeElement.removeEventListener('load', handleLoad);
//     };
// }, [code]); 

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


// (2) ['All Window Keys:', Array(230)]
// 0
// : 
// "All Window Keys:"
// 1
// : 
// Array(230)
// [0 … 99]
// 0
// : 
// "window"
// 1
// : 
// "self"
// 2
// : 
// "document"
// 3
// : 
// "name"
// 4
// : 
// "location"
// 5
// : 
// "customElements"
// 6
// : 
// "history"
// 7
// : 
// "navigation"
// 8
// : 
// "locationbar"
// 9
// : 
// "menubar"
// 10
// : 
// "personalbar"
// 11
// : 
// "scrollbars"
// 12
// : 
// "statusbar"
// 13
// : 
// "toolbar"
// 14
// : 
// "status"
// 15
// : 
// "closed"
// 16
// : 
// "frames"
// 17
// : 
// "length"
// 18
// : 
// "top"
// 19
// : 
// "opener"
// 20
// : 
// "parent"
// 21
// : 
// "frameElement"
// 22
// : 
// "navigator"
// 23
// : 
// "origin"
// 24
// : 
// "external"
// 25
// : 
// "screen"
// 26
// : 
// "innerWidth"
// 27
// : 
// "innerHeight"
// 28
// : 
// "scrollX"
// 29
// : 
// "pageXOffset"
// 30
// : 
// "scrollY"
// 31
// : 
// "pageYOffset"
// 32
// : 
// "visualViewport"
// 33
// : 
// "screenX"
// 34
// : 
// "screenY"
// 35
// : 
// "outerWidth"
// 36
// : 
// "outerHeight"
// 37
// : 
// "devicePixelRatio"
// 38
// : 
// "clientInformation"
// 39
// : 
// "screenLeft"
// 40
// : 
// "screenTop"
// 41
// : 
// "styleMedia"
// 42
// : 
// "onsearch"
// 43
// : 
// "isSecureContext"
// 44
// : 
// "trustedTypes"
// 45
// : 
// "performance"
// 46
// : 
// "onappinstalled"
// 47
// : 
// "onbeforeinstallprompt"
// 48
// : 
// "crypto"
// 49
// : 
// "indexedDB"
// 50
// : 
// "sessionStorage"
// 51
// : 
// "localStorage"
// 52
// : 
// "onbeforexrselect"
// 53
// : 
// "onabort"
// 54
// : 
// "onbeforeinput"
// 55
// : 
// "onbeforematch"
// 56
// : 
// "onbeforetoggle"
// 57
// : 
// "onblur"
// 58
// : 
// "oncancel"
// 59
// : 
// "oncanplay"
// 60
// : 
// "oncanplaythrough"
// 61
// : 
// "onchange"
// 62
// : 
// "onclick"
// 63
// : 
// "onclose"
// 64
// : 
// "oncontentvisibilityautostatechange"
// 65
// : 
// "oncontextlost"
// 66
// : 
// "oncontextmenu"
// 67
// : 
// "oncontextrestored"
// 68
// : 
// "oncuechange"
// 69
// : 
// "ondblclick"
// 70
// : 
// "ondrag"
// 71
// : 
// "ondragend"
// 72
// : 
// "ondragenter"
// 73
// : 
// "ondragleave"
// 74
// : 
// "ondragover"
// 75
// : 
// "ondragstart"
// 76
// : 
// "ondrop"
// 77
// : 
// "ondurationchange"
// 78
// : 
// "onemptied"
// 79
// : 
// "onended"
// 80
// : 
// "onerror"
// 81
// : 
// "onfocus"
// 82
// : 
// "onformdata"
// 83
// : 
// "oninput"
// 84
// : 
// "oninvalid"
// 85
// : 
// "onkeydown"
// 86
// : 
// "onkeypress"
// 87
// : 
// "onkeyup"
// 88
// : 
// "onload"
// 89
// : 
// "onloadeddata"
// 90
// : 
// "onloadedmetadata"
// 91
// : 
// "onloadstart"
// 92
// : 
// "onmousedown"
// 93
// : 
// "onmouseenter"
// 94
// : 
// "onmouseleave"
// 95
// : 
// "onmousemove"
// 96
// : 
// "onmouseout"
// 97
// : 
// "onmouseover"
// 98
// : 
// "onmouseup"
// 99
// : 
// "onmousewheel"
// [100 … 199]
// 100
// : 
// "onpause"
// 101
// : 
// "onplay"
// 102
// : 
// "onplaying"
// 103
// : 
// "onprogress"
// 104
// : 
// "onratechange"
// 105
// : 
// "onreset"
// 106
// : 
// "onresize"
// 107
// : 
// "onscroll"
// 108
// : 
// "onsecuritypolicyviolation"
// 109
// : 
// "onseeked"
// 110
// : 
// "onseeking"
// 111
// : 
// "onselect"
// 112
// : 
// "onslotchange"
// 113
// : 
// "onstalled"
// 114
// : 
// "onsubmit"
// 115
// : 
// "onsuspend"
// 116
// : 
// "ontimeupdate"
// 117
// : 
// "ontoggle"
// 118
// : 
// "onvolumechange"
// 119
// : 
// "onwaiting"
// 120
// : 
// "onwebkitanimationend"
// 121
// : 
// "onwebkitanimationiteration"
// 122
// : 
// "onwebkitanimationstart"
// 123
// : 
// "onwebkittransitionend"
// 124
// : 
// "onwheel"
// 125
// : 
// "onauxclick"
// 126
// : 
// "ongotpointercapture"
// 127
// : 
// "onlostpointercapture"
// 128
// : 
// "onpointerdown"
// 129
// : 
// "onpointermove"
// 130
// : 
// "onpointerrawupdate"
// 131
// : 
// "onpointerup"
// 132
// : 
// "onpointercancel"
// 133
// : 
// "onpointerover"
// 134
// : 
// "onpointerout"
// 135
// : 
// "onpointerenter"
// 136
// : 
// "onpointerleave"
// 137
// : 
// "onselectstart"
// 138
// : 
// "onselectionchange"
// 139
// : 
// "onanimationend"
// 140
// : 
// "onanimationiteration"
// 141
// : 
// "onanimationstart"
// 142
// : 
// "ontransitionrun"
// 143
// : 
// "ontransitionstart"
// 144
// : 
// "ontransitionend"
// 145
// : 
// "ontransitioncancel"
// 146
// : 
// "onafterprint"
// 147
// : 
// "onbeforeprint"
// 148
// : 
// "onbeforeunload"
// 149
// : 
// "onhashchange"
// 150
// : 
// "onlanguagechange"
// 151
// : 
// "onmessage"
// 152
// : 
// "onmessageerror"
// 153
// : 
// "onoffline"
// 154
// : 
// "ononline"
// 155
// : 
// "onpagehide"
// 156
// : 
// "onpageshow"
// 157
// : 
// "onpopstate"
// 158
// : 
// "onrejectionhandled"
// 159
// : 
// "onstorage"
// 160
// : 
// "onunhandledrejection"
// 161
// : 
// "onunload"
// 162
// : 
// "crossOriginIsolated"
// 163
// : 
// "scheduler"
// 164
// : 
// "alert"
// 165
// : 
// "atob"
// 166
// : 
// "blur"
// 167
// : 
// "btoa"
// 168
// : 
// "cancelAnimationFrame"
// 169
// : 
// "cancelIdleCallback"
// 170
// : 
// "captureEvents"
// 171
// : 
// "clearInterval"
// 172
// : 
// "clearTimeout"
// 173
// : 
// "close"
// 174
// : 
// "confirm"
// 175
// : 
// "createImageBitmap"
// 176
// : 
// "fetch"
// 177
// : 
// "find"
// 178
// : 
// "focus"
// 179
// : 
// "getComputedStyle"
// 180
// : 
// "getSelection"
// 181
// : 
// "matchMedia"
// 182
// : 
// "moveBy"
// 183
// : 
// "moveTo"
// 184
// : 
// "open"
// 185
// : 
// "postMessage"
// 186
// : 
// "print"
// 187
// : 
// "prompt"
// 188
// : 
// "queueMicrotask"
// 189
// : 
// "releaseEvents"
// 190
// : 
// "reportError"
// 191
// : 
// "requestAnimationFrame"
// 192
// : 
// "requestIdleCallback"
// 193
// : 
// "resizeBy"
// 194
// : 
// "resizeTo"
// 195
// : 
// "scroll"
// 196
// : 
// "scrollBy"
// 197
// : 
// "scrollTo"
// 198
// : 
// "setInterval"
// 199
// : 
// "setTimeout"
// [200 … 229]
// 200
// : 
// "stop"
// 201
// : 
// "structuredClone"
// 202
// : 
// "webkitCancelAnimationFrame"
// 203
// : 
// "webkitRequestAnimationFrame"
// 204
// : 
// "chrome"
// 205
// : 
// "fence"
// 206
// : 
// "caches"
// 207
// : 
// "cookieStore"
// 208
// : 
// "ondevicemotion"
// 209
// : 
// "ondeviceorientation"
// 210
// : 
// "ondeviceorientationabsolute"
// 211
// : 
// "launchQueue"
// 212
// : 
// "sharedStorage"
// 213
// : 
// "documentPictureInPicture"
// 214
// : 
// "getScreenDetails"
// 215
// : 
// "queryLocalFonts"
// 216
// : 
// "showDirectoryPicker"
// 217
// : 
// "showOpenFilePicker"
// 218
// : 
// "showSaveFilePicker"
// 219
// : 
// "originAgentCluster"
// 220
// : 
// "onpagereveal"
// 221
// : 
// "credentialless"
// 222
// : 
// "speechSynthesis"
// 223
// : 
// "onscrollend"
// 224
// : 
// "webkitRequestFileSystem"
// 225
// : 
// "webkitResolveLocalFileSystemURL"
// 226
// : 
// "MaterialUI"
// 227
// : 
// "React"
// 228
// : 
// "ReactDOM"
// 229
// : 
// "ReactRouterDOM"

