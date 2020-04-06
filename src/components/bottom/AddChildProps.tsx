import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ComponentInt, ApplicationStateInt } from '../../interfaces/Interfaces';
import { addProp, deleteProp } from '../../actions/actionCreators';
import MaterialTable from 'material-table';

const mapStateToProps = (store: { workspace: ApplicationStateInt }) => ({
  focusComponent: store.workspace.focusComponent
});

// JZ: created interface to define the props that are being passed into this component
interface ChildPropsTypes {
  focusComponent: ComponentInt;
  // classes?: any; -- not possibly needed, also removed from prop deconstruction
}

class AddChildProps extends Component<ChildPropsTypes> {
  tableRef = React.createRef();
  render() {
    const { focusComponent } = this.props;

    // Array to be used to populate HTML form elements
    // JZ: refactored this code to the above to be all done within one map function
    const arrayPropsAvailable = focusComponent.props.map((prop, idx) => {
      return (
        <span key={`span-${idx}`}>
          <input
            type="checkbox"
            id={`${prop}checkbox-${prop.key}`}
            name={`${prop}checkbox-${prop.key}`}
            key={`checkbox-${idx}`}
          />
          <label
            className={`labelForPropsToAddToChild`}
            htmlFor={`${prop}checkbox-${prop.key}`}
            key={`label-${idx}`}
          >
            {prop.key}
          </label>
        </span>
      );
    });

    // const arrayPropsAvailable = [];
    // // IIFE : so that it runs without needing to be invoked
    // (() => {
    //   focusComponent.props.map(prop => {
    //     // console.log('this is component Name from props array', prop.key);
    //     arrayPropsAvailable.push(
    //       <span>
    //         <input
    //           type='checkbox'
    //           id={`${prop}checkbox-${prop.key}`}
    //           name={`${prop}checkbox-${prop.key}`}
    //         />
    //         <label
    //           className={`labelForPropsToAddToChild`}
    //           for={`${prop}checkbox-${prop.key}`}
    //         >
    //           {prop.key}
    //         </label>
    //       </span>
    //     );
    //   });
    // })();
    // console.log('this is the array of props available', arrayPropsAvailable);

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
          title="Add Your Child Props Here!"
        />
      </div>
    );
  }
}

export default connect(mapStateToProps)(AddChildProps);
