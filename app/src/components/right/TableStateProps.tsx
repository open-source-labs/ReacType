// CARET
import React, { useState, useContext } from 'react';
import {
  DataGrid,
  GridColumns,
  GridEditRowsModel,
} from '@material-ui/data-grid';

import StateContext from '../../context/context';

const columns: GridColumns = [
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
];

// This function iterates thru current component's state props array to build rows to display in grid below
const buildRows = () => {
  const [state] = useContext(StateContext);
  const currentId = state.canvasFocus.componentId;
  const currentComponent = state.components[currentId - 1];
  const rows = [];

  for (let i = 0; i < currentComponent.stateProps.length; i += 1) {
    const newObj = {};
    newObj.id = i + 1; // id starts from 1
    newObj.key = currentComponent.stateProps[i].key;
    newObj.value = currentComponent.stateProps[i].value;
    newObj.type = currentComponent.stateProps[i].type;

    rows.push(newObj);
  }
  return rows;
};

export default function DataTable() {
  const [editRowsModel, setEditRowsModel] = useState < GridEditRowsModel > ({});

  const rows = buildRows();

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        editRowsModel={editRowsModel}
      />
    </div>
  );
}
