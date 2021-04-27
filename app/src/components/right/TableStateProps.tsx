import React, {
  Component,
  useState,
  useContext,
  useEffect,
  useCallback,
  useDebugValue
} from 'react';
import {
  DataGrid,
  GridColumns,
  GridEditRowsModel,
  GridEditCellPropsParams
  // ColDef,
} from '@material-ui/data-grid';

import StateContext from '../../context/context';
import ComponentPanelItem from './ComponentPanelItem';
import ComponentPanelRoutingItem from './ComponentPanelRoutingItem';

// const columns: ColDef[] = [
//   { field: 'id', headerName: 'ID', width: 70 },
//   { field: 'key', headerName: 'Key', width: 100, editable: true },
//   { field: 'value', headerName: 'Value', width: 100, editable: true },
//   {
//     field: 'type',
//     headerName: 'Type',
//     width: 100,
//     editable: true
//   }
// ];

const columns: GridColumns = [
  { field: 'id', headerName: 'ID', width: 70, editable: false },
  { field: 'key', headerName: 'Key', width: 100, editable: true },
  { field: 'value', headerName: 'Value', width: 100, editable: true },
  { field: 'type', headerName: 'Type', width: 100, editable: false }
];

const buildRows = () => {
  // const rows = [];
  const [state, dispatch] = useContext(StateContext);
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


// const validateKey = (key) => {
//   const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//   return re.test(String(email).toLowerCase());
// }

export default function DataTable() {
  const [editRowsModel, setEditRowsModel] = useState<GridEditRowsModel>({});
  const [state, dispatch] = useContext(StateContext);

  const currentId = state.canvasFocus.componentId;
  const currentComponent = state.components[currentId - 1];
  let rows = buildRows(); 

  // const [rows, setRows] = useState<any[]>(currentComponent.stateProps);
  // const handleEditCellChangeCommitted = useCallback(({id,field,props}:GridEditCellPropsParams)=>{});

  // const handleEditCellChange = useCallback(
  //   ({ id, field, props }: GridEditCellPropsParams) => {
  //     // add switch case
  //     console.log('hello');
  //     console.log('id:', id);
  //     console.log('field:', field);
  //     console.log('props:', props);
  //     console.log('currentComponent:', currentComponent)
     
  //     switch (field) {
  //       case 'Key':
  //         check no special characters or white space
  //       case 'Value':
  //         based on type: change or hold errors
  //         if(rows[id].type)
  //     }
  //     if (field === 'email') {
  //       const data = props; // Fix eslint value is missing in prop-types for JS files
  //       const isValid = validateEmail(data.value);
  //       const newState = {};
  //       newState[id] = {
  //         ...editRowsModel[id],
  //         email: { ...props, error: !isValid }
  //       };
  //       setEditRowsModel(state => ({ ...state, ...newState }));
  //     }
  //   },
  //   [editRowsModel]
  // );

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        editRowsModel={editRowsModel}
        // onEditCellChange={handleEditCellChange}
        // onEditCellChangeCommitted={handleEditCellChangeCommitted}
        // checkboxSelection
      />
    </div>
  );
}

/*
import * as React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import {
  DataGrid,
  getThemePaletteMode,
  GridColumns,
  GridEditCellPropsParams,
  GridEditRowsModel,
  GridRowsProp
} from '@material-ui/data-grid';

const useStyles = makeStyles((theme: Theme) => {
  const isDark = getThemePaletteMode(theme.palette) === 'dark';

  return {
    root: {
      '& .MuiDataGrid-cellEditing': {
        backgroundColor: 'rgb(255,215,115, 0.19)',
        color: '#1a3e72'
      },
      '& .Mui-error': {
        backgroundColor: `rgb(126,10,15, ${isDark ? 0 : 0.1})`,
        color: isDark ? '#ff4343' : '#750f0f'
      }
    }
  };
});

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export default function TableStateProps() {
  const [editRowsModel, setEditRowsModel] = React.useState<GridEditRowsModel>(
    {}
  );
  const classes = useStyles();

  const handleEditCellChange = React.useCallback(
    ({ id, field, props }: GridEditCellPropsParams) => {
      console.log('id:', id);
      console.log('field:', field);
      console.log('props:', props);
      if (field === 'email') {
        const data = props; // Fix eslint value is missing in prop-types for JS files
        const isValid = validateEmail(data.value);
        const newState = {};
        newState[id] = {
          ...editRowsModel[id],
          email: { ...props, error: !isValid }
        };
        setEditRowsModel(state => ({ ...state, ...newState }));
      }
    },
    [editRowsModel]
  );

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        className={classes.root}
        rows={rows}
        columns={columns}
        editRowsModel={editRowsModel}
        onEditCellChange={handleEditCellChange}
      />
    </div>
  );
}

const columns: GridColumns = [
  { field: 'name', headerName: 'Name', width: 180, editable: true },
  { field: 'email', headerName: 'Email', width: 200, editable: true },
  {
    field: 'dateCreated',
    headerName: 'Date Created',
    type: 'date',
    width: 180,
    editable: true
  },
  {
    field: 'lastLogin',
    headerName: 'Last Login',
    type: 'dateTime',
    width: 220,
    editable: true
  }
];
const rows: GridRowsProp = [
  {
    id: 1,
    name: 'a',
    email: 'aaa@aaa.com'
  },
  {
    id: 2,
    name: 'b',
    email: 'bbb@bbb.com'
  }
];
*/
