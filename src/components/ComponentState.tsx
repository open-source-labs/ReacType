import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import DataTable from './DataTable';

import { ComponentInt } from '../utils/Interfaces';

const mapDispatchToProps = (dispatch: any) => {};

const mapStateToProps = (store: any) => {};

// This class is resonsible for creating the interface when clicking "ComponentState"
class ComponentState extends Component {
  state = {};

  render() {
    return <div>Hello</div>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ComponentState);
