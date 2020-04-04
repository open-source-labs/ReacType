import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  handleClose,
  deleteProp,
  addProp,
  toggleNative,
  changeComponentFocusChild
} from '../../actions/actionCreators';
import BottomTabs from './BottomTabs';
import { PropsInt, PropInt } from '../../interfaces/Interfaces';
import { toggleCodeEdit } from '../../actions/actionCreators';

const IPC = require('electron').ipcRenderer;

const mapDispatchToProps = (dispatch: any) => ({
  addProp: (prop: PropInt) => dispatch(addProp(prop)),
  deleteProp: (id: number) => dispatch(deleteProp(id)),
  handleNotificationClose: () => dispatch(handleClose()),
  toggleNative: () => dispatch(toggleNative()),
  toggleCodeEdit: () => dispatch(toggleCodeEdit())
});

const mapStateToProps = (store: any) => ({
  focusChild: store.workspace.focusChild,
  components: store.workspace.components,
  native: store.workspace.native,
  codeReadOnly: store.workspace.codeReadOnly
});

interface BottomPanelPropsInt extends PropsInt {
  deleteProp(id: number): void;
  addProp(prop: PropInt): void;
  changeFocusComponent(arg: { title: string }): void;
  updateCode(arg: { componentId: number; code: string }): void;
  toggleNative(): void;
  native: boolean;
  toggleCodeEdit(): void;
  codeReadOnly: boolean;
  changeComponentFocusChild(arg: {
    componentId: number;
    childId: number;
  }): void;
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
      updateCode,
      toggleNative,
      native,
      toggleCodeEdit,
      codeReadOnly,
      changeComponentFocusChild
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
          toggleCodeEdit={toggleCodeEdit}
          codeReadOnly={codeReadOnly}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BottomPanel);
