import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core/styles';
// import LinearProgress from '@material-ui/core/LinearProgress';
import LeftContainer from './LeftContainer';
import MainContainer from './MainContainer.tsx';
import theme from '../utils/theme';
import { loadInitData } from '../actions/actions.ts';
import { ComponentState } from '../utils/index.util';

type Props = {
  components: ComponentState[];
  focusComponent: ComponentState;
  totalComponents: number;
  loading: boolean;
  selectableChildren: Array<number>;
  loadInitData: any;
};

const mapStateToProps = (state: any) => ({
  components: state.application.components,
  totalComponents: state.application.totalComponents,
  focusComponent: state.application.focusComponent,
  loading: state.application.loading,
  selectableChildren: state.application.selectableChildren,
});

const mapDispatchToProps = { loadInitData };

class AppContainer extends Component<Props> {
  constructor(props) {
    super(props);
    // ** state here to create a collapsable right column where bottom panel currently lives
    this.state = {
      width: 25,
      rightColumnOpen: true,
    };
  }

  componentDidMount() {
    // this.props.loadInitData();
  }

  render(): JSX.Element {
    // ** destructuring some state props to prop drill into left and main container
    const { components, focusComponent, loading, selectableChildren, totalComponents } = this.props;
    return (
      // ** MuiThemeProvider allows a theme to be passed into material ui
      <MuiThemeProvider theme={theme}>
        <div className="app-container">
          <LeftContainer
            components={components}
            totalComponents={totalComponents}
            focusComponent={focusComponent}
            selectableChildren={selectableChildren}
          />
          {/* <MainContainer components={components} /> */}
          {/* {loading ? (
            <div
              style={{
                alignSelf: 'flex-end',
                position: 'fixed',
                width: '100%',
              }}
            >
              <LinearProgress color="secondary" />
            </div>
          ) : null} */}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppContainer);
