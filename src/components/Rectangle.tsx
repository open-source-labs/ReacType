import React, { Component } from 'react';
import { Rect, Group, Label, Text } from 'react-konva';
import TransformerComponent from './TransformerComponent.jsx';
import GrandchildRectangle from './GrandchildRectangle.jsx';
// import PropTypes from 'prop-types';

class Rectangle extends Component {
  getComponentColor(componentId) {
    console.log('siodfbsldfk', componentId);
    const color = this.props.components.find(comp => comp.id == componentId).color;
    console.log(color);

    return color;
  }

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

  render() {
    const {
      color,
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
          color={this.getComponentColor(childComponentId)}
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
          .find(comp => comp.title === childComponentName)
          .childrenArray.map((grandchild, i) => (
            <GrandchildRectangle
              key={i}
              components={components}
              componentId={componentId}
              childComponentName={grandchild.componentName}
              childComponentId={grandchild.childComponentId}
              focusChild={focusChild}
              // childId={childId}
              x={grandchild.position.x * (width / (window.innerWidth / 2))}
              y={grandchild.position.y * (height / window.innerHeight)}
              scaleX={1}
              scaleY={1}
              width={grandchild.position.width * (width / (window.innerWidth / 2))}
              height={grandchild.position.height * (height / window.innerHeight)}
              // title={child.componentName + child.childId}
              color={grandchild.color}
            />
          ))}
        {focusChild.childId === childId && draggable ? <TransformerComponent focusChild={focusChild} /> : <Label />}
      </Group>
    );
  }
}

export default Rectangle;
