import React, { Component } from 'react';
import { Rect, Group } from 'react-konva';
// import PropTypes from 'prop-types';

class GrandchildRectangle extends Component {
  render() {
    const {
      color,
      x,
      y,
      scaleX,
      scaleY,
      childId,
      componentId,
      componentName,
      width,
      height,
      focusChild,
      components,
      draggable,
    } = this.props;

    // the Group is responsible for dragging of all children
    // the Rect emits changes to child width and height with help from Transformer
    return (
      <Group
        draggable={false}
        x={x}
        y={y}
        scaleX={scaleX}
        scaleY={scaleY}
        width={width}
        height={height}
      >
        <Rect
          name={`${childId}`}
          x={0}
          y={0}
          // absolutePosition={{ x, y }}
          // childId={childId}
          componentId={componentId}
          scaleX={1}
          scaleY={1}
          width={width}
          height={height}
          stroke={color}
          color={color}
          // fill={color}
          // opacity={0.8}
          strokeWidth={4}
          strokeScaleEnabled={false}
          draggable={false}
        />
        {components
          .find(comp => comp.title === componentName)
          .childrenArray.map((grandchild, i) => (
            <GrandchildRectangle
              key={i}
              components={components}
              componentId={componentId}
              componentName={grandchild.componentName}
              focusChild={focusChild}
              // childId={grandchild.childId}
              x={grandchild.position.x}
              y={grandchild.position.y}
              scaleX={0.8}
              scaleY={0.8}
              width={grandchild.position.width}
              height={grandchild.position.height}
              color={color}
            />
          ))}
      </Group>
    );
  }
}

export default GrandchildRectangle;
