import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleClose, deleteCompProp, addCompProp } from '../actions/applicationActions.ts';
import BottomTabs from './BottomTabs.tsx';
import { ComponentInt, ComponentsInt, ChildInt } from '../utils/interfaces.ts';

const IPC = require('electron').ipcRenderer;

const mapDispatchToProps = (dispatch: any) => ({
  handleNotificationClose: () => dispatch(handleClose()),
  deleteProp: ({ id, index }: { id: number; index: number }) => dispatch(deleteCompProp({ id, index })),
  addProp: (prop: any) => dispatch(addCompProp(prop)),
});

const mapStateToProps = (store: any) => ({
  focusChild: store.workspace.focusChild,
  components: store.workspace.components,
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
    const {
      components, focusComponent, deleteProp, addProp, focusChild,
    } = this.props;

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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BottomPanel);
