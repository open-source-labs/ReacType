import React, { Component } from 'react';
import { connect } from 'react-redux';
import RightTabs from '../components/RightTabs';
import { ComponentState, ChildState } from '../types/types';
import * as actions from '../actions/actions';

// ** IPC used with Electron for render
const IPC = require('electron').ipcRenderer;

// ** Right Container props definitions
type Props = {
  focusChild: ChildState;
  components: ComponentState[];
  focusComponent: ComponentState;
  deleteProp: any;
  addProp: any;
}

// ** Redux state mapping to props
const mapStateToProps = (store: any) => ({
  focusChild: store.application.focusChild,
  components: store.application.components,
});

// ** Redux dispatch mapping to props
const mapDispatchToProps = (dispatch: any) => ({
  handleNotificationClose: () => dispatch(actions.handleClose()),
  deleteProp: ({ id, index }: { id: number; index: number }) => dispatch(actions.deleteCompProp({ id, index })),
  addProp: (prop: any) => dispatch(actions.addCompProp(prop)),
});

// ** RightContainer is now a functional component since it doesn't track state internally nor have any need for specific class methods
const RightContainer: React.FC<Props> = (props) => {
  const { components, focusComponent, deleteProp, addProp, focusChild } = props;
  return (
    <div className="column right-container" style={{ backgroundColor: '#303030' }}>
      <RightTabs
        components={components}
        focusComponent={focusComponent}
        deleteProp={deleteProp}
        addProp={addProp}
        focusChild={focusChild}
      />
    </div>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RightContainer);
