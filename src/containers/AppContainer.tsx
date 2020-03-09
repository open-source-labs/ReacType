import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import LeftContainer from './LeftContainer.tsx';
import MainContainer from './MainContainer.tsx';
import theme from '../components/theme.ts';
import { loadInitData } from '../actions/components.ts';
import { ComponentInt, ComponentsInt } from '../utils/Interfaces.ts';
import * as actions from '../actions/components';


type Props = {
  imageSource: string;
  components: ComponentsInt;
  focusComponent: ComponentInt;
  totalComponents: number;
  loading: boolean;
  selectableChildren: Array<number>;
  loadInitData: any;
};

const mapStateToProps = (store: any) => ({
  imageSource: store.workspace.imageSource,
  components: store.workspace.components,
  totalComponents: store.workspace.totalComponents,
  focusComponent: store.workspace.focusComponent,
  loading: store.workspace.loading,
  selectableChildren: store.workspace.selectableChildren
});

const mapDispatchToProps = (dispatch: any) => ({
  loadInitData,
  //CHECK
  changeImagePath: (imageSource: string) => dispatch(actions.changeImagePath(imageSource)),
});

class AppContainer extends Component<Props> {
  state = {
    width: 25,
    rightColumnOpen: true
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
        <div className="app-container">
          <LeftContainer
            components={components}
            totalComponents={totalComponents}
            focusComponent={focusComponent}
            selectableChildren={selectableChildren}
          />
          <MainContainer components={components} />
          {loading ? (
            <div
              style={{
                alignSelf: 'flex-end',
                position: 'fixed',
                width: '100%'
              }}
            >
              <LinearProgress color="secondary" />
            </div>
          ) : null}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
