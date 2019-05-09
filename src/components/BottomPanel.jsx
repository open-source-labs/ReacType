import React, { Component } from "react";
import { connect } from "react-redux";
import {
  handleClose,
  deleteCompProp,
  addCompProp
} from "../actions/components.ts";
import BottomTabs from "./BottomTabs";

const IPC = require("electron").ipcRenderer;

const mapDispatchToProps = dispatch => ({
  handleNotificationClose: () => dispatch(handleClose()),
  deleteProp: ({ id, index }) => dispatch(deleteCompProp({ id, index })),
  addProp: prop => dispatch(addCompProp(prop))
});

const mapStateToProps = store => ({
  focusChild: store.workspace.focusChild,
  components: store.workspace.components
});

class BottomPanel extends Component {
  // viewAppDir = () => {
  //   IPC.send('view_app_dir', this.props.appDir);
  // };

  render() {
    const {
      components,
      focusComponent,
      deleteProp,
      addProp,
      focusChild
    } = this.props;

    return (
      <div className="bottom-panel" style={{ width: "100%" }}>
        <BottomTabs
          components={components}
          focusComponent={focusComponent}
          deleteProp={deleteProp}
          addProp={addProp}
          focusChild={focusChild}
        />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BottomPanel);
