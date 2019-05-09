import React, { Component } from 'react';
import { Rect, Group } from 'react-konva';
// import findComponentById from '../utils/findComponentById.ts';

class GrandchildRectangle extends Component {
  state = {
    image: null,
    imageHeight: 0,
    imageWidth: 0,
  };

  getComponentColor(componentId) {
    const color = this.props.components.find(comp => comp.id === componentId).color;
    return color;
  }

  getPseudoChild() {
    return this.props.components.find(comp => comp.id === this.props.childComponentId);
  }

  setImage = (imageSource) => {
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
      imageSource,
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
          stroke={childType === 'COMP' ? this.getComponentColor(childComponentId) : '#000000'}
          fillPatternImage={this.state.image ? this.state.image : this.setImage(imageSource)}
          fillPatternScaleX={this.state.image ? width / this.state.image.width : 1}
          fillPatternScaleY={this.state.image ? height / this.state.image.height : 1}
          strokeWidth={2}
          strokeScaleEnabled={false}
          draggable={false}
        />
        {childType === 'COMP'
          && components
            .find(comp => comp.title === childComponentName)
            .childrenArray.filter(child => child.childId !== -1)
            .map((grandchild, i) => (
              <GrandchildRectangle
                key={i}
                components={components}
                componentId={componentId}
                childType={grandchild.childType}
                imageSource={grandchild.htmlElement === 'Image' && grandchild.HTMLInfo.Src}
                childComponentName={grandchild.componentName}
                childComponentId={grandchild.childComponentId}
                focusChild={focusChild}
                childId={childId}
                width={grandchild.position.width * (width / this.getPseudoChild().position.width)}
                height={
                  grandchild.position.height * (height / this.getPseudoChild().position.height)
                }
                x={
                  (grandchild.position.x - this.getPseudoChild().position.x)
                  * (width / this.getPseudoChild().position.width)
                }
                y={
                  (grandchild.position.y - this.getPseudoChild().position.y)
                  * (height / this.getPseudoChild().position.height)
                }
              />
            ))}
      </Group>
    );
  }
}

export default GrandchildRectangle;
