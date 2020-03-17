import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Tutorial from '../components/Tutorial';
import LeftContainer from './LeftContainer';
import MainContainer from './MainContainer';
import theme from '../components/theme';
// import { loadInitData } from '../actions/components.ts';
import {
  ComponentInt,
  ComponentsInt,
  ApplicationStateInt,
} from '../utils/Interfaces';
import * as actions from '../actions/components';

// ** Used with electron to render
const IPC = require('electron').ipcRenderer;

//This is the Props type for the props being passed into AppContainer
//Since this is the parent container, all props are coming from the global store.
interface Props {
  imageSource: string;
  components: ComponentsInt;
  focusComponent: ComponentInt;
  totalComponents: number;
  loading: boolean;
  selectableChildren: number[];
  loadInitData(): void;
  changeImagePath(imageSource: string): void;
}

//Type for the state that should not be assigned within the
//component below.
interface State {
  image: HTMLImageElement | null;
  tutorial: number;
  changed: boolean;
}

//Details on some of these are listed in the render where they are passed down.
const mapStateToProps = (store: { workspace: ApplicationStateInt }) => ({
  imageSource: store.workspace.imageSource,
  components: store.workspace.components,
  totalComponents: store.workspace.totalComponents,
  focusComponent: store.workspace.focusComponent,
  loading: store.workspace.loading,
  selectableChildren: store.workspace.selectableChildren,
});

//Dispatch functions for loading data where user left off
//when they closed the app, and to change the path of the image
//if uploaded for template.

//TODO: Create an interface for dispatch function

const mapDispatchToProps = (dispatch: (arg: any) => void) => ({
  loadInitData: () => dispatch(actions.loadInitData()),
  changeImagePath: (imageSource: string) =>
    dispatch(actions.changeImagePath(imageSource)),
});

class AppContainer extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    // THIS STATE SHOULD NOT EXIST HERE.
    //First rule of Redux is to have a single source of truth, and state being assigned right
    //here breaks that rule if it gets pased down to any other component.

    //TODO: someone fix this pl0x (Possibly move to component that actually depends on it)
    this.state = {
      image: null,
      tutorial: 0,
      changed: false,
    };

    //This function is invoked upon a new file being uploaded to the app.
    //it changes the imagesource in the global state to be whatever filepath it is
    //on the user's comp.

    //TODO Fix event typing?
    IPC.on('new-file', (event: string, file: string) => {
      const image = new window.Image();
      image.src = file;
      image.onload = () => {
        // update state when the image has been uploaded
        this.props.changeImagePath(image.src);
        this.setState({ image, changed: true });
      };
    });
    IPC.on('tutorial_clicked', () => {
      this.setState({ tutorial: 1 });
    });
  }

  handleNext = (tutorial: number) => {
    this.setState({ tutorial });
  }

  //This sets checks if the image was removed via the clear image button on the left container.
  //Technically this logic should be done in the reducer, not here.
  componentDidUpdate(prevProps: Props) {
    const { imageSource } = this.props;
    const { changed } = this.state;
    if (imageSource === '' && changed) {
      this.setState({ image: null, changed: false });
    }
    // else if (imageSource !== prevProps.imageSource && imageSource !== '') {
    //   this.setImage(imageSource);
    // }
  }

  ///////////////////THIS BLOCK MIGHT NOT BE DOING ANYTHING ////////////////////////////
  //This is a helper function for the lifecycle function above that I think was supposed
  // to set the image in the state based on the image source, and changes the set status to true,
  //also in the state.

  // setImage = (imageSource: string) => {
  //   if (imageSource) {
  //     let image: HTMLImageElement;
  //     image = new window.Image();
  //     image.onload = () => {
  //       // setState will redraw layer
  //       // because "image" property is changed
  //       this.setState({ image, changed: true });
  //     };
  //   }
  // };

  //this will load the saved sata from last close
  componentDidMount() {
    this.props.loadInitData();
  }

  render(): JSX.Element {
    const {
      components,
      focusComponent,
      loading,
      selectableChildren,
      totalComponents,
    } = this.props;

    // uses component childIds and parentIds arrays (numbers) to build component-filled children and parents arrays
    return (
      <MuiThemeProvider
        theme={theme} //I'm assuming this is some material-UI theme thing
      >
        <Tutorial //Tutorial modal that is triggered upon selecting menu item
          tutorial={this.state.tutorial}
          handleNext={this.handleNext}
        />
        <div className="app-container">
          <LeftContainer //The left side-bar that contains the component cards and the buttons.
            components={components}
            totalComponents={totalComponents}
            focusComponent={focusComponent} //'focused' just means it's the one currently selected.
            selectableChildren={selectableChildren} //this toggles whether a component can be added as a child to the focused component
          />
          <MainContainer
            components={components}
            image={this.state.image}
            imageSource={this.props.imageSource}
            classes={null} //placeholder, for some reason it's expecting this prop
          />
          {loading ? ( //This is triggered when files are being exported. Unsure if it actually does anything.
            <div
              style={{
                alignSelf: 'flex-end',
                position: 'fixed',
                width: '100%',
              }}
            >
              <LinearProgress
                color="secondary" //Pretty sure this is a loading bar component from Material-UI,
                //never seen it in action though.
              />
            </div>
          ) : null}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
