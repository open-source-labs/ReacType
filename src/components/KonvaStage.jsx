import React, { Component, createRef, Fragment } from "react";
// import PropTypes from 'prop-types';
import { Stage, Layer, Group, Label, Text } from "react-konva";
import TransformerComponent from "./TransformerComponent.jsx";
import Rectangle from "./Rectangle.jsx";

class KonvaStage extends Component {
  state = {
    x: undefined,
    y: undefined
  };

  constructor(props) {
    super(props);
    this.main = createRef();
    this.group = createRef();
  }

  handleStageMouseDown = e => {
    // // clicked on stage - clear selection
    if (e.target === e.target.getStage()) {
      // add functionality for allowing no focusChild
      return;
    }
    // // clicked on transformer - do nothing
    const clickedOnTransformer =
      e.target.getParent().className === "Transformer";
    if (clickedOnTransformer) {
      return;
    }

    // find clicked rect by its name
    const rectChildId = e.target.attrs.childId;
    console.log("e.target : ", rectChildId);
    this.props.changeFocusChild({ childId: rectChildId });
  };

  componentDidMount() {
    // this.props.setImage();
  }

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
      changeFocusChild
    } = this.props;
    const { selectedShapeName } = this.state;

    return (
      <Stage
        ref={node => {
          this.stage = node;
        }}
        onMouseDown={this.handleStageMouseDown}
        width={window.innerWidth}
        height={window.innerHeight}
      >
        <Layer>
          {components
            .find(comp => comp.title === focusComponent.title)
            .childrenArray.map((child, i) => (
              <Rectangle
                key={`${i}${child.componentName}`}
                draggable={false}
                selectedShapeName={selectedShapeName}
                components={components}
                childId={child.childId}
                focusChild={focusChild}
                focusComponent={focusComponent}
                componentId={focusComponent.id}
                x={child.position.x}
                y={child.position.y}
                width={child.position.width}
                height={child.position.height}
                title={child.componentName + child.childId}
                color={child.color}
                handleTransform={handleTransform}
              />
            ))}
        </Layer>
      </Stage>
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
