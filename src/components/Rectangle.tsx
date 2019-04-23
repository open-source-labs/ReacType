import React, { Component } from 'react';
import { Rect, Group, Label, Text } from 'react-konva';
import TransformerComponent from './TransformerComponent.jsx';
import GrandchildRectangle from './GrandchildRectangle.jsx';
// import PropTypes from 'prop-types';

class Rectangle extends Component {
  handleResize(componentId, childId, target) {
    const focChild = this.props.components
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

  getComponentOfThisChild() {
    console.log('title of this child: ', componentName);
    console.log('component of this child: ', this.props.components.find(comp => comp.title === componentName));
  }

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
      title,
      focusChild,
      components,
      deleteChild,
    } = this.props;

    // the Group is responsible for dragging of all children
    // the Rect emits changes to child width and height with help from Transformer
    return (
      <Group
        draggable={draggable}
        x={x}
        y={y}
        scaleX={scaleX}
        scaleY={scaleY}
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
          onTransformEnd={event => this.handleResize(componentId, childId, event.target)}
          strokeWidth={4}
          strokeScaleEnabled={false}
          draggable={false}
        />
        <Label>
          <Text text={title} fill={'white'} />
        </Label>
        {components
          .find(comp => comp.title === componentName)
          .childrenArray.map((grandchild, i) => (
            <GrandchildRectangle
              key={i}
              components={components}
              componentId={componentId}
              componentName={grandchild.componentName}
              focusChild={focusChild}
              // childId={childId}
              x={grandchild.position.x * 0.8 + 10}
              y={grandchild.position.y * 0.8 + 10}
              scaleX={0.8}
              scaleY={0.8}
              width={grandchild.position.width}
              height={grandchild.position.height}
              // title={child.componentName + child.childId}
              color={color}
              draggable={false}
            />
          ))}
        {focusChild.childId === childId && draggable ? <TransformerComponent focusChild={focusChild} /> : <Label />}
      </Group>
    );
  }
}

export default Rectangle;
