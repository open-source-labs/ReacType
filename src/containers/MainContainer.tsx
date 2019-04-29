import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
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
} from '../actions/components';
import KonvaStage from '../components/KonvaStage.jsx';

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
  openPanel: component => dispatch(openExpansionPanel(component)),
  changeFocusChild: ({ title, childId }) => dispatch(changeFocusChild({ title, childId })),
  changeComponentFocusChild: ({ componentId, childId }) =>
    dispatch(changeComponentFocusChild({ componentId, childId })),
  deleteChild: ({}) => dispatch(deleteChild({})), // if u send no prms, function will delete focus child.
  deleteComponent: ({ componentId, stateComponents }) => dispatch(deleteComponent({ componentId, stateComponents })),
});

const mapStateToProps = store => ({
  totalComponents: store.workspace.totalComponents,
  focusComponent: store.workspace.focusComponent,
  focusChild: store.workspace.focusChild,
  stateComponents: store.workspace.components,
});

class MainContainer extends Component {
  state = {
    draggable: false,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { image, draggable } = this.state;
    const {
      components,
      handleTransformation,
      openPanel,
      focusComponent,
      focusChild,
      changeFocusChild,
      changeComponentFocusChild,
      deleteChild,
      deleteComponent,
      stateComponents,
    } = this.props;
    const { main } = this;
    const cursor = this.state.draggable ? 'move' : 'default';

    // show a string of all direct parents. SO the user can gaze at it.
    const directParents = !focusComponent.id
      ? 'Waiting for a focused component'
      : stateComponents
          .filter(comp => comp.childrenArray.some(kiddy => kiddy.childComponentId == focusComponent.id))
          .map(comp => comp.title)
          .join(',');

    return (
      <MuiThemeProvider theme={theme}>
        <div className="main-container" style={{ cursor }}>
          <div className="main" ref={main}>
            <KonvaStage
              scaleX={1}
              scaleY={1}
              image={image}
              draggable={draggable}
              components={components}
              handleTransform={handleTransformation}
              openExpansionPanel={openPanel}
              focusComponent={focusComponent}
              focusChild={focusChild}
              changeFocusChild={changeFocusChild}
              changeComponentFocusChild={changeComponentFocusChild}
              deleteChild={deleteChild}
            />
          </div>

          <div className="button-wrapper">
            <Button onClick={deleteChild} style={{ width: '150px', display: 'inline-block' }}>
              delete child
            </Button>

            <Button
              style={{ width: '180px', display: 'inline-block' }}
              onClick={() =>
                deleteComponent({
                  componentId: focusComponent.id,
                  stateComponents,
                })
              }
            >
              delete component
            </Button>
            <span>{directParents ? `Used in: ${directParents}` : 'Not used in any other component'}</span>
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
