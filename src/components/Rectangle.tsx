import React, { Component, Fragment } from 'react';
import { Rect, Group, Label, Text } from 'react-konva';
import TransformerComponent from './TransformerComponent.tsx';
import GrandchildRectangle from './GrandchildRectangle.tsx';
import { ComponentsInt, ChildInt } from '../utils/interfaces.ts';

interface PropsInt {
  x: number;
  y: number;
  scaleX: number;
  scaleY: number;
  childId: number;
  componentId: number;
  childComponentName: string;
  childComponentId: number;
  width: number;
  height: number;
  title: string;
  focusChild: any;
  components: ComponentsInt;
  draggable: boolean;
  blockSnapSize: number;
  childType: string;
  imageSource: string;
  handleTransform: any;
}

interface StateInt {
  image: any;
}

class Rectangle extends Component<PropsInt, StateInt> {
  state = {
    image: null,
  };

  getComponentColor(componentId: number) {
    const color = this.props.components.find(comp => comp.id === componentId).color;
    return color;
  }

  getPseudoChild() {
    return this.props.components.find(comp => comp.id === this.props.childComponentId);
  }

  handleResize(componentId: number, childId: number, target: any, blockSnapSize: number) {
    let focChild: ChildInt = this.props.components
      .find(comp => comp.id === this.props.componentId)
      .childrenArray.find(child => child.childId === childId);

    if (childId === -1) {
      focChild = this.props.components.find(comp => comp.id === this.props.componentId);
    }
    const transformation = {
      width: Math.round((target.width() * target.scaleX()) / blockSnapSize) * blockSnapSize,
      height: Math.round((target.height() * target.scaleY()) / blockSnapSize) * blockSnapSize,
      x: target.x() + focChild.position.x,
      y: target.y() + focChild.position.y,
    };

    this.props.handleTransform(componentId, childId, transformation);
  }

  handleDrag(componentId: number, childId: number, target: any, blockSnapSize: any) {
    const transformation = {
      x: Math.round(target.x() / blockSnapSize) * blockSnapSize,
      y: Math.round(target.y() / blockSnapSize) * blockSnapSize,
    };
    this.props.handleTransform(componentId, childId, transformation);
  }

  setImage = (imageSource: string) => {
    if (!imageSource) return;
    const image = new window.Image();
    image.src = imageSource;
    if (!image.height) return null;
    this.setState({ image });
  };

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
      title,
      focusChild,
      components,
      draggable,
      blockSnapSize,
      childType,
      imageSource,
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
        onDragEnd={event => this.handleDrag(componentId, childId, event.target, blockSnapSize)}
        ref={node => {
          this.group = node;
        }}
        tabIndex="0" // required for keypress event to be heard by this.group
      >
        <Rect
          // a Konva Rect is generated for each child of the focusComponent (including the pseudochild, representing the focusComponent itself)
          ref={node => {
            this.rect = node;
          }}
          tabIndex="0" // required for keypress event to be heard by this.group
          name={`${childId}`}
          className={'childRect'}
          x={0}
          y={0}
          childId={childId}
          componentId={componentId}
          title={title}
          scaleX={1}
          scaleY={1}
          width={width}
          height={height}
          stroke={childType === 'COMP' ? this.getComponentColor(childComponentId) : '#000000'}
          onTransformEnd={event => this.handleResize(componentId, childId, event.target, blockSnapSize)}
          strokeWidth={childType === 'COMP' ? 4 : 2}
          strokeScaleEnabled={false}
          draggable={false}
          fill={childId === -1 ? 'white' : null}
          shadowBlur={childId === -1 ? 6 : null}
          fillPatternImage={this.state.image ? this.state.image : this.setImage(imageSource)}
          fillPatternScaleX={this.state.image ? width / this.state.image.width : 1}
          fillPatternScaleY={this.state.image ? height / this.state.image.height : 1}
        />
        <Label>
          <Text
            fontStyle={'bold'}
            fontVariant={'small-caps'}
            // pseudochild's label should look different than normal children:
            text={childId === -1 ? title.slice(0, title.length - 2) : title}
            fill={childId === -1 ? this.getComponentColor(childComponentId) : '#000000'}
            fontSize={childId === -1 ? 15 : 10}
            x={4}
            y={childId === -1 ? -20 : -12}
          />
        </Label>
        {// for all children other than the pseudoChild, find their component's children array and recursively render the children found there
        childId !== -1 &&
          childType === 'COMP' &&
          components
            .find(comp => comp.title === childComponentName)
            .childrenArray.filter(child => child.childId !== -1)
            .map((grandchild, i) => (
              <GrandchildRectangle
                key={i}
                components={components}
                componentId={componentId}
                directParentName={childComponentName}
                childType={grandchild.childType}
                imageSource={grandchild.htmlElement === 'Image' && grandchild.HTMLInfo.Src}
                childComponentName={grandchild.componentName}
                childComponentId={grandchild.childComponentId}
                focusChild={focusChild}
                childId={childId} // scary addition, grandchildren rects default to childId of "direct" children
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
        {focusChild &&
          focusChild.childId === childId &&
          draggable && (
            <TransformerComponent focusChild={focusChild} rectClass={'childRect'} anchorSize={8} color={'grey'} />
          )}
      </Group>
    );
  }
}

export default Rectangle;
