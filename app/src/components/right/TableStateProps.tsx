// CARET
import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  DataGrid,
  GridEditRowsModel,
} from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import ClearIcon from '@material-ui/icons/Clear';
import StateContext from '../../context/context';

import { StatePropsPanelProps } from '../../interfaces/Interfaces';

const getColumns = (props) => {
  const { deleteHandler } : StatePropsPanelProps = props;
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
      renderCell: function renderCell(params:any) {
        const getIdRow = () => {
          const { api } = params;
          const fields = api.getAllColumns().map((c: any) => c.field).filter((c : any) => c !== '__check__' && !!c);
          return params.getValue(fields[0]);
        };
        return ( 
          <Button style={{width:`${3}px`}}
            onClick={() => {
              deleteHandler(getIdRow());
            }}>
            <ClearIcon style={{width:`${15}px`}}/>
          </Button>
        );
      },
    },
  ];
};

const TableStateProps = (props) => {
  const [state] = useContext(StateContext);
  const [editRowsModel] = useState <GridEditRowsModel> ({});
  const [gridColumns, setGridColumns] = useState([]);

  // get currentComponent by using currently focused component's id
  const currentId = state.canvasFocus.componentId;
  const currentComponent = state.components[currentId - 1];

  const rows = currentComponent.stateProps.slice();

  const { selectHandler } : StatePropsPanelProps = props;
  
  // when component gets mounted, sets the gridColumn
  useEffect(() => {
    setGridColumns(getColumns(props));
  }, []);
  
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={gridColumns}
        pageSize={5}
        editRowsModel={editRowsModel}
        onRowClick = {selectHandler}
      />
    </div>
  );
};

export default TableStateProps;
