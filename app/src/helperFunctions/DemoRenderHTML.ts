/**
 * HTML content for an iframe.
 * This HTML code is designed to be loaded within an iframe and handles various interactions such as message passing, dependency loading, and component rendering based on incoming data.
 * @typedef {string} IframeHTML
 */
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
        const { styled } = MaterialUI;
        const ReactRouterDOM = window.ReactRouterDOM;
        const React = window.React;
        const { useState, createContext, useContext } = React;
        const ReactDOM = window.ReactDOM;

        console.log('MaterialUI:', MaterialUI);
  
        if (!MaterialUI || !ReactRouterDOM || !React || !ReactDOM) {
          console.error('Dependency loading failed: MaterialUI, React, or ReactDOM is undefined.');
          return;
        }

        const itemData = [
          {
            img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
            title: 'Breakfast',
          },
          {
            img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
            title: 'Burger',
          },
          {
            img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
            title: 'Camera',
          },
          {
            img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
            title: 'Coffee',
          },
          {
            img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
            title: 'Hats',
          },
          {
            img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
            title: 'Honey',
          },
          {
            img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
            title: 'Basketball',
          },
          {
            img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
            title: 'Fern',
          },
          {
            img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
            title: 'Mushrooms',
          },
          {
            img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
            title: 'Tomato basil',
          },
          {
            img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
            title: 'Sea star',
          },
          {
            img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
            title: 'Bike',
          },
        ];

        const ImageListComponent = () => {
          const imageListProps = {
              sx: { width: 500, height: 450 },
              cols: 3,
              rowHeight: 164
          };
      
          const imageListItems = itemData.map((item, index) => {
            const srcSet = item.img + '?w=164&h=164&fit=crop&auto=format&dpr=2 2x';
            const src = item.img + '?w=164&h=164&fit=crop&auto=format';

              const imageProps = {
                  srcSet: srcSet,
                  src: src,
                  alt: item.title,
                  loading: "lazy"
              };
      
              const imageItemProps = { key: index };
      
              return React.createElement(
                  MaterialUI.ImageListItem,
                  imageItemProps,
                  React.createElement("img", imageProps)
              );
          });
      
          return React.createElement(
              MaterialUI.ImageList,
              imageListProps,
              imageListItems
          );
        };
          
          function a11yProps(index) {
            const props = {};
            props.id = 'simple-tab-' + index;
            props['aria-controls'] = 'simple-tabpanel-' + index;
            return props;
          }

          // Context provides a way to pass data through the component tree without having to pass props down manually at every level.
          const PopoverContext = createContext();

          // The PopoverProvider component returns the result of React.createElement function, creating a PopoverContext.Provider component with the provided value and wrapping around the children.
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
        // This is a custom hook named usePopover. It utilizes the useContext hook from React to consume the PopoverContext created earlier.
        // It returns the context value, allowing components to access the anchorEl, handleOpen, and handleClose functions within the popover context.
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

      const TabsContext = createContext();

      const TabsProvider = ({ children }) => {
          const [value, setValue] = React.useState(0);
          const handleChange = (event, newValue) => {
            setValue(newValue);
          };

          const valueObj = {
            value,
            handleChange
          };

          const providerCheck = React.createElement(
            TabsContext.Provider,
            { value: valueObj },
            children
        );
          return providerCheck;
      };

      const useTabs = () => useContext(TabsContext);

      const CustomTabPanel = (props, children, useState, useContext) => {
        const { value, hidden, id, index } = props;
        const role = "tabpanel";
        const ariaLabelledBy = 'simple-tab-' + index;
      
        return React.createElement(
          'div',
          { role, hidden, id, 'aria-labelledby': ariaLabelledBy, ...props },
          value === index && React.createElement(
            MaterialUI.Box,
            { sx: { p: 3 } },
            React.createElement(MaterialUI.Typography, null, children)
          )
        );
      };

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
          CustomTabPanel: (props, useState, useContext) => {
            // Extract required values using useContext
            const { value } = useTabs();
            // Extract props from the argument
            const { index } = props;
        
            // Determine if the tab panel should be hidden based on the comparison between value and index
            const hidden = value !== index;
        
            // Create an ID for the tab panel
            const id = hidden ? undefined: 'simple-tabpanel-' + index;
        
            // Return updated props
            return {
              ...props,
                hidden,
                id,
                value: value,
            };
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
          Snackbar: (props, useState, useContext) => {
            const { open, handleClose } = useModal();

            const action = React.createElement(
              React.Fragment,
              null,
              React.createElement(
                MaterialUI.Button,
                { color: "secondary", size: "small", onClick: handleClose },
                "UNDO"
              ),
              React.createElement(
                MaterialUI.IconButton,
                { size: "small", "aria-label": "close", color: "inherit", onClick: handleClose },
                React.createElement(MaterialUI.SpeedDialIcon, { fontSize: "small", style: { transform: "rotate(45deg)" } })
              )
            );
    
            return {
                ...props,
                open: Boolean(open),
                onClose: handleClose,
                action: action,
            };
          },
          Tabs: (props, useState, useContext) => {
            const { value, handleChange } = useTabs ();
            
            return {
              ...props,
              value: value,
              onChange: handleChange,
            };
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

          if (type === 'ImageList') {
            return ImageListComponent();
          }

          // Handle creation of Tab component
          if (type === 'Tab') {
            // Extract props
            const { label, ...otherProps } = props;
            
            // Invoke a11yProps function to get accessibility props
            const accessibilityProps = a11yProps(props.index);

            // Return the Tab component with its props
            return React.createElement(MaterialUI.Tab, { label, ...accessibilityProps, ...otherProps });
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
                    // Check if the child is an Item object and create a component accordingly
                    if (child.type === 'Item') {
                        // Define the Item component with styled(MaterialUI.Paper)
                        const Item = styled(MaterialUI.Paper)(({ backgroundColor, textColor }) => ({
                            backgroundColor: backgroundColor || '#1A2027',
                            color: textColor || '#FFFFFF',
                            padding: '8px', // Adjust padding as needed
                            textAlign: 'center',
                        }));
            
                        // Extract props and children from the child object
                        const { props, children } = child;
            
                        // Return the created Item component with its props and children
                        return React.createElement(Item, props, children);
                    } else {
                        // Recursively process other types of objects
                        return createComponentFromData(child);
                    }
                }
                return null;
              };

              console.log('Final props for component:', type, configuredProps);

              // If the component is a Grid with children of type Item, process them
              if (type === 'Grid' && Array.isArray(children)) {
                const updatedChildren = children.map(processChildren);
                return React.createElement(Component, configuredProps, ...updatedChildren);
              }

              const processedChildren = Array.isArray(children) ?
              children.map(processChildren) :
                  [processChildren(children)].filter(child => child !== null);

              if (type === 'CustomTabPanel') {

                // Return the created CustomTabPanel component with its props and children
                return CustomTabPanel(configuredProps, ...processedChildren);
              }

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
                  jsonData.children = [...jsonData.children, ...jsonData.props.children];
                }
                const componentContainer = document.createElement('div');
                container.appendChild(componentContainer);
                const component = createComponentFromData(jsonData);
                console.log('component', component)
                let correctProvider;
                // variable to hold the correct provider
                if (Array.isArray(jsonData.children) && jsonData.children.some(child => child.type === 'Modal' || child.type === 'Backdrop' || child.type === 'Dialog' || child.type === 'Snackbar')) {
                  correctProvider = ModalProvider;
                }
                if (Array.isArray(jsonData.children) && jsonData.children.some(child => child.type === 'Popover')) {
                  correctProvider = PopoverProvider;
                }
                if (Array.isArray(jsonData.children) && jsonData.children.some(child => child.type === 'Popper')) {
                  correctProvider = PopperProvider;
                }
                if (
                  jsonData.children &&
                  Array.isArray(jsonData.children) &&
                  jsonData.children.length > 0 &&
                  jsonData.children[0].type === 'Box'
                ) {
                    correctProvider = TabsProvider;       
                }
                if (
                  jsonData.children &&
                  Array.isArray(jsonData.children) &&
                  jsonData.children.length > 0 &&
                  jsonData.children[0].type === 'FormControlLabel' &&
                  jsonData.children[0].props &&
                  jsonData.children[0].props.role === 'transition'
                ) {
                  correctProvider = TransitionProvider;
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

export default html;
