// 100% Caret
import React, {
  useState, useCallback, useContext, useEffect,
} from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import './renderDemo.css';
import StateContext from '../../context/context';


const DemoRender = (props): JSX.Element => {
  const [components, setComponents] = useState([]);
  const [state, dispatch] = useContext(StateContext);
  const demoContainerStyle = {
    width: '100%',
    backgroundColor: 'lightgrey',
    border: '2px Solid grey',
  };

  const componentBuilder = (array, key = 0) => {
    const componentsToRender = [];
    for (const element of array) {
      if (element.name !== 'separator') {
        console.log('detail from children array', element);
        const elementType = element.name;
        const childId = element.childId;
        const elementStyle = element.style;
        const innerText = element.attributes.compText;
        const classRender = element.attributes.cssClasses;
        let renderedChildren;
        if (element.children.length > 0) {
          renderedChildren = componentBuilder(element.children);
        }
        componentsToRender.push(<Box component={elementType} className={classRender} style={elementStyle} key={key} id={childId}>{innerText}{renderedChildren}</Box>);
        key += 1;
      }
    }
    return componentsToRender;
  };

  useEffect(() => {
    const childrenArray = state.components[0].children;
    console.log('Refrenced Children in State!!!', childrenArray);
    const renderedComponents = componentBuilder(childrenArray);
    setComponents(renderedComponents);
  }, [state.components]);

  return (
    <div id={'renderFocus'} style={demoContainerStyle}>
      {components.map((component, index) => component)}
    </div>
  );
};

export default DemoRender;
