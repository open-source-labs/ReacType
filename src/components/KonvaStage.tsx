import React, { Component, createRef, Fragment } from 'react';
// import PropTypes from 'prop-types';
import { Stage, Layer, Group, Label, Text, Rect, Transformer } from 'react-konva';
import Rectangle from './Rectangle.jsx';
import TransformerComponent from './TransformerComponent.jsx';

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
    this.setState({
      stageWidth: width,
      stageHeight: height,
    });
  };

  handleStageMouseDown = e => {
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

    if (e.target.attrs.className === 'componentRect') {
      console.log('user clicked on componentRect');
    }

    // find clicked rect by its name
    const rectChildId = e.target.attrs.childId;
    console.log('user clicked on child rectangle with Id: ', rectChildId);
    this.props.changeFocusChild({ childId: rectChildId });
    this.props.changeComponentFocusChild({
      componentId: this.props.focusComponent.id,
      childId: rectChildId,
    });
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
        ref={node => {
          this.container = node;
        }}
      >
        <Stage
          ref={node => {
            this.stage = node;
          }}
          onMouseDown={this.handleStageMouseDown}
          width={this.state.stageWidth}
          height={this.state.stageHeight - 10}
        >
          <Layer>
            {focusComponent.title !== 'App' && (
              <Group
                draggable={true}
                x={focusComponent.position.x}
                y={focusComponent.position.y}
                width={focusComponent.position.width}
                height={focusComponent.position.height}
              >
                <Rect
                  className={'componentRect'}
                  stroke={focusComponent.color}
                  x={0}
                  y={0}
                  name={'-1'}
                  width={focusComponent.position.width}
                  height={focusComponent.position.height}
                  strokeWidth={2}
                  strokeScaleEnabled={false}
                />
                <Label>
                  <Text
                    text={focusComponent.title}
                    fill={focusComponent.color}
                    fontStyle={'bold'}
                    fontVariant={'small-caps'}
                    fontSize={14}
                    y={-15}
                  />
                </Label>
                <TransformerComponent rectClass={'componentRect'} />
              </Group>
            )}
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
