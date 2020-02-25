import React, { Component } from 'react';
import { Stage, Layer, Image, Line } from 'react-konva';
import Rectangle from './Rectangle';
import { cloneDeep } from '../utils/index.util';
import { ComponentState, ChildState } from '../types/types';

type Props = {
  image: any;
  components: ComponentState[];
  focusComponent: ComponentState;
  selectableChildren: number[];
  classes: any;
  addComponent: any;
  addChild: any;
  changeFocusComponent: any;
  changeFocusChild: any;
  deleteComponent: any;
  createApp: any;
  deleteAllData: any;
  handleTransform: any;
  focusChild: any;
  changeComponentFocusChild: any;
  deleteChild: any;
}

type State = {
  stageWidth: number;
  stageHeight: number;
  blockSnapSize: number;
  grid: [];
  gridStroke: number;
}

class KonvaStage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    console.log("props.image: ", this.props.image);
    this.state = {
      stageWidth: 1800,
      stageHeight: 1300,
      blockSnapSize: 10,
      grid: [],
      gridStroke: 1,
    };
  }

  getDirectChildrenCopy(focusComponent: ComponentState) {
    const component = this.props.components.find(
      (comp: ComponentState) => comp.id === focusComponent.id,
    );

    const childrenArr = component.children.filter((child: ChildState) => child.childId !== -1);

    let childrenArrCopy = cloneDeep(childrenArr);

    const pseudoChild = {
      childId: -1,
      childComponentId: component.id,
      componentName: component.title,
      position: {
        x: component.position.x,
        y: component.position.y,
        width: component.position.width,
        height: component.position.height,
      },
      draggable: true,
      color: component.color,
    };
    childrenArrCopy = childrenArrCopy.concat(pseudoChild); // could just use push here, concat needlessly generate new array
    return childrenArrCopy;
  }

  componentDidMount() {
    this.checkSize();
    // here we should add listener for "container" resize
    // take a look here https://developers.google.com/web/updates/2016/10/resizeobserver
    // for simplicity I will just listen window resize
    window.addEventListener('resize', this.checkSize);
    this.container.addEventListener('keydown', this.handleKeyDown);
    this.createGrid();
    // this.props.setImage();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.checkSize);
    this.container.removeEventListener('keydown', this.handleKeyDown);
  }

  checkSize = () => {
    const width = this.container.offsetWidth;
    const height = this.container.offsetHeight;
    this.setState({
      stageWidth: width,
      stageHeight: height,
    });
  };

  handleKeyDown = (e: any) => {
    // backspace and delete keys are keyCode 8 and 46, respectively
    // this function is only used for deleting children atm, could be used for other things
    if (e.keyCode === 8 || e.keyCode === 46) {
      this.props.deleteChild({});
    }
  };

  handleStageMouseDown = (e: any) => {
    // clicked on stage - clear selection
    if (e.target === e.target.getStage()) {
      return;
    }
    // // clicked on transformer - do nothing
    const clickedOnTransformer = e.target.getParent().className === 'Transformer';
    if (clickedOnTransformer) {
      return;
    }

    // find clicked rect by its name
    const rectChildId = e.target.attrs.childId;
    // console.log("user clicked on child rectangle with childId: ", rectChildId);
    this.props.changeFocusChild({ childId: rectChildId });
    this.props.changeComponentFocusChild({
      componentId: this.props.focusComponent.id,
      childId: rectChildId,
    });
  };

  createGrid = () => {
    const output = [];
    for (let i = 0; i < this.state.stageWidth / this.state.blockSnapSize; i++) {
      output.push(
        <Line
          points={[
            Math.round(i * this.state.blockSnapSize) + 0.5,
            0,
            Math.round(i * this.state.blockSnapSize) + 0.5,
            this.state.stageHeight,
          ]}
          stroke={'#ddd'}
          strokeWidth={this.state.gridStroke}
          key={`${i}vertical`}
        />,
      );
    }
    for (let j = 0; j < this.state.stageHeight / this.state.blockSnapSize; j++) {
      output.push(
        <Line
          points={[
            0,
            Math.round(j * this.state.blockSnapSize),
            this.state.stageWidth,
            Math.round(j * this.state.blockSnapSize),
          ]}
          stroke={'#ddd'}
          strokeWidth={this.state.gridStroke}
          key={`${j}horizontal`}
        />,
      );
    }
    this.setState({
      grid: output,
    });
  };

  render() {
    const {
      image,
      components,
      handleTransform,
      focusComponent,
      focusChild,
      deleteChild,
      classes,
    } = this.props;

    return (
      <div
        style={{
          width: '100%',
          height: '100%',
        }}
        ref={(node) => {
          this.container = node;
        }}
        tabIndex="0" // required for keydown event to be heard by this.container
      >
        <Stage
          className={'canvasStage'}
          ref={(node) => {
            this.stage = node;
          }}
          onMouseDown={this.handleStageMouseDown}
          width={this.state.stageWidth}
          height={this.state.stageHeight}
          style={{ width: '100%' }}
        >
          <Layer
            ref={(node) => {
              this.layer = node;
            }}
          >

            {this.state.grid}
            <Image image={image} />
            {this.getDirectChildrenCopy(focusComponent)
              .map((child: ChildState, i: number) => (
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
                  imageSource={child.htmlElement === 'Image' && child.HTMLInfo.Src}
                />
              ))
              .sort((rectA, rectB) => {
                if (rectB.props.childId === -1) {
                  return 1;
                }
                return (
                  rectB.props.width * rectB.props.height - rectA.props.width * rectA.props.height
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
      </div >
    );
  }
}

export default KonvaStage;
