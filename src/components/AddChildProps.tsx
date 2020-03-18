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

class AddChildProps extends Component {
  tableRef = React.createRef();
  // state = {
  //   propVariables: '',
  //   propValue: '',
  //   propRequired: true,
  //   propType: ''
  // };

  // handleChange = (event: MouseEvent | any) => {
  //   if (event.target.id === 'propVariable') {
  //     this.setState({
  //       [event.target.id]: event.target.value.trim()
  //     });
  //   } else {
  //     this.setState({
  //       [event.target.id]: event.target.value
  //     });
  //   }
  // };

  // togglePropRequired = () => {
  //   this.setState({
  //     propRequired: !this.state.propRequired
  //   });
  // };

  // function that handles the addition of props to a given componnent
  // added regex to strip usr input from non alpha numeric properties
  // presence of these characters crashes the app and should not be a valid input anyways
  // handleAddProp = (event: MouseEvent) => {
  //   event.preventDefault();

  //   // destructuring from local state
  //   // if change here, make sure to change local state props to match
  //   let { propVariable, propValue, propRequired, propType } = this.state;
  //   propVariable = propVariable.replace(/[!@#$%^&*,./:;"]+\s/gi, '');
  //   propValue = propValue.replace(/[!@#$%^&*,./:;'"]+\s/gi, '');

  //   // check if prop exists with same key. CANNOT have duplicates
  //   const savedVariableKeys = this.props.focusComponent.props.map(
  //     prop => prop.key
  //   );
  //   if (savedVariableKeys.includes(propVariable)) {
  //     window.alert(`A prop with the name: "${propVariable}" already exists.`);
  //     return;
  //   }

  //   // check if prop starts with digits. Digits at string start breaks indexedDB
  //   if (/^\d/.test(propVariable)) {
  //     window.alert('Props are not allowed to begin with digits');
  //     return;
  //   }

  //   this.props.addProp({
  //     key: propVariable,
  //     value: propValue,
  //     required: propRequired,
  //     type: propType
  //   });

  //   this.setState({
  //     propVariable: '',
  //     propValue: '',
  //     propRequired: true,
  //     propType: ''
  //   });
  // };
  render() {
    const { focusComponent, classes, deleteProp, addProp } = this.props;

    console.log('this is focuscomponent props', focusComponent.props);
    console.log(
      'this is focuscomponent childrenArray',
      focusComponent.childrenArray
    );
    console.log('this is focus component FROM ADDCHILDPROPS', focusComponent);

    // Array to be used to populate HTML form elements
    const arrayPropsAvailable = [];

    // IIFE : so that it runs without needing to be invoked
    (() => {
      focusComponent.props.map(prop => {
        // console.log('this is component Name from props array', prop.key);
        arrayPropsAvailable.push(
          <span>
            <input
              type='checkbox'
              id={`${prop}checkbox-${prop.key}`}
              name={`${prop}checkbox-${prop.key}`}
            />
            <label
              className={`labelForPropsToAddToChild`}
              for={`${prop}checkbox-${prop.key}`}
            >
              {prop.key}
            </label>
          </span>
        );
      });
    })();

    console.log('this is the array of props available', arrayPropsAvailable);

    return (
      <div>
        <MaterialTable
          tableRef={this.tableRef}
          columns={[
            {
              title: 'Name',
              field: 'name',
              cellStyle: {
                width: 250,
                minWidth: 250
              },
              render: dataRows => <p>{`${dataRows.componentName}`}</p>
            },
            {
              title: 'Props To Add To Child',
              field: 'prop',
              render: () => <span>{arrayPropsAvailable}</span>
            }
          ]}
          data={focusComponent.childrenArray}
          title='Add Your Child Props Here!'
        />

        <button
          onClick={() => {
            this.tableRef.current.onQueryChange();
          }}
        >
          Sean Sucks
        </button>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddChildProps);
