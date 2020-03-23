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

  render() {
    const { focusComponent, classes, deleteProp, addProp } = this.props;

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
