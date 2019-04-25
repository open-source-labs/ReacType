import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BottomPanel from '../components/BottomPanel.jsx';
import Button from '@material-ui/core/Button';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';
// import TextField from '@material-ui/core/TextField';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../components/theme';
import {
  toggleDragging,
  openExpansionPanel,
  handleTransform,
  changeFocusChild,
  changeComponentFocusChild,
  deleteChild,
  deleteComponent,
} from '../actions/components';
import KonvaStage from '../components/KonvaStage.jsx';
// import MainContainerHeader from '../components/MainContainerHeader.jsx';
// import createModal from '../utils/createModal.util';
// import Info from '../components/Info.jsx';

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
  toggleComponentDragging: status => dispatch(toggleDragging(status)),
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
    toggleClass: true,
    scaleX: 1,
    scaleY: 1,
    x: undefined,
    y: undefined,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  // increaseHeight = () => {
  //   this.setState({
  //     scaleX: this.state.scaleX * 1.5,
  //     scaleY: this.state.scaleY * 1.5,
  //   });
  // };

  // decreaseHeight = () => {
  //   this.setState({
  //     scaleX: this.state.scaleX * 0.75,
  //     scaleY: this.state.scaleY * 0.75,
  //   });
  // };

  toggleDrag = () => {
    this.props.toggleComponentDragging(this.state.draggable);
    this.setState({
      toggleClass: !this.state.toggleClass,
      draggable: !this.state.draggable,
    });
  };

  render() {
    const { image, draggable, scaleX, scaleY, modal, toggleClass } = this.state;
    const {
      components,
      handleTransformation,
      openPanel,
      totalComponents,
      collapseColumn,
      rightColumnOpen,
      focusComponent,
      focusChild,
      changeFocusChild,
      changeComponentFocusChild,
      deleteChild,
      deleteComponent,
      stateComponents,
    } = this.props;
    const {
      increaseHeight,
      decreaseHeight,
      updateImage,
      toggleDrag,
      main,
      showImageDeleteModal,
      showGenerateAppModal,
      setImage,
    } = this;
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
              scaleX={scaleX}
              scaleY={scaleY}
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

/*
//Header component:
<MainContainerHeader
image={image}
increaseHeight={increaseHeight}
decreaseHeight={decreaseHeight}
showImageDeleteModal={showImageDeleteModal}
showGenerateAppModal={showGenerateAppModal}
updateImage={updateImage}
toggleDrag={toggleDrag}
totalComponents={totalComponents}
collapseColumn={collapseColumn}
rightColumnOpen={rightColumnOpen}
components={components}
toggleClass={toggleClass}
/>
*/
