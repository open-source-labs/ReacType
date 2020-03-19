//The main container includes both the Konva stage for creating component wireframes and
//the bottom panel.

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core/styles';
import BottomPanel from '../components/BottomPanel';
import theme from '../components/theme';
import {
  handleTransform,
  changeFocusChild,
  changeComponentFocusChild,
  deleteChild,
  changeFocusComponent
} from '../actions/components';
import KonvaStage from '../components/KonvaStage';
import { PropsInt, ApplicationStateInt } from '../utils/Interfaces';

interface MainContPropsInt extends PropsInt {
  image: HTMLImageElement | null;
  handleTransformation(
    componentId: number,
    childId: number,
    dimensions: { x: number; y: number; width: number; height: number }
  ): void;
  changeComponentFocusChild(arg: { componentId: number; childId: number }): void;
  deleteChild(obj: object): void;
  changeFocusComponent(arg: { title: string }): void;
}

interface StateInt {
  draggable: boolean;
  toggleClass: boolean;
  scaleX: number;
  scaleY: number;
  x: number;
  y: number;
  modal: any;
}

// const IPC = require('electron').ipcRenderer; **Variable declared but never used**

const mapDispatchToProps = (dispatch: any) => ({
  //this passes the coordinate info from any component bound to the Konva Transformer to the store
  handleTransformation: (
    componentId: number,
    childId: number,
    {
      x,
      y,
      width,
      height
    }: { x: number; y: number; width: number; height: number }
  ) =>
    dispatch(
      handleTransform(componentId, childId, {
        x,
        y,
        width,
        height
      })
    ),
  //this doesn't do anything here
  // changeImagePath: (imageSource: string) =>
  //   dispatch(actions.changeImagePath(imageSource)),

  changeFocusComponent: ({ title }: { title: string }) => dispatch(changeFocusComponent({ title })),

  //this function changes the focus of the child within the focused component, thereby binding it to the transformer as a node
  changeFocusChild: ({ childId }: { childId: number }) =>
    dispatch(changeFocusChild({ childId })),

  //the difference between this dispatch function and the one above, is that this once alters the focused child status within the array of components,
  //vs the one above changes the focusChild property in the state
  changeComponentFocusChild: ({
    componentId,
    childId
  }: {
    componentId: number;
    childId: number;
  }) => dispatch(changeComponentFocusChild({ componentId, childId })),
  deleteChild: ({}) => dispatch(deleteChild({})) // if u send no prms, function will delete focus child. <-- This comment was already here, unsure what exactly it means.
});

const mapStateToProps = (store: { workspace: ApplicationStateInt }) => ({
  focusComponent: store.workspace.focusComponent,
  focusChild: store.workspace.focusChild,
  stateComponents: store.workspace.components
});

class MainContainer extends Component<MainContPropsInt, StateInt> {
  //Again, state should not be created outside of the single source of truth
  //Actually upon further examination, it looks like this state isn't manipulated at all.
  // state = {
  //   draggable: false,
  //   toggleClass: true,
  //   scaleX: 1,
  //   scaleY: 1,
  //   x: 0,
  //   y: 0,
  //   modal: ''
  // };

  render() {
    //const { draggable, modal } = this.state; //this is being destructured but never read.
    const {
      components,
      handleTransformation,
      focusComponent,
      focusChild,
      changeFocusChild,
      changeFocusComponent,
      changeComponentFocusChild,
      deleteChild,
      image
    } = this.props;

    // const { main }: { main: HTMLDivElement } = this; **I don't think this has any function**

    return (
      <MuiThemeProvider theme={theme}>
        <div className='main-container'>
          {/* {modal} */}
          <div
            className='main' //ref={main} **no function, commenting out**
          >
            <KonvaStage
              image={image}
              scaleX={1}
              scaleY={1}
              // draggable={draggable} this is also from this local state but never read past this container
              components={components}
              handleTransform={handleTransformation}
              focusComponent={focusComponent}
              focusChild={focusChild}
              changeFocusChild={changeFocusChild}
              changeComponentFocusChild={changeComponentFocusChild}
              deleteChild={deleteChild}
              /*  classes={classes}  commented out because not used anywhere*/
            />
          </div>
          <BottomPanel
            focusComponent={focusComponent}
            changeFocusComponent={changeFocusComponent}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
