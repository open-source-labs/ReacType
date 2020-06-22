import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withStyles, Theme } from '@material-ui/core/styles';
import HtmlAttr from '../components/bottom/HtmlAttr';
import { PropsInt, ApplicationStateInt } from '../interfaces/Interfaces';
import {
  deleteProp,
  addProp,
  toggleNative,
  changeComponentFocusChild
} from '../actions/actionCreators';

interface StateInt {
  value: number;
  translate: { x: number; y: number };
}

const mapDispatchToProps = (dispatch: any) => ({
  addProp: (prop: PropInt) => dispatch(addProp(prop)),
  deleteProp: (id: number) => dispatch(deleteProp(id)),
  toggleNative: () => dispatch(toggleNative()),
  toggleCodeEdit: () => dispatch(toggleCodeEdit())
});

const mapStateToProps = (store: { workspace: ApplicationStateInt }) => ({
  focusComponent: store.workspace.focusComponent,
  focusChild: store.workspace.focusChild,
  stateComponents: store.workspace.components,
  native: store.workspace.native
});

interface BottomTabsPropsInt extends PropsInt {
  deleteProp(id: number): void;
  addProp(arg: { key: string; type: string }): void;
  classes: any;
  changeFocusComponent(arg: { title: string }): void;
  updateCode(arg: { componentId: number; code: string }): void;
  toggleNative(): void;
  native: boolean;
  toggleCodeEdit(): void;
  codeReadOnly: boolean;
}

class RightContainer extends Component<BottomTabsPropsInt, StateInt> {
  constructor(props: BottomTabsPropsInt) {
    super(props);
  }

  render(): JSX.Element {
    const { classes, components, focusComponent, focusChild } = this.props;

    const htmlAttribCount = focusComponent.childrenArray.filter(
      child => child.childType === 'HTML'
    ).length;

    return (
      <div
        className="column right"
        style={{
          minWidth: '400px',
          color: 'white',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <h3>This is the right column everyone!</h3>
        <h4>
          HTML Element Attributes{' '}
          {htmlAttribCount ? `(${htmlAttribCount})` : ''}
        </h4>
        {focusChild.childType === 'HTML' && <HtmlAttr />}
        {focusChild.childType !== 'HTML' && (
          <p>Please select an HTML element to view attributes</p>
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RightContainer);
