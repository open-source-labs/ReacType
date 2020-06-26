import React, { useMemo, useContext } from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../../constants/ItemTypes';
import { stateContext } from '../../context/context';
import { updateInstance } from '../../helperFunctions/instances';
import CanvasComponent from './CanvasComponentNew';

//renders canvas components based on state
const renderCanvas = (state, page) => {
  // get page ID and assign data to children
  let pageData;
  for (let i = 0; i <= state.pages.length - 1; i++) {
    if (state.pages[i]['pageId'] === page) {
      pageData = state.pages[i];
      break;
    }
  }
  // if there is no page or the page has no children, end the function
  if (!pageData || !pageData.children) return;
  // iterate through each child on the page ID and render each component
  return pageData.children.map(component => renderComponent(component));
};

// renders an instance in the instance tree. If instance has children, those instances will also be rendered recursively
const renderComponent = component => {
  const { id, style } = component;
  
  // const style = { border: '5px solid pink', margin: '40px' };
  return (
    <CanvasComponent id={id} style={style} key={id}>
      {/* render all children of component */}
      {component.children.map(comp => renderComponent(comp))}
    </CanvasComponent>
  );
};

function MainCanvas() {
  let pageId = 1;
  const [context, setContext] = useContext(stateContext);
  // useDrop hook allows main canvas to be a drop target
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.INSTANCE,
    drop: (item, monitor) => {
      const didDrop = monitor.didDrop(); // returns false for direct drop target
      if (didDrop) {
        return;
      }
      setContext(updateInstance(null, item, context, pageId));
    },
    collect: monitor => ({
      isOver: !!monitor.isOver()
    })
  });
  const mainCanvasStyle = useMemo(
    () => ({
      height: '1000px',
      width: '1000px',
      backgroundColor: 'white',
      border: '2px solid black',
      borderStyle: isOver ? 'dotted' : 'solid'
    }),
    [isOver]
  );
  return (
    <div ref={drop} style={mainCanvasStyle}>
      {renderCanvas(context, 1)}
    </div>
  );
}

export default MainCanvas;
