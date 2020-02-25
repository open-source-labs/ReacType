import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import LeftContainer from './LeftContainer';
import MainContainer from './MainContainer';
import theme from '../components/theme';
import { loadInitData } from '../actions/components';
import { ComponentInt, ComponentsInt } from '../utils/interfaces';

type Props = {
  components: ComponentsInt;
  focusComponent: ComponentInt;
  totalComponents: number;
  loading: boolean;
  selectableChildren: Array<number>;
  loadInitData: any;
};

const mapStateToProps = (store: any) => ({
  components: store.workspace.components,
  totalComponents: store.workspace.totalComponents,
  focusComponent: store.workspace.focusComponent,
  loading: store.workspace.loading,
  selectableChildren: store.workspace.selectableChildren,
});

const mapDispatchToProps = { loadInitData };

class AppContainer extends Component<Props> {
  state = {
    width: 25,
    rightColumnOpen: true,
  };

  componentDidMount() {
    this.props.loadInitData();
  }

  render(): JSX.Element {
    const {
      components, focusComponent, loading, selectableChildren, totalComponents,
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
                width: '100%',
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppContainer);
