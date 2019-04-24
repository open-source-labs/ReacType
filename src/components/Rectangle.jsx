import React, { Component } from 'react';
import {
  Rect, Group, Label, Text,
} from 'react-konva';
import TransformerComponent from './TransformerComponent.jsx';
// import PropTypes from 'prop-types';

class Rectangle extends Component {
  handleResize(componentId, childId, target, components) {
    const focChild = components
      .find(comp => comp.id === componentId)
      .childrenArray.find(child => child.childId === childId);

    const transformation = {
      width: target.width() * target.scaleX(),
      height: target.height() * target.scaleY(),
      x: target.x() + focChild.position.x,
      y: target.y() + focChild.position.y,
    };

    this.props.handleTransform(componentId, childId, transformation);
  }

  handleDrag(componentId, childId, target) {
    console.log(target);

    const transformation = {
      x: target.x(),
      y: target.y(),
    };
    this.props.handleTransform(componentId, childId, transformation);
  }

  findDescendants(component, components, descendants = []) {
    // fix this stuff Adam
    if (!component) return;
    component.childrenArray.forEach((child) => {
      descendants.push(child);
      const childComponent = components.find(comp => comp.title === child.componentName);
      this.findDescendants(childComponent, components, descendants);
    });
    return descendants;
  }

  render() {
    const {
      color,
      x,
      y,
      childId,
      componentId,
      draggable,
      width,
      height,
      title,
      focusChild,
      focusComponent,
      components,
      deleteChild
    } = this.props;

    // the Group is responsible for dragging of all children
    // the Rect emits changes to child width and height with help from Transformer
    return (
      <Group
        draggable={true}
        x={x}
        y={y}
        scaleX={1}
        scaleY={1}
        width={width}
        height={height}
        onDragEnd={event => this.handleDrag(componentId, childId, event.target)}
      >
        <Rect
          name={`${childId}`}
          x={0}
          y={0}
          // absolutePosition={{ x, y }}
          childId={childId}
          componentId={componentId}
          title={title}
          scaleX={1}
          scaleY={1}
          width={width}
          height={height}
          stroke={color}
          color={color}
          // fill={color}
          // opacity={0.8}
          onTransformEnd={event => this.handleResize(componentId, childId, event.target, components)
          }
          strokeWidth={4}
          strokeScaleEnabled={false}
          draggable={false}
        />
        <Label>
          <Text text={title} fill={'white'} />
        </Label>
        {/* {this.findDescendants().map} */}
        <Rect
          // replace with grandchildren rectangles
          scaleX={0.2}
          scaleY={0.2}
          width={width}
          height={height}
          stroke={color}
          color={color}
          strokeWidth={4}
          draggable={false}
        />
        {focusChild && focusChild.childId === childId ? (
          <TransformerComponent focusComponent={focusComponent} focusChild={focusChild} />
        ) : (
          <Label />
        )}
      </Group>
    );
  }
}

export default Rectangle;
