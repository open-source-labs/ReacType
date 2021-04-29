// CARET
import React, { useState, useContext, useEffect } from 'react';
import {
  DataGrid,
  GridColumns,
  GridEditRowsModel,
} from '@material-ui/data-grid';
import Button from "@material-ui/core/Button";
import StateContext from '../../context/context';
import { PinDropSharp } from '@material-ui/icons';

// const columns: GridColumns = [
//   {
//     field: 'id',
//     headerName: 'ID',
//     width: 70,
//     editable: false,
//   },
//   {
//     field: 'key',
//     headerName: 'Key',
//     width: 100,
//     editable: true,
//   },
//   {
//     field: 'value',
//     headerName: 'Value',
//     width: 100,
//     editable: true,
//   },
//   {
//     field: 'type',
//     headerName: 'Type',
//     width: 100,
//     editable: false,
//   },
//   {
//     field: 'delete',
//     headerName: 'Delete',
//     width: 100,
//     editable: false,
//     renderCell: () => (
//       <Button>Delete</Button>
//     ),
//   },
// ];

const getColumns = (props) => {
  return [
    {
      field: 'id',
      headerName: 'ID',
      width: 70,
      editable: false,
    },
    {
      field: 'key',
      headerName: 'Key',
      width: 100,
      editable: true,
    },
    {
      field: 'value',
      headerName: 'Value',
      width: 100,
      editable: true,
    },
    {
      field: 'type',
      headerName: 'Type',
      width: 100,
      editable: false,
    },
    {
      field: 'delete',
      headerName: 'Delete',
      width: 100,
      editable: false,
      renderCell: (params) => {
        const getIdRow = () => {
          const api: GridApi = params.api;
          const fields = api.getAllColumns().map((c) => c.field).filter((c) => c !== "__check__" && !!c);
          return params.getValue(fields[0]);          
        };
        return ( 
          <Button onClick={() => {
            // console.log("*****************1*****************");
            // console.log('event:', event);
            // console.log('event.preventDefault():', event.preventDefault())
            // event.preventDefault();
            // console.log('event.stopPropagation():', event.stopPropagation)
            props.deleteHandler(getIdRow()); 
            // event.stopPropagation();
          }}>Delete</Button>
        );
      }
    },
  ];
};

// This function iterates thru current component's state props array to build rows to display in grid below
const buildRows = (props) => {
  const [state, dispatch] = useContext(StateContext);
  // const [state] = useContext(StateContext);
  const currentId = state.canvasFocus.componentId;
  const currentComponent = state.components[currentId - 1];
  const rows = [];
  

  for (let i = 0; i < currentComponent.stateProps.length; i += 1) {
    const newObj = {};
    newObj.id = currentComponent.stateProps[i].id;
    newObj.key = currentComponent.stateProps[i].key;
    newObj.value = currentComponent.stateProps[i].value;
    newObj.type = currentComponent.stateProps[i].type;
    rows.push(newObj);
  }
  return rows; 
};
 
const TableStateProps = (props) => {
  const [editRowsModel, setEditRowsModel] = useState < GridEditRowsModel > ({});
  const [gridColumns, setGridColumns] = useState([]);

  const rows = buildRows(props);
  
  // when component gets mounted, sets the gridColumn
  useEffect(() => {
    setGridColumns(getColumns(props));
  }, []);

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        // disableMultipleSelection={false}
        rows={rows}
        columns={gridColumns}
        pageSize={5}
        editRowsModel={editRowsModel}
        onRowClick={props.selectHandler}
      />
    </div>
  );
}
export default TableStateProps;
