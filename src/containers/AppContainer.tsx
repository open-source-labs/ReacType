import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MuiThemeProvider, LinearProgress } from '../utils/material.util';
import LeftContainer from './LeftContainer';
import MainContainer from './MainContainer';
import RightContainer from './RightContainer';
import theme from '../utils/theme';
import { ComponentState } from '../types/types';
import * as actions from '../actions/actions';

// ** App Container props definitions
type Props = {
  components: Array<ComponentState>;
  focusComponent: ComponentState;
  totalComponents: number;
  selectableChildren: Array<number>;
  loadInitData: any;
};

// ** App Container state definitions
type State = {
  width: number, 
  rightColumnOpen: boolean
}

// ** Redux state mapping to props
const mapStateToProps = (state: any) => ({
  components: state.application.components,
  totalComponents: state.application.totalComponents,
  focusComponent: state.application.focusComponent,
  selectableChildren: state.application.selectableChildren,
});

// ** Redux dispatch mapping to props
const mapDispatchToProps = (dispatch: any) => ({
  loadInitData: () => dispatch(actions.loadInitData()),
});

class AppContainer extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    // ** state here to create a collapsable right column where bottom panel currently lives
    this.state = {
      width: 25,
      rightColumnOpen: true,
    };
  }

  // ** loading the last instance of the ReacType application. Probably want to look into this for save ReacType files for reuse
  componentDidMount() {
    this.props.loadInitData();
  }

  render() {
    // ** destructuring some state props to prop drill into left and main container
    const { components, focusComponent, selectableChildren, totalComponents } = this.props;
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
          <MainContainer components={components} />
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
