import React, { Component } from 'react';
import { Rect } from 'react-konva';
import PropTypes from 'prop-types';

class Rectangle extends Component {
  extractPositionInfo(componentId, target) {
    const transformation = {
      x: target.x(),
      y: target.y(),
      width: target.width() * target.scaleX(),
      height: target.height() * target.scaleY(),
    };

    this.props.handleTransform(componentId, transformation);
  }

  render() {
    const { color, x, y, componentId, draggable, width, height, title } = this.props;

    return (
      <Rect
        name={componentId}
        x={x}
        y={y}
        componentid={componentId}
        scaleX={1}
        scaleY={1}
        width={width}
        height={height}
        stroke={color}
        strokeWidth={6}
        strokeScaleEnabled={false}
        onTransformEnd={event => this.extractPositionInfo(componentId, event.target)}
        onDragEnd={event => this.extractPositionInfo(componentId, event.target)}
        draggable={draggable}
        dragBoundFunc={function dragBoundFunc(pos) {
          console.log('binding');
          const newY = pos.y < 200 ? 200 : pos.y;
          const newX = pos.x < 200 ? 200 : pos.x;
          return {
            x: newX,
            y: newY,
          };
        }}
      />
    );
  }
}

export default Rectangle;
