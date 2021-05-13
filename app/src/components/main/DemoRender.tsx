// 100% Caret
import React, {
  useState, useCallback, useContext, useEffect,
} from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import StateContext from '../../context/context';
import cssRefresher from '../../helperFunctions/cssRefresh';

// DemoRender is the full sandbox demo of our user's custom built React components. DemoRender references the design specifications stored in state to construct
// real react components that utilize hot module reloading to depict the user's prototype application.
const DemoRender = (props): JSX.Element => {
  const [components, setComponents] = useState([]);
  const [state, dispatch] = useContext(StateContext);
  const demoContainerStyle = {
    width: '100%',
    backgroundColor: '#FBFBFB',
    border: '2px Solid grey',
  };

  // This function is the heart of DemoRender it will take the array of components stored in state and dynamically construct the desired React component for the live demo
  // Material UI is utilized to incorporate the apporpriate tags with specific configuration designs as necessitated by HTML standards.
  const componentBuilder = (array: object, key: number = 0) => {
    const componentsToRender = [];
    for (const element of array) {
      if (element.name !== 'separator') {
       // console.log('detail from children array', element);
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
        else componentsToRender.push(<Box component={elementType} className={classRender} style={elementStyle} key={key} id={`rend${childId}`}>{innerText}{renderedChildren}</Box>);
        key += 1;
      }
    }
    return componentsToRender;
  };

  useEffect(() => {
    const focusIndex = state.canvasFocus.componentId - 1;
    const childrenArray = state.components[focusIndex].children;
   //console.log('Refrenced Children in State!!!', childrenArray);
    const renderedComponents = componentBuilder(childrenArray);
    setComponents(renderedComponents);
  }, [state.components, state.canvasFocus]);

  useEffect(() => {
    cssRefresher();
  }, [])


  return (
    <div id={'renderFocus'} style={demoContainerStyle}>
      {components.map((component, index) => component)}
    </div>
  );
};

export default DemoRender;
