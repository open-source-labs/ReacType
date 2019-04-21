import React, { Component } from 'react';
import { Rect } from 'react-konva';
// import PropTypes from 'prop-types';

class Rectangle extends Component {
  extractPositionInfo(componentId, childId, target) {
    console.log('extracting position info, Rectanlge.jsx');
    const transformation = {
      x: target.x(),
      y: target.y(),
      width: target.width() * target.scaleX(),
      height: target.height() * target.scaleY(),
    };

    this.props.handleTransform(componentId, childId, transformation);
  }

  render() {
    const {
      color, x, y, childId, componentId, draggable, width, height, title,
    } = this.props;
    console.log('childId in rectangle:', childId);
    return (
      <Rect
        name={`${childId}`}
        x={x}
        y={y}
        childId={childId}
        componentId={componentId}
        title={title}
        scaleX={1}
        scaleY={1}
        width={width}
        height={height}
        stroke={color}
        strokeWidth={6}
        strokeScaleEnabled={false}
        onTransformEnd={event => this.extractPositionInfo(componentId, childId, event.target)}
        onDragEnd={event => this.extractPositionInfo(componentId, childId, event.target)}
        draggable={draggable}
        color={color}
        // use dragBoundFunc to bind children within parents
        // (but if only children are rendered/movable, and parent is size of canvas, won't need this anyways )
        // dragBoundFunc={function dragBoundFunc(pos) {
        //   console.log('binding');
        //   const newY = pos.y < 200 ? 200 : pos.y;
        //   const newX = pos.x < 200 ? 200 : pos.x;
        //   return {
        //     x: newX,
        //     y: newY,
        //   };
        // }}
      />
    );
  }
}

export default Rectangle;
