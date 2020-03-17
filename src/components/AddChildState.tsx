import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import { addProp, deleteProp } from '../actions/components';
import DataTable from './DataTable';
import { ComponentInt } from '../utils/Interfaces';
import { string } from 'prop-types';

// styles to be passed down
const styles = (theme: any) => {};

// Eliot: make sure to add back in the "styles" aka classes with their OWN css properties

const mapDispatchToProps = (dispatch: any) => {
  addProp: ({
    key,
    value,
    required,
    type
  }: {
    key: string;
    value: string;
    reuired: boolean;
    type: string;
  }) => dispatch(addProp({ key, value, required, type }));
};

const mapStateToProps = (store: any) => {};

// This class is resonsible for creating the interface when clicking "Add Child State"
class AddChildState extends Component {
  state = {};

  render() {
    return <div>Hello</div>;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(AddChildState));
