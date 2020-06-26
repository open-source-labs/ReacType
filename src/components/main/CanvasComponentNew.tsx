import React, { useRef, useMemo, useContext } from 'react';
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd';
import { ItemTypes } from '../../constants/ItemTypes';
import { stateContext } from '../../context/context';
import { updateInstance } from '../../helperFunctions/instances';

const CanvasComponent = (props):JSX.Element => {
  const ref = useRef<HTMLDivElement>(null);
  const pageId = 1;

  const [context, setContext] = useContext(stateContext);
  // both useDrop and useDrag used here to allow canvas components to be both a drop target and drag source
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.INSTANCE,
    // triggered on drop
    drop: (item: any, monitor: DropTargetMonitor) => {
      const didDrop = monitor.didDrop();
      if (didDrop) {
        return;
      }
      const hoverId = props.id;
      // updates state with new instance
      setContext(updateInstance(hoverId, item, context, pageId));
    },
    collect: (monitor: any) => ({
      isOver: !!monitor.isOver({ shallow: true })
    })
  });

  const [{ isDragging }, drag] = useDrag({
    // setting item attributes to be referenced when updating state with new instance of dragged item
    item: {
      type: ItemTypes.INSTANCE,
      newInstance: false,
      id: props.id
    },
    // canDrag: !props.children.length,
    collect: (monitor: any) => ({
      isDragging: !!monitor.isDragging()
    })
  });

  const elementStyle = useMemo(
    () => ({
      // ...props.style,
      borderStyle: isOver ? 'dotted' : 'solid',
      opacity: isDragging ? 0.5 : 1
    }),
    [isDragging, isOver]
  );

  drag(drop(ref));
  return (
    <div ref={ref} className="componentDefault" style={elementStyle}>
      I am a Canvas Component! :D
      {props.children}
    </div>
  );
}

export default CanvasComponent;
