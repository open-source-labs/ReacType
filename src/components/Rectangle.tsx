import React, { Component } from 'react';
import Konva from 'konva';
import { Rect, Group, Label, Text } from 'react-konva';
import TransformerComponent from './TransformerComponent';
import GrandchildRectangle from './GrandchildRectangle';
import { ComponentsInt, ChildInt } from '../utils/Interfaces';
import { ComponentInt } from '../utils/Interfaces';
import KonvaStage from './KonvaStage';

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
  handleTransform: any;
  image: HTMLImageElement;
}

class Rectangle extends Component<PropsInt> {
  group: Konva.Group;
  rect: Konva.Rect;

  //This assigns the color to the Rect based on componentId's color in the state
  getComponentColor(componentId: number) {
    const color = this.props.components.find(
      (comp: ComponentInt) => comp.id === componentId
    ).color;
    return color;
  }

  //this grabs the component ID of the child component when in the parent component's display mode
  //named pseudochild because it isn't saved as a child in the childrenArray.
  getPseudoChild() {
    return this.props.components.find(
      (comp: ComponentInt) => comp.id === this.props.childComponentId
    );
  }

  //resize function
  handleResize(
    componentId: number,
    childId: number,
    target: Konva.Group,
    blockSnapSize: number
  ) {
    //find the id of the component where the componentID in the state equals the currently focused component
    //and then find the numberID for that component
    //So, this would be assigning "Container 1", with component ID being whatever the ID for "Container" is
    //and 1 being the child ID
    let focChild: ChildInt | ComponentInt = this.props.components
      .find((comp: ComponentInt) => comp.id === this.props.componentId)
      .childrenArray.find((child: ChildInt) => child.childId === childId);

    //If this is the parent component, it would not have a childID (hence -1), so it just would assign the forChild
    //variable to the parent.
    if (childId === -1) {
      focChild = this.props.components.find(
        (comp: ComponentInt) => comp.id === this.props.componentId
      );
    }

    //The math here is easier than it looks
    //Basically, the height and width is first rounded up to a whole number (behind the whole snapping phenomenon)
    //after scaling it by multiplying it by scaleX/Y (height and width are the original height and width, the scale is the CHANGE in w/h),
    //dividing it by the 'snapsize' or grid unit area (which is 10x10 for this entire application) and re-multiplied by
    //that same snapsize. I'm not entirely sure why this had to be divided before the rounding, and re-multiplied,
    //since having positions that aren't a whole number doesn't seem to be that big of a deal.

    //So there's a bit of redundancy in the x and y info. target.x() or y() only log the CHANGE of position of the Rect component.
    //Since when you change the width or height of the component you do not change the actual position, the
    //value for x an y dispatched to the action creator will always be the same as the current x,y position, unless you can somehow
    //resize AND reposition at the same time.
    const transformation = {
      width:
        Math.round((target.width() * target.scaleX()) / blockSnapSize) *
        blockSnapSize,
      height:
        Math.round((target.height() * target.scaleY()) / blockSnapSize) *
        blockSnapSize,
      x: target.x() + focChild.position.x,
      y: target.y() + focChild.position.y
    };
    this.props.handleTransform(componentId, childId, transformation);
  }

  //mostly the same logic as above, just grabbing the change in position for the focused child and sending it
  //to the action creator.
  handleDrag(
    componentId: number,
    childId: number,
    target: Konva.Group,
    blockSnapSize: number
  ) {
    const transformation = {
      x: Math.round(target.x() / blockSnapSize) * blockSnapSize,
      y: Math.round(target.y() / blockSnapSize) * blockSnapSize
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
      draggable,
      blockSnapSize,
      childType
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
        onDragEnd={event =>
          this.handleDrag(componentId, childId, event.target, blockSnapSize)
        }
        ref={node => {
          //this refference actually isn't doing anything since it isn't within the transformer component
          this.group = node;
        }}
        tabIndex='0' // required for keypress event to be heard by this.group
      >
        <Rect //basically the entire canvas
          // a Konva Rect is generated for each child of the focusComponent (including the pseudochild, representing the focusComponent itself)
          ref={node => {
            this.rect = node; //same as above, the reference isn't assigned or pointing to anything
          }}
          tabIndex='0' // required for keypress event to be heard by this.group
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
          stroke={
            childType === 'COMP'
              ? this.getComponentColor(childComponentId)
              : '#000000' //sets the parent component color to black
          }
          onTransformEnd={event =>
            this.handleResize(componentId, childId, event.target, blockSnapSize)
          }
          strokeWidth={childType === 'COMP' ? 4 : 2}
          strokeScaleEnabled={false}
          draggable={false}
          fill={null}
          shadowBlur={childId === -1 ? 6 : null}
          fillPatternImage={childId === -1 ? this.props.image : null} //spooky addition, image if uploaded will only be background of App component
          fillPatternScaleX={
            this.props.image ? width / this.props.image.width : 1
          } //here we are making sure the width of the image will stretch of shrink
          fillPatternScaleY={
            this.props.image ? height / this.props.image.height : 1
          } //based on the width or height of the App component
          _useStrictMode
        />
        <Label>
          <Text //this is just the text that goes above each Rect,
            fontStyle={'bold'}
            fontVariant={'small-caps'}
            // pseudochild's label should look different than normal children:
            text={childId === -1 ? title.slice(0, title.length - 2) : title} //slices the number off of the title of the top component
            fill={
              childId === -1
                ? this.getComponentColor(childComponentId)
                : '#000000' //opposite logic of the stroke
            }
            fontSize={childId === -1 ? 15 : 10}
            x={4}
            y={childId === -1 ? -20 : -12}
          />
        </Label>
        {// for all children other than the pseudoChild, find their component's children array and recursively render the children found there
        childId !== -1 && //inline conditional to check if a child exists
        childType === 'COMP' && //inline conditional to see if the child is a component, not an HTML element
          components //map all 'grandchildren' in the child on display to this new component
            .find((comp: ComponentInt) => comp.title === childComponentName)
            .childrenArray.filter((child: ChildInt) => child.childId !== -1)
            .map((grandchild: ChildInt, i: number) => (
              <GrandchildRectangle
                key={i}
                components={components}
                componentId={componentId}
                directParentName={childComponentName}
                childType={grandchild.childType}
                childComponentName={grandchild.componentName}
                childComponentId={grandchild.childComponentId}
                focusChild={focusChild}
                childId={childId} // scary addition, grandchildren rects default to childId of "direct" children
                width={
                  //this is the logic used to display the grandchildren with proper scaling based on the parent (technically child) h/w
                  grandchild.position.width *
                  (width / this.getPseudoChild().position.width)
                }
                height={
                  grandchild.position.height *
                  (height / this.getPseudoChild().position.height)
                }
                x={
                  //similar logic to above
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
        draggable && ( //this conditional logic binds the transformer to the focused child, and Draggable is checked to make sure grandchildren can't be selected
            <TransformerComponent //This is the component that binds the Rect nodes to the Transformer node so they can be resized.
              focusChild={focusChild}
              rectClass={'childRect'}
              anchorSize={8}
              color={'grey'}
            />
          )}
      </Group>
    );
  }
}

export default Rectangle;
