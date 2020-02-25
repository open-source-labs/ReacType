import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core/styles';
import BottomPanel from '../components/BottomPanel';
import theme from '../components/theme';
import { handleTransform, changeFocusChild, changeComponentFocusChild, deleteChild } from '../actions/components';
import KonvaStage from '../components/KonvaStage';
import { ComponentInt, ComponentsInt } from '../utils/interfaces';
const IPC = require('electron').ipcRenderer;

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
  handleTransformation: any;
  focusChild: any;
  changeComponentFocusChild: any;
  deleteChild: any;
}

interface StateInt {
  image: any;
  draggable: boolean;
  toggleClass: boolean;
  scaleX: number;
  scaleY: number;
  x: number;
  y: number;
  modal: any;
}


const mapDispatchToProps = (dispatch: any) => ({
  handleTransformation: (
    componentId: number,
    childId: number,
    { x, y, width, height }: { x: number; y: number; width: number; height: number },
  ) =>
    dispatch(
      handleTransform(componentId, childId, {
        x,
        y,
        width,
        height,
      }),
    ),
  // openPanel: component => dispatch(openExpansionPanel(component)),
  changeFocusChild: ({ childId }: { childId: number }) => dispatch(changeFocusChild({ childId })),
  changeComponentFocusChild: ({ componentId, childId }: { componentId: number; childId: number }) =>
    dispatch(changeComponentFocusChild({ componentId, childId })),
  deleteChild: ({ }) => dispatch(deleteChild({})), // if u send no prms, function will delete focus child.
});

const mapStateToProps = (store: any) => ({
  focusComponent: store.workspace.focusComponent,
  focusChild: store.workspace.focusChild,
  stateComponents: store.workspace.components,
});

class MainContainer extends Component<PropsInt, StateInt> {
  state = {
    draggable: false,
    toggleClass: true,
    image: '', // just added
    scaleX: 1,
    scaleY: 1,
    x: 0,
    y: 0,
    modal: '',
  };

  constructor(props) {
    super(props)
    // allows user to upload a new local file
    IPC.on('new-file', (event, file) => {
      const image = new window.Image();
      image.src = file;
      console.log(image.src);
      // image.src = 'https://www.sciencemag.org/sites/default/files/styles/article_main_large/public/dogs_1280p_0.jpg?itok=cnRk0HYq'
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

  setImage = () => {
    const image: any = new window.Image();
    console.log("image in setImage: ", image.src)
    // image.src = 'https://www.sciencemag.org/sites/default/files/styles/article_main_large/public/dogs_1280p_0.jpg?itok=cnRk0HYq'
    image.onload = () => {
      // setState will redraw layer
      // because "image" property is changed
      this.setState({
        image
      });
    };
  };

  componentDidMount() {
    console.log("in component did mount: ", this.state.image)
    this.setImage();
  }

  render() {
    const { image, draggable, scaleX, scaleY, modal, toggleClass } = this.state;
    const {
      components,
      handleTransformation,
      focusComponent,
      focusChild,
      changeFocusChild,
      changeComponentFocusChild,
      deleteChild,
      classes,
    } = this.props;
    const { main }: { main: HTMLDivElement } = this;
    const { setImage } = this;

    return (
      <MuiThemeProvider theme={theme}>
        <div className="main-container">
          {modal}
          <div className="main" ref={main}>
            <KonvaStage
              image={image} //added recently
              scaleX={1}
              scaleY={1}
              draggable={draggable}
              components={components}
              handleTransform={handleTransformation}
              focusComponent={focusComponent}
              focusChild={focusChild}
              changeFocusChild={changeFocusChild}
              changeComponentFocusChild={changeComponentFocusChild}
              deleteChild={deleteChild}
              classes={classes}
              setImage={setImage}

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
