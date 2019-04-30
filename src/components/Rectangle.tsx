import React, { Component } from 'react';
import { Rect, Group, Label, Text } from 'react-konva';
import TransformerComponent from './TransformerComponent.jsx';
import GrandchildRectangle from './GrandchildRectangle.jsx';

class Rectangle extends Component {
  getComponentColor(componentId) {
    const color = this.props.components.find(comp => comp.id == componentId).color;
    return color;
  }

  getGrandchildRatio(grandchild) {
    // const childInstance = pseudoChildComp.childrenArray.find()
    const pseudoParent = this.props.components.find(
      comp => comp.title === this.props.childComponentName,
    );
    const childInstance = pseudoParent.childrenArray.find(
      child => child.childId === grandchild.childId,
    );
    // console.log(
    //   this.props.childId,
    //   this.props.componentId,
    //   this.props.childComponentName,
    //   this.props.childComponentId,
    // );
    console.log(grandchild, pseudoParent, childInstance);
    // console.log(childInstance.position.width / pseudoParent.position.width);
    // console.log(childInstance.position.height / pseudoParent.position.height);

    console.log(childInstance.position.x, pseudoParent.position.x);
    console.log(childInstance.position.y, pseudoParent.position.y);
    const ratioObj = {
      // x:
      //   grandchild.position.x
      //   - (pseudoParent.position.x * childInstance.position.width) / pseudoParent.position.width,
      // y:
      //   grandchild.position.y
      //   - (pseudoParent.position.y * childInstance.position.height) / pseudoParent.position.height,
      x: childInstance.position.x - pseudoParent.position.x,
      y: childInstance.position.y - pseudoParent.position.y,
      width: childInstance.position.width / pseudoParent.position.width,
      height: childInstance.position.height / pseudoParent.position.height,
    };
    // console.log('ratioObj', ratioObj);
    return ratioObj;
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
          stroke={this.getComponentColor(childComponentId)}
          // fill={color}
          // opacity={0.8}
          onTransformEnd={event => this.handleResize(componentId, childId, event.target)}
          strokeWidth={4}
          strokeScaleEnabled={false}
          draggable={false}
          dashEnabled={childId === '-1'} // dash line only enabled for pseudochild
          dash={[10, 3]} // 10px dashes with 3px gaps
        />
        <Label>
          <Text
            fontStyle={'bold'}
            fontVariant={'small-caps'}
            // pseudochild's label should look different than normal children:
            text={childId === '-1' ? title.slice(0, title.length - 2) : title}
            fill={childId === '-1' ? this.getComponentColor(childComponentId) : 'white'}
            fontSize={childId === '-1' ? 15 : 10}
            x={4}
            y={childId === '-1' ? -15 : 5}
          />
        </Label>
        {focusChild
          && focusChild.childId === childId
          && draggable && (
            <TransformerComponent
              focusChild={focusChild}
              rectClass={'childRect'}
              anchorSize={8}
              color={'grey'}
            />
        )}
        {childId !== '-1'
          && components
            .find(comp => comp.title === childComponentName)
            .childrenArray.filter(child => child.childId !== '-1')
            .map((grandchild, i) => (
              <GrandchildRectangle
                key={i}
                components={components}
                componentId={componentId}
                childComponentName={grandchild.componentName}
                childComponentId={grandchild.childComponentId}
                focusChild={focusChild}
                childId={childId} // scary addition, grandchildren rects default to childId of "direct" children
                // x={grandchild.position.x * (width / window.innerWidth)}
                // y={grandchild.position.y * (height / window.innerHeight)}
                // width={grandchild.position.width * (width / window.innerWidth)}
                // height={grandchild.position.height * (height / window.innerHeight)}
                x={this.getGrandchildRatio(grandchild).x}
                y={this.getGrandchildRatio(grandchild).y}
                width={width * this.getGrandchildRatio(grandchild).width}
                height={height * this.getGrandchildRatio(grandchild).height}
                // x={grandchild.position.x}
                // y={grandchild.position.y}
                // width={grandchild.position.width}
                // height={grandchild.position.height}
                // title={child.componentName + child.childId}
              />
            ))}
      </Group>
    );
  }
}

export default Rectangle;
