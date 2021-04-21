// 100% Caret
import React, {
  useState, useCallback, useContext, useEffect,
} from 'react';

const DemoRender = (props): JSX.Element => {
  const [components, setComponents] = useState([]);
  const demoContainerStyle = {
    width: '100%',
    backgroundColor: 'lightgrey',
    border: '2px Solid grey',
  };

  useEffect(() => {
    console.log('props', props.demo);
    setComponents(props.demo);
  }, [props.demo]);
  return (
    <div id={'renderFocus'} style={demoContainerStyle}>
      {console.log('Props Boxes has reached DemoContainer', props.demo)}
      {components.map((component, index) => {
        console.log('Found a component', component);
        return component;
      })}
    </div>
  );
};

export default DemoRender;
