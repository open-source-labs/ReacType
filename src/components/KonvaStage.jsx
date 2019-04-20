import React, { Component, createRef, Fragment } from 'react';
// import PropTypes from 'prop-types';
import {
  Stage, Layer, Image, Group, Label, Text, Tag,
} from 'react-konva';
import Konva from 'konva';
import TransformerComponent from './TransformerComponent.jsx';
import Rectangle from './Rectangle.jsx';

class KonvaStage extends Component {
  state = {
    x: undefined,
    y: undefined,
  };

  constructor(props) {
    super(props);
    this.main = createRef();
    this.group = createRef();
  }

  // Christian - this function causes the expansionPanel of the clicked rect to open
  // (and focusedComponent to change, which we don't want)
  // could reuse this logic for affecting state of children array
  // ADD FOCUS CHILD FUNCTIONALITY HERE
  handleStageMouseDown = (e) => {
    // clicked on stage - cler selection
    if (e.target === e.target.getStage()) {
      this.props.openExpansionPanel({});
      return;
    }
    // clicked on transformer - do nothing
    const clickedOnTransformer = e.target.getParent().className === 'Transformer';
    if (clickedOnTransformer) {
      return;
    }

    // find clicked rect by its name
    const id = e.target.name();
    const rect = this.props.components.find(r => r.id === id);

    if (rect) {
      this.props.openExpansionPanel(rect);
    } else {
      this.props.openExpansionPanel({});
    }
  };

  render() {
    const {
      components, handleTransform, draggable, scaleX, scaleY, focusComponent,
    } = this.props;
    // const { selectedShapeName } = this.state;

    return (
      <Stage
        ref={(node) => {
          this.stage = node;
        }}
        onMouseDown={this.handleStageMouseDown}
        width={window.innerWidth}
        height={window.innerHeight}
      >
        <Layer>
          <Group
            scaleX={scaleX}
            scaleY={scaleY}
            ref={(node) => {
              this.group = node;
            }}
            draggable={draggable}
          >
            {components.map((comp, i) => (
              <Fragment key={i}>
                <Rectangle
                  draggable={comp.draggable}
                  key={i}
                  componentId={comp.id}
                  x={comp.position.x}
                  y={comp.position.y}
                  width={comp.position.width}
                  height={comp.position.height}
                  title={comp.title}
                  color={comp.color}
                  handleTransform={handleTransform}
                />
                <Label x={comp.position.x} y={comp.position.y}>
                  <Text
                    text={`${comp.title},${comp.position.x.toPrecision(
                      3,
                    )},${comp.position.y.toPrecision(3)}`}
                    fontFamily="Calibri"
                    fontSize={12}
                    padding={5}
                    fill="green"
                  />
                </Label>
              </Fragment>
            ))}
            <TransformerComponent focusComponent={focusComponent} />
          </Group>
        </Layer>
      </Stage>
    );
  }
}

export default KonvaStage;
