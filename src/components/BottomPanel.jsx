import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleClose, deleteCompProp, addCompProp } from '../actions/components';
import RightTabs from './RightTabs.jsx';

const IPC = require('electron').ipcRenderer;

const mapDispatchToProps = dispatch => ({
  handleNotificationClose: () => dispatch(handleClose()),
  deleteProp: ({ id, index }) => dispatch(deleteCompProp({ id, index })),
  addProp: prop => dispatch(addCompProp(prop)),
});

const mapStateToProps = store => ({
  // successOpen: store.workspace.successOpen,
  // errorOpen: store.workspace.errorOpen,
  // appDir: store.workspace.appDir,
});

class BottomPanel extends Component {
  // state = {
  //   successOpen: false,
  //   errorOpen: false,
  // };

  viewAppDir = () => {
    IPC.send('view_app_dir', this.props.appDir);
  };

  render() {
    const {
      components,
      successOpen,
      errorOpen,
      handleNotificationClose,
      appDir,
      focusComponent,
      deleteProp,
      addProp,
      // rightColumnOpen
    } = this.props;

    return (
      <div className="bottom-panel" style={{ width: '100%' }}>
        <RightTabs
          components={components}
          focusComponent={focusComponent}
          deleteProp={deleteProp}
          addProp={addProp}
          // rightColumnOpen={rightColumnOpen}
        />
        {/* <Snackbars
          successOpen={successOpen}
          errorOpen={errorOpen}
          handleNotificationClose={handleNotificationClose}
          msg={appDir}
          viewAppDir={this.viewAppDir}
        /> */}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BottomPanel);
