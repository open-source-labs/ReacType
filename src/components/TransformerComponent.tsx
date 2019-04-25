import React, { Component } from 'react';
import { Transformer } from 'react-konva';
import PropTypes from 'prop-types';

export default class TransformerComponent extends Component {
  componentDidMount() {
    this.checkNode();
  }

  componentDidUpdate() {
    this.checkNode();
  }

  // this function makes sure the transformer follows along with the focusChild
  checkNode() {
    const stage = this.transformer.getStage();
    const { focusChild } = this.props;
    const selectedNode = stage.findOne(`.${focusChild.childId}`);

    if (selectedNode === this.transformer.node()) {
      return;
    }
    if (selectedNode) {
      this.transformer.attachTo(selectedNode);
    } else {
      this.transformer.detach();
    }
    this.transformer.getLayer().batchDraw();
  }

  render() {
    return (
      <Transformer
        rotateEnabled={false}
        onMouseUp={this.handleMouseUp}
        ref={(node) => {
          this.transformer = node;
        }}
        borderEnabled={false}
        anchorFill={'grey'}
        anchorStroke={'grey'}
        anchorSize={8}
        keepRatio={false}
      />
    );
  }
}

TransformerComponent.propTypes = {
  focusComponent: PropTypes.object,
};
