import React, { Component } from 'react';
import { Rect, Group } from 'react-konva';

class GrandchildRectangle extends Component {
  getComponentColor(componentId) {
    const color = this.props.components.find(comp => comp.id == componentId).color;
    return color;
  }

  getPseudoChild() {
    return this.props.components.find(comp => comp.id === this.props.childComponentId);
  }

  render() {
    const {
      x,
      y,
      scaleX,
      scaleY,
      childId,
      componentId,
      childType,
      childComponentName,
      childComponentId,
      width,
      height,
      focusChild,
      components,
      childType,
    } = this.props;

    // the Group is responsible for dragging of all children
    // the Rect emits changes to child width and height with help from Transformer
    return (
      <Group draggable={false} x={x} y={y} scaleX={scaleX} scaleY={scaleY} width={width} height={height}>
        <Rect
          name={`${childId}`}
          x={0}
          y={0}
          childId={childId}
          componentId={componentId}
          childType={childType}
          scaleX={1}
          scaleY={1}
          width={width}
          height={height}
          stroke={childType === 'COMP' ? this.getComponentColor(childComponentId) : '#000000'}
          // fill={color}
          // opacity={0.8}
          strokeWidth={4}
          strokeScaleEnabled={false}
          draggable={false}
        />
        {childType === 'COMP' &&
          components
            .find(comp => comp.title === childComponentName)
            .childrenArray.filter(child => child.childId !== '-1')
            .map((grandchild, i) => (
              <GrandchildRectangle
                key={i}
                components={components}
                componentId={componentId}
                childType={grandchild.childType}
                childComponentName={grandchild.componentName}
                childComponentId={grandchild.childComponentId}
                focusChild={focusChild}
                childId={childId}
                width={grandchild.position.width * (width / this.getPseudoChild().position.width)}
                height={grandchild.position.height * (height / this.getPseudoChild().position.height)}
                x={
                  (grandchild.position.x - this.getPseudoChild().position.x) *
                  (width / this.getPseudoChild().position.width)
                }
                y={
                  (grandchild.position.y - this.getPseudoChild().position.y) *
                  (height / this.getPseudoChild().position.height)
                }
              />
            ))}
      </Group>
    );
  }
}

export default GrandchildRectangle;
