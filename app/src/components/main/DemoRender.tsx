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
    <script defer src="https://unpkg.com/react@17/umd/react.production.min.js"></script>
    <script defer src="https://unpkg.com/react-dom@17/umd/react-dom.production.min.js"></script>
    <script defer src="https://unpkg.com/react-router-dom@5/umd/react-router-dom.min.js"></script>
    <script defer src="https://unpkg.com/@mui/material@5.15.15/umd/material-ui.production.min.js"></script>
    <style id="mui-styles"></style>
  </head>
  <body>
    <div id="app"></div>
    <script>
      document.addEventListener('DOMContentLoaded', function() {

        function logToParentConsole(...args) {
          const cache = new Set(); // Set to keep track of all objects being stringified
          const payload = args.map(arg => {
              if (typeof arg === 'function') {
                  return arg.toString(); // Serialize function as its source code
              } else if (typeof arg === 'object' && arg !== null) {
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
        const { useState, createContext, useContext } = React;
        const ReactDOM = window.ReactDOM;

        console.log('MaterialUI:', MaterialUI);
  
        if (!MaterialUI || !ReactRouterDOM || !React || !ReactDOM) {
          console.error('Dependency loading failed: MaterialUI, React, or ReactDOM is undefined.');
          return;
        }
  
        function createData(name, calories, fat, carbs, protein) {
          return { name, calories, fat, carbs, protein };
        }
  
        const rows = [
          createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
          createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
          createData('Eclair', 262, 16.0, 24, 6.0),
          createData('Cupcake', 305, 3.7, 67, 4.3),
          createData('Gingerbread', 356, 16.0, 49, 3.9),
        ];

        // if (type === 'TableBody') {
          //   console.log('Processing TableBody with rows:', rows);
          //   children = rows.map(row => {
          //     console.log('Processing row:', row);
          //     return {
          //       type: 'TableRow',
          //       props: { key: row.name },
          //       children: [
          //         { type: 'TableCell', props: { component: 'th', scope: 'row' }, children: row.name },
          //         { type: 'TableCell', props: { align: 'right' }, children: String(row.calories) },
          //         { type: 'TableCell', props: { align: 'right' }, children: String(row.fat) },
          //         { type: 'TableCell', props: { align: 'right' }, children: String(row.carbs) },
          //         { type: 'TableCell', props: { align: 'right' }, children: String(row.protein) },
          //       ]
          //     };
          //   });
          // }
          // console.log('post tableBody check', children);

          const PopoverContext = createContext();

          const PopoverProvider = ({ children }) => {
            const [anchorEl, setAnchorEl] = useState(null);
        
            const handleOpen = (event) => setAnchorEl(event.currentTarget);
            const handleClose = () => setAnchorEl(null);
        
            const value = {
                anchorEl,
                handleOpen,
                handleClose
            };
            
            const providerCheck = React.createElement(
              PopoverContext.Provider,
              { value: value },
              children
          );
            return providerCheck;
        };
        
        const usePopover = () => useContext(PopoverContext);

        const PopperContext = createContext();

        const PopperProvider = ({ children }) => {
            const [anchorEl, setAnchorEl] = useState(null);
            const handleClick = (event) => {
                setAnchorEl(anchorEl ? null : event.currentTarget);
            };

            const value = {
                anchorEl,
                handleClick
            };

            const providerCheck = React.createElement(
              PopperContext.Provider,
              { value: value },
              children
          );
            return providerCheck;
        };

        const usePopper = () => useContext(PopperContext);

        const ModalContext = createContext();

        const ModalProvider = ({ children }) => {
          const [open, setOpen] = React.useState(false);
      
          const handleOpen = () => setOpen(true);
          const handleClose = () => setOpen(false);
      
          const value = {
              open,
              handleOpen,
              handleClose
          };
          
          const providerCheck = React.createElement(
            ModalContext.Provider,
            { value: value },
            children
        );
          return providerCheck;
      };
      
      const useModal = () => useContext(ModalContext);

      const TransferListContext = createContext();

      const TransferListProvider = ({ children }) => {
        const [checked, setChecked] = React.useState([]);
        const [left, setLeft] = React.useState([0, 1, 2, 3]);
        const [right, setRight] = React.useState([4, 5, 6, 7]);
      
        const handleToggle = (value) => () => {
          const currentIndex = checked.indexOf(value);
          const newChecked = [...checked];
      
          if (currentIndex === -1) {
            newChecked.push(value);
          } else {
            newChecked.splice(currentIndex, 1);
          }
      
          setChecked(newChecked);
        };
      
        const handleCheckedRight = () => {
          setRight(right.concat(leftChecked(checked, left)));
          setLeft(not(left, leftChecked(checked, left)));
          setChecked(not(checked, leftChecked(checked, left)));
        };
      
        const handleCheckedLeft = () => {
          setLeft(left.concat(rightChecked(checked, right)));
          setRight(not(right, rightChecked(checked, right)));
          setChecked(not(checked, rightChecked(checked, right)));
        };
      
        const handleAllLeft = () => {
          setLeft(left.concat(right));
          setRight([]);
        };
      
        const handleAllRight = () => {
          setRight(right.concat(left));
          setLeft([]);
        };
      
        const value = {
          checked,
          setChecked,
          left,
          setLeft,
          right,
          setRight,
          handleToggle,
          handleAllRight,
          handleCheckedRight,
          handleCheckedLeft,
          handleAllLeft,
        };
      
        const providerCheck = React.createElement(
          TransferListContext.Provider,
          { value: value },
          children
        );
        return providerCheck;
      };

      const useTransferList = () => useContext(TransferListContext);

      const TransitionContext = createContext();

      // Provider for Transition
      const TransitionProvider = ({ children }) => {
        const [checked, setChecked] = useState(false);

        const handleChange = () => {
          setChecked((prev) => !prev);
        };

        const value = {
          checked,
          handleChange,
        };

        const providerCheck = React.createElement(
          TransitionContext.Provider,
          { value: value },
          children
        );
        return providerCheck;
      };

      const useTransition = () => useContext(TransitionContext);

        const componentConfigs = {
          Backdrop: (props, useState, useContext) => {
            if (props.role === 'backDrop') {
              const { open, handleClose } = useModal();
    
              return {
                  ...props,
                  open: Boolean(open),
                  onClick: handleClose,
              };
            }
          },
          Box: (props, useState, useContext) => {
            if (props.role === 'modalTrigger') {
                const style = {
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                };
                return {
                    ...props,
                    sx: style
                };
            }
            // Check if the role is 'collapseBox' and apply it to the children if needed
            if (props.role === 'collapseBox') {
                const updatedChildren = Array.isArray(props.children) ? props.children.map(child => {
                    // Check if the child is a div with the role 'collapseDiv'
                    if (child.type === 'div' && child.props && child.props.role === 'collapseDiv') {
                        // Replace 'icon' children with the SVG icon
                        const updatedChildChildren = Array.isArray(child.children) ? child.children.map(grandChild => {
                            if (grandChild.type === 'Collapse' && grandChild.children === 'icon') {
                                const icon = React.createElement(
                                    'svg',
                                    null,
                                    React.createElement(
                                        'polygon',
                                        {
                                            points: '0,100 50,0 100,100',
                                            fill: 'white',
                                            stroke: 'black',
                                            strokeWidth: '1'
                                        }
                                    )
                                );
                                return icon;
                            }
                            return grandChild;
                        }) : child.children;
        
                        return {
                            ...child,
                            children: updatedChildChildren
                        };
                    }
                    return child;
                }) : props.children;
        
                return {
                    ...props,
                    children: updatedChildren
                };
            }
        
            // If the role is not 'collapseBox', return the original props
            return props;
          },
          Button: (props, useState, useContext) => {
                   
              if (props.role === 'popoverTrigger') {
                const { handleOpen } = usePopover();
                  return {
                      ...props,
                      onClick: handleOpen
                  };
              }
              if (props.role === 'popperTrigger') {
                const { handleClick } = usePopper();
                return {
                    ...props,
                    onClick: handleClick
                };
              }
              if (props.role === 'modalTrigger') {
                const { handleOpen } = useModal();
                return {
                    ...props,
                    onClick: handleOpen
                };
              }
              if (props.role === 'dialog') {
                const { handleClose } = useModal();
                return {
                    ...props,
                    onClick: handleClose
                };
              }
              if (props.role === 'rightAll') {
                return {
                  ...props,
                  onClick: handleAllRight,
                  disabled: left.length === 0
                };
              } 
              if (props.role === 'right') {
                return {
                  ...props,
                  onClick: handleCheckedRight,
                  disabled: left.filter(item => checked.includes(item)).length === 0
                };
              }
              
              if (props.role === 'left') {
                return {
                  ...props,
                  onClick: handleCheckedLeft,
                  disabled: right.filter(item => checked.includes(item)).length === 0
                };
              }
              
              if (props.role === 'leftAll') {
                return {
                  ...props,
                  onClick: handleAllLeft,
                  disabled: right.length === 0
                };
              }    
              return props;
          },
          Dialog: (props, useState, useContext) => {
            if (props.role === 'dialog') {
              const { open, handleClose } = useModal();
    
              return {
                  ...props,
                  open: Boolean(open),
                  onClose: handleClose,
              };
            }
          },
          Modal: (props, useState, useContext) => {
            const { open, handleClose } = useModal();
    
            return {
                ...props,
                open: Boolean(open),
                onClose: handleClose,
            };
          },
          Popover: (props, useState, useContext) => {
              const { anchorEl, handleClose } = usePopover();
      
              return {
                  ...props,
                  open: Boolean(anchorEl),
                  anchorEl: anchorEl,
                  onClose: handleClose,
                  id: anchorEl ? 'simple-popover' : undefined,
              };
          },
          Popper: (props) => {
            const { anchorEl } = usePopper();
    
            return {
                ...props,
                open: Boolean(anchorEl),
                anchorEl: anchorEl,
                id: open ? "simple-popper" : undefined,
            };
          },
          Autocomplete: (props, useState) => {
              // Assuming renderInput needs to be a function creating a TextField with specific props
              if (typeof props.renderInput === 'string') {
                  props.renderInput = (params) => React.createElement(MaterialUI.TextField, {
                      ...params,
                      label: props.renderInput  // Use the string as label, or customize as needed
                  });
              }
              props.options = [
                  { label: 'The Shawshank Redemption', year: 1994 },
                  { label: 'The Godfather', year: 1972 },
                  { label: 'The Godfather: Part II', year: 1974 },
                  { label: 'The Dark Knight', year: 2008 },
                  { label: '12 Angry Men', year: 1957 },
              ];
      
              return props;
          },
          FormControlLabel: (props, useState) => {
              // Handle the case where the control needs to be a specific MUI component
              if (props.control && props.control.type === 'Radio') {
                props.control = React.createElement(MaterialUI.Radio);
            }
            if (props.role === 'transition') {
                const { checked, handleChange } = useTransition();

                const switchComponent = React.createElement(MaterialUI.Switch, { checked: checked, onChange: handleChange });
                return {
                    ...props,
                    control: switchComponent
                };
            }
            return props;
          },
          TransferList: (props, useState, useContext) => {
            // Access context values and functions from the TransferListProvider
            const { checked, left, right, handleToggle, handleAllRight, handleCheckedRight, handleCheckedLeft, handleAllLeft } = useTransferList();
          
            // Modify props accordingly based on context values and functions
            const modifiedProps = {
              ...props,
              checked,
              left,
              right,
              handleToggle,
              handleAllRight,
              handleCheckedRight,
              handleCheckedLeft,
              handleAllLeft
            }
          
            return modifiedProps;
          },
          Collapse: (props, useState, useContext) => {
            const { checked } = useTransition();
            if (props.role === 'collapse') {

              return {
                ...props,
                in: Boolean(checked) 
              };
            }
            return props;
          }
          // Additional components can be configured similarly
        };
  
        const isJsonString = (str) => {
          try {
            return JSON.parse(str);
          } catch (e) {
            return false;
          }
        };
  
        const createComponentFromData = (data) => {
          const { type, props } = data;
          let { children } = data;
          const Component = MaterialUI[type] || 'div';
          
          console.log('createComponentFromData Component', Component)
  
          if (Component === undefined) {
            console.error(\`Component type \${type} is undefined.\`);
            return null;
          }

          // Dynamic component using configurations
          const DynamicComponent = () => {
              let configuredProps = {...props};

              // Apply specific configuration if exists
              if (componentConfigs[type]) {
                  configuredProps = componentConfigs[type](configuredProps, useState);
                  console.log('configuredProps', configuredProps)
              }

              // Process children components recursively
              const processChildren = (child) => {
                  if (typeof child === 'string') {
                      // Check if child is a JSON string to parse and create a component
                      if (/^\s*\{.*\}\s*$/.test(child)) {
                          return createComponentFromData(JSON.parse(child));
                      }
                      return child;
                  } else if (typeof child === 'object' && child !== null) {
                      return createComponentFromData(child);
                  }
                  return null;
              };

              console.log('Final props for component:', type, configuredProps);

              const processedChildren = Array.isArray(children) ?
              children.map(processChildren) :
                  [processChildren(children)].filter(child => child !== null);

              return React.createElement(Component, configuredProps, ...processedChildren);
            };

          return React.createElement(DynamicComponent);
      };
        
        window.addEventListener('message', (event) => {
          const dataArr = event.data.replace(/}{/g, '}|||{').replace(/}</g, '}|||<').replace(/>{/g, '>|||{').split('|||');
          const container = document.getElementById('app');
          container.innerHTML = '';
          dataArr.forEach(segment => {
            if(segment.trim().startsWith('{') && segment.trim().endsWith('}')) {
              try {
                const jsonData = JSON.parse(segment);
                console.log('jsonData', jsonData);
                if (jsonData.props && jsonData.props.children) {
                  jsonData.children = jsonData.children || [];
                  // console.log('jsonData.props.children', jsonData.props.children);
                  jsonData.children = [...jsonData.children, ...jsonData.props.children];
                }
                const componentContainer = document.createElement('div');
                container.appendChild(componentContainer);
                const component = createComponentFromData(jsonData);
                console.log('component', component)
                let correctProvider;
                // variable to hold the correct provider
                if (Array.isArray(jsonData.children) && jsonData.children.some(child => child.type === 'Modal' || child.type === 'Backdrop' || child.type === 'Dialog')) {
                  correctProvider = ModalProvider
                  console.log('correctProvider', correctProvider)
                }
                if (Array.isArray(jsonData.children) && jsonData.children.some(child => child.type === 'Popover')) {
                  correctProvider = PopoverProvider
                  console.log('correctProvider', correctProvider)
                }
                if (Array.isArray(jsonData.children) && jsonData.children.some(child => child.type === 'Popper')) {
                  correctProvider = PopperProvider
                  console.log('correctProvider', correctProvider)
                }
                if (
                  jsonData.children &&
                  Array.isArray(jsonData.children) &&
                  jsonData.children.length > 0 &&
                  jsonData.children[0].type === 'FormControlLabel' &&
                  jsonData.children[0].props &&
                  jsonData.children[0].props.role === 'transition'
                ) {
                  correctProvider = TransitionProvider
                  console.log('correctProvider', correctProvider)
                }
              
                if (jsonData.type === 'Grid' &&
                Array.isArray(jsonData.children) &&
                jsonData.children.some(child => 
                    child.type === 'customList' && 
                    child.props.items &&
                    (child.props.items === 'left' || child.props.items === 'right')
                )
                ) {
                    correctProvider = TransferListProvider;
                    console.log('correctProvider', correctProvider);
                }
                
                if(!correctProvider) {
                  console.log('div check')
                  ReactDOM.render(component, componentContainer);
                } else {
                  ReactDOM.render(
                  React.createElement(correctProvider, null, component), // Wrap the component with the correctProvider
                  componentContainer
                );
                }
              } catch (err) {
                console.error("Error parsing JSON:", err);
              }
            } else {
              container.insertAdjacentHTML('beforeend', segment);
            }
          });
        });
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

      let allChildren = [];

      if (element.componentData && element.componentData.children) {
        allChildren = [...element.componentData.children];
      }
      if (element.children && element.children.length > 0) {
        allChildren = [...allChildren, ...element.children];
      }

      let renderedChildren =
        allChildren.length > 0
          ? componentBuilder2(allChildren, ++key)
          : undefined;

      if (element.type === 'MUI Component') {
        const baseData = MUITypes.find(
          (m) => m.tag === elementType
        ).componentData;
        // console.log('baseData', baseData);
        if (!baseData) return null;
        const componentData = {
          ...baseData,
          props: {
            ...baseData.props,
            key: ++key,
            children: renderedChildren
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
    // console.log('componentsToRender', componentsToRender);
    return componentsToRender;
  };
  //initializes our 'code' which will be whats actually in the iframe in the demo render
  //this will reset every time we make a change
  let code = '';

  const currComponent = state.components.find(
    (element) => element.id === state.canvasFocus.componentId
  );
  // console.log('currComponent', currComponent);

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

  // writes our stylesheet from state to the code
  code += `<style>${stylesheet}</style>`;
  // adds the code into the iframe
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
