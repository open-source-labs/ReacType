import React, { Component, createRef, Fragment } from 'react';
// import PropTypes from 'prop-types';
import {
  Stage, Layer, Group, Label, Text, Rect, Transformer,
} from 'react-konva';
import Rectangle from './Rectangle.jsx';

class KonvaStage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stageWidth: 1000,
      stageHeight: 1000,
    };
  }

  componentDidMount() {
    this.checkSize();
    // here we should add listener for "container" resize
    // take a look here https://developers.google.com/web/updates/2016/10/resizeobserver
    // for simplicity I will just listen window resize
    window.addEventListener('resize', this.checkSize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.checkSize);
  }

  checkSize = () => {
    const width = this.container.offsetWidth;
    const height = this.container.offsetHeight;
    this.setState({
      stageWidth: width,
      stageHeight: height,
    });
  };

  handleStageMouseDown = (e) => {
    // // clicked on stage - clear selection
    if (e.target === e.target.getStage()) {
      // add functionality for allowing no focusChild
      console.log('user clicked on canvas:');
      return;
    }
    // // clicked on transformer - do nothing
    const clickedOnTransformer = e.target.getParent().className === 'Transformer';
    if (clickedOnTransformer) {
      console.log('user clicked on transformer');
      return;
    }

    // find clicked rect by its name
    const rectChildId = e.target.attrs.childId;
    console.log('user clicked on child rectangle with childId: ', rectChildId);
    this.props.changeFocusChild({ childId: rectChildId });
    this.props.changeComponentFocusChild({
      componentId: this.props.focusComponent.id,
      childId: rectChildId,
    });
  };

  render() {
    const {
      components, handleTransform, focusComponent, focusChild,
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
      >
        <Stage
          ref={(node) => {
            this.stage = node;
          }}
          onMouseDown={this.handleStageMouseDown}
          width={this.state.stageWidth}
          height={this.state.stageHeight}
        >
          <Layer>
            {components
              .find(comp => comp.id === focusComponent.id)
              .childrenArray.map((child, i) => (
                <Rectangle
                  key={`${i}${child.componentName}`}
                  components={components}
                  componentId={focusComponent.id}
                  childComponentId={child.childComponentId}
                  childComponentName={child.componentName}
                  focusChild={focusChild}
                  childId={child.childId} // '-1' for pseudoChild
                  x={child.position.x}
                  y={child.position.y}
                  scaleX={1}
                  scaleY={1}
                  width={child.position.width}
                  height={child.position.height}
                  title={child.componentName + child.childId}
                  handleTransform={handleTransform}
                  draggable={true}
                />
              ))
              .sort(
                (rectA, rectB) => rectA.props.width * rectA.props.height < rectB.props.width * rectB.props.height,
              )
            // reasoning for the sort:
            // Konva determines zIndex (which rect is clicked on if rects overlap) based on rendering order
            // as long as the smallest components are rendered last they will always be accessible over the big boys
            // to guarantee they are rendered last, sort the array in reverse order by size
            // THIS COULD BE A BIG PERFORMANCE PROBLEM (PROBABLY WILL BE!)
            // TRY TO REFACTOR TO ONLY CHANGE ORDER OF RENDERING IF A BOX IS RESIZED
            }
          </Layer>
        </Stage>
      </div>
    );
  }
}

export default KonvaStage;
