//This component includes a component for the background image to be uploaded as reference for drawing components
//and also the parent rectangle components.

import React, { Component } from 'react';
import Konva from 'konva';
import { Stage, Layer, Line } from 'react-konva';
import Rectangle from './Rectangle';
import cloneDeep from '../utils/cloneDeep';
import { ComponentInt, ComponentsInt, ChildInt } from '../utils/Interfaces';
import isEmpty from '../utils/isEmpty';

interface PropsInt {
  image: HTMLImageElement;
  components: ComponentsInt;
  focusComponent: ComponentInt;
  // selectableChildren: Array<number>; **It's expecting this prop in the interface, but is never used.**
  classes: any;
  // addComponent: any; **It's expecting this prop in the interface, but is never used.**
  // addChild: any; **It's expecting this prop in the interface, but is never used.**
  // changeFocusComponent: any; **It's expecting this prop in the interface, but is never used.**
  changeFocusChild: any;
  // deleteComponent: any; **It's expecting this prop in the interface, but is never used.**
  // createApp: any; **It's expecting this prop in the interface, but is never used.**
  // deleteAllData: any; **It's expecting this prop in the interface, but is never used.**
  handleTransform: any;
  focusChild: any;
  changeComponentFocusChild: any;
  deleteChild: any;
  scaleX: number;
  scaleY: number;
  // draggable: boolean; **THIS ONE is actually never passed down from the parent but reassigned in a seperate object below in this file.**
}

interface StateInt {
  stageWidth: number;
  stageHeight: number;
  blockSnapSize: number;
  grid: [];
  gridStroke: number;
}

class KonvaStage extends Component<PropsInt, StateInt> {
  constructor(props: PropsInt) {
    super(props);
    //the main purpose of this state, although not supposed to be here per redux rules I believe,
    //is to initialize the values of the canvas height and width in pixels, and 'blockSnapSize' refers to
    //the height and width of the squares on the grid so it looks like graphing paper. The grid property doesn't do
    //anything, and the gridStroke is the stroke width of the squares.
    this.state = {
      stageWidth: 1800,
      stageHeight: 1300,
      blockSnapSize: 10,
      grid: [],
      gridStroke: 1
    };
  }
  // creating typescript types for these props
  container: HTMLDivElement;
  stage: Stage;
  layer: Konva.Layer;

  //makes a copy of the array of children plus the parent component pushed onto it
  getDirectChildrenCopy(focusComponent: ComponentInt) {
    //assign component to the docused component
    const component = this.props.components.find(
      (comp: ComponentInt) => comp.id === focusComponent.id
    );
    //assign childrenArr to an array of all the children of focused component
    const childrenArr = component.childrenArray.filter(
      (child: ChildInt) => child.childId !== -1
    );

    //deep clone of childrenArr so addition of parent doesn't mutate the children saved in the state
    let childrenArrCopy = cloneDeep(childrenArr);

    //adds a pseudochild witrh the parent component's property to the copied children array
    const pseudoChild = {
      childId: -1,
      childComponentId: component.id,
      componentName: component.title,
      position: {
        x: component.position.x,
        y: component.position.y,
        width: component.position.width,
        height: component.position.height
      },
      draggable: true,
      color: component.color
    };
    childrenArrCopy = childrenArrCopy.concat(pseudoChild); // could just use push here, concat needlessly generate new array
    //returns that new childrenArr + parent component
    return childrenArrCopy;
  }

  //currently, only the handlekeydown event listener does anything.
  componentDidMount() {
    this.checkSize();
    // here we should add listener for "container" resize
    // take a look here https://developers.google.com/web/updates/2016/10/resizeobserver
    // for simplicity I will just listen window resize
    window.addEventListener('resize', this.checkSize);
    this.container.addEventListener('keydown', this.handleKeyDown);
    this.createGrid();
  }

  // I wonder if this lifecycle method is necessary. When I remove it,
  //I can't find any noticable changes. Possibly to prevent memory leaks?
  componentWillUnmount() {
    window.removeEventListener('resize', this.checkSize);
    this.container.removeEventListener('keydown', this.handleKeyDown);
  }

  //something about the logic here isn't working. Will need to check some other time.
  checkSize = () => {
    const width = this.container.offsetWidth;
    const height = this.container.offsetHeight;
    this.setState({
      stageWidth: width,
      stageHeight: height
    });
  };

  handleKeyDown = (e: any) => {
    // backspace and delete keys are keyCode 8 and 46, respectively
    // this function is only used for deleting children atm, could be used for other things
    if (e.keyCode === 8 || e.keyCode === 46) {
      this.props.deleteChild({});
    }
  };

  //event handler to handle mouse click
  handleStageMouseDown = (e: any) => {
    // clicked on stage - clear selection
    if (e.target === e.target.getStage()) {
      return;
    }
    // // clicked on transformer - do nothing
    const clickedOnTransformer =
      e.target.getParent().className === 'Transformer';
    if (clickedOnTransformer) {
      return;
    }

    // find clicked rect by its name
    const rectChildId = e.target.attrs.childId;
    this.props.changeFocusChild({ childId: rectChildId });
    this.props.changeComponentFocusChild({
      componentId: this.props.focusComponent.id,
      childId: rectChildId
    });
  };
  //this function creates a grid with those 10x10 squares.
  //it first draws a grid or horizaontal lines, and then
  //draws the vertical ones.
  createGrid = () => {
    const output = [];
    for (let i = 0; i < this.state.stageWidth / this.state.blockSnapSize; i++) {
      output.push(
        <Line
          points={[
            Math.round(i * this.state.blockSnapSize) + 0.5,
            0,
            Math.round(i * this.state.blockSnapSize) + 0.5,
            this.state.stageHeight
          ]}
          stroke={'#ddd'}
          strokeWidth={this.state.gridStroke}
          key={`${i}vertical`}
        />
      );
    }
    for (
      let j = 0;
      j < this.state.stageHeight / this.state.blockSnapSize;
      j++
    ) {
      output.push(
        <Line
          points={[
            0,
            Math.round(j * this.state.blockSnapSize),
            this.state.stageWidth,
            Math.round(j * this.state.blockSnapSize)
          ]}
          stroke={'#ddd'}
          strokeWidth={this.state.gridStroke}
          key={`${j}horizontal`}
        />
      );
    }
    this.setState({
      grid: output
    });
  };

  render() {
    const {
      image,
      components,
      handleTransform,
      focusComponent,
      focusChild
      // deleteChild, **neither of these are read**
      // classes
    } = this.props;

    return (
      <div
        style={{
          width: '100%',
          height: '100%'
        }}
        ref={node => {
          this.container = node;
        }}
        tabIndex='0' // required for keydown event to be heard by this.container
      >
        <Stage
          className={'canvasStage'}
          ref={node => {
            this.stage = node;
          }}
          onMouseDown={this.handleStageMouseDown}
          width={this.state.stageWidth}
          height={this.state.stageHeight}
          style={{ width: '100%' }}
        >
          <Layer
            ref={node => {
              this.layer = node;
            }}
          >
            {this.state.grid}
            {!isEmpty(focusComponent) &&
              this.getDirectChildrenCopy(focusComponent)
                .map((child: ChildInt, i: number) => (
                  <Rectangle
                    childType={child.childType}
                    key={`${i}${child.componentName}`}
                    components={components}
                    componentId={focusComponent.id}
                    childComponentId={child.childComponentId}
                    childComponentName={child.componentName}
                    focusChild={focusChild}
                    childId={child.childId} // -1 for pseudoChild
                    x={child.position.x}
                    y={child.position.y}
                    scaleX={1}
                    scaleY={1}
                    width={child.position.width}
                    height={child.position.height}
                    title={child.componentName + child.childId}
                    handleTransform={handleTransform}
                    draggable={true}
                    blockSnapSize={this.state.blockSnapSize}
                    imageSource={
                      child.htmlElement === 'Image' && child.HTMLInfo.Src
                    }
                  />
                ))
                .sort((rectA: Rectangle, rectB: Rectangle) => {
                  if (rectB.props.childId === -1) {
                    return 1;
                  }
                  return (
                    rectB.props.width * rectB.props.height -
                    rectA.props.width * rectA.props.height
                  );
                })
            // reasoning for the sort:
            // Konva determines zIndex (which rect is clicked on if rects overlap) based on rendering order
            // as long as the smallest components are rendered last they will always be accessible over the big boys
            // to guarantee they are rendered last, sort the array in reverse order by size
            // only exception is the pseudochild, which should always be rendered first for UX, regardless of size
            //
            // TODO: REFACTOR TO ONLY CHANGE ORDER OF RENDERING IF A BOX IS RESIZED
            }
          </Layer>
        </Stage>
      </div>
    );
  }
}

export default KonvaStage;
