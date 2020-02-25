import React, { Component } from 'react';
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
  components: ComponentState[];
  focusComponent: ComponentState;
  selectableChildren: Array<number>;
  classes: any;
  addComponent: any;
  addChild: any;
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
  image: HTMLImageElement;
  draggable: boolean;
  toggleClass: boolean;
  scaleX: number;
  scaleY: number;
  x: number;
  y: number;
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
  changeImagePath: (path: string) => dispatch(actions.changeImagePath(path)),
  changeFocusChild: ({ childId }: { childId: number }) => dispatch(actions.changeFocusChild({ childId })),
  changeComponentFocusChild: ({ componentId, childId }: { componentId: number; childId: number }) =>
    dispatch(actions.changeComponentFocusChild({ componentId, childId })),
  deleteChild: ({ }) => dispatch(actions.deleteChild({})), // if u send no prms, function will delete focus child.
});

class MainContainer extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      image: null,
      draggable: false,
      toggleClass: true,
      scaleX: 1,
      scaleY: 1,
      x: 0,
      y: 0,
      modal: '',
    };

    IPC.on('new-file', (event, file) => {
      const image = new window.Image();
      image.src = file;
      console.log(image.src);
      // this.props.changeImagePath(file);
      image.onload = () => {
        // update state when the image has been uploaded
        this.setState({ image });
      };
    });
    
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
    console.log("in component did mount: ", this.state.image)
    this.setImage();
  }

  setImage = () => {
    const image: any = new window.Image();
    console.log("image in setImage: ", image.src)
    image.onload = () => {
      // setState will redraw layer
      // because "image" property is changed
      this.setState({
        image
      });
    };
  };

  render() {
    const { draggable, scaleX, scaleY, modal, toggleClass, image } = this.state;
    const { components, handleTransform, focusComponent, focusChild, changeFocusChild, changeComponentFocusChild, deleteChild, classes, changeImagePath } = this.props;
    const { setImage } = this;
    // const { main }: { main: HTMLDivElement } = this;
    // ** will conditionally render KonvaStage, DropZone or neither component based on the following condition
    let main;
    if (components.length > 0 && components.some((comp) => comp.expanded)) {
      main = (
        <KonvaStage
          image={image}
          scaleX={1}
          scaleY={1}
          draggable={draggable}
          components={components}
          handleTransform={handleTransform}
          focusComponent={focusComponent}
          focusChild={focusChild}
          changeFocusChild={changeFocusChild}
          changeComponentFocusChild={changeComponentFocusChild}
          deleteChild={deleteChild}
          classes={classes}
          setImage={setImage}
        />
      )
    } else {
      main = <Dropzone changeImagePath={changeImagePath} />
    }
    return (
      <div className="main-container">
        {modal}
        <div className="main" style={{ backgroundColor: '#171725' }}>
          {main}
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainContainer);
