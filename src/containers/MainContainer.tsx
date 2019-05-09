import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core/styles';
import BottomPanel from '../components/BottomPanel.jsx';
import theme from '../components/theme';
import {
  openExpansionPanel,
  handleTransform,
  changeFocusChild,
  changeComponentFocusChild,
  deleteChild,
  deleteComponent,
  createApplication,
} from '../actions/components.ts';
import KonvaStage from '../components/KonvaStage.jsx';
import { ComponentInt, ComponentsInt } from '../utils/interfaces';
// import MainContainerHeader from "../components/MainContainerHeader.jsx";
// import createModal from "../utils/createModal.util";

interface PropsInt {
  components: ComponentsInt;
  focusComponent: ComponentInt;
  selectableChildren: Array<number>;
  classes: any;
  addComponent: any;
  addChild: any;
  changeFocusComponent: any;
  changeFocusChild: any;
  deleteComponent: any;
  createApp: any;
  deleteAllData: any;
}

interface StateInt {
  componentName: string;
  modal: any;
  genOptions: Array<string>;
  genOption: number;
}

const IPC = require('electron').ipcRenderer;

const mapDispatchToProps = dispatch => ({
  handleTransformation: (componentId, childId, { x, y, width, height }) =>
    dispatch(
      handleTransform(componentId, childId, {
        x,
        y,
        width,
        height,
      }),
    ),
  // openPanel: component => dispatch(openExpansionPanel(component)),
  changeFocusChild: ({ childId }) => dispatch(changeFocusChild({ childId })),
  changeComponentFocusChild: ({ componentId, childId }) =>
    dispatch(changeComponentFocusChild({ componentId, childId })),
  deleteChild: ({}) => dispatch(deleteChild({})), // if u send no prms, function will delete focus child.
  // deleteComponent: ({ componentId, stateComponents }) =>
  //   dispatch(deleteComponent({ componentId, stateComponents })),
  // createApp: ({ path, components, genOption }) =>
  //   dispatch(
  //     createApplication({
  //       path,
  //       components,
  //       genOption
  //     })
  //   )
});

const mapStateToProps = store => ({
  focusComponent: store.workspace.focusComponent,
  focusChild: store.workspace.focusChild,
  stateComponents: store.workspace.components,
});

class MainContainer extends Component {
  state = {
    // image: "",
    draggable: false,
    // modal: null,
    // genOptions: [
    //   "Export components",
    //   "Export components with application files"
    // ],
    // genOption: 0,
    // draggable: false,
    toggleClass: true,
    scaleX: 1,
    scaleY: 1,
    x: undefined,
    y: undefined,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { draggable, scaleX, scaleY, modal, toggleClass } = this.state;
    const {
      components,
      handleTransformation,
      // openPanel,
      focusComponent,
      focusChild,
      changeFocusChild,
      changeComponentFocusChild,
      deleteChild,
      // deleteComponent,
      // stateComponents,
      classes,
    } = this.props;
    const { main } = this;
    // const cursor = this.state.draggable ? "move" : "default";

    // show a string of all direct parents. SO the user can gaze at it.
    // const directParents = !focusComponent.id
    //   ? "Waiting for a focused component"
    //   : stateComponents
    //       .filter(comp =>
    //         comp.childrenArray.some(
    //           kiddy => kiddy.childComponentId === focusComponent.id
    //         )
    //       )
    //       .map(comp => comp.title)
    //       .join(",");

    return (
      <MuiThemeProvider theme={theme}>
        <div className="main-container">
          {modal}
          {/* <MainContainerHeader
            // showImageDeleteModal={showImageDeleteModal}
            showGenerateAppModal={showGenerateAppModal}
          /> */}

          <div className="main" ref={main}>
            <KonvaStage
              scaleX={1}
              scaleY={1}
              draggable={draggable}
              components={components}
              handleTransform={handleTransformation}
              // openExpansionPanel={openPanel}
              focusComponent={focusComponent}
              focusChild={focusChild}
              changeFocusChild={changeFocusChild}
              changeComponentFocusChild={changeComponentFocusChild}
              deleteChild={deleteChild}
              classes={classes}
            />
          </div>
          <BottomPanel focusComponent={focusComponent} />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainContainer);
