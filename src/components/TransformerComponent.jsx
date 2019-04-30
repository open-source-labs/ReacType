import React, { Component } from "react";
import { Transformer } from "react-konva";
// import PropTypes from 'prop-types';

export default class TransformerComponent extends Component {
  componentDidMount() {
    this.checkNode();
  }

  componentDidUpdate() {
    this.checkNode();
    console.log(this.transformer.enabledAnchors());
    console.log(this.transformer);
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

  // checkTransformerAnchor() {
  //   console.log(this.transformer.enabledAnchors());
  //   return this.transformer;
  // }

  render() {
    return (
      <Transformer
        rotateEnabled={false}
        ref={node => {
          this.transformer = node;
        }}
        borderEnabled={false}
        anchorFill={this.props.color}
        anchorStroke={this.props.color}
        anchorSize={this.props.anchorSize}
        keepRatio={false}
        // onClick={checkTransformerAnchor()}
      />
    );
  }
}

// TransformerComponent.propTypes = {
//   focusComponent: PropTypes.object,
// };
