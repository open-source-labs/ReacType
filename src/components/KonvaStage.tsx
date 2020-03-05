import React, { Component, createRef } from 'react';
import { Stage, Layer, Image, Line, Group} from 'react-konva';
import Rectangle from './Rectangle';
import { cloneDeep, isEmpty } from '../utils/index.util';
import { ComponentState, ChildState } from '../types/types';

type Props = {
  image: HTMLImageElement;
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
  width: number;
  height: number;
}

type State = {
  blockSnapSize: number;
  grid: any;
  gridStroke: number;
}

class KonvaStage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      blockSnapSize: 10,
      grid: [],
      gridStroke: 1,
    };
    this.stage = createRef<Stage>();
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
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = (e: any) => {
    // backspace and delete keys are keyCode 8 and 46, respectively
    // this function is only used for deleting children atm, could be used for other things
    if (e.keyCode === 8 || e.keyCode === 46) {
      const { focusComponent, deleteComponent } = this.props;
      deleteComponent(focusComponent.id);
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
    this.props.changeFocusChild({ childId: rectChildId });
    this.props.changeComponentFocusChild({
      componentId: this.props.focusComponent.id,
      childId: rectChildId,
    });
  };

  createGrid = () => {
    if (this.state.grid !== []) {
      const grid = this.state.grid;
      grid.destroyChildren;
    }
    const gridArr = [];
    for (let i = 0; i < this.props.width / this.state.blockSnapSize; i++) {
      gridArr.push(
        <Line
          points={[
            Math.round(i * this.state.blockSnapSize) + 0.5,
            0,
            Math.round(i * this.state.blockSnapSize) + 0.5,
            this.props.height,
          ]}
          stroke={'#ddd'}
          strokeWidth={this.state.gridStroke}
          key={`${i}vertical`}
        />,
      );
    }
    for (let j = 0; j < this.props.height / this.state.blockSnapSize; j++) {
      gridArr.push(
        <Line
          points={[
            0,
            Math.round(j * this.state.blockSnapSize),
            this.props.width,
            Math.round(j * this.state.blockSnapSize),
          ]}
          stroke={'#ddd'}
          strokeWidth={this.state.gridStroke}
          key={`${j}horizontal`}
        />,
      );
    }
    const output = <Group>{gridArr}</Group>;
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
      width,
      height
    } = this.props;

    return (
      <Stage
        className={'canvasStage'}
        ref={this.stage}
        onMouseDown={this.handleStageMouseDown}
        width={width}
        height={height}
        style={{ width: '100%' }}
      >
        <Layer
          // ref={(node) => {
          //   this.layer = node;
          // }}
        >
          {this.state.grid}
          <Image image={image} draggable />
          { !isEmpty(focusComponent) && this.getDirectChildrenCopy(focusComponent)
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
                draggable
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
    );
  }
}

export default KonvaStage;
