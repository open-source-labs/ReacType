import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleClose, deleteProp, addProp } from '../actions/components';
import BottomTabs from './BottomTabs';
import { ComponentInt, ComponentsInt, ChildInt } from '../utils/Interfaces';

const IPC = require('electron').ipcRenderer;

const mapDispatchToProps = (dispatch: any) => ({
  handleNotificationClose: () => dispatch(handleClose()),
  deleteProp: (id: number) => dispatch(deleteProp(id)),
  addProp: (prop: any) => dispatch(addProp(prop))
});

const mapStateToProps = (store: any) => ({
  focusChild: store.workspace.focusChild,
  components: store.workspace.components
});

interface PropsInt {
  focusChild: ChildInt;
  components: ComponentsInt;
  focusComponent: ComponentInt;
  deleteProp: any;
  addProp: any;
}

class BottomPanel extends Component<PropsInt> {
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
