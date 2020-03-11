import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

import LeftContainer from './LeftContainer';
import MainContainer from './MainContainer';
import theme from '../components/theme';
// import { loadInitData } from '../actions/components.ts';
import { ComponentInt, ComponentsInt } from '../utils/Interfaces';
import * as actions from '../actions/components';

// ** Used with electron to render
const IPC = require('electron').ipcRenderer;

type Props = {
  imageSource: string;
  components: ComponentsInt;
  focusComponent: ComponentInt;
  totalComponents: number;
  loading: boolean;
  selectableChildren: Array<number>;
  loadInitData: any;
  changeImagePath: any;
  changed: boolean;
};

type State = {
  image: HTMLImageElement | null;
  width: number;
  changed: boolean;
}

const mapStateToProps = (store: any) => ({
  imageSource: store.workspace.imageSource,
  components: store.workspace.components,
  totalComponents: store.workspace.totalComponents,
  focusComponent: store.workspace.focusComponent,
  loading: store.workspace.loading,
  selectableChildren: store.workspace.selectableChildren
});

const mapDispatchToProps = (dispatch: any) => ({
  loadInitData: () => dispatch(actions.loadInitData()),
  // loadInitData: () => {},
  changeImagePath: (imageSource: string) => 
  dispatch(actions.changeImagePath(imageSource)),
});

class AppContainer extends Component<Props, State> {

  constructor(props: Props) {
    super(props);
    // ** state here to create a collapsable right column where bottom panel currently lives
    this.state = {
      image: null,
      width: 25,
      changed: false
    };

    IPC.on('new-file', (event: any, file: string) => {
      const image = new window.Image();
      image.src = file;
      image.onload = () => {
        // update state when the image has been uploaded
        this.props.changeImagePath(image.src);
        this.setState({ image });
      };
    });
  }

  componentDidUpdate(prevProps: Props) {
    const { imageSource } = this.props;
    const {changed} = this.state;
    if (imageSource === '' && changed) {
      this.setState({image:null, changed:false});

    }
    else if (imageSource !== prevProps.imageSource && imageSource !== '') {
      this.setImage(imageSource);
    }
  }

  setImage = (imageSource: string) => {
    if (imageSource) {
    let image: HTMLImageElement;
    image = new window.Image();
    image.src = imageSource;
    image.onload = () => {
      // setState will redraw layer
      // because "image" property is changed
      this.setState({ image, changed: true });
    };
  }
  };

  componentDidMount() {
    this.props.loadInitData();
  }

  render(): JSX.Element {
    const {
      components,
      focusComponent,
      loading,
      selectableChildren,
      totalComponents
    } = this.props;
    // const { width, rightColumnOpen } = this.state;

    // uses component childIds and parentIds arrays (numbers) to build component-filled children and parents arrays
    return (
      <MuiThemeProvider theme={theme}>
        <div className='app-container'>
          <LeftContainer
            components={components}
            totalComponents={totalComponents}
            focusComponent={focusComponent}
            selectableChildren={selectableChildren}
          />
          <MainContainer components={components} image={this.state.image} 
            imageSource={this.props.imageSource}/>
          {loading ? (
            <div
              style={{
                alignSelf: 'flex-end',
                position: 'fixed',
                width: '100%'
              }}
            >
              <LinearProgress color='secondary' />
            </div>
          ) : null}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
