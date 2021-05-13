
import React, {
  useState, useCallback, useContext, useEffect,
} from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import StateContext from '../../context/context';
import cssRefresher from '../../helperFunctions/cssRefresh';

const DemoRender = (props): JSX.Element => {
  const [components, setComponents] = useState([]);
  const [state, dispatch] = useContext(StateContext);
  const demoContainerStyle = {
    width: '100%',
    backgroundColor: '#FBFBFB',
    border: '2px Solid grey',
  };

  const componentBuilder = (array, key = 0) => {
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
        else componentsToRender.push(<Box component={elementType} className={classRender} style={elementStyle} key={key} id={`rend${childId}`}>{innerText}{renderedChildren}</Box>);
        key += 1;
      }
    }
    return componentsToRender;
  };

  useEffect(() => {
    const focusIndex = state.canvasFocus.componentId - 1;
    const childrenArray = state.components[focusIndex].children;
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
