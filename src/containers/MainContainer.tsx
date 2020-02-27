import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core/styles';
import KonvaStage from '../components/KonvaStage';
import Dropzone from '../components/Dropzone';
import theme from '../utils/theme';
import { ComponentState } from '../types/types';
import * as actions from '../actions/actions';

// ** Used with electron to render
const IPC = require('electron').ipcRenderer;

// ** Main Container props definitions
type Props = {
  image: HTMLImageElement | null;
  components: ComponentState[];
  focusComponent: ComponentState;
  selectableChildren: number[];
  classes: any;
  addComponent: any;
  addChild: any;
  changeImagePath: any;
  changeFocusComponent: any;
  changeFocusChild: any;
  deleteComponent: any;
  createApp: any;
  deleteAllData: any;
  handleTransform: any;
  focusChild: any;
  changeComponentFocusChild: any;
  deleteChild: any;
}

// ** Main Container state definitions
type State = {
  draggable: boolean;
  toggleClass: boolean;
  scaleX: number;
  scaleY: number;
  x: number;
  y: number;
  width: number;
  height: number;
  modal: any;
}

// ** Redux state mapping to props
const mapStateToProps = (state: any) => ({
  focusComponent: state.application.focusComponent,
  focusChild: state.application.focusChild,
  components: state.application.components,
});

// ** Redux dispatch mapping to props
const mapDispatchToProps = (dispatch: any) => ({
  handleTransform: (componentId: number, childId: number,
    { x, y, width, height }: { x: number; y: number; width: number; height: number }) => dispatch(actions.handleTransform(componentId, childId,
      { x, y, width, height }),
    ),
  changeImagePath: (imageSource: string) => dispatch(actions.changeImagePath(imageSource)),
  changeFocusChild: ({ childId }: { childId: number }) => dispatch(actions.changeFocusChild({ childId })),
  changeComponentFocusChild: ({ componentId, childId }: { componentId: number; childId: number }) =>
    dispatch(actions.changeComponentFocusChild({ componentId, childId })),
  deleteChild: ({ }) => dispatch(actions.deleteChild({})), // if u send no prms, function will delete focus child.
});

class MainContainer extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      draggable: false,
      toggleClass: true,
      scaleX: 1,
      scaleY: 1,
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      modal: '',
    };

    this.main = createRef<HTMLDivElement>();

    IPC.on('app_dir_selected', (event, path) => {
      //IPC.on is an event listener for electron
      const { components } = this.props;
      const { genOption, repoUrl } = this.state;
      this.props.createApp({
        path,
        components,
        genOption,
        repoUrl
      });
    });
  }

  componentDidMount() {
    // ** checking the size when the main-container div when the component mounts
    this.checkSize();
    // ** adding an event listener on the window to call the this.checkSize method
    window.addEventListener('resize', this.checkSize);
  }

  componentWillMount() {
    window.removeEventListener('resize', this.checkSize);
  }

  // ** checking the size of the main-container div on resize
  checkSize = () => {
    // take a look here https://developers.google.com/web/updates/2016/10/resizeobserver
    const { offsetWidth, offsetHeight } = this.main.current;
    this.setState({
      width: offsetWidth,
      height: offsetHeight,
    });
  };

  render() {
    const { draggable, width, height, scaleX, scaleY, modal, toggleClass } = this.state;
    const { image, components, handleTransform, focusComponent, focusChild, changeFocusChild, changeComponentFocusChild, deleteChild, classes, changeImagePath } = this.props;
    return (
      <div className="main-container" ref={this.main}>
        {modal}
        <div className="main" style={{ backgroundColor: '#171725' }}>
        {  // ** will conditionally render KonvaStage, DropZone or neither component based on the following condition
          components.length > 0 || image ? (
            <KonvaStage
              image={image}
              scaleX={1}
              scaleY={1}
              width={width}
              height={height}
              draggable={draggable}
              components={components}
              handleTransform={handleTransform}
              focusComponent={focusComponent}
              focusChild={focusChild}
              changeFocusChild={changeFocusChild}
              changeComponentFocusChild={changeComponentFocusChild}
              deleteChild={deleteChild}
              classes={classes}
            />
          ) : <Dropzone changeImagePath={changeImagePath} />
        }
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainContainer);
