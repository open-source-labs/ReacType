import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MuiThemeProvider, LinearProgress } from '../utils/material.util';
import LeftContainer from './LeftContainer';
import MainContainer from './MainContainer';
import RightContainer from './RightContainer';
import theme from '../utils/theme';
import { ComponentState } from '../types/types';
import * as actions from '../actions/actions';

// ** Used with electron to render
const IPC = require('electron').ipcRenderer;

// ** App Container props definitions
type Props = {
  components: Array<ComponentState>;
  focusComponent: ComponentState;
  totalComponents: number;
  selectableChildren: number[];
  loadInitData: any;
  imageSource: string;
  changeImagePath: any;
};

// ** App Container state definitions
type State = {
  image: HTMLImageElement | null;
  rightColumnOpen: boolean
}

// ** Redux state mapping to props
const mapStateToProps = (state: any) => ({
  test: state.application,
  imageSource: state.application.imageSource,
  components: state.application.components,
  totalComponents: state.application.totalComponents,
  focusComponent: state.application.focusComponent,
  selectableChildren: state.application.selectableChildren,
});

// ** Redux dispatch mapping to props
const mapDispatchToProps = (dispatch: any) => ({
  loadInitData: () => dispatch(actions.loadInitData()),
  changeImagePath: (imageSource: string) => dispatch(actions.changeImagePath(imageSource)),
});

class AppContainer extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    // ** state here to create a collapsable right column where bottom panel currently lives
    this.state = {
      image: null,
      rightColumnOpen: true,
    };

    IPC.on('new-file', (event, file) => {
      const image = new window.Image();
      image.src = file;
      image.onload = () => {
        // update state when the image has been uploaded
        this.props.changeImagePath(file);
        this.setState({ image });
      };
    });
  }

  // ** loading the last instance of the ReacType application. Probably want to look into this for save ReacType files for reuse
  // componentDidMount() {
  //   this.props.loadInitData();
  // }

  componentDidUpdate(prevProps: Props) {
    const { imageSource } = this.props;
    if (imageSource !== prevProps.imageSource) {
      this.setImage(imageSource);
    }
  }

  setImage = (imageSource: string) => {
    let image: HTMLImageElement;
    image = new window.Image();
    image.src = imageSource;
    image.onload = () => {
      // setState will redraw layer
      // because "image" property is changed
      this.setState({ image });
    };
  };

  clearImage = () => {
    const { changeImagePath } = this.props;
    changeImagePath('');
    this.setState({
      image: null
    })
  }

  render() {
    // ** destructuring some state props to prop drill into left and main container
    const { components, focusComponent, totalComponents, imageSource } = this.props;
    const { image } = this.state;
    return (
      // ** MuiThemeProvider allows a theme to be passed into material ui
      <MuiThemeProvider theme={theme}>
        <div className="app-container">
          <LeftContainer
            components={components}
            totalComponents={totalComponents}
            focusComponent={focusComponent}
            imageSource={imageSource}
            clearImage={this.clearImage}
            setImage={this.setImage}
          />
          <MainContainer 
            components={components}
            image={image} 
            imageSource={imageSource}
          />
          <RightContainer focusComponent={focusComponent} />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppContainer);
