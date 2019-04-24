import React, { Component, createRef, Fragment } from 'react';
// import PropTypes from 'prop-types';
import {
  Stage, Layer, Group, Label, Text,
} from 'react-konva';
import TransformerComponent from './TransformerComponent.jsx';
import Rectangle from './Rectangle.jsx';

class KonvaStage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: undefined,
      y: undefined,
      stageWidth: 1000,
      stageHeight: 1000,
    };
    this.main = createRef();
    this.group = createRef();
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
    console.log('setting width: ', this.state.stageWidth, width);
    console.log('setting height: ', this.state.heightWidth, height);
    this.setState({
      stageWidth: width,
      stageHeight: height,
    });
  };

  handleStageMouseDown = (e) => {
    // // clicked on stage - clear selection
    if (e.target === e.target.getStage()) {
      // add functionality for allowing no focusChild
      console.log(e.target.getStage());
      return;
    }
    // // clicked on transformer - do nothing
    const clickedOnTransformer = e.target.getParent().className === 'Transformer';
    if (clickedOnTransformer) {
      return;
    }

    // find clicked rect by its name
    const rectChildId = e.target.attrs.childId;
    console.log('e.target : ', rectChildId);
    this.props.changeFocusChild({ childId: rectChildId });
    this.props.changeComponentFocusChild({
      componentId: this.props.focusComponent.id,
      childId: rectChildId,
    });
    //  put individual component's focus child logic here
  };

  render() {
    const {
      components,
      handleTransform,
      image,
      draggable,
      scaleX,
      scaleY,
      focusComponent,
      focusChild,
      changeFocusChild,
      changeComponentFocusChild,
    } = this.props;
    const { selectedShapeName } = this.state;

    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          // border: '1px solid grey',
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
          height={this.state.stageHeight - 10}
        >
          <Layer>
            {components
              .find(comp => comp.id === focusComponent.id)
              .childrenArray.map((child, i) => (
                <Rectangle
                  key={`${i}${child.componentName}`}
                  components={components}
                  componentId={focusComponent.id}
                  childComponentName={child.componentName}
                  childComponentId={child.childComponentId}
                  focusChild={focusChild}
                  childId={child.childId}
                  x={child.position.x}
                  y={child.position.y}
                  scaleX={1}
                  scaleY={1}
                  width={child.position.width}
                  height={child.position.height}
                  title={child.componentName + child.childId}
                  color={child.color}
                  handleTransform={handleTransform}
                  draggable={true}
                />
              ))}
          </Layer>
        </Stage>
      </div>
    );
  }
}

// KonvaStage.propTypes = {
//   draggable: PropTypes.bool.isRequired,
//   components: PropTypes.array.isRequired,
//   handleTransform: PropTypes.func.isRequired,
//   image: PropTypes.oneOfType([
//     PropTypes.string,
//     PropTypes.object,
//   ]),
//   scaleX: PropTypes.number.isRequired,
//   scaleY: PropTypes.number.isRequired,
//   openExpansionPanel: PropTypes.func.isRequired,
//   setImage: PropTypes.func.isRequired,
//   focusComponent: PropTypes.object.isRequired,
// };

export default KonvaStage;
