import React, { Component } from 'react';
import { Rect, Group } from 'react-konva';

class GrandchildRectangle extends Component {
  getComponentColor(componentId) {
    const color = this.props.components.find(comp => comp.id == componentId).color;
    return color;
  }

  render() {
    const {
      x,
      y,
      scaleX,
      scaleY,
      childId,
      componentId,
      childComponentName,
      childComponentId,
      width,
      height,
      focusChild,
      components,
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
          childId={childId}
          componentId={componentId}
          scaleX={1}
          scaleY={1}
          width={width}
          height={height}
          stroke={this.getComponentColor(childComponentId)}
          // fill={color}
          // opacity={0.8}
          strokeWidth={4}
          strokeScaleEnabled={false}
          draggable={false}
        />
        {components
          .find(comp => comp.title === childComponentName)
          .childrenArray.filter(child => child.childId !== '-1')
          .map((grandchild, i) => (
            <GrandchildRectangle
              key={i}
              components={components}
              componentId={componentId}
              childComponentName={grandchild.componentName}
              childComponentId={grandchild.childComponentId}
              focusChild={focusChild}
              childId={childId}
              x={grandchild.position.x * (width / (window.innerWidth / 2))}
              y={grandchild.position.y * (height / window.innerHeight)}
              scaleX={1}
              scaleY={1}
              width={grandchild.position.width * (width / (window.innerWidth / 2))}
              height={grandchild.position.height * (height / window.innerHeight)}
            />
          ))}
      </Group>
    );
  }
}

export default GrandchildRectangle;
