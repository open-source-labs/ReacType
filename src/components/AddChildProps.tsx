import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ComponentInt } from '../utils/Interfaces';
import { addProp, deleteProp } from '../actions/components';
import DataTable from './DataTable';
import MaterialTable from 'material-table';

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

const mapStateToProps = (store: any) => ({
  focusComponent: store.workspace.focusComponent
});

// available types for select drop-down for button types
const availablePropTypes = {
  string: 'STR',
  number: 'NUM',
  object: 'OBJ',
  array: 'ARR',
  boolean: 'BOOL',
  function: 'FUNC',
  // symbol: 'SYM',
  // node: 'NODE',
  // element: 'ELEM',
  any: 'ANY',
  tuple: 'TUP',
  enum: 'ENUM'
};

// generates the various options for the prop type selection
const typeOptions = [
  <option value='' key='' />,
  ...Object.keys(availablePropTypes).map(type => (
    <option value={type} key={type} style={{ color: '#000' }}>
      {type}
    </option>
  ))
];

class AddChildProps extends Component {
  tableRef = React.createRef();
  state = {
    propVariables: '',
    propValue: '',
    propRequired: true,
    propType: ''
  };

  handleChange = (event: MouseEvent | any) => {
    if (event.target.id === 'propVariable') {
      this.setState({
        [event.target.id]: event.target.value.trim()
      });
    } else {
      this.setState({
        [event.target.id]: event.target.value
      });
    }
  };

  togglePropRequired = () => {
    this.setState({
      propRequired: !this.state.propRequired
    });
  };

  // function that handles the addition of props to a given componnent
  // added regex to strip usr input from non alpha numeric properties
  // presence of these characters crashes the app and should not be a valid input anyways
  handleAddProp = (event: MouseEvent) => {
    event.preventDefault();

    // destructuring from local state
    // if change here, make sure to change local state props to match
    let { propVariable, propValue, propRequired, propType } = this.state;
    propVariable = propVariable.replace(/[!@#$%^&*,./:;"]+\s/gi, '');
    propValue = propValue.replace(/[!@#$%^&*,./:;'"]+\s/gi, '');

    // check if prop exists with same key. CANNOT have duplicates
    const savedVariableKeys = this.props.focusComponent.props.map(
      prop => prop.key
    );
    if (savedVariableKeys.includes(propVariable)) {
      window.alert(`A prop with the name: "${propVariable}" already exists.`);
      return;
    }

    // check if prop starts with digits. Digits at string start breaks indexedDB
    if (/^\d/.test(propVariable)) {
      window.alert('Props are not allowed to begin with digits');
      return;
    }

    this.props.addProp({
      key: propVariable,
      value: propValue,
      required: propRequired,
      type: propType
    });

    this.setState({
      propVariable: '',
      propValue: '',
      propRequired: true,
      propType: ''
    });
  };
  render() {
    const { focusComponent, classes, deleteProp, addProp } = this.props;

    console.log('this is focus component FROM ADDCHILDPROPS', focusComponent);
    return (
      <div style={{ maxWidth: '100%' }}>
        <MaterialTable
          tableRef={this.tableRef}
          columns={[
            {
              title: 'Component Name',
              field: 'name',
              render: rowData => (
                // <img
                //   style={{ height: 36, borderRadius: '50%' }}
                //   src={rowData.name}
                // />
                <h1>{}</h1>
              )
            },
            { title: 'Key', field: 'key' },
            { title: 'Value', field: 'Type' },
            { title: 'Last Name', field: 'last_name' }
          ]}
          data={query =>
            new Promise((resolve, reject) => {
              let url = 'https://reqres.in/api/users?';
              url += 'per_page=' + query.pageSize;
              url += '&page=' + (query.page + 1);
              fetch(url)
                .then(response => response.json())
                .then(result => {
                  resolve({
                    data: result.data,
                    page: result.page - 1,
                    totalCount: result.total
                  });
                });
            })
          }
          title='All Child Components'
        />
        <button
          onClick={() => {
            this.tableRef.current.onQueryChange();
          }}
        >
          Click Me! NOT
        </button>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddChildProps);
