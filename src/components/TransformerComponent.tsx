import React, { Component } from 'react';
import { Transformer } from 'react-konva';
import PropTypes from 'prop-types';

export default class TransformerComponent extends Component {
  componentDidMount() {
    this.checkNode(this.props.rectClass);
  }

  componentDidUpdate() {
    this.checkNode(this.props.rectClass);
  }

  // this function makes sure the transformer follows along with the focusChild
  checkNode(rectClass) {
    const stage = this.transformer.getStage();
    const { focusChild } = this.props;

    // depending on the rectClass prop, this transformer is either attached to
    // a childRect or the focused component's componentRect
    let selectedNode;
    if (rectClass === 'componentRect') {
      selectedNode = stage.findOne(`.${-1}`);
    } else if (rectClass === 'childRect') {
      selectedNode = stage.findOne(`.${focusChild.childId}`);
    } else {
      return;
    }

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
        ref={(node) => {
          this.transformer = node;
        }}
        borderEnabled={false}
        anchorFill={this.props.color}
        anchorStroke={this.props.color}
        anchorSize={this.props.anchorSize}
        keepRatio={false}
      />
    );
  }
}

TransformerComponent.propTypes = {
  focusComponent: PropTypes.object,
};
