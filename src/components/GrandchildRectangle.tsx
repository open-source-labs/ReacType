import React, { Component } from 'react';
import { Rect, Group } from 'react-konva';
// Konva = JavaScript library for drawing complex canvas graphics using React
import { ComponentsInt, ComponentInt, ChildInt } from '../utils/interfaces';

// ** this file might restrict you from making the child of a component one of its references - prevents circular references

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

class GrandchildRectangle extends Component<PropsInt, StateInt> {
  state = {
    image: null
  };

  getComponentColor(componentId: number) {
    const color = this.props.components.find(
      (comp: ComponentInt) => comp.id === componentId
    ).color;
    return color;
  }

  getPseudoChild() {
    return this.props.components.find(
      (comp: ComponentInt) => comp.id === this.props.childComponentId
    );
  }

  setImage = (imageSource: string): void => {
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
      childType,
      childComponentName,
      childComponentId,
      width,
      height,
      focusChild,
      components,
      imageSource
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
          childType={childType}
          scaleX={1}
          scaleY={1}
          width={width}
          height={height}
          stroke={
            childType === 'COMP'
              ? this.getComponentColor(childComponentId)
              : '#000000'
          }
          fillPatternImage={
            this.state.image ? this.state.image : this.setImage(imageSource)
          }
          fillPatternScaleX={
            this.state.image ? width / this.state.image.width : 1
          }
          fillPatternScaleY={
            this.state.image ? height / this.state.image.height : 1
          }
          strokeWidth={2}
          strokeScaleEnabled={false}
          draggable={false}
        />
        {childType === 'COMP' &&
          components
            .find((comp: ComponentInt) => comp.title === childComponentName)
            .children.filter((child: ChildInt) => child.childId !== -1)
            .map((grandchild: ChildInt, i: number) => (
              <GrandchildRectangle
                key={i}
                components={components}
                componentId={componentId}
                childType={grandchild.childType}
                imageSource={
                  grandchild.htmlElement === 'Image' && grandchild.HTMLInfo.Src
                }
                childComponentName={grandchild.componentName}
                childComponentId={grandchild.childComponentId}
                focusChild={focusChild}
                childId={childId}
                width={
                  grandchild.position.width *
                  (width / this.getPseudoChild().position.width)
                }
                height={
                  grandchild.position.height *
                  (height / this.getPseudoChild().position.height)
                }
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
