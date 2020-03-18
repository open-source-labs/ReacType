import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleClose, deleteProp, addProp } from '../actions/components';
import BottomTabs from './BottomTabs';
import { ComponentInt, ComponentsInt, ChildInt, PropsInt, PropInt } from '../utils/Interfaces';

const IPC = require('electron').ipcRenderer;

const mapDispatchToProps = (dispatch: any) => ({
  handleNotificationClose: () => dispatch(handleClose()),
  deleteProp: (id: number) => dispatch(deleteProp(id)),
  addProp: (prop: PropInt) => dispatch(addProp(prop))
});

const mapStateToProps = (store: any) => ({
  focusChild: store.workspace.focusChild,
  components: store.workspace.components
});

interface BottomPannelPropsInt extends PropsInt {
  deleteProp(id: number): void;
  addProp(prop: PropInt): void;
}

class BottomPanel extends Component<BottomPannelPropsInt> {
  render() {
    const { components, focusComponent, deleteProp, addProp, focusChild } = this.props;

    return (
      <div className="bottom-panel" style={{ width: '100%' }}>
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

export default connect(mapStateToProps, mapDispatchToProps)(BottomPanel);
