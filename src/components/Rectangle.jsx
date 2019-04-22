import React, { Component } from 'react';
import {
  Rect, Group, Label, Text,
} from 'react-konva';
import TransformerComponent from './TransformerComponent.jsx';
// import PropTypes from 'prop-types';

class Rectangle extends Component {
  handleResize(componentId, childId, target) {
    const transformation = {
      width: target.width() * target.scaleX(),
      height: target.height() * target.scaleY(),
    };
    this.props.handleTransform(componentId, childId, transformation);
  }

  handleDrag(componentId, childId, target) {
    const transformation = {
      x: target.x(),
      y: target.y(),
    };
    this.props.handleTransform(componentId, childId, transformation);
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
          // x={0}
          // y={0}
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
          onTransformEnd={event => this.handleResize(componentId, childId, event.target)}
          strokeWidth={4}
          strokeScaleEnabled={false}
          draggable={false}
        />
        <Label>
          <Text text={title} fill={'white'} />
        </Label>
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
        {focusChild.childId === childId ? (
          <TransformerComponent focusComponent={focusComponent} focusChild={focusChild} />
        ) : (
          <Label />
        )}
      </Group>
    );
  }
}

export default Rectangle;
