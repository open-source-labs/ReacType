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

const mapDispatchToProps = (dispatch: any) => ({
  addProp: ({
    key,
    value,
    required,
    type
  }: {
    key: string;
    value: string;
    required: boolean;
    type: string;
  }) =>
    dispatch(
      addProp({
        key,
        value,
        required,
        type
      })
    ),
  deleteProp: (propId: number) => dispatch(deleteProp(propId))
});

const mapStateToProps = (store: any) => {
  focusComponent: store.workspace.focusComponent;
};

const availableChildPropTypes = {
  string: 'STR',
  number: 'NUM',
  object: 'OBJ',
  array: 'ARR',
  boolean: 'BOOL',
  function: 'FUNC',
  any: 'ANY',
  tuple: 'TUP',
  enum: 'ENUM'
};

// generates the various options for the prop type selection via DROPDOWN
const typeOptions = [
  <option value='' key='' />,
  ...Object.keys(availableChildPropTypes).map(type => (
    <option value={type} key={type} style={{ color: '#000' }}>
      {type}
    </option>
  ))
];

// This class is resonsible for creating the interface when clicking "Add Child State"
class AddChildState extends Component {
  state = {
    propKey: '',
    propValue: '',
    propRequired: true,
    propType: ''
  };

  handleChange = (event: MouseEvent | any) => {
    if (event.target.id === 'propKey') {
      this.setState({
        [event.target.id]: event.target.value.trim()
      });
    } else {
      this.setState({
        [event.target.id]: event.target.value
      });
    }
  };

  render() {
    const { focusComponent, classes, deleteProp, addProp } = this.props;

    return <div>Hello</div>;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(AddChildState));
