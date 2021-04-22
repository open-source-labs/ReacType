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
      {components.map((component, index) => {
        return component;
      })}
    </div>
  );
};

export default DemoRender;
