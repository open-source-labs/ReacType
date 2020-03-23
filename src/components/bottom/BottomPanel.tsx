import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleClose, deleteProp, addProp } from '../../actions/actionCreators';
import BottomTabs from './BottomTabs';
import { PropsInt, PropInt } from '../../interfaces/Interfaces';

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

interface BottomPanelPropsInt extends PropsInt {
  deleteProp(id: number): void;
  addProp(prop: PropInt): void;
  changeFocusComponent(arg: { title: string }): void;
  updateCode(arg: { componentId: number; code: string }): void;
}

class BottomPanel extends Component<BottomPanelPropsInt> {
  render() {
    const {
      components,
      focusComponent,
      deleteProp,
      addProp,
      focusChild,
      changeFocusComponent,
      updateCode
    } = this.props;

    return (
      <div className="bottom-panel" style={{ width: '100%' }}>
        <BottomTabs
          components={components}
          focusComponent={focusComponent}
          deleteProp={deleteProp}
          addProp={addProp}
          focusChild={focusChild}
          changeFocusComponent={changeFocusComponent}
          updateCode={updateCode}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BottomPanel);
