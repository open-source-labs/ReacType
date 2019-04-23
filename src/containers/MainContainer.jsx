import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
  deleteChild,
} from '../actions/components';
import KonvaStage from '../components/KonvaStage.jsx';
// import MainContainerHeader from '../components/MainContainerHeader.jsx';
// import createModal from '../utils/createModal.util';
// import Info from '../components/Info.jsx';

const IPC = require('electron').ipcRenderer;

const mapDispatchToProps = dispatch => ({
  handleTransformation: (componentId, childId, {
    x, y, width, height,
  }) => dispatch(
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
  deleteChild: ({ childId }) => dispatch(deleteChild({ childId })),
});

const mapStateToProps = store => ({
  totalComponents: store.workspace.totalComponents,
  focusComponent: store.workspace.focusComponent,
  focusChild: store.workspace.focusChild,
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

  toggleDrag = () => {
    this.props.toggleComponentDragging(this.state.draggable);
    this.setState({
      toggleClass: !this.state.toggleClass,
      draggable: !this.state.draggable,
    });
  };

  render() {
    const {
      image, draggable, scaleX, scaleY, modal, toggleClass,
    } = this.state;
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
      deleteChild,
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
              deleteChild={deleteChild}
            />
          </div>
          <button onClick={deleteChild}>`delete focused child`</button>
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
