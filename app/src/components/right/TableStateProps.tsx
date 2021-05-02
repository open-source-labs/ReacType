// CARET
import React, { useState, useContext, useEffect } from 'react';
import {
  DataGrid,
  GridColumns,
  GridEditRowsModel,
} from '@material-ui/data-grid';
import {
  styled,
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import StateContext from '../../context/context';

import ClearIcon from '@material-ui/icons/Clear';
import { IconButton, SvgIcon  } from '@material-ui/core';

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
      width: 90,
      editable: true,
    },
    {
      field: 'value',
      headerName: 'Value',
      width: 90,
      editable: true,
    },
    {
      field: 'type',
      headerName: 'Type',
      width: 90,
      editable: false,
    },
    {
      field: 'delete',
      headerName: 'X',
      width: 70,
      editable: false,
      renderCell: (params) => {
        const getIdRow = () => {
          const api: GridApi = params.api;
          const fields = api.getAllColumns().map((c) => c.field).filter((c) => c !== "__check__" && !!c);
          return params.getValue(fields[0]);          
        };
        return ( 
          <Button style={{width:`${3}px`}}
            onClick={() => {
              props.deleteHandler(getIdRow());
            }}>
            <ClearIcon style={{width:`${15}px`}}/>
          </Button>
        );
      }
    },
  ];
};


const TableStateProps = (props) => {
  const [state, dispatch] = useContext(StateContext);
  const [editRowsModel, setEditRowsModel] = useState < GridEditRowsModel > ({});
  const [gridColumns, setGridColumns] = useState([]);

  // get currentComponent by using currently focused component's id
  const currentId = state.canvasFocus.componentId;
  const currentComponent = state.components[currentId - 1];

  const rows = currentComponent.stateProps.slice();
  
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
